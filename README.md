# Go access my portfolio page!

[https://hiro0118.github.io/](https://hiro0118.github.io/)

# How to deploy

Run `npm run deploy`

# Dev Container

This repo includes a dev container configuration (`.devcontainer/devcontainer.json`) for a consistent development environment.

## Base image

`mcr.microsoft.com/devcontainers/base:ubuntu`

## Features

- **Node.js 22** (`ghcr.io/devcontainers/features/node:1`)
- **Docker-in-Docker** (`ghcr.io/devcontainers/features/docker-in-docker:2`)

## Post-create setup

On container creation, the following is automatically configured:

- `direnv` installed and hooked into bash
- `/workspaces` whitelisted in direnv config
- `npm install` run for project dependencies
- `@anthropic-ai/claude-code` installed globally

## Environment variables

| Variable            | Source                                     |
| ------------------- | ------------------------------------------ |
| `ANTHROPIC_API_KEY` | `ANTHROPIC_API_KEY` from local environment |

## Forwarded ports

| Port | Label      | Behavior                    |
| ---- | ---------- | --------------------------- |
| 3000 | Dev Server | Opens browser automatically |

## VS Code extensions

- `anthropic.claude-code`
- `esbenp.prettier-vscode`
- `dsznajder.es7-react-js-snippets`
- `ms-vscode.vscode-typescript-next`

## VS Code settings

- Default formatter: Prettier
- Format on save: enabled

# TO DO LIST

- cheat sheet page
- dev notes page
- light-dark theme switch
