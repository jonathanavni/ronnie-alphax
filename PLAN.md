# PLAN.md — Wayfinder (working title), a travel companion for older travellers

> "I am revolutionizing senior travel by building an all-in-one, easy-to-use travel platform that organises every aspect of a trip while providing personalized accessibility recommendations, travel support, and family collaboration, with the ambition of empowering millions of seniors worldwide to travel confidently and independently." — Ronnie

## Current State (2026-11-07)

**Scaffolding done.** The app runs (`npm run dev`) as a phone-width web app. It has the design system for older users (big text, high contrast, big buttons, a text size setting), a bottom tab bar with labels, Back and Help on every screen, a working scripted chat (reply buttons, typing, read-aloud), and first versions of every screen with sample data. Unfinished screens show a yellow dashed **"To build"** box listing what's left.

**Live:** https://jonathanavni.github.io/ronnie-alphax/ (auto-deploys on push to `main`). Shared with Ronnie for her review.

**Next up:** collect Ronnie's improvement list, then Milestone 1 below.

## 1. Goal of the prototype

Show the idea to **older adults** (and their families) and learn:
1. Do they *want* this? Which parts matter most: planning, in-trip help, or family?
2. Is chatting with an AI concierge comfortable and trustworthy for them?
3. Is it easy to use? (Each usability problem found counts as a win.)

It's a **clickable demo with a believable story** (Margaret, 74, going to Lisbon), not a real app. Everything is sample data.

### In scope
- **Trip planning built around personal needs:** profile → chat with concierge → personalised plan with "why this suits you" notes
- **Help during the trip:** "Today" (what's next and how to get there), reminders, in-trip chat, Help/SOS
- **Family collaboration** (lightweight): who can see what, plus what the family member sees

### Out of scope
Sign up and login, payments, real booking, real maps/GPS, real AI, notifications, post-trip, offline, native app.

## 2. Key decisions

| Decision | Why |
|---|---|
| **Mobile web app, shown as a phone on laptops** | Testers can open a link on their own phone. Nothing to install. |
| **Scripted concierge ("Wizard of Oz"), not a real AI** | Works the same way in every session, needs no API keys or costs, can't say anything wrong or unsafe, and lets us test *the idea* of an AI concierge. Typing or speaking always moves to the next scripted step, so the demo never gets stuck. A real AI can come later (see §8). |
| **One persona, one trip (Margaret → Lisbon)** | A concrete story is easier to react to than an abstract app. Lisbon is hilly, which shows clearly why personalised accessibility advice matters. |
| **Same stack as the chess tutor:** Vite + React + TypeScript, plain CSS, hash router, content in `src/data/` | Simple, fast, free static hosting, proven. No backend. |
| **Design rules from research** → [`docs/ux-guidelines.md`](docs/ux-guidelines.md) | The users are older adults, so accessibility is the core of the product. |

## 3. App map

```
Bottom tabs:  Home · Plan · My trip · Help            (+ Help button top-right on every screen)

Home ─┬─ Today in Lisbon      → #/today    (in-trip assistance)
      ├─ Plan a new trip      → #/plan     (concierge chat)
      ├─ My trip to Lisbon    → #/trip     (day-by-day plan)
      ├─ Family               → #/family
      └─ About me             → #/profile  → Text size (#/settings)
Help ─── Call family · Real person · Take me to my hotel · Emergency 112
#/demo ─ presenter shortcuts to every flow (for Ronnie, not testers)
```

## 4. The flows in detail

### Flow A — "About me" (personal needs)
- First-time setup asks **one question per screen**, with big answer cards and "Question 2 of 6":
  1. Who's travelling? (alone / partner / family / friend)
  2. Walking: "How far can you walk comfortably?" (a few minutes / about 15 min / 30 min or more / I use a wheelchair)
  3. Health: medication that needs a fridge or set times, diet, oxygen, etc.
  4. Hearing and sight
  5. Pace: "How busy should a day be?"
  6. Family helper: "Would you like someone to help you plan?"
- Back and Skip on every step. At the end: a summary card, "Here's what I'll remember about you".
- **Screens to build:** `Setup.tsx` (the step flow) and the existing `Profile.tsx` (summary).

### Flow B — Plan a trip with the concierge
- Already scripted in `src/data/scripts.ts` (`PLAN_TRIP`): greeting that shows it knows your needs → destination suggestion card with "why it suits you" → pace → plan summary → share with family.
- To add: a "Tell me more about the hotel" branch (photos, lift, step-free entrance, *source + date checked*), "Show me another place", and a "Talk to a real person" reply.
- The plan then appears in **My trip**, where every item carries an accessibility note (the ♿ line).

### Flow C — During the trip ("Today")
- **Next up** card: time, place, numbered step-by-step directions ("Your taxi is a blue car, plate AB-12-CD").
- **Reminders**: medication, "leave in 10 minutes", rest after lunch.
- **In-trip chat scripts** (new scripts in `scripts.ts`):
  - "I'm tired" → a nearby café with seating, or "go back to the hotel?"
  - "Where's a toilet?" → nearest accessible toilet, 2 minutes away
  - "I'm lost" → the hotel address card in Portuguese to show a taxi driver, plus "Call Sarah"
  - "Change today's plan" → move the activity to tomorrow, confirm
- **Show the driver** screen: full-screen hotel address in the local language, huge text.

### Flow D — Help (always one tap away)
- Call family / talk to a real person / take me to my hotel / emergency 112 (kept visually separate).
- Each option opens a **calm confirmation screen** ("Calling Sarah…" with a big Cancel).

### Flow E — Family
- The traveller's view: who sees the plan and location, with On/Off switches that use **words**, not just colour.
- **The family member's view** (one mock screen of what Sarah sees): Mum's plan, "Mum arrived at the hotel ✓", Sarah suggests "Book a taxi for Wed?" and Mum approves.

## 5. Milestones

Each milestone ends with a click-through on a phone and `npm run build` passing.

### Milestone 0 — Scaffolding ✅
- [x] Project setup, design system, app shell (tabs, Back, Help), router
- [x] Scripted chat engine + read-aloud + one planning script
- [x] First versions of every screen with sample data, presenter `#/demo` page
- [x] UX guidelines, feedback-session guide

### Milestone 1 — Planning flow complete
- [ ] Pick the app name and the concierge's name (put both in `src/data/strings.ts`)
- [ ] Adjust the persona and trip in `src/data/sample.ts` to suit the people you'll test with
- [ ] Build `Setup.tsx`: the first-time "About me" questions (Flow A)
- [ ] Extend the `PLAN_TRIP` script: hotel details, "another place", "talk to a person"
- [ ] Trip item details: tap an item → details + "Ask about this"
- [ ] Home: first-time vs returning (show Setup if no profile)

### Milestone 2 — In-trip help complete
- [ ] In-trip chat scripts (tired / toilet / lost / change plan) + reply chips on Today
- [ ] "Show the driver" full-screen address card
- [ ] Help: confirmation screens for each option
- [ ] Fake reminder banner ("Insulin in 15 minutes") triggered from `#/demo`

### Milestone 3 — Family + polish
- [ ] Family: On/Off switches, invite, the family member's view mock
- [ ] Mic button: fake "Listening…" state that fills in a sample sentence
- [ ] Run the screen checklist from `docs/ux-guidelines.md` on every screen, at the largest text size and at 320px wide
- [ ] Remove all "To build" boxes; deploy (GitHub Pages or Vercel) so testers can open a link

### Milestone 4 — Feedback
- [ ] 1–2 practice runs (a family member), fix whatever confuses them
- [ ] 5–8 sessions with older adults, following [`docs/feedback-sessions.md`](docs/feedback-sessions.md)
- [ ] Log every session in `docs/feedback-log.md`
- [ ] Summarise: top findings, quotes, what to change. Update this plan → material for the school presentation

## 6. Design approach (summary — full rules in `docs/ux-guidelines.md`)

- **Calm, warm, high contrast:** cream background, deep blue for actions, amber accents, red only for Help. Every text colour pair is at least 7:1.
- **Big:** 18px body text (3 text sizes), 50–58px buttons, a lot of space between them.
- **Obvious:** 4 labelled tabs, a labelled Back button, Help always top-right, whole cards tappable, nothing hidden behind gestures.
- **Readable font:** Atkinson Hyperlegible Next, designed for low vision.
- **Respectful words:** plain, adult, warm, never "senior", never baby-talk.
- **The chat suggests, the person decides:** reply buttons first, read-aloud on every message, clear "nothing is booked yet".

## 7. Open questions (for Ronnie)

- App name and concierge name / personality? (Keeping "Wayfinder" for now.)
- Who will the testers be, and roughly how old? (Keeping Margaret for now; adjust after Ronnie's review.)
- Does the school presentation need slides or a short video of the flows? (A screen recording of `#/demo` works well.)

## 8. Later (after feedback, only if wanted)

- **Real AI concierge:** swap the script for Claude (e.g. `claude-haiku-5-5` for speed) via a tiny serverless function that keeps the API key secret. Keep the reply buttons, let the AI choose them, and keep the profile in the system prompt. Only worth it if the scripted version tests well.
- Real speech input (the browser's Web Speech API), offline trip card.

## Decisions Log

- **2026-11-07 — Stack copied from the chess tutor** (Vite + React 19 + TS, plain CSS tokens, hash router, `localStorage`, GitHub Pages workflow, `/start` `/wrapup` `/review` commands).
- **2026-11-07 — Scripted concierge, no real AI** for the prototype (reliable demos, no keys, safe). Typing or speaking follows the first reply button.
- **2026-11-07 — Phone-width layout everywhere**; on laptops it shows as a rounded "phone" in the middle of the screen.
- **2026-11-07 — Text sizes 18/21/24px via a class on `<html>`**; all CSS in `rem`. Pinch-zoom is never disabled.
- **2026-11-07 — Font: Atkinson Hyperlegible Next** (bundled via @fontsource, so no third-party requests).
- **2026-11-07 — Icons: lucide-react**, always shown with a text label.
- **2026-11-07 — Persona Margaret (74) → Lisbon**, the hills show off the accessibility advice. Easy to change in `src/data/sample.ts`. Kept, along with the "Wayfinder" placeholder name, until Ronnie's review.
- **2026-11-07 — English only.** No Hebrew/RTL (Jonathan's call).
- **2026-11-07 — Hosting: GitHub Pages** (repo `jonathanavni/ronnie-alphax`, public, because Pages on a free account needs a public repo). Auto-deploys on push to `main`, same workflow as the chess tutor.
