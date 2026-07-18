# REVIEW-FORMAT.md

Review files live in `./review/` and use date-based names: `YYYY-MM-DD.md`. Create the directory lazily — only when the first review is recorded.

## Template

```md
# Review: {YYYY-MM-DD}

## Results
- {Question/Term}: {known | shaky | unknown}

## Weak Items
- {Question/Term} (from [[<topic-slug>/lessons/NNNN-slug.md]] or <topic-slug>/GLOSSARY.md)
```

## Backlog: `review/weak-items.md`

In addition to the per-date file, `/test` maintains a single running backlog at
`review/weak-items.md`. This file is the hand-off to `/learn`: `/learn` ingests it
**first** on its next run, so weak spots automatically become the topics for new
lessons. One line per item, linked to its source, deduped by question text:

```md
- {Question/Term} (from [[<topic-slug>/lessons/NNNN-slug.md]] or <topic-slug>/GLOSSARY.md) — last: YYYY-MM-DD, streak: N
```

- `last` — the date the item was last tested.
- `streak` — consecutive times scored `known`. Spacing intervals: 0 → 1 day, 1 → 3 days,
  2 → 7 days. An item is **retired** (removed from the backlog) when `streak` reaches 3.

`/test` rewrites this file completely on every run: due items are re-tested first, items
that keep failing reset to `streak: 0`, and items that stick are retired — the backlog
tracks what is *currently* weak, not everything that ever was.

`review/weak-items.md` is created lazily and is intentionally **not** git-ignored separately
— it lives under `review/`, which is already ignored. It is a workspace-local signal between
`/test` and `/learn`, not a deliverable.
## Rules

- **Record every question.** Every question asked during the session must appear under Results with its final score.
- **Track weak items for re-teaching.** Any item scored `shaky` or `unknown` must go in the Weak Items section.
- **Link back to sources.** Weak items must link back to their originating lesson or glossary file to help re-teaching.
