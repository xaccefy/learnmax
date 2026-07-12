# learnmax

A combined teaching system that runs the full learning loop: **research → diagnose → build → review**. It fuses Socratic diagnosis (find your unknown unknowns) with curriculum building (produce lessons you retain) and adds a spaced-retrieval review that verifies retention and feeds weak spots back into the loop.

Two source lineages inform this system:

- **Diagnosis half** — inspired by `teach-me` (DuskyElf): Socratic grilling, tension-aware literature review, fuzzy-language interrupts, cross-session diary.
- **Building half** — inspired by Matt Pocock's `/learn`: stateful workspace, Mission, ZPD sequencing, lessons + glossary, learning records as ADRs, storage-strength over fluency.

## Language

**Subject**:
The folder name under `literature/`, `diary/`, `gaps/`, `lessons/`, `review/` where a topic's sessions and artifacts live. Auto-detected from keywords; user can override. Flat, no nesting.
_Avoid_: category, domain, bucket

**Starting Point**:
The user's verbatim input at session start — a question, topic request, or paper reference. Preserved exactly.
_Avoid_: prompt

**Topic**:
A distinct area of learning. Has zero or more **Tensions** and one or more **Branches**. Listed with a checkbox and current **Level**.
_Avoid_: concept (too vague), chapter (implies rigid order)

**Branch**:
A split in the topic tree into accepted sub-topics or methods. Not contested — both sides valid.
_Avoid_: fork, split

**Tension**:
A contested point where researchers actively disagree and no consensus exists. Lives *under* branches. Test: would researchers publish papers for each side?
_Avoid_: debate, disagreement, surface split

**Pitfall**:
A recurring misunderstanding or weak habit learners make when interpreting evidence. Not a tension — a mistake, not a real disagreement.
_Avoid_: gotcha, trap

**Level**:
The tutor's assessment of understanding, gauged by **tension handling**, not recall:
| Level | Definition |
|-------|------------|
| **Unknown** | Has not encountered the topic |
| **Confused** | Heard of it, but fuzzy or copied |
| **Aware** | Explains in own words, names the tension without choosing a side |
| **Confident** | Navigates the tension, notices own bias, responds to challenge |

**Literature Review**:
Research file from `/research`. Curated sources with consensus, tensions, gaps. Lives at `literature/<subject>/<subject>-review.md`. Seeds both diagnosis and building.
_Avoid_: research file

**Diary**:
Working map of a Socratic session (from `/quiz`): starting point, topics + levels, remarks, session state. Lives at `diary/<subject>/<file>.md`. Not a transcript.

**Gap Report** (the bridge):
Structured output of `/quiz` that feeds `/learn`. Per-topic levels, surfaced misconceptions, open tensions, and a **ZPD-priority order** telling `/learn` which gaps to build lessons around first. Lives at `gaps/<subject>/<topic>-gaps.md`.

**Mission**:
The *reason* the user is learning this — from Matt's `/learn`. Grounds every lesson and the ZPD. `MISSION.md` at workspace root.
_Avoid_: goal (too narrow)

**Lesson**:
A self-contained HTML file teaching one tightly-scoped thing, tied to the Mission, with a primary-source citation. The primary unit of building. `lessons/NNNN-<slug>.html`.

**Glossary**:
Canonical terminology for the workspace (`GLOSSARY.md`). Opinionated terms with `_Avoid:` aliases. Compresses language as understanding deepens.

**Learning Record**:
ADR-style capture of demonstrated understanding, corrected misconceptions, or mission shifts (`learning-records/NNNN-<slug>.md`). Drives the ZPD.

**ZPD (Zone of Proximal Development)**:
The next lesson should challenge the user *just enough* — computed from Learning Records + Mission + Gap Report. Never re-teach the established; never leap past.

**Storage strength vs Fluency**:
Target is **long-term retention** (storage strength), not in-the-moment recall that feels like mastery (fluency). Built via desirable difficulty: retrieval practice, spacing, interleaving.

**Review**:
Spaced-retrieval session (`/test`) over Glossary + Lessons. Quizzes with same-length answers, tracks recall per item, applies spacing + interleaving, and feeds weak items back as new gaps.

**Spacing / Interleaving**:
- **Spacing** — distribute retrieval practice over time; revisit an item after an interval, not all at once.
- **Interleaving** — mix related topics in one review rather than blocking one topic; strengthens discrimination.

## Modes (Socratic tutor)

| Mode | When |
|------|------|
| **Socratic** | Default. Question, never answer directly. |
| **Curious Guide** | User stuck/overloaded. Softer, one reframe. |
| **Devil's Advocate** | User overconfident. Challenge, surface weaknesses. |

Announce mode changes explicitly.