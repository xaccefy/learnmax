#!/usr/bin/env bash
# Smoke-test the artifact validator against valid and invalid workspaces.
# Run by CI on every push; also handy locally: bash scripts/smoke-test.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VALIDATOR="$SCRIPT_DIR/validate-artifacts.mjs"

expect_pass() { # name dir
  if ( cd "$2" && node "$VALIDATOR" >/dev/null 2>&1 ); then
    echo "  ✓ $1 (passed as expected)"
  else
    echo "  ✗ $1 (expected pass, got fail)"; exit 1
  fi
}

expect_fail() { # name dir
  if ( cd "$2" && node "$VALIDATOR" >/dev/null 2>&1 ); then
    echo "  ✗ $1 (expected fail, got pass)"; exit 1
  else
    echo "  ✓ $1 (failed as expected)"
  fi
}

make_lesson() { # path number
  cat > "$1" <<EOF
# $2 - Example
**Mission tie-in:** demo.

## Struggle
Predict what this code does:
\`\`\`c
int x = 1;
\`\`\`

## The idea
It is a thing.

## Common mistakes
- Mistake one.

## Why it matters
Because.

## Summary
Short restate.

## Retrieval practice

Q: What is it?

<details>
<summary>Answer (write yours first)</summary>

A thing.

</details>

## Exercises
Open exercises/0001-example.md.

## References
- Source.
EOF
}

make_mission() { # path
  cat > "$1" <<'EOF'
# Mission: sample
## Why
demo.
## Success looks like
- demo.
## Constraints
- none.
EOF
}

make_glossary() { # path
  cat > "$1" <<'EOF'
# Sample Glossary
## Terms
**Term** (defined in [[demo/lessons/0001-example.md]]):
A thing. _Avoid_: alias.
EOF
}

# --- Case 1: valid multi-topic workspace ---
WS=$(mktemp -d)
mkdir -p "$WS/demo/lessons" "$WS/demo/literature" "$WS/second/lessons" "$WS/review"
cat > "$WS/TOPICS.md" <<'EOF'
# Topics

- Demo: demo/
- Second: second/
EOF
make_mission "$WS/demo/MISSION.md"
make_glossary "$WS/demo/GLOSSARY.md"
make_lesson "$WS/demo/lessons/0001-example.md" 0001
make_mission "$WS/second/MISSION.md"
make_lesson "$WS/second/lessons/0001-other.md" 0001
cat > "$WS/review/2024-01-01.md" <<'EOF'
# Review: 2024-01-01
## Results
- Term: known
## Weak Items
- Term (from demo/GLOSSARY.md)
EOF
cat > "$WS/review/weak-items.md" <<'EOF'
- Term (from demo/GLOSSARY.md) — last: 2024-01-01, streak: 0
EOF
expect_pass "valid multi-topic workspace" "$WS"

# --- Case 2: empty dir is not a workspace ---
EMPTY=$(mktemp -d)
expect_fail "empty dir" "$EMPTY"

# --- Case 3: lesson missing required sections ---
BAD=$(mktemp -d)
mkdir -p "$BAD/demo/lessons"
printf -- '- Demo: demo/\n' > "$BAD/TOPICS.md"
make_mission "$BAD/demo/MISSION.md"
printf '# 0001 - Example\n\n## The idea\nStub.\n' > "$BAD/demo/lessons/0001-example.md"
expect_fail "lesson missing sections" "$BAD"

# --- Case 4: topic dir with zero lessons ---
NOL=$(mktemp -d)
mkdir -p "$NOL/demo/lessons"
printf -- '- Demo: demo/\n' > "$NOL/TOPICS.md"
make_mission "$NOL/demo/MISSION.md"
expect_fail "topic with zero lessons" "$NOL"

# --- Case 5: glossary term without backlink ---
NOBL=$(mktemp -d)
mkdir -p "$NOBL/demo/lessons"
printf -- '- Demo: demo/\n' > "$NOBL/TOPICS.md"
make_mission "$NOBL/demo/MISSION.md"
make_lesson "$NOBL/demo/lessons/0001-example.md" 0001
printf '# Glossary\n## Terms\n\n**Term**:\nNo link.\n' > "$NOBL/demo/GLOSSARY.md"
expect_fail "glossary term without backlink" "$NOBL"

echo "All smoke tests passed"
