#!/usr/bin/env bash
# Runs a command against a temporary `next start` server, then stops it.
# Usage: scripts/with-server.sh node scripts/screenshots.mjs
set -euo pipefail
PORT="${PORT:-3000}"
npx next start -p "$PORT" > .artifacts/server.log 2>&1 &
PID=$!
trap 'kill $PID 2>/dev/null || true' EXIT
for _ in $(seq 1 40); do
  if curl -s -o /dev/null "http://localhost:$PORT"; then break; fi
  sleep 0.5
done
"$@"
