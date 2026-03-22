#!/bin/bash
# Usage: issue-edit.sh <issue-number> [--title "..."] [--body "..."] [--add-label "..."]
gh issue edit "$@"
