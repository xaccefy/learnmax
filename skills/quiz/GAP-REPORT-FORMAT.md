# Gap Report Format

A Gap Report is the **bridge** between `/quiz` and `/learn`. It is written by `/quiz` at session wrap-up and consumed by `/learn` to build lessons that target the user's *actual* gaps. Keep it machine-readable and **ZPD-ordered** — `/learn` builds lessons in the order listed under "Priority".

## Location

`gaps/<subject>/<topic>-gaps.md`

## Template

```md
# Gap Report: <topic>

## Source
- Literature review: literature/<subject>/<topic>-review.md
- Diary: diary/<subject>/<file>.md

## Levels (per topic/branch)
- **Topic A** — Aware (names the tension, but picks a side early)
- **Topic B** — Confused (fuzzy: collapses X and Y)
- **Topic C** — Unknown

## Surfaced misconceptions
- [⚠] Topic B: thinks X and Y are the same; they differ because …
- [⚠] Topic A: overconfident on the mainstream position; ignores View B

## Open tensions to build around
- Topic A: View A vs View B — cite both sides from the literature review
- Topic C: unresolved debate on scope/evidence

## Priority for /learn (ZPD order)
1. Topic B — Confused → clarification lesson first (resolve the collapse)
2. Topic A — Aware → "hold the tension" lesson citing both sides
3. Topic C — Unknown → intro lesson, then grill
```

## Rules

- **One entry per topic/branch** under Levels, with its current Level.
- **Misconceptions carry `[⚠]`** and the *why-it's-tempting* — `/learn` uses this to open the lesson.
- **Tensions name both sides and the source** — `/learn` cites them.
- **Priority is the lesson sequence.** Confused before Aware before Unknown-only-if-it-blocks. `/learn` follows this order unless the user overrides.
- **Accumulate, don't overwrite.** New `/quiz` sessions append a new Gap Report (or a new section); `/learn` can consume several.
- **Weak items from `/test` land here too**, marked `Confused`/`Unknown`, so they re-enter the build stage.
