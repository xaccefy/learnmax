#!/usr/bin/env node
// validate-artifacts.mjs
//
// Guards learnmax learning-workspace artifacts against the skill format specs.
// Run it from a learning-workspace root:
//
//   learnmax-validate                 # if installed as a bin
//   node <this-package>/scripts/validate-artifacts.mjs
//
// Layout: each topic is a self-contained dir (<topic-slug>/ with MISSION.md,
// GLOSSARY.md, literature/, lessons/). The root holds TOPICS.md (registry),
// review/, and learning-records/.
//
// Exit code 0 = no errors (warnings allowed); 1 = structural errors found or
// the directory is not a learnmax workspace. /learn runs this after building.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const cwd = process.cwd();
let errors = 0;
let warnings = 0;

const err = (m) => { errors++; console.error(`  ✗ ${m}`); };
const warn = (m) => { warnings++; console.warn(`  ⚠ ${m}`); };
const ok = (m) => console.log(`  ✓ ${m}`);

// Heading test, word-boundary aware: "## Why" must not match "## Why it
// matters", while "## Worked example 1 — ROP" still matches "Worked example".
const heading = (text, name) =>
  new RegExp(`^##\\s+${name}(\\s|$)`, 'm').test(text);

const listMdFiles = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...listMdFiles(p));
    else if (entry.endsWith('.md')) out.push(p);
  }
  return out.sort();
};

console.log(`Validating learnmax workspace: ${cwd}\n`);

// --- TOPICS.md (the registry; defines the workspace) ---
console.log('TOPICS.md');
const topicsFile = join(cwd, 'TOPICS.md');
if (!existsSync(topicsFile)) {
  err('not found — is this a learnmax workspace? (run /learn first)');
  console.log(`\n${errors} error(s), ${warnings} warning(s)`);
  process.exit(1);
}

const topics = [];
for (const line of readFileSync(topicsFile, 'utf8').split('\n')) {
  if (!line.startsWith('- ')) continue;
  const m = line.match(/^- (.+):\s*([\w-]+)\/?\s*$/);
  if (!m) {
    err(`bad topic line (want "- {topic}: <topic-slug>/"): ${line.trim()}`);
    continue;
  }
  ok(`${m[1]} → ${m[2]}/`);
  topics.push(m[2]);
}
if (topics.length === 0) err('no topics registered');

// --- Per-topic dirs ---
// Required headings — these are the core sections every lesson needs.
// Topic-specific variants are accepted; we just check the section exists.
const lessonRequired = [
  ['Struggle', 'Struggle'],
  ['(The idea|The big idea)', 'The idea / The big idea'],
  ['Common mistakes', 'Common mistakes'],
  ['Why it matters', 'Why it matters'],
  ['Summary', 'Summary'],
  ['Retrieval practice', 'Retrieval practice'],
  ['Exercises', 'Exercises'],
  ['References', 'References'],
];

for (const slug of topics) {
  const dir = join(cwd, slug);
  console.log(`\n${slug}/`);
  if (!existsSync(dir)) {
    err('topic dir missing');
    continue;
  }

  // MISSION.md
  const missionPath = join(dir, 'MISSION.md');
  if (existsSync(missionPath)) {
    const t = readFileSync(missionPath, 'utf8');
    for (const h of ['Why', 'Success looks like', 'Constraints']) {
      heading(t, h) ? ok(`MISSION.md has "## ${h}"`) : err(`MISSION.md missing "## ${h}"`);
    }
  } else {
    err('MISSION.md missing');
  }

  // GLOSSARY.md
  const glossaryPath = join(dir, 'GLOSSARY.md');
  if (existsSync(glossaryPath)) {
    const t = readFileSync(glossaryPath, 'utf8');
    heading(t, 'Terms') ? ok('GLOSSARY.md has "## Terms"') : err('GLOSSARY.md missing "## Terms"');
    const terms = t.match(/^\*\*[^*]+\*\*.*$/gm) || [];
    terms.length ? ok(`${terms.length} term(s) defined`) : warn('no terms defined yet');
    const withBacklink = terms.filter((l) => /\(defined in \[\[.+\]\]\)/.test(l)).length;
    if (withBacklink < terms.length) {
      err(`${terms.length - withBacklink} term(s) missing "(defined in [[...]])" backlink`);
    }
  } else {
    warn('GLOSSARY.md missing');
  }

  // literature/
  if (!existsSync(join(dir, 'literature'))) warn('literature/ missing');

  // lessons/
  const lessonsDir = join(dir, 'lessons');
  if (!existsSync(lessonsDir)) {
    err('lessons/ missing');
    continue;
  }
  const files = listMdFiles(lessonsDir);
  if (files.length === 0) err('lessons/ exists but contains no lessons');
  for (const f of files) {
    const t = readFileSync(f, 'utf8');
    console.log(`  ${f.slice(cwd.length + 1)}`);
    const titleNum = t.match(/^#\s+(\d{4})\s+-\s/m)?.[1];
    if (!titleNum) err('title not in "NNNN - Title" form');
    const fileNum = f.match(/(\d{4})-[^/]*\.md$/)?.[1];
    if (titleNum && fileNum && titleNum !== fileNum) {
      err(`title number ${titleNum} does not match filename ${fileNum}`);
    }
    if (!/^\*\*Mission tie-in:\*\*/m.test(t)) err('missing "**Mission tie-in:**" line');
    for (const [re, label] of lessonRequired) {
      heading(t, re) ? ok(`has "## ${label}"`) : err(`missing "## ${label}"`);
    }
    const hasQA = /^\*{0,2}Q\*{0,2}:\s/m.test(t);
    const hasDetails = /<details>\s*\n<summary>Answer/m.test(t);
    if (!hasQA && !hasDetails) {
      err('retrieval practice missing Q:/A: or <details> answer');
    }
  }
}

// --- review/ ---
console.log('\nreview/');
const reviewDir = join(cwd, 'review');
if (existsSync(reviewDir)) {
  const files = readdirSync(reviewDir)
    .filter((f) => f.endsWith('.md') && f !== 'weak-items.md')
    .sort();
  if (files.length === 0) warn('directory exists but is empty');
  for (const f of files) {
    const t = readFileSync(join(reviewDir, f), 'utf8');
    console.log(`  ${f}`);
    heading(t, 'Results') ? ok('has "## Results"') : err('missing "## Results"');
    heading(t, 'Weak Items') ? ok('has "## Weak Items"') : err('missing "## Weak Items"');
  }
  const backlog = join(reviewDir, 'weak-items.md');
  if (existsSync(backlog)) {
    const t = readFileSync(backlog, 'utf8');
    for (const l of t.split('\n').filter((l) => l.startsWith('- '))) {
      /^- .+\(from .+\) — last: \d{4}-\d{2}-\d{2}, streak: \d+\s*$/.test(l)
        ? ok(l.trim().slice(0, 60))
        : err(`bad weak-item line (want "- {q} (from [[...]]) — last: YYYY-MM-DD, streak: N"): ${l.trim().slice(0, 60)}`);
    }
  }
} else {
  warn('not found — created on first /test run');
}

console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exit(errors > 0 ? 1 : 0);
