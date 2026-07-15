# REVIEW-FORMAT.md

Review files live in `./review/` and use date-based names: `YYYY-MM-DD.md`. Create the directory lazily — only when the first review is recorded.

## Template

```md
# Review: {YYYY-MM-DD}

## Results
- {Question/Term}: {known | shaky | unknown}

## Weak Items
- {Question/Term} (from [[lessons/NNNN-slug.md]] or GLOSSARY.md)
```

## Backlog: `review/weak-items.md`

In addition to the per-date file, every `shaky`/`unknown` item is appended to a single
running backlog at `review/weak-items.md`. This file is the hand-off to `/learn`:
`/learn` ingests it **first** on its next run, so weak spots automatically become the
topics for new lessons. Keep one line per item, linked to its source, and dedupe by
question text:

```md
- {Question/Term} (from [[lessons/NNNN-slug.md]] or GLOSSARY.md)
```

`review/weak-items.md` is created lazily and is intentionally **not** git-ignored separately
— it lives under `review/`, which is already ignored. It is a workspace-local signal between
`/test` and `/learn`, not a deliverable.
## Rules

- **Record every question.** Every question asked during the session must appear under Results with its final score.
- **Track weak items for re-teaching.** Any item scored `shaky` or `unknown` must go in the Weak Items section.
- **Link back to sources.** Weak items must link back to their originating lesson or glossary file to help re-teaching.
