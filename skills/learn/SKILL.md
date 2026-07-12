---
name: learn
description: Build a stateful teaching workspace that produces lessons, a glossary, and learning records for a topic — sequenced to the user's Zone of Proximal Development for long-term retention. Consumes a Gap Report from /quiz and tensions from /research so lessons target real gaps.
argument-hint: "[topic] <@gaps-file> <@literature-review-file>"
---

# teach

Turn the current directory into a standing teaching workspace and teach one topic across many sessions — devising short, beautiful, interactive lessons tied to *why* the user is learning. This is the **building** stage of learnmax.

Unlike a flat explainer, you build **durable artifacts** the user returns to, and you sequence them to the **ZPD** so each lesson challenges *just enough*.

Read `CONTEXT.md` for the domain language (Mission, Lesson, Glossary, Learning Record, ZPD, Storage strength). This skill is inspired by Matt Pocock's `/learn`.

## Inputs (the fusion)

If the user passed references, load them *first* — they make lessons target real gaps instead of guessing:

- **`@gaps/...`** (from `/quiz`) — per-topic Levels, surfaced misconceptions, open tensions, and a **ZPD-priority order**. Build lessons in that order; a `Confused` topic comes before an `Aware` one.
- **`@literature/...`** (from `/research`) — cite these sources in lessons; build lessons *around the tensions* the review mapped, not just settled facts.

If no inputs, interview for the Mission first (below), then proceed.

## Workspace files

| File | Role |
|------|------|
| `MISSION.md` | Why the user is learning this — grounds every lesson |
| `RESOURCES.md` | Vetted, high-trust sources |
| `lessons/NNNN-<slug>.html` | Numbered, self-contained lessons (primary unit) |
| `reference/*.html` | Compressed cheat-sheets / glossaries |
| `learning-records/NNNN-<slug>.md` | ADR-style: demonstrated understanding |
| `assets/*` | Reusable components (shared stylesheet first) |
| `NOTES.md` | Teaching preferences |
| `GLOSSARY.md` | Canonical terminology |

Use the format specs co-located in this skill folder: MISSION-FORMAT.md, RESOURCES-FORMAT.md, LEARNING-RECORD-FORMAT.md, GLOSSARY-FORMAT.md.

## Process

1. **Pin the Mission.** If `MISSION.md` is empty/vague, interview until it isn't. Concrete over abstract ("Ship a Rust CLI" beats "learn Rust"). Revise as the user grows.
2. **Populate RESOURCES** from the literature review (and any user sources) before teaching. High-trust only; annotate every entry; surface `## Gaps`.
3. **Compute the ZPD.** Read `learning-records/` + Mission + the Gap Report's priority order. Pick the next lesson that challenges *just enough*.
   - If a Gap Report exists, its **ZPD-priority order** is the lesson sequence. A `Confused` branch → a clarification lesson first; an `Aware` branch with an open tension → a "hold the tension" lesson citing both sides.
4. **Produce one lesson.** A beautiful, self-contained HTML file (`NNNN-<slug>.html`), short enough for working memory, one tangible win, tied to the Mission, with anchor links and a **primary-source citation** (from RESOURCES / literature review). Try to open it for the user.
5. **Build from assets.** Lessons draw on `./assets/`; new reusable pieces go there, never inlined.
6. **Update Glossary + Learning Records** as understanding is demonstrated. A term only enters `GLOSSARY.md` once the user can use it correctly.

## Learning science (non-negotiable)

- **Storage strength > fluency.** Fluency (in-the-moment recall) feels like mastery but isn't. Build **long-term retention** via desirable difficulty.
- **Knowledge first, skills second — difficulty flips role.** For *acquiring* knowledge, difficulty is the enemy (eats working memory). For *drilling* skills, difficulty is the tool.
- **Tight feedback loops for skills.** Quizzes where every answer is the *same length* (no formatting clues); immediate/automatic feedback.
- **Spacing & interleaving** in review, not here — but *design* lessons so they're easy to quiz later (clear terms, checkable claims).

## When a Gap Report drives the lesson

For each gap-report entry, the lesson should:
- Name the misconception explicitly and *why* it's tempting (from diary remarks `[⚠ misunderstanding]`).
- Present the tension with both sides cited (from literature review).
- End with a retrieval-practice question, so `/test` has something to test.

## Close-out → hand to review

After producing lessons, tell the user:

```
/test [topic]
```

`/test` verifies the lessons worked and feeds weak items back as new gaps.

## Loop

`/quiz` → (Gap Report) → **`/learn`** → (lessons + glossary) → `/test` → (weak items) → new Gap Report → back here.
