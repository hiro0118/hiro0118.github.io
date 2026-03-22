#!/bin/bash
# Usage: git-commit-push.sh "commit message" file1 file2 ...
# First arg is the commit message, remaining args are files to stage.
message="$1"
shift
git add "$@"
git commit -m "$message"
git push
