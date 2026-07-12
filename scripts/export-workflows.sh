#!/bin/sh

set -euo pipefail

DESTINATION="/files/workflows/development"

mkdir -p "${DESTINATION}"

n8n export:workflow \
  --backup \
  --output="${DESTINATION}"

echo "Workflows exportados en ${DESTINATION}"