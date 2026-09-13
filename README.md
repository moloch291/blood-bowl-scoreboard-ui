# Blood Bowl Scoreboard

A browser-based Blood Bowl scoreboard built with React, TypeScript, and Vite.

The application provides a broadcast-style match experience with team selection, match controls, animated game events, and league standings.

## Features

- Main menu with match and league sections
- Team selection and match setup
- Blood Bowl 7s and 11s game modes
- Score, turn, reroll, half, and game-state controls
- Match intro and broadcast-style event overlays
- Touchdown, halftime, and final-score presentations
- League standings split between the Great Ocean Conference and Old World Conference
- Team wordmarks and conference branding
- League data loaded from the scoreboard backend API

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- REST API integration

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

## League API

The league page expects the backend API to be available through:

```text
/api/conferences
```

During local development, make sure the league backend is running alongside the frontend.

## Project Structure

```text
src/
├── api/          # Backend API access
├── assets/       # Team and league artwork
├── components/   # Scoreboard, league, menu, and overlays
├── data/         # Team definitions
├── layouts/      # Match layout
├── reducers/     # Match state logic
├── styles/       # Shared styles
├── types/        # TypeScript types
└── utils/        # Shared utilities
```

## Notes

This repository contains the scoreboard frontend. League standings are persisted and managed by the separate backend/database service.
