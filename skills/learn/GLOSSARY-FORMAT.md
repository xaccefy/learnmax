# GLOSSARY.md Format

`<topic-slug>/GLOSSARY.md` is the canonical language for one topic. One glossary per topic, inside the topic dir — no root glossary, no cross-topic glossary. All lessons and learning records should adhere to its terminology. Building it is itself part of learning: compressing a concept into a tight definition is evidence the material is understood well enough to teach.

## Structure

```md
# {Topic} Glossary

{One or two sentence description of the topic this glossary covers.}

## Terms

**Term** (defined in [[<topic-slug>/lessons/NNNN-slug.md]]):
Definition in one or two sentences — what the term IS.
_Avoid_: alias1, alias2

**Another Term** (defined in [[<topic-slug>/lessons/NNNN-slug.md]]):
Definition.
_Avoid_: alias
```

## Rules

- **Link back to definitions.** Each term must link to the specific lesson (`[[<topic-slug>/lessons/NNNN-slug.md]]`) that defined it. No term without a backlink.
- **Add a term when its lesson defines it.** The glossary records the canonical language of the topic; whether the user has *retained* the term is tracked by learning records and `review/`, not by withholding the entry.
- **Be opinionated.** When several words exist for the same concept, pick the best one and list the rest as aliases to avoid. This is how language compresses.
- **Keep definitions tight.** One or two sentences. Define what the term IS, not what it does or how to do it.
- **Use the glossary's own terms inside definitions.** Once a term is in the glossary, prefer it everywhere — including inside other definitions.
- **Group under subheadings** when natural clusters emerge. A flat list is fine when terms cohere.
- **Flag ambiguities explicitly.** If a term is used loosely in the wider field, note the resolution.
- **Revise as understanding deepens.** A definition from week one may be wrong by week six. Update in place; do not leave stale entries.
