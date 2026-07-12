#!/bin/sh

set -euo pipefail

SOURCE="/files/workflows/development"

if [ ! -d "${SOURCE}" ]; then
  echo "No existe el directorio ${SOURCE}"
  exit 1
fi

n8n import:workflow \
  --separate \
  --input="${SOURCE}"

echo "Workflows importados desde ${SOURCE}"