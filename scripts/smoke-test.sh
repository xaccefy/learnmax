#!/usr/bin/env bash
# Smoke-test the artifact validator against a freshly built valid workspace.
# Run by the release CI; also handy locally: bash scripts/smoke-test.sh
set -euo pipefail

WS=$(mktemp -d)
mkdir -p "$WS/lessons" "$WS/review"

cat > "$WS/MISSION.md" <<'EOF'
# Mission: sample
## Why
demo.
## Success looks like
- demo.
## Constraints
- none.
EOF

cat > "$WS/GLOSSARY.md" <<'EOF'
# Sample Glossary
## Terms
**Term** (defined in [[lessons/0001-example.md]]):
A thing. _Avoid_: alias.
EOF

cat > "$WS/lessons/0001-example.md" <<'EOF'
# 0001 - Example
**Mission tie-in:** demo.

## The idea
It is a thing.

## Mental model
Like a box.

## How it works
Internals here.

## Worked example
```c
int x = 1;
```

## Pitfalls
- Trap one.

## Why it matters
Because.

## Summary
Short restate.

## Retrieval practice
Q: What is it?
A: A thing.

## References
- Source.
EOF

cat > "$WS/review/2024-01-01.md" <<'EOF'
# Review: 2024-01-01
## Results
- Term: known
## Weak Items
- Term (from GLOSSARY.md)
EOF

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
( cd "$WS" && node "$SCRIPT_DIR/validate-artifacts.mjs" )

echo "Validator passes on a valid workspace"
