#!/bin/bash
# Usage: pr-create.sh --title "..." --body "..."
gh pr create "$@" --base master
