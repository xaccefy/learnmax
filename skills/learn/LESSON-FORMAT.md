# Lesson Format

`<topic-slug>/lessons/NNNN-<slug>.md` holds one self-contained lesson. Each lesson teaches **one load-bearing idea** to a tangible win, tied to the topic's Mission, with a primary-source citation. Obsidian renders it natively (wikilinks work).

A lesson is too short if a reader could not teach the idea back from this file alone. Aim for depth: a struggle prompt (predict/fix before reading), a mental model, what happens under the hood, at least one worked example, what people get wrong, why the idea matters, how it connects to other lessons, a cross-lesson synthesis exercise (lesson 2+), a tight summary, a retrieval-practice question with hidden answer, and companion exercises in an `exercises/` directory.

## Title / filename

- File: `<topic-slug>/lessons/0001-binary-search.md` (zero-padded `NNNN`, kebab `slug`).
- `NNNN` numbering is **local to the topic** — every topic starts at `0001`.
- Title: `# 0001 - Binary search` (the number matches the filename; the human title follows the dash).
- Companion exercises file: `<topic-slug>/exercises/NNNN-<slug>.md` (same number, same slug).

## Template

```md
# NNNN - {Title}

**Mission tie-in:** {One line. What the learner can now do, and which Mission goal it serves.}

## Struggle

{A deliberately broken piece of code, a wrong mental model, or a prediction
challenge. Ask the learner to predict the output / spot the bug / explain why
it fails — before any explanation. The answer is collapsed behind `<details>`
so they must generate their own answer before peeking.

This primes encoding through productive failure: the attempt, even if wrong,
makes the lesson's explanation land harder. Research: Kapur's Productive
Failure, PS-I protocol (Cochrane 2023).}

```c
// {code snippet that demonstrates the common mistake}
```

<details>
<summary>What to notice (write your answer first)</summary>

The key mechanism at play: {the answer}. The mistake most people make: {why
your initial guess was probably wrong}.
</details>

## The idea
{The core claim in 2-4 sentences. What the thing IS and why it exists. No jargon before it is taught.}

## Mental model
{An analogy that fits AND where it breaks. Name the moving parts: who owns what, what changes.}

## How it works
{The mechanism under the hood. Show the internals that explain the traps later. Concrete, not hand-wavy.}

## Worked example 1 — {scenario}
{Step-by-step in ONE case. Real code or a real trace. Annotate the non-obvious lines.}

## Worked example 2 — {scenario}   (optional but encouraged for non-trivial topics)
{A second angle: the failure mode, the edge case, or the contrast.}

## Controversy (optional)
{Pull one tension from the literature review's Tensions section. Two competing
views, the evidence for each, what decides. Omit for foundational concepts that
have no live debate. This surfaces the messy debates the clean narrative hides.}

## Common mistakes
- {What people get wrong, and what breaks when they do.}
- {Another common mistake.}

## Why it matters
{What breaks or what becomes possible because of this. Tie to real bugs, costs, or leverage.}

## Connections
- Builds on [[<topic-slug>/lessons/NNNN-slug.md]].
- Sets up [[<topic-slug>/lessons/NNNN-slug.md]].

## Synthesis (lesson 2+ in a topic)
{An exercise requiring concepts from two or more lessons in this topic.
Present a concrete problem whose solution needs the current lesson AND at least
one earlier lesson. The answer is collapsed so the learner must generate it first.}

<details>
<summary>Solution (write yours first)</summary>
{Walkthrough of the cross-concept solution.}
</details>

## Summary
{3-5 sentences restating the idea, the mechanism, and what goes wrong. The TL;DR a reader memorizes.}

## Retrieval practice
Q: {A retrieval question — "explain / predict / define", not "which of these".}

<details>
<summary>Answer (write yours first)</summary>
{The full answer. Everything needed to answer must be in this lesson above.}
</details>

## Exercises

Open `<topic-slug>/exercises/NNNN-<slug>.md` for companion exercises:
- Fix-the-bug: {one-line description of the broken code exercise}
- Predict-the-output: {one-line description}
- Implement: {one-line description of a small implementation exercise}

## References
- {Primary source or recognised expert. Why it backs this lesson.}
```

## Rules

- **One idea per lesson.** If two ideas fight for the title, split them.
- **Self-contained.** A reader who only opens this file can learn and be quizzed on it. No "see the other lesson" as a substitute for the content.
- **Contain the answer.** The retrieval-practice answer must be derivable from this file alone. `/quiz` and `/test` only ask what is stated here.
- **Show, don't assert.** Every non-trivial claim gets a worked example or a concrete instance.
- **Name the common mistakes.** The Common mistakes section is mandatory — it is what the learner will actually get wrong.
- **Link forward and back.** Connections use `[[<topic-slug>/lessons/NNNN-slug.md]]` so the curriculum reads as a graph, not a list. Links may cross topic dirs freely — use the full path.
- **Cite.** At least one primary or expert source in References.
- **Hidden answer.** The retrieval practice uses `Q:` then `<details><summary>Answer (write yours first)</summary>` — the learner must generate before revealing. `/quiz` and `/test` parse the `Q:` line for the question text.
- **Struggle before content.** Every lesson starts with a `## Struggle` section — a prediction/bug-fix challenge. The answer is always collapsed behind `<details>`. This forces productive failure before explanation.
- **Exercises per lesson.** Each lesson has a companion `<topic-slug>/exercises/NNNN-<slug>.md` file with 2-3 exercises (fix-the-bug, predict-output, implement). The lesson lists them; the exercises file contains the actual code.
- **Synthesis from lesson 2 onward.** Every lesson after the first in a topic includes a `## Synthesis` exercise linking concepts from this lesson + at least one earlier lesson.

## Exemplar (verbose, do not trim)

The lesson below is the target quality. It is long on purpose: struggle prompt, mental model, internals, two worked examples, controversy, common mistakes, why-it-matters, synthesis, summary, retrieval practice with hidden answer, exercises, references.

```md
# 0003 - The heap: manual memory management

**Mission tie-in:** Recognize heap memory bugs and understand how allocator
mechanics enable them. You should be able to read a C function and predict
whether it leaks, dangles, or double-frees.

## Struggle

What does this program print?

```c
#include <stdlib.h>
#include <stdio.h>

int main(void) {
    int *p = malloc(sizeof(int));
    *p = 42;
    free(p);
    printf("%d\n", *p);
}
```

<details>
<summary>What to notice (write your answer first)</summary>

It prints 42 (or garbage). `free` does not zero the memory or null the pointer.
The data may persist until another allocation reuses the block. Reading after
free is a use-after-free bug that looks like it works in tests.
</details>

## The idea
The heap is the region of a process's memory used for objects whose lifetime
you control explicitly, rather than the compiler. ...
```
