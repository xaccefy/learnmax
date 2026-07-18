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

1. **Learn** (`/learn`): Researches validated sources and builds lessons under `<topic>/lessons/`.
2. **Quiz** (`/quiz`): Runs a self-check over the lessons and glossary. Gives immediate feedback. Writes nothing.
3. **Test** (`/test`): Runs a spaced self-retrieval review. Scores items as `known`, `shaky`, or `unknown`, writes results to `review/`, and schedules weak items for new lessons.

Lessons come from the researched sources. You test yourself with `/quiz` and `/test` without Socratic grilling.

## Workspace layout

Each topic is a self-contained directory:

```
<topic>/
  MISSION.md              # why you're learning this topic
  GLOSSARY.md             # canonical terms, each linked to its defining lesson
  RESOURCES.md            # vetted sources
  literature/             # source maps: consensus, tensions, gaps
  lessons/NNNN-<slug>.md  # the lessons (Markdown, renders in Obsidian)
TOPICS.md                 # registry of topic dirs
review/<date>.md          # recall scores + weak items (from /test)
review/weak-items.md      # the backlog /learn ingests first
learning-records/         # demonstrated understanding (ADR-style)
```

Lessons, literature, and glossaries are keepable artifacts — commit them if you like. `/learn` git-ignores only the ephemeral session state (`review/`, `learning-records/`).

## Loops & tooling

- **Weak-item loop is automatic.** `/test` rewrites `review/weak-items.md` every run: items that stay weak reset, items you recall move through 1/3/7-day spacing intervals, and items recalled three times running are retired. `/learn` ingests the backlog **first** on its next run, so weak spots drive the next lessons without a manual hand-off — and mastered items leave the loop instead of being re-taught forever.
- **Topic registry.** `/learn` records each topic dir in `TOPICS.md` at the workspace root, so `/quiz` and `/test` can find every topic.
- **Artifact validation.** After building, `/learn` runs `learnmax-validate` (shipped as a bin, or `node <pkg>/scripts/validate-artifacts.mjs` from the workspace root). It checks every topic dir against the format specs and fails on structural drift.

## License

MIT. Builds on `teach-me`'s tension-aware literature review and Matt Pocock's `/learn` (lesson production); adds a spaced-retrieval review.
