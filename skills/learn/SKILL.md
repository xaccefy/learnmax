---
name: learn
description: Research validated sources and build well-sequenced lessons from them. Pairs with /quiz (self-check) and /test (spaced review). No Socratic grilling, no testing — those are separate commands.
argument-hint: "<topic|question>"
---

# learn — research + build

You research validated sources and build lessons from them. You do NOT grill the user and you do NOT test them — those are `/quiz` and `/test`.

## Workspace layout

Each topic is a self-contained directory at the workspace root:

```
<topic-slug>/
  MISSION.md            # why this topic matters to the user
  GLOSSARY.md           # canonical terms
  RESOURCES.md          # vetted sources
  literature/           # research reviews
  lessons/NNNN-slug.md  # the lessons (numbering local to the topic)
TOPICS.md               # registry of topic dirs (workspace root)
review/                 # /test output (workspace root)
learning-records/       # demonstrated understanding (workspace root)
```

Create only these paths. No extra top-level directories, no per-workspace root MISSION/GLOSSARY/RESOURCES — those live inside the topic dir.

## Run in one call

`/learn "topic"` does both phases in a single invocation:

1. **Phase 1 — Research.** Synthesize validated sources into a teaching review (`<topic-slug>/literature/...`).
2. **Phase 2 — Build lessons.** Build the lessons from the research — its tensions, misunderstandings, and consensus — in a sensible build order.

Then point the user to `/quiz` (quick self-check) and `/test` (spaced review).

## Phase 1 — Research (synthesize & teach)

Turn the topic into a teaching review from validated, high-trust sources. The output is a *teaching document, not a bibliography* — explain in your own words, connect findings, name the traps. Sources are footnotes; the prose is the product.

**Validate sources:** keep recent, cited, clear, diverse; prefer primary sources and recognised experts. Drop weak or off-topic ones and say why.

**Teaching craft (apply throughout):**
- Pre-teach the 3-5 core terms before you use them.
- After each finding, give a plain-language (Feynman) restatement.
- Show a worked example (step-by-step in one case), not just an assertion.
- Pin every claim to one concrete instance.
- Elaborate analogies: why they fit *and* where they break.
- Sequence findings so each builds on the last.
- End with things the learner must *do*.

Write to `<topic-slug>/literature/<subtopic>-review.md`:
```markdown
# Research: [topic]
## TL;DR — the core idea and the common mistake, readable standalone.
## How to think about it — core terms first; one clear picture.
## What the sources say (explained) — mechanism, why it works that way, what people get wrong, concrete example, worked example, [source](url) [✓ consensus | ⚠ disagreement | ✓ confirmed]; *plain rewrite*.
## How the findings connect — what no single source says by itself.
## Disagreements — View A vs B, evidence each side, what decides.
## Common mistakes — what people think, what's actually true, what breaks.
## What to do (takeaways) — 3-5 concrete changes.
## Sources — kept (what it backs, why kept) / dropped (why).
## Gaps — thin areas + why the literature is quiet there.
```

## Phase 2 — Build lessons

Build the lessons directly from the research — its tensions, misunderstandings, and consensus — not from diagnosing the user.

1. **Ingest the backlog.** If `review/weak-items.md` exists, read it first. Those weak items are the highest-priority topics for new lessons — they are exactly where the last `/test` showed retention failed. Cover them before expanding into new ground. A weak item's lesson goes into the topic dir it links back to.
2. **Mission.** If `<topic-slug>/MISSION.md` is missing or vague, interview for the concrete reason (not "learn X" — "ship a Rust CLI"). Revise as the user grows.
3. **Resources.** Populate `<topic-slug>/RESOURCES.md` from the review. High-trust only; annotate; surface gaps.
4. **Order.** Build lessons in a sensible progression: foundational concepts first, then the contested points (tensions) and the common misunderstandings the review surfaced. One lesson per load-bearing idea.
5. **One lesson.** `<topic-slug>/lessons/NNNN-<slug>.md` — a Markdown note, self-contained, one tangible win, tied to the topic's Mission, primary-source citation. Numbering is local to the topic (`0001`, `0002`, …). Obsidian renders it natively. Follow the structure in **LESSON-FORMAT.md** (struggle, mental model, how-it-works, at least one worked example, controversy (optional), common mistakes, why-it-matters, synthesis (lesson 2+), summary, retrieval practice with hidden answer, exercises listing). Lessons must be *deep*, not stubs: a reader should be able to teach the idea back from this file alone. Apply the same teaching craft as Phase 1. End with a **retrieval-practice question** whose answer is collapsed behind `<details><summary>Answer (write yours first)</summary>` — the learner must generate before revealing. The lesson text must contain all information required to answer this question.
6. **Exercises.** Build `<topic-slug>/exercises/NNNN-<slug>.md` alongside each lesson. Include 2-3 exercises per lesson:
   - Fix-the-bug: broken code the learner must correct
   - Predict-the-output: a code snippet with branches/races/edge cases
   - Implement: a short coding task applying the concept
   Write each exercise so the learner can run it (compile + run, or reason through).
7. **Controversy from literature.** For each lesson that has a live debate in its literature review's Tensions section, inject one `## Controversy` section into the lesson body. Keep it short: two views + what decides. Skip for foundational concepts with no real debate.
8. **Synthesis.** Every lesson after the first in a topic includes a `## Synthesis` exercise that forces combining concepts from this lesson and at least one earlier lesson. The answer is collapsed.
9. **Glossary + Records.** Update `<topic-slug>/GLOSSARY.md` and `learning-records/NNNN-<slug>.md` as understanding is demonstrated. A term enters the glossary once it's clearly defined in a lesson, linked back to that lesson.
10. **Record the topic.** Register the topic dir in `TOPICS.md` at the workspace root so `/quiz` and `/test` can find topics. One line per topic: `- {topic}: <topic-slug>/`. Skip if the line already exists.
11. **Git-ignore session state.** If the workspace is a git repo, make sure `.gitignore` at the workspace root ignores the ephemeral state. Lessons, literature, and glossaries are keepable artifacts — ignore only:

   ```gitignore
   review/
   learning-records/
   ```

12. **Validate.** Run `learnmax-validate` (or `node <this-package>/scripts/validate-artifacts.mjs`) from the workspace root. Fix any reported errors before finishing — this is the automated guard against format drift. Do not finish with a failing validator run.

Format specs live beside this skill: MISSION-FORMAT.md, RESOURCES-FORMAT.md, GLOSSARY-FORMAT.md, LEARNING-RECORD-FORMAT.md, LESSON-FORMAT.md.

## Next step

After building, tell the user:

```
/quiz "topic"     # self-check what you learned
/test "topic"     # spaced review, scores, feeds weak spots back
```
