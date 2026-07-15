#!/usr/bin/env node
// validate-artifacts.mjs
//
// Guards learnmax learning-workspace artifacts against the skill format specs.
// Run it from a learning-workspace root:
//
//   learnmax-validate                 # if installed as a bin
//   node <this-package>/scripts/validate-artifacts.mjs
//
// It checks the structural conformance of MISSION.md, GLOSSARY.md, lessons/*,
// and review/*. Exit code 0 = no errors (warnings allowed); 1 = structural
// errors found. The skill instructs the agent to run this after /learn builds.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const cwd = process.cwd();
let errors = 0;
let warnings = 0;

const err = (m) => { errors++; console.error(`  ✗ ${m}`); };
const warn = (m) => { warnings++; console.warn(`  ⚠ ${m}`); };
const ok = (m) => console.log(`  ✓ ${m}`);
const heading = (text, name) =>
  new RegExp(`^##\\s+${name}`, 'm').test(text);

console.log(`Validating learnmax workspace: ${cwd}\n`);

// --- MISSION.md ---
console.log('MISSION.md');
if (existsSync(join(cwd, 'MISSION.md'))) {
  const t = readFileSync(join(cwd, 'MISSION.md'), 'utf8');
  for (const h of ['Why', 'Success looks like', 'Constraints']) {
    heading(t, h) ? ok(`has "## ${h}"`) : err(`missing "## ${h}"`);
  }
} else {
  warn('not found — run /learn to create it');
}

// --- GLOSSARY.md ---
console.log('\nGLOSSARY.md');
if (existsSync(join(cwd, 'GLOSSARY.md'))) {
  const t = readFileSync(join(cwd, 'GLOSSARY.md'), 'utf8');
  heading(t, 'Terms') ? ok('has "## Terms"') : err('missing "## Terms"');
  const terms = (t.match(/^\*\*[^*]+\*\*/gm) || []).length;
  terms ? ok(`${terms} term(s) defined`) : err('no defined terms found');
} else {
  warn('not found');
}

// --- lessons/ ---
console.log('\nlessons/');
const lessonsDir = join(cwd, 'lessons');
if (existsSync(lessonsDir)) {
  const files = readdirSync(lessonsDir).filter((f) => f.endsWith('.md')).sort();
  if (files.length === 0) warn('directory exists but is empty');
  const required = [
    ['The idea', 'The idea'],
    ['Mental model', 'Mental model'],
    ['How it works', 'How it works'],
    ['Worked example', 'Worked example'],
    ['(Pitfalls|Trap)', 'Pitfalls/Trap'],
    ['Why it matters', 'Why it matters'],
    ['Summary', 'Summary'],
    ['Retrieval practice', 'Retrieval practice'],
    ['References', 'References'],
  ];
  for (const f of files) {
    const t = readFileSync(join(lessonsDir, f), 'utf8');
    console.log(`  ${f}`);
    if (!/^#\s+\d{4}\s+-/.test(t)) err('title not in "NNNN - Title" form');
    for (const [re, label] of required) {
      heading(t, re) ? ok(`has "## ${label}"`) : err(`missing "## ${label}"`);
    }
    if (!/Q:\s/.test(t) || !/A:\s/.test(t)) err('retrieval practice missing Q:/A:');
  }
} else {
  warn('not found');
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
} else {
  warn('not found');
}

console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exit(errors > 0 ? 1 : 0);
