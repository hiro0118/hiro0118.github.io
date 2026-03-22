# Issue Workflow

This skill manages the full lifecycle of a GitHub issue: from filing to implementation to PR.

All git and GitHub operations use pre-defined scripts in `.claude/scripts/` which run without approval prompts. **Merging is the only exception — it always requires explicit user approval.**

---

## Step 1 — Identify or create the issue

If `$ARGUMENTS` is a number, fetch that issue:

```
.claude/scripts/issue-view.sh <number>
```

If `$ARGUMENTS` is a description (not a number), search open issues for a match:

```
.claude/scripts/issue-list.sh
```

Pick the best match and confirm with the user. If no good match exists, offer to create a new issue.

**When creating a new issue**, check existing labels first, then create with an appropriate one:

```
gh label list
.claude/scripts/issue-create.sh --title "..." --body "..." --label "..."
```

Confirm the issue URL with the user before proceeding.

---

## Step 2 — Understand and plan

Read the issue thoroughly. Read all relevant source files in the repo to understand the current code. Do NOT make any changes yet.

Draft an implementation plan with:

- What will change and why
- Which files will be touched
- Any edge cases or risks

Ask the user clarifying questions if anything is ambiguous. Wait for answers before finalising the plan.

Present the plan clearly and ask: **"Does this plan look good? Any changes?"**

Do not proceed until the user explicitly approves (e.g. "looks good", "approved", "yes").

---

## Step 3 — Branch

Once the plan is approved, create a new branch from master:

```
.claude/scripts/git-branch.sh feature/<short-description>
```

---

## Step 4 — Implement

Make all code changes autonomously based on the approved plan. Constraints:

- Changes to repo source files only
- No shell commands that install packages, call external APIs, or have destructive effects
- Follow existing code conventions (TypeScript, Material-UI, HashRouter — see CLAUDE.md)

---

## Step 5 — Self-review

Before committing, review all changes you made:

- **Consistency:** naming conventions, code style, and patterns match the surrounding codebase
- **Duplication:** no logic repeated that could be shared with existing code
- **Readability:** code is clear without requiring extra comments
- **Bugs:** logic is correct, edge cases are handled, no regressions introduced

Fix any issues found before proceeding.

---

## Step 6 — Commit and push

Stage and commit only the files you changed, then push:

```
.claude/scripts/git-commit-push.sh "<commit message>" file1 file2 ...
```

Create a PR using this format:

```
.claude/scripts/pr-create.sh --title "<short imperative title>" --body "$(cat <<'EOF'
## What
<1–3 sentences describing what changed and why>

## Changes
- <file or component>: <what changed>
- <file or component>: <what changed>

Closes #<issue-number>
EOF
)"
```

Return the PR URL to the user, then provide a concise summary of all changes made in the chat.

---

## Step 7 — Address PR review comments

When the user asks to handle PR comments, fetch them:

```
.claude/scripts/pr-view.sh <pr-number>
.claude/scripts/pr-comments.sh <pr-number>
```

For each comment:

1. Understand what change is requested
2. Make the code change
3. Commit and push:
   ```
   .claude/scripts/git-commit-push.sh "<message>" file1 file2 ...
   ```
4. Reply to the comment thread with the commit SHA:
   ```
   .claude/scripts/pr-comment-reply.sh <comment-id> "Fixed in <commit-sha>"
   ```

---

## Step 8 — Merge (optional)

**Never merge without explicit user approval.** Wait for the user to say "merge" or "go ahead and merge" before proceeding.

When approved:

```
gh pr merge <number> --squash --delete-branch
```
