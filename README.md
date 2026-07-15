# learnmax

A teaching system for coding agents that runs the **full learning loop**: learn → quiz → test.

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

1. **Learn** (`/learn`) — researches validated sources, builds lessons (`lessons/...`).
2. **Quiz** (`/quiz`) — self-check over the lessons + glossary; immediate feedback.
3. **Test** (`/test`) — spaced self-retrieval; scores `known | shaky | unknown`, writes `review/`, feeds weak items back as topics for more lessons.

No Socratic grilling of the user — lessons come from the researched sources, and you test yourself with `/quiz` and `/test`.

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

## License

MIT. Builds on `teach-me`'s tension-aware literature review and Matt Pocock's `/learn` (lesson production); adds a spaced-retrieval review.
