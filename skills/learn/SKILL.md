---
name: learn
description: Research validated sources and build well-sequenced lessons from them. Pairs with /quiz (self-check) and /test (spaced review). No Socratic grilling, no testing — those are separate commands.
argument-hint: "<topic|question>"
---

# learn — research + build

You research validated sources and build lessons from them. You do NOT grill the user and you do NOT test them — those are `/quiz` and `/test`.

## Run in one call

`/learn "topic"` does both phases in a single invocation:

1. **Phase 1 — Research.** Synthesize validated sources into a teaching review (`literature/...`).
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

Write to `literature/<subject>/<topic>-review.md`:
```markdown
# Research: [topic]
## TL;DR — the mental model + the top trap, readable standalone.
## How to think about it (mental model) — pre-teach core terms; one coherent picture.
## Findings (explained) — mechanism, why true, why people err, concrete instance, worked example, [source](url) [✓ consensus | ⚠ tension | ✓ pitfall]; *plain-words restatement*.
## How the findings connect — synthesis no single source gives.
## Tensions — View A vs B, best evidence each side, what decides.
## Common misunderstandings — tempting why, what's true, failure mode.
## How to apply (takeaways) — 3-5 concrete changes.
## Sources — kept (what it backs, why kept) / dropped (why).
## Gaps — thin areas + why the literature is quiet there.
```

## Phase 2 — Build lessons

Build the lessons directly from the research — its tensions, misunderstandings, and consensus — not from diagnosing the user.

1. **Mission.** If `MISSION.md` is empty/vague, interview for the concrete reason (not "learn X" — "ship a Rust CLI"). Revise as the user grows.
2. **Resources.** Populate `RESOURCES.md` from the review. High-trust only; annotate; surface gaps.
3. **Order.** Build lessons in a sensible progression: foundational concepts first, then the contested points (tensions) and the common misunderstandings the review surfaced. One lesson per load-bearing idea.
4. **One lesson.** `lessons/NNNN-<slug>.md` — a Markdown note, self-contained, one tangible win, tied to Mission, primary-source citation. Obsidian renders it natively. Apply the same teaching craft as Phase 1: worked example, concrete instance, plain-language restatement, and end with a **retrieval-practice question** (feeds `/quiz` and `/test`).
5. **Glossary + Records.** Update `GLOSSARY.md` and `learning-records/NNNN-<slug>.md` as understanding is demonstrated. A term enters the glossary only once it's clearly defined in the lessons.

Format specs live beside this skill: MISSION-FORMAT.md, RESOURCES-FORMAT.md, GLOSSARY-FORMAT.md, LEARNING-RECORD-FORMAT.md.

## Next step

After building, tell the user:

```
/quiz "topic"     # self-check what you learned
/test "topic"     # spaced review, scores, feeds weak spots back
```
