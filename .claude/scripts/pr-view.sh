#!/bin/bash
# Usage: pr-view.sh <pr-number>
gh pr view "$1" --comments
