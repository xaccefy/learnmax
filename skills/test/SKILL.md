---
name: test
description: Spaced-retrieval review over the lessons and glossary /learn built. Scores recall (known/shaky/unknown), applies spacing + interleaving, and feeds weak items back to /learn as topics for more lessons.
argument-hint: "[topic]"
---

# test — spaced review

Verify the building worked. You don't re-teach; you test retrieval, because retrieval is what builds storage strength.

## Process

1. **Detect topic**; `ls` the relevant dirs.
2. **Build the quiz pool.** One question per glossary term + 1-2 per lesson claim. Test *retrieval*, not recognition.
3. **Apply spacing + interleaving:**
   - **Spacing** — if a prior `review/` file exists, revisit those items *before* new ones.
   - **Interleaving** — shuffle topics together; don't block one topic.
4. **Quiz, one at a time.** Same-length answers; immediate feedback (correct → source; wrong → reveal + why).
5. **Score** each: `known | shaky | unknown`. A `shaky`/`unknown` item is a **weak item**.
6. **Write** `review/<date>.md` (results + weak items). See `REVIEW-FORMAT.md` for format.
7. **Feed weak items back:** note them as topics for additional lessons in a later `/learn` call.

## Rules

- Test retrieval, not recognition.
- Only test on facts explicitly stated in the lessons or glossary definitions.
- Same-length answers.
- Immediate feedback.
- Don't re-teach in the session.
