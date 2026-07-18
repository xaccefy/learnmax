---
name: quiz
description: Self-quiz over what /learn built — retrieval questions with immediate feedback. Run after /learn to check understanding. Lightweight; no spaced scheduling and no scoring file (that's /test).
argument-hint: "[topic]"
---

# quiz — self-check

Quick retrieval practice over the lessons and glossary `/learn` produced. Ephemeral: no scoring, no files, no scheduling.

## Process

Run the `/test` process (see the test skill) with two changes:

1. **Skip spacing and the backlog.** Ignore `review/weak-items.md`; build the pool straight from the lessons and glossary.
2. **Write nothing.** No `review/` file, no backlog update. Scores stay in the conversation.

Everything else is identical: retrieval questions, one at a time, immediate feedback (correct → source; wrong → reveal + why, cite the lesson/glossary), no re-teaching.

## Verdict

At the end, name which terms/claims are solid and which to hit with `/test`.
