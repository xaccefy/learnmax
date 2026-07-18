---
name: test
description: Spaced-retrieval review over the lessons and glossary /learn built. Scores recall (known/shaky/unknown), applies spacing + interleaving, and feeds weak items back to /learn as topics for more lessons.
argument-hint: "[topic]"
---

# test — spaced review

Verify the building worked. You don't re-teach; you test retrieval, because retrieval is what builds storage strength.

## Process

1. **Detect topic** from the argument and `TOPICS.md` (which maps each topic to its dir). No argument: cover all topics.
2. **Build the quiz pool.** One question per term in the topic's `GLOSSARY.md` + 1-2 per lesson's key claim. Test *retrieval*, not recognition ("Define X" beats "which of these is X").
3. **Apply spacing + interleaving:**
   - **Spacing** — read `review/weak-items.md` first. Every backlog item whose interval has elapsed is **due** and gets re-tested before any new item. Intervals by `streak` (consecutive times scored `known`): 0 → 1 day, 1 → 3 days, 2 → 7 days, 3+ → 30 days. An item whose interval has not elapsed is left alone.
   - **Interleaving** — shuffle topics together; don't block one topic.
4. **Quiz, one at a time.** Ask; wait for the answer. Immediate feedback (correct → brief confirmation + the source; wrong → reveal the term/claim and *why*, cite the lesson/glossary). Don't lecture.
5. **Score** each: `known | shaky | unknown`. A `shaky`/`unknown` item is a **weak item**.
6. **Write** `review/<date>.md` (results + weak items). See `REVIEW-FORMAT.md` for format.
7. **Rewrite the backlog.** You own `review/weak-items.md` — rewrite it completely each run:
   - A backlog item scored `known` today: increment its `streak`, update `last:` to today. If `streak` reaches 3, the item is **retired** — remove it from the backlog.
   - A backlog item scored `shaky`/`unknown`: reset `streak` to 0, update `last:`, keep it.
   - A newly weak item: append with `streak: 0`, `last:` today.
   - Items not due today carry over unchanged.
   - Dedupe by question text. Line format: `- {Question/Term} (from [[<topic-slug>/lessons/NNNN-slug.md]] or <topic-slug>/GLOSSARY.md) — last: YYYY-MM-DD, streak: N`

   `/learn` ingests this file first on its next run, so weak spots drive the next lessons automatically — and items that have stuck leave the loop instead of being re-taught forever.

## Rules

- Test retrieval, not recognition.
- Only test on facts explicitly stated in the lessons or glossary definitions.
- Immediate feedback; don't batch.
- Don't re-teach in the session — surface the gap and let `/learn` rebuild it.
