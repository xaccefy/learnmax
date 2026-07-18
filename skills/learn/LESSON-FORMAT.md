# Lesson Format

`<topic-slug>/lessons/NNNN-<slug>.md` holds one self-contained lesson. Each lesson teaches **one load-bearing idea** to a tangible win, tied to the topic's Mission, with a primary-source citation. Obsidian renders it natively (wikilinks work).

A lesson is too short if a reader could not teach the idea back from this file alone. Aim for depth: a mental model, what happens under the hood, at least one worked example, the traps people actually hit, why the idea matters, how it connects to other lessons, and a tight summary. End with a retrieval-practice question whose answer is fully contained in the lesson.

## Title / filename

- File: `<topic-slug>/lessons/0001-binary-search.md` (zero-padded `NNNN`, kebab `slug`).
- `NNNN` numbering is **local to the topic** — every topic starts at `0001`.
- Title: `# 0001 - Binary search` (the number matches the filename; the human title follows the dash).

## Template

```md
# NNNN - {Title}

**Mission tie-in:** {One line. What the learner can now do, and which Mission goal it serves.}

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

## Pitfalls
- {Trap people actually hit, and the failure mode it causes.}
- {Another trap.}

## Why it matters
{What breaks or what becomes possible because of this. Tie to real bugs, costs, or leverage.}

## Connections
- Builds on [[<topic-slug>/lessons/NNNN-slug.md]].
- Sets up [[<topic-slug>/lessons/NNNN-slug.md]].

## Summary
{3-5 sentences restating the idea, the mechanism, and the main trap. The TL;DR a reader memorizes.}

## Retrieval practice
Q: {A retrieval question — "explain / predict / define", not "which of these".}
A: {The full answer. Everything needed to answer must be in this lesson above.}

## References
- {Primary source or recognised expert. Why it backs this lesson.}
```

## Rules

- **One idea per lesson.** If two ideas fight for the title, split them.
- **Self-contained.** A reader who only opens this file can learn and be quizzed on it. No "see the other lesson" as a substitute for the content.
- **Contain the answer.** The retrieval-practice answer must be derivable from this file alone. `/quiz` and `/test` only ask what is stated here.
- **Show, don't assert.** Every non-trivial claim gets a worked example or a concrete instance.
- **Name the traps.** The Pitfalls section is mandatory — it is what the learner will actually fail on.
- **Link forward and back.** Connections use `[[<topic-slug>/lessons/NNNN-slug.md]]` so the curriculum reads as a graph, not a list. Links may cross topic dirs freely — use the full path.
- **Cite.** At least one primary or expert source in References.
- **Plain Q/A.** The retrieval practice uses `Q:` / `A:` lines with no bold or other decoration — `/quiz` and `/test` parse this exact form.

## Exemplar (verbose, do not trim)

The lesson below is the target quality. It is long on purpose: mental model, internals, two worked examples, four pitfalls, why-it-matters, connections, summary, retrieval practice, references.

```md
# 0003 - The heap: manual memory management

**Mission tie-in:** Recognize heap memory bugs and understand how allocator
mechanics enable them. You should be able to read a C function and predict
whether it leaks, dangles, or double-frees.

## The idea
The heap is the region of a process's memory used for objects whose lifetime
you control explicitly, rather than the compiler. The stack gives you
scope-bound lifetime for free; the heap gives you lifetime you must manage by
hand. You ask for heap memory with `malloc(size)` and return it with
`free(ptr)`.

Unlike the stack, the heap is not a single contiguous array you index. It is a
pool the runtime allocator carves into variable-sized blocks on demand.
`malloc` finds or creates a block of at least `size` bytes and hands you a
pointer to its start; `free` returns that block to the allocator's bookkeeping
so it can be handed out again.

## Mental model
Think of the heap as a shared whiteboard and the allocator as its keeper.

- `malloc(size)` is you asking the keeper for a box of at least `size` squares.
  The keeper finds free space, draws a box, and gives you the box's address.
  The box still holds whatever was scribbled there before.
- `free(ptr)` is you telling the keeper "I'm done with this box." The keeper
  does **not** erase the scribbles and does **not** take the box off the wall.
  They just tick it as available on their ledger so a later `malloc` can reuse
  it.
- A **dangling pointer** is your own note that still points at a box the keeper
  has reclaimed. Reading it shows either the old scribbles or someone else's
  new ones.
- A **double free** is telling the keeper twice that the same box is free.
  Their ledger now lists one physical box twice, so they may give the same
  squares to two different requesters.
- A **leak** is a box you took, then lost your note to, so neither you nor the
  keeper can ever reuse it.

## How it works
The allocator stores bookkeeping *in the same memory it hands out*. Immediately
before the pointer `malloc` returns sits a small **chunk header** recording the
block's size and whether it is free. `free(ptr)` walks back from `ptr` to that
header, flips the free bit, and (in most implementations) may coalesce the
block with neighboring free blocks to fight fragmentation.

Crucially: `free` does not zero the bytes you used, and it does not change the
value of `ptr` in your code. The data may remain readable for a while, and
`ptr` still holds the old address. That is exactly why use-after-free and
double-free are silent until much later.

## Worked example 1 — use-after-free

Save as `heap_bugs.c`:

```c
#include <stdio.h>
#include <stdlib.h>

void trigger_use_after_free(void) {
    int *ptr = malloc(sizeof(int));
    if (ptr == NULL) return;
    *ptr = 42;
    free(ptr);
    /* ptr is now dangling. The memory may still read 42, or it may hold
       data from a later allocation that reused the block. */
    printf("Dangling pointer value: %d\n", *ptr);
}
```

Compile with AddressSanitizer to catch the bad read:

```bash
gcc -fsanitize=address -g -o heap_bugs heap_bugs.c && ./heap_bugs
```

ASan intercepts the read through `ptr` after `free` and prints where the block
was allocated and freed.

## Worked example 2 — leak and double free

```c
void trigger_leak(void) {
    int *ptr = malloc(100 * sizeof(int));
    if (ptr == NULL) return;
    /* ptr goes out of scope without free(ptr). Those 400 bytes are lost. */
}

void trigger_double_free(void) {
    int *ptr = malloc(sizeof(int));
    free(ptr);
    free(ptr);   /* same pointer freed twice: corrupts the free list */
}
```

A leak shrinks the available pool until allocation fails; a double free
corrupts allocator metadata and often leads to a crash or, worse, an
attacker-controlled write.

## Pitfalls
- **`free` does not null your pointer.** `ptr` keeps pointing at reclaimed
  memory. Set `ptr = NULL;` after freeing if it stays in scope.
- **Freeing a pointer you didn't get from `malloc`** (or freeing twice)
  corrupts metadata. Match every `free` to exactly one `malloc`.
- **Reading after free looks like it works.** The old value may still be
  there, so bugs pass local tests and explode in production.
- **Losing the only pointer to a block is a permanent leak.** There is no
  garbage collector to rescue you.

## Why it matters
These three failure modes — use-after-free, double-free, leak — are the
majority of real-world C/C++ memory bugs and a large share of CVEs.
Understanding *why* the allocator behaves this way (bookkeeping in-band, no
auto-zero, no auto-null) is what lets you spot them by reading code, not just
by waiting for a crash.

## Connections
- Builds on [[memory/lessons/0001-stack-frames.md]] (stack lifetime is automatic; heap is not).
- Sets up [[memory/lessons/0004-allocators.md]] (how `malloc`/`free` find and reuse blocks).

## Summary
The heap is manually managed memory. `malloc` lends you a block; `free` returns
it to the allocator's ledger without erasing data or nulling your pointer. That
design is what makes use-after-free, double-free, and leaks possible — and
detectable with AddressSanitizer.

## Retrieval practice
Q: What happens to the heap allocator when you call `free` twice on the exact
same pointer?

A: The allocator tries to register the same block as free twice. Because its
bookkeeping lives in-band with the data, this corrupts the free list / chunk
headers, which can crash the program or let an attacker overwrite metadata on
later allocations.

## References
- *glibc Manual: Unconstrained Allocation* — `malloc`/`free` semantics.
- *AddressSanitizer* — runtime detector for use-after-free, leaks, double-free.
```
