#!/bin/bash
# Usage: git-branch.sh <branch-name>
# Creates and checks out a new branch from origin/master.
git fetch origin
git checkout -b "$1" origin/master
