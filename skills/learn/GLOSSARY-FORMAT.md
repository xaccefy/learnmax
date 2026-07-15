# GLOSSARY.md Format

`GLOSSARY.md` is the canonical language for this teaching workspace. All lessons, exercises, and learning records should adhere to its terminology. Building it is itself part of learning: compressing a concept into a tight definition is evidence the user understands it.

## Structure

```md
# {Topic} Glossary

{One or two sentence description of the topic this glossary covers.}

## Terms

**Term** (defined in [[lessons/NNNN-slug.md]]):
Definition in one or two sentences — what the term IS.
_Avoid_: alias1, alias2

**Another Term** (defined in [[lessons/NNNN-slug.md]]):
Definition.
_Avoid_: alias
```

## Rules

- **Link back to definitions.** Each term must link to the specific lesson (`[[lessons/NNNN-slug.md]]`) that defined it.
- **Add a term only when the user understands it.** The glossary is a record of compressed knowledge, not a dictionary the user reads to learn. If the user has just been introduced to a concept, wait until they can use it correctly before promoting it here.
- **Be opinionated.** When several words exist for the same concept, pick the best one and list the rest as aliases to avoid. This is how language compresses.
- **Keep definitions tight.** One or two sentences. Define what the term IS, not what it does or how to do it.
- **Use the glossary's own terms inside definitions.** Once a term is in the glossary, prefer it everywhere — including inside other definitions.
- **Group under subheadings** when natural clusters emerge. A flat list is fine when terms cohere.
- **Flag ambiguities explicitly.** If a term is used loosely in the wider field, note the resolution.
- **Revise as understanding deepens.** A definition from week one may be wrong by week six. Update in place; do not leave stale entries.
