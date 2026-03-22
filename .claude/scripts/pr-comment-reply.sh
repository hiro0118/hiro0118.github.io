#!/bin/bash
# Usage: pr-comment-reply.sh <comment-id> "<reply-body>"
gh api repos/{owner}/{repo}/pulls/comments/"$1"/replies -f body="$2"
