# learnmax

A combined teaching system for coding agents that runs the **full learning loop**: research → diagnose → build → review.

It fuses two lineages and adds the missing stage:

- **Diagnosis** (from `teach-me` / DuskyElf): Socratic grilling that finds your unknown unknowns, bias, and fuzzy thinking; a source-grounded literature review that maps where experts *actually disagree*.
- **Building** (from Matt Pocock's `/learn`): a stateful workspace that produces beautiful HTML lessons, a glossary, and learning records, sequenced to your Zone of Proximal Development for long-term retention.
- **Review** (new): spaced-retrieval practice over your glossary and lessons that *verifies* retention and feeds weak spots back into the loop.

Neither source alone closes the loop. `teach-me` diagnoses but leaves no durable artifact; `/learn` builds but never interrogates your misconceptions or checks whether you retained anything. `learnmax` connects them: **diagnosis emits a Gap Report that building consumes; review proves the building worked.**

## The four skills

```
/research [topic|question]      → source-backed review: consensus, tensions, gaps
/quiz [topic] [@review-file]          → Socratic session; ends with a Gap Report
/learn [topic] [@gaps @review]            → lessons + glossary + learning records, targeting your gaps
/test [topic]                           → spaced retrieval over glossary + lessons; feeds weak items back
```

## Install

```bash
pi install git:x4cc3/learnmax
# or, for the Agent-Skills path:
npx skills add x4cc3/learnmax
```

Then, from any directory you want to use as a learning workspace:

```bash
/research "transformers"
/quiz "transformers" @literature/transformers/transformers-review.md
/learn "transformers" @gaps/transformers/transformers-gaps.md
/test "transformers"
```

## How they chain

Each skill has exactly one job, so the loop is inspectable and resumable. A `/quiz` session that reveals you're `Confused` on a branch flows straight into a `/learn` lesson for that branch, citing the tension `/research` mapped. A `/test` that shows a glossary term scoring low becomes a new gap → re-lesson or re-grill.

## Artifacts (all git-ignored by default)

| Path | Owner | Purpose |
|------|-------|---------|
| `literature/<subject>/<topic>-review.md` | `/research` | Source map: consensus, tensions, gaps |
| `diary/<subject>/<file>.md` | `/quiz` | Session map: topics, levels, remarks |
| `gaps/<subject>/<topic>-gaps.md` | `/quiz` | Bridge: levels + misconceptions + ZPD order |
| `MISSION.md` | `/learn` | Why you're learning this |
| `RESOURCES.md` | `/learn` | Vetted sources |
| `lessons/NNNN-<slug>.html` | `/learn` | The lessons |
| `GLOSSARY.md` | `/learn` | Canonical terms |
| `learning-records/NNNN-<slug>.md` | `/learn` | Demonstrated understanding (ADR-style) |
| `reference/*.html` | `/learn` | Compressed cheat-sheets |
| `review/<subject>/<date>.md` | `/test` | Recall scores + weak items |

## License

MIT. Builds on ideas from `teach-me` (MIT) and Matt Pocock's `skills` (MIT).
