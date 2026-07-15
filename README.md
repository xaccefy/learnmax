# learnmax

A teaching system run by coding agents to teach human users. It runs a full learning loop: learn, quiz, and test.

It builds on one lineage:

- **Building** (from Matt Pocock's `/learn`): a stateful workspace that produces Markdown lessons, a glossary, and learning records, sequenced from validated sources for long-term retention.
- **Review**: spaced-retrieval practice over your glossary and lessons that *verifies* retention and feeds weak spots back into the loop.

`/learn` researches validated sources and turns them into well-sequenced lessons. You check what stuck yourself with `/quiz` and `/test`.

## The skills

```
/learn [topic|question]    → research validated sources, build lessons
/quiz  [topic]             → self-check what you learned
/test  [topic]             → spaced review, scores, feeds weak spots back
```

`/learn` researches and builds in one call. `/quiz` and `/test` are run separately, whenever you want to check yourself.

## Install

```bash
pi install npm:@xaccefy/learnmax
# or, for the Agent-Skills path:
npx skills add @xaccefy/learnmax
# git install works without publishing:
pi install git:x4cc3/learnmax
```

Then, from any directory you want to use as a learning workspace:

```bash
/learn "memory layout"    # research + build the lessons
/quiz  "memory layout"    # self-check
/test  "memory layout"    # spaced review
```

`/learn` does research and building in one call. Run `/quiz` and `/test` after, as often as you like.

## How it runs

Three commands, one flow:

1. **Learn** (`/learn`): Researches validated sources and builds lessons under `lessons/`.
2. **Quiz** (`/quiz`): Runs a self-check over the lessons and glossary. Gives immediate feedback.
3. **Test** (`/test`): Runs a spaced self-retrieval review. Scores items as `known`, `shaky`, or `unknown`, writes results to `review/`, and schedules weak items for new lessons.

Lessons come from the researched sources. You test yourself with `/quiz` and `/test` without Socratic grilling.

## Artifacts (all git-ignored by default)

| Path | Owner | Purpose |
|------|-------|---------|
| `literature/<topic>-review.md` | `/learn` (Phase 1) | Source map: consensus, tensions, gaps |
| `MISSION.md` | `/learn` (Phase 2) | Why you're learning this |
| `RESOURCES.md` | `/learn` | Vetted sources |
| `lessons/NNNN-<slug>.md` | `/learn` | The lessons (Markdown, renders in Obsidian) |
| `GLOSSARY.md` | `/learn` | Canonical terms |
| `learning-records/NNNN-<slug>.md` | `/learn` | Demonstrated understanding (ADR-style) |
| `review/<date>.md` | `/test` | Recall scores + weak items |

## Loops & tooling

- **Weak-item loop is automatic.** `/test` writes every `shaky`/`unknown` item to `review/weak-items.md`. `/learn` ingests that file **first** on its next run, so weak spots drive the next lessons without a manual hand-off.
- **Topic registry.** `/learn` records each topic (and its lesson range) in `TOPICS.md` at the workspace root, so `/quiz` and `/test` can disambiguate which lessons a topic covers when several exist.
- **Artifact validation.** After building, `/learn` runs `learnmax-validate` (shipped as a bin, or `node <pkg>/scripts/validate-artifacts.mjs` from the workspace root). It checks `MISSION.md`, `GLOSSARY.md`, `lessons/`, and `review/` against the format specs and fails on structural drift.

## License

MIT. Builds on `teach-me`'s tension-aware literature review and Matt Pocock's `/learn` (lesson production); adds a spaced-retrieval review.
