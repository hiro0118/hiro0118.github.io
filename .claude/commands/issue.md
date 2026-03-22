# Issue Workflow

This skill manages the full lifecycle of a GitHub issue: from filing to implementation to PR.

## Step 1 — Identify or create the issue

If `$ARGUMENTS` is a number, fetch that issue:

```
gh issue view $ARGUMENTS
```

If `$ARGUMENTS` is a description (not a number), search open issues for a match:

```
gh issue list --state open --limit 50
```

Pick the best match and confirm with the user. If no good match exists, offer to create a new issue.

**When creating a new issue**, determine an appropriate label from the repo's existing labels:

```
gh label list
```

Then create the issue with a clear title, body, and label:

```
gh issue create --title "..." --body "..." --label "..."
```

Confirm the issue URL with the user before proceeding.

## Step 2 — Understand and plan

Read the issue thoroughly. Read all relevant source files in the repo to understand the current code. Do NOT make any changes yet.

Draft an implementation plan with:

- What will change and why
- Which files will be touched
- Any edge cases or risks

Ask the user clarifying questions if anything is ambiguous. Wait for answers before finalising the plan.

Present the plan clearly and ask: **"Does this plan look good? Any changes?"**

Do not proceed until the user explicitly approves (e.g. "looks good", "approved", "yes").

## Step 3 — Branch

Once the plan is approved, create a new branch from the main branch. Use a short kebab-case name derived from the issue:

```
git fetch origin
git checkout -b feature/<short-description> origin/master
```

## Step 4 — Implement

Make all code changes autonomously based on the approved plan. Constraints:

- Changes to repo source files only
- No shell commands that install packages, call external APIs, or have destructive effects
- Follow existing code conventions (TypeScript, Material-UI, HashRouter — see CLAUDE.md)

## Step 5 — Commit and push

Stage only the files you changed (do not use `git add -A`). Write a clear commit message. Push and create a PR to `master`:

```
gh pr create --title "..." --body "..." --base master
```

PR body: one Summary section with bullet points. No test plan. No "Generated with Claude Code" footer.

Return the PR URL to the user.

## Step 6 — Address PR review comments

When the user asks to handle PR comments, fetch them:

```
gh pr view <number> --comments
gh api repos/{owner}/{repo}/pulls/<number>/comments
```

For each comment:

1. Understand what change is requested
2. Make the code change
3. Commit and push
4. Reply to the comment thread with the commit SHA:

```
gh api repos/{owner}/{repo}/pulls/comments/<comment_id>/replies \
  -f body="Fixed in <commit-sha>"
```

## Step 7 — Merge (optional)

If the user asks Claude to merge, confirm first, then:

```
gh pr merge <number> --squash --delete-branch
```

Otherwise, remind the user the PR is ready for their review and merge.
