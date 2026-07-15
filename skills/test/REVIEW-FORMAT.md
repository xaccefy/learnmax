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

## Rules

- **Record every question.** Every question asked during the session must appear under Results with its final score.
- **Track weak items for re-teaching.** Any item scored `shaky` or `unknown` must go in the Weak Items section.
- **Link back to sources.** Weak items must link back to their originating lesson or glossary file to help re-teaching.
