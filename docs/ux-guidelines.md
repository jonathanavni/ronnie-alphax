# UX guidelines — designing for older travellers

The design rules for this prototype, taken from research (researched Nov 2026). Every screen should pass the **checklist** at the bottom.
**Confidence:** a rule that cites a standard (WCAG, Apple, Material) is solid. A rule marked *(judgement)* is a sensible choice that no study proves. The research on chatbots for older adults is mostly small studies from 2025–26.

## 1. Who we're designing for

Older adults (65+) are very different from each other. Many are confident online, but people over 80 struggle much more: in one 2026 voice-chatbot study, ease-of-use scores fell sharply with age. **Design for the less confident end of the range without being patronising.**

| Change with age | What it means for the design |
|---|---|
| **Vision:** lower contrast sensitivity, weaker colour perception, harder close-up focus | Big text, strong contrast, never use colour alone to carry meaning |
| **Hands:** less precise movement, tremor | Big tap targets with space between them, single taps only, no fiddly pickers or gestures |
| **Hearing:** high sounds fade, background noise makes speech hard to follow | Anything spoken also appears as text. No background music |
| **Memory and attention:** smaller short-term memory, easier to distract | One task per screen. Show where the person is. Never make them remember something from a previous screen |
| **Confidence:** fear of "breaking something" or being tricked; quick to drop apps that waste time or ask for too much data | Reassure, confirm, allow undo, ask only for what's needed, keep help always visible |

## 2. The numbers

| Rule | This prototype | Source / notes |
|---|---|---|
| Body text | **18px** (`--text`), text in chat bubbles and buttons 21px | HHS: at least 16px, about 19px for older readers. GOV.UK uses 19px. iOS default is 17pt |
| Headings | 30px h1, 23px h2 | |
| Smallest text | about 16px (`--text-sm`) | Never smaller |
| Line height | 1.5 | HHS 130–150%; WCAG 1.4.12 |
| Text size setting | 3 sizes (18 / 21 / 24px), everything in `rem` | WCAG 1.4.4: must work at 200% zoom. Pinch-zoom is never disabled |
| Contrast | **Every text colour pair is at least 7:1** (WCAG AAA). Borders are visible, never faint grey | WCAG 1.4.3 / 1.4.6 / 1.4.11 |
| Tap targets | **58px** main buttons and tabs, **50px** at the smallest | WCAG 2.5.8 needs only 24px and Apple/Material 44–48. Studies of older users suggest about 11.4mm or more, which is roughly 48px or more on a phone |
| Space between targets | at least 12px (`--gap`) | Research range: 3–13mm |
| Choices per screen | **3–5 main options** | *(judgement)*. Guidance favours broad, shallow navigation |
| Timeouts | None | WCAG 2.2.1 |
| Layout | Works at 320px wide with no sideways scrolling | WCAG 1.4.10 |
| Motion | Gentle fades only; turned off when the phone's "reduce motion" setting is on | |

## 3. Navigation & interaction

**Do**
- Use a **bottom tab bar with words under the icons**: Home · Plan · My trip · Help. Keep it to 4 tabs.
- Show a **"Back" button with the word "Back"** on every screen that isn't a tab.
- Keep the **Help button in the same place on every screen** (WCAG 3.2.6 Consistent Help).
- Use **single taps**. Every action has a visible button.
- Make **whole cards tappable**, not just the small text inside them.
- In multi-step flows, show progress ("Question 2 of 6") and keep Back and Skip available.
- **Confirm before anything that matters** ("Call Sarah?" with a big Cancel), and offer Undo where possible.
- **Never ask twice** for something the app already knows (WCAG 3.3.7). The profile feeds every plan.
- Place error messages next to the problem, saying what went wrong and how to fix it.

**Don't**
- Hamburger or hidden menus, dropdowns, fly-outs
- Swipe-only or long-press-only actions
- Icons without labels
- Pop-ups, modals stacked on modals, or carousels that move by themselves
- Date and time spinners: let people tap a suggestion, type, or say it instead

## 4. Words & tone

- Plain words and short sentences. **Keep paragraphs to 3 lines or fewer**, because people skip longer ones.
- Write "wheelchair help at the airport", not "PRM assistance"; "seat with extra legroom", not "SSR".
- **Use a warm, adult-to-adult tone, never "elderspeak".** Over-friendly, baby-ish or slowed-down language comes across as patronising and *lowers* understanding. No "Great job!" for ordinary taps.
- Don't write "senior" in the app. Talk about the trip, comfort and confidence *(judgement)*.
- Show older people as active, capable travellers.
- Left-align text. No ALL CAPS. Underline only links.

## 5. The AI concierge (chat)

- **Reply buttons first, typing second.** Older users prefer tapping options to typing. Show 2–4 large, full-width replies, plus "Something else" where it fits.
- **Short messages.** One idea per message and no more than about 3 lines. Show detail as a card or behind a "Tell me more" reply *(judgement)*.
- **A calm pace.** Messages appear one at a time with a short "typing…" pause.
- **"Read aloud" on every assistant message**, at a slightly slower speed. Spoken words always appear as text too.
- **A big, labelled microphone button.** Speaking reduces effort, especially for people over 80. Show what was heard and let the user edit it before sending.
- **Be open that it's an AI.** It says what it knows ("I know about your knee") and where facts come from ("The hotel says it has a lift — checked today"). It says so when it isn't sure.
- **The person stays in control.** The assistant *suggests* and the person *decides*. It never books or shares anything without asking ("Nothing is booked yet").
- **Recover when it doesn't understand:** "Sorry, I didn't get that. Did you mean A, B, or something else?" Offer **"Talk to a real person" at all times**.

## 6. Trust, safety & calm

- **Help is always one tap away:** call family, a real person, "take me to my hotel", and emergency (112 in the EU) kept visually separate.
- **Reassure at every stage:** "Your wheelchair help is confirmed for 14:20." "Your taxi is a blue car, plate AB-12-CD." Anxiety while travelling is very common.
- **Family helps, the traveller decides.** Sharing is explicit and specific: "Sarah sees your plan: On". Family can *suggest* and the traveller approves.
- **Health data is sensitive.** Ask only what's needed, say why ("so we can find rooms with a lift"), and make it easy to change.

## 7. Screen checklist

- [ ] One main purpose. No more than 3–5 main choices
- [ ] Text at least 18px, nothing below 16px. Works at the largest text size and at 320px wide
- [ ] Every tappable thing is at least 50px, with gaps of at least 12px
- [ ] Every icon has a word next to it
- [ ] Back (labelled) and Help are visible
- [ ] Plain words, no jargon, no paragraph longer than 3 lines, no patronising tone
- [ ] Nothing important happens without a confirmation
- [ ] Colour is never the only signal

## Sources

- NN/g, Usability for Senior Citizens — https://www.nngroup.com/articles/usability-for-senior-citizens/
- NN/g, Usability Testing with Older Adults — https://www.nngroup.com/articles/usability-testing-older-adults/
- W3C WAI, Older Users and Web Accessibility — https://www.w3.org/WAI/older-users/ and https://www.w3.org/WAI/WAI-AGE/additions.html
- WCAG 2.2 Target Size — https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- W3C summary of touch target research — https://www.w3.org/WAI/GL/mobile-a11y-tf/wiki/Summary_of_Research_on_Touch/Pointer_Target_Size
- HHS Health Literacy Online — https://odphp.health.gov/healthliteracyonline/display/full
- Elderspeak systematic review (2021) — https://pmc.ncbi.nlm.nih.gov/articles/PMC8406004
- Older adults and AI transparency (2026) — https://arxiv.org/abs/2603.11303
- FitChat: conversational agent for older adults — https://arxiv.org/pdf/2004.14067
- Inclusive transit apps (reassurance) — https://uxplanet.org/mental-models-key-to-inclusive-transit-apps-c48857649b29
- Trip-planning tools for older adults, scoping review (2025) — https://humanfactors.jmir.org/2025/1/e63273
- UXPA, testing with older adults — https://oldmagazine.uxpa.org/?p=5886
