---
name: quiz
description: Self-quiz over what /learn built — retrieval questions with immediate feedback. Run after /learn to check understanding. Lightweight; no spaced scheduling and no scoring file (that's /test).
argument-hint: "[topic|subject]"
---

# quiz — self-check

Quick retrieval practice over the lessons and glossary `/learn` produced. You test recall, not recognition, and give immediate feedback. You do not re-teach and you do not score to a file — that's `/test`.

## Process

1. **Detect subject** from the argument or workspace; `ls lessons/` and `GLOSSARY.md`.
2. **Build the question pool.** One question per glossary term + 1-2 per lesson's key claim. Each tests *retrieval*, not recognition ("Define X" beats "which of these is X").
3. **Quiz, one at a time.** Ask; wait for the answer. **Every answer the same length/format** (no formatting clues that leak the answer).
4. **Immediate feedback.** Correct → brief confirmation + the source. Wrong → reveal the term/claim and *why*, cite the lesson/glossary. Don't lecture.
5. **Quick verdict.** At the end, name which terms/claims are solid and which to hit with `/test`.

## Rules

- Test retrieval, not recognition.
- Same-length answers.
- Immediate feedback; don't batch.
- Don't re-teach — surface the gap and point to `/test` or `/learn`.
