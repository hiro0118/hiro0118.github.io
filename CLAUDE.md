# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Start dev server
npm test           # Run tests
npm run build      # Production build
npm run deploy     # Build and deploy to GitHub Pages (gh-pages -d build)
```

## Environment

All environment and tooling changes (installing packages, global tools, VS Code extensions, etc.) must go into `.devcontainer/devcontainer.json`. Do not run `npm install` or any install commands directly in the shell or devcontainer terminal.

## Architecture

This is a personal portfolio SPA built with Create React App, TypeScript, and Material-UI v5, hosted on GitHub Pages.

**Routing:** Uses `HashRouter` (not `BrowserRouter`) — required for GitHub Pages static hosting. All routes are hash-based (`/#/page`).

**Theme:** Light/dark mode managed via React Context in `PageThemeProvider`. The toggle lives in `MenuBar`.

**Navigation shell:** `MenuBar` wraps all pages — it renders the AppBar, side drawer, and `PageRouter`. To add a new page, register it in `src/pages/Pages.tsx` (the page registry) and add a route in `PageRouter.tsx`.

**Tennis Courts page** (`src/pages/tokyo-sports-page/`) is the main feature:
- Loads a ~3.8MB static JSON file (`application_data.json`) embedded in the bundle
- Filters by date, time, and park using `Set<string>` selections stored in component state
- `FilterAccordion` handles each filter category; filters are applied on button click, not live
- Favorites are tracked as a `Set` in component state (not persisted)
- `SortableTable` renders filtered results with column sorting

**State management:** Component-local `useState` only — no Redux or global state beyond the theme context.
