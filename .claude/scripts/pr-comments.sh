#!/bin/bash
# Usage: pr-comments.sh <pr-number>
# Fetches inline review comments on a PR.
gh api repos/{owner}/{repo}/pulls/"$1"/comments
