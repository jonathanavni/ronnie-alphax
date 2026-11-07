# CLAUDE.md — Wayfinder (Ronnie's AlphaX project)

## Project

A **clickable prototype** of a travel companion app for older travellers (65+), built by Ronnie for a school project. It shows two things: **trip planning built around personal needs** (via a chat "concierge") and **help during the trip**, plus light family collaboration. It will be shown to older adults to get feedback on the idea. It is a mobile web app, not a native app, and all data is fake.

## Core principles

- **Prototype, not product.** No backend, no auth, no payments, no real booking, no real AI. Content lives in `src/data/`. Don't add server pieces; if something seems to need one, fake it and say so.
- **Accessibility for older users is the product.** Follow [`docs/ux-guidelines.md`](docs/ux-guidelines.md) and run its checklist on every screen you touch. In short: text at least 18px, nothing below 16px; tappable things at least 50px with 12px gaps; contrast at least 7:1; every icon labelled; Back and Help visible; no gesture-only actions; plain, respectful wording.
- **This is Ronnie's project.** Explain what you change in plain words, keep the code readable for a student, and prefer small steps she can follow. Ask before big redesigns.
- **Simplicity first.** Prefer the obvious, boring solution. No CSS framework, no state library, no new dependencies without a reason.
- **Verify in the browser.** `npm run build` must pass. Then click through the changed flow at phone width (375px), and at the largest text size, before calling anything done.

## Tech stack

| Component | Choice |
|---|---|
| Framework | React 19 + TypeScript, Vite |
| Styling | Plain CSS in `src/styles.css`, design tokens as CSS variables, all sizes in `rem` |
| Icons | `lucide-react` (always paired with a text label) |
| Font | Atkinson Hyperlegible Next (bundled via @fontsource) |
| Routing | Hash router `src/lib/router.ts` (`#/plan`, `#/trip` …), so every screen is a link |
| Chat | Scripted conversations in `src/data/scripts.ts`, played by `src/lib/useScript.ts` |
| Hosting | GitHub Pages (`.github/workflows/deploy.yml`) or Vercel. Static `dist/` |

## Layout

```
src/
  data/types.ts       Traveller / Trip / Script types
  data/sample.ts      the persona (Margaret, 74) and her Lisbon trip
  data/scripts.ts     concierge conversations (steps → messages, card, reply buttons)
  data/strings.ts     app name + UI strings (one place, easy to review)
  lib/router.ts       hash router + list of pages
  lib/settings.ts     text size (normal / large / xlarge) in localStorage
  lib/speech.ts       read-aloud via the browser's speechSynthesis
  lib/useScript.ts    plays a script: paced messages, replies, typed input → first reply
  components/Shell.tsx   top bar (Back / Help) + bottom tab bar
  components/Chat.tsx    chat thread, reply buttons, composer, read-aloud
  components/ui.tsx      ScreenTitle, ActionCard, Todo
  screens/*.tsx       one file per screen (Home, Profile, Plan, Trip, Today, Help, Family, Settings, Demo)
docs/ux-guidelines.md     design rules from research + per-screen checklist
docs/feedback-sessions.md how to run test sessions with older adults
docs/feedback-log.md      notes from each session
```

## How to…

- **Add a screen:** create `src/screens/X.tsx`, add its name to `PAGES` in `router.ts` and to `SCREENS` in `App.tsx`, and add it to the list in `screens/Demo.tsx`.
- **Add a conversation:** add a `Script` in `src/data/scripts.ts`. Keep each message to 3 lines or fewer, one question at a time, 2–4 replies. Typed input always follows the first reply.
- **Change the story:** edit `src/data/sample.ts`.

## Commands

- `npm run dev`: dev server, also reachable from a phone on the same Wi‑Fi (it uses `--host`)
- `npm run build`: typecheck + production build
- `npm run lint`: oxlint
- `/start`, `/wrapup`, `/review`: session workflow (`.claude/commands/`)

## Safety

- No real personal data, no analytics, no third-party scripts. Phone numbers and addresses in sample data are fake.
- Deploying or publishing needs the user's approval.

## Project state

**`PLAN.md`** holds the current state, milestones and decisions log. Read it at the start of a session and update it at the end.
