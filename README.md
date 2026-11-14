# 🧭 North Star — travel companion prototype

A school project by Ronnie: a prototype app that helps older travellers **plan trips around their personal needs** and **get help during the trip**, with an AI travel assistant and family support.

**Try it:** https://jonathanavni.github.io/ronnie-alphax/ (best on a phone · all flows: [`#/demo`](https://jonathanavni.github.io/ronnie-alphax/#/demo))

> This is a clickable prototype for gathering feedback. Nothing is booked and all data is sample data.

## Run it

```bash
npm install
npm run dev
```

Open the link it prints. To try it on your phone, use the "Network" address while the phone is on the same Wi‑Fi. Go to `/#/demo` for a list of all the flows.

```bash
npm run build     # typecheck + production build into dist/
npm run preview   # serve the built version
```

## What's inside

- **Plan:** chat with the travel assistant, which already knows your needs
- **My trip:** a day-by-day plan; each item says why it suits you
- **Today:** what's next and how to get there, step by step
- **Help:** call family, a real person, get back to the hotel, emergency
- **Family:** who can see your plan and where you are

## Docs

- [`PLAN.md`](PLAN.md): the plan, milestones and decisions
- [`docs/ux-guidelines.md`](docs/ux-guidelines.md): how to design for older users (research + checklist)
- [`docs/feedback-sessions.md`](docs/feedback-sessions.md): how to run feedback sessions

## Deploy

Every push to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`).

## Stack

React + TypeScript + Vite · plain CSS · lucide icons · Atkinson Hyperlegible font.
