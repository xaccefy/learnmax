---
name: test
description: Spaced-retrieval review over a workspace's glossary and lessons to verify long-term retention. Quizzes with same-length answers, applies spacing and interleaving, tracks recall per item, and feeds weak items back as new gaps for /learn or /quiz.
argument-hint: "[topic|subject]"
---

# review

Verify the building actually worked. This is the **verification** stage of learnmax — the half neither `/learn` nor `/quiz` performs. You don't re-teach; you *test retrieval*, because retrieval is what builds storage strength.

Read `CONTEXT.md` for **Spacing**, **Interleaving**, **Storage strength**, and **ZPD**.

## Why this exists

`/learn` produces lessons; it never checks whether they stuck. `/quiz` finds gaps; it never confirms they closed. Without review, the loop is open: you build, hope, and forget. Review closes it — and its output (weak items) becomes a new Gap Report that re-enters the loop.

## Inputs

Read from the workspace:
- `GLOSSARY.md` — the canonical terms. Primary quiz source.
- `lessons/*.html` — the lessons. Mine them for checkable claims.
- `learning-records/*.md` — what was previously demonstrated (baseline).
- `gaps/<subject>/*.md` — prior gaps, to see if they closed.

If none exist, tell the user to run `/learn` (or `/quiz`) first.

## Process

1. **Detect subject** from the argument or workspace. `ls` the relevant dirs.
2. **Build the quiz pool.** One question per glossary term + 1–2 per lesson's key claim. Each question tests *retrieval*, not recognition.
3. **Apply spacing + interleaving:**
   - **Spacing** — if a prior `review/<subject>/` file exists, revisit items from it *before* new ones; mix old and new so recall is distributed over time.
   - **Interleaving** — shuffle topics together; don't block one topic. Interleaving strengthens discrimination between near concepts.
4. **Quiz, one at a time.** Ask; wait for the answer. **Every answer the same length/format** (no formatting clues that leak the answer). Give immediate feedback: correct → brief confirmation + the source; wrong → reveal the term/claim and *why*, cite the lesson/glossary.
5. **Score recall per item:** `known | shaky | unknown`. A `shaky`/`unknown` term is a **weak item**.
6. **Write the review log** to `review/<subject>/<date>.md`:
   ```markdown
   # Review: <subject> — <date>

   ## Results
   - **Term A** — known
   - **Term B** — shaky (confused with Term C)
   - **Claim from lesson 0003** — unknown

   ## Weak items → new gaps
   - Term B, Term C: interleaving confusion — re-lesson or re-grill
   - Lesson 0003 claim: unknown — re-lesson
   ```
7. **Feed weak items back.** For each weak item, append a short entry to `gaps/<subject>/<topic>-gaps.md` (or create one) marking it `Confused`/`Unknown` with the misconception noted. Then tell the user:
   ```
   /learn [topic] @gaps/<subject>/<topic>-gaps.md   # re-build the weak spots
   # or, if it's a misconception not a gap:
   /quiz [topic] @literature/...                 # re-grill the misunderstanding
   ```

## Rules

- **Test retrieval, not recognition.** "Define X" beats "which of these is X."
- **Same-length answers.** No clue leakage via formatting.
- **Immediate feedback.** Tight loop; don't batch grading.
- **Don't re-teach in the session.** Surface the gap, log it, route to `/learn` or `/quiz`. Review's job is to *measure*, not to instruct.
- **Be honest about spacing.** A `known` today with no prior review is weak evidence; note it.

## Loop

`/learn` → (lessons + glossary) → **`/test`** → (weak items) → new Gap Report → `/learn` or `/quiz` → …
