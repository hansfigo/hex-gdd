# Hermes Express — Game Design Document

**Version:** 0.5 · **Updated:** 2026-11-17 · [Features](#feature-index) · [Decisions](#decisions) · [Change log](#change-log)

This document and `features/` are the source of truth for the design (D-024). The Unity build is a prototype and a reference for starting numbers, not the spec. The original Indonesian GDD is kept unedited in `archive/GDD-v0-2026-10-23.md` (in the repository, not on the website).

## Summary
A survival delivery game where your cargo changes how you drive. Hermes, the messenger god demoted to a human courier, delivers the gods' packages in an old van through a modern Mount Olympus. Each short day he takes jobs at will, then decides whether to run home or push into a paid overtime hunted by Zeus's storm. Three days of work have to make one profit quota; meeting it earns a race against Iris on Charon's boss day. Missing it, or losing the race, restarts the run from Day 1.

| | |
|---|---|
| Genre and camera | Roguelite arcade delivery driving, locked isometric 3D |
| Audience | Casual to core PC players who like short runs and comedy |
| Platforms and input | macOS, keyboard: 4 drive keys plus E to pick up and deliver |
| Session | One run = 3 shifts of 60 s plus a 120 s boss shift plus Garage time, about 6–8 min (D-030) |
| Engine | Unity 6 (6000.6.5f1), URP; the current build is a prototype |
| Scope | MVP: one map (Olympus), one run shape, vertical slice first |
| References | Crazy Taxi (random pickup and drop-off model); slot-machine and roguelike run structure |

## Pillars
1. **Push your luck.** Every day the player weighs going home on time against one more package or overtime, and taking a smuggled package that may be a scam but pays big. Rules out: safe, fixed routes with no temptation.
2. **Simple to play.** Four drive keys plus E. Rules out: a second action layer that needs explaining.
3. **Whimsical and comedic.** Humor comes from the blessing system and the scam packages, amplified by a cartoon low-poly style. Rules out: grim or realistic tone.
4. **Bro thinks he's smart.** The player feels clever choosing packages and routes until the plan falls apart on the way home. Rules out: hiding the information the player needs to blame their own decision.

## Core loop
```
Garage (repair, pick a card) → shift: pick up → deliver → money
   → clock ends: go home or overtime (storm hunts) → report → quota check after Day 3 → boss → ending
```
- **Seconds:** drive, stop in a marker, press E ([packages](features/packages/design.md)); dodge crashes and lightning ([damage-and-repair](features/damage-and-repair/design.md)).
- **Minutes:** one shift of 60 s, then the choice between home and overtime ([day-cycle-and-storm](features/day-cycle-and-storm/design.md)).
- **Session:** three days, a quota gate on Day 3, a boss day ([run-and-quota](features/run-and-quota/design.md), [boss-charon](features/boss-charon/design.md)); between days, the Garage ([upgrades](features/upgrades/design.md)).

## Feature index
| Feature | Status | Scope | Summary | Docs |
|---|---|---|---|---|
| Run and quota | designed | MVP | 3 normal days, one run quota checked after Day 3, then the boss; fail = restart | [design](features/run-and-quota/design.md) |
| Day cycle, overtime and storm | designed | MVP | 60 s shift, automatic overtime at ×1.5 pay, Zeus's storm hunts the van and escalates until it kills | [design](features/day-cycle-and-storm/design.md) |
| Packages | designed | MVP | Safe, Zeus god package, Chance (scam); unlimited cargo | [design](features/packages/design.md) |
| Damage and repair | designed | MVP | 10 visible HP, scam and crashes cost HP, paid repair in the Garage, wreck fails the day | [design](features/damage-and-repair/design.md) |
| Upgrades | designed | MVP | Free pick of 3 cards (Clean/Gamble), reroll, relic shelf, bought with cash | [design](features/upgrades/design.md) |
| Boss day: Charon's soul race | designed | MVP | Race Iris to 12 souls on Day 4 | [design](features/boss-charon/design.md) |
| Combo | cut | — | Delivery combo multiplier; cut by owner | [design](features/combo/design.md) |
| Driving | designed | MVP | Arcade steer, gas, brake + E; optional drift (Space, handling only) and nitro (Shift, refills from deliveries and over time) | [design](features/driving/design.md) |
| Trials | designed | MVP | Before Day 2 and 3, pick 1 of 3 trials: danger (lightning), value (pay), intensity (jobs); Day 1 fixed Standard | [design](features/trials/design.md) |
| Shift HUD | designed | MVP | Time bar / OVERTIME, today's earnings, HP + shield, nitro, direction arrow; no quota bar | [design](features/hud/design.md) |
| UI screens | designed | MVP | Every screen and overlay in graybox: menu, Garage hub, report, card draw, trial select, pop-ups, pause, game over; with wireframes | [design](features/ui-screens/design.md) |
| UI feedback | designed | MVP | Event → visual, camera, sound table: scam reveal, wreck, overtime, hits, speed feel | [design](features/ui-feedback/design.md) |
| UI input | designed | MVP | Keyboard + gamepad map (racing layout), menu controls, key-prompt tokens | [design](features/ui-input/design.md) |
| First-run tutorial | idea | MVP | Day 1 script: two Safe packages, then Zeus, scripted strikes, blessing lost | — |
| Map: Olympus | idea | MVP | One map, HQ, houses, palaces, Electrical Plant; a new, smaller, more city-like map replaces the prototype's; layout not specified | — |

## Milestones
1. **M1, core loop spec'd and greybox:** run-and-quota, day-cycle-and-storm, packages, damage-and-repair · done when a player can finish Day 1–3 and see a pass or fail verdict on the Day 3 report.
2. **M2, full run:** upgrades and boss-charon · done when a player can win or lose the Charon race and see the ending or game over.

## Screens and flow
<CoreLoop />

```
Main menu → Opening cutscene → Garage (Day 1)
Garage → Start → choose trial (Day 2–3; Day 1 fixed Standard) → shift
   → clock ends: go home, or overtime (a choice made by driving, not a menu)
   → report
      Day 1–2            → Garage (next day)
      Day 3, quota met   → Garage → Start → boss shift (no trial)
      Day 3, quota missed → game-over summary → cutscene → Try Again → Day 1
Boss: Hermes wins → ending · Iris wins → game-over summary → cutscene → Try Again → Day 1
```
Owners: Garage = [upgrades](features/upgrades/design.md) and [damage-and-repair](features/damage-and-repair/design.md); trial = [trials](features/trials/design.md); shift and overtime = [day-cycle-and-storm](features/day-cycle-and-storm/design.md); report, game over = [run-and-quota](features/run-and-quota/design.md); boss and ending = [boss-charon](features/boss-charon/design.md).

## Direction
- **Narrative:** Hermes once delivered the wrong package to the wrong god; Zeus took his godhood and his winged sandals and made him a courier for all the gods. Hera has her own messenger now, Iris, who is also his rival on the boss day. The quota is atonement; the storm is Zeus disliking couriers working after hours; the scam packages are Hermes taking grey-area jobs because he is desperate. Opening and game-over scenes tell this in short visual-novel pages; the ending is a four-line scene with Charon and Hermes.
- **Art:** low-poly cartoon, visual direction C (modern), Greek identity carried by landmarks and ornaments.
- **Camera and controls:** locked isometric, full 3D. Four drive keys plus E.
- **Feedback:** a health bar and smoke show damage; a marker above each package shows its type, pay and direction.
- **Audio:** engine sound, UI and lightning effects exist in the prototype; no audio design is written yet.

## Decisions
IDs run in sequence and are never reused. A superseded decision stays in the table, marked "→ superseded by D-n". Dates before D-024 are the original Indonesian log, translated.

| ID | Date | Decision | Alternatives considered | Why | Affects |
|---|---|---|---|---|---|
| D-001 | 2026-10-12 | Quota, not open progression | open progression | A showcase needs a session that ends; quota makes push-your-luck contextual | [run-and-quota](features/run-and-quota/design.md) |
| D-002 | 2026-10-13 | Setting: modern Olympus (urban fantasy) | — | The gig-economy comedy reads at once; the car makes sense | — |
| D-003 | 2026-10-13 | Roguelike on Olympus; other regions are vision | — | The MVP does not promise content that does not exist | [run-and-quota](features/run-and-quota/design.md) |
| D-004 | 2026-10-13 | Points = income | three kinds of "points" | Avoids mixing three point types | [run-and-quota](features/run-and-quota/design.md) |
| D-005 | 2026-10-13 | One wallet: upgrades reduce the balance | — | Invest vs save adds decisions → partly superseded by D-022 | [upgrades](features/upgrades/design.md) |
| D-006 | 2026-10-13 | Minotaur: hybrid knockback physics, fake-animation fallback | — | Funny outcome without breaking arcade driving → superseded by D-023 | — |
| D-007 | 2026-10-14 | MC = demoted Hermes; quota = atonement | — | Narrative explains quota, driving and grey areas | Direction |
| D-008 | 2026-10-15 | Visual direction C (modern) | — | Greek identity through landmarks and ornaments | Direction |
| D-009 | 2026-10-15 | Zeus package destination = Electrical Plant | — | The way home passes through the lightning field | [packages](features/packages/design.md) |
| D-010 | 2026-10-15 | Locked isometric camera | — | Map and telegraphs always read from the same angle | Direction |
| D-011 | 2026-10-15 | Feature complete 25 Oct, plan B checkpoint 22 Oct | — | TypeCaster insight: half the time left is buffer → obsolete, dates passed | — |
| D-012 | 2026-10-16 | Full 3D | 2D | Native sorting, collision, lighting, physics; avoids 2D/3D cohesion problems | Direction |
| D-013 | 2026-10-21 | Daily quota, 7 days, miss = game over | — | A clear roguelike; pressure every day → superseded by D-025 | [run-and-quota](features/run-and-quota/design.md) |
| D-014 | 2026-10-21 | Angry meter removed | — | Escalation from hazard location and time is enough | — |
| D-015 | 2026-10-21 | HP removed; damage = 3 states + surprise bill | — | One losing condition; carelessness is paid in money → superseded by D-026 | [damage-and-repair](features/damage-and-repair/design.md) |
| D-016 | 2026-10-21 | Three package categories: Safe, Skill, Chance | — | Three kinds of risk: safe, skill, chance | [packages](features/packages/design.md) |
| D-017 | 2026-10-21 | Smuggled packages show a visible scam %; scam = damage | — | A bet with full information, so players blame their own decision | [packages](features/packages/design.md) |
| D-018 | 2026-10-21 | HQ only spawn + upgrade; random packages, pickup by stopping + E | — | Spontaneous decisions; a clear HQ/map split | [packages](features/packages/design.md) |
| D-019 | 2026-10-21 | Must return to HQ; overtime hunted by Zeus's storm | — | The way home matters again; the Zeus hook stays whole; the storm reuses lightning | [day-cycle-and-storm](features/day-cycle-and-storm/design.md) |
| D-020 | 2026-10-21 | God packages take 2 slots | — | The price of holding the blessing reads without extra UI → superseded by D-028 | [packages](features/packages/design.md) |
| D-021 | 2026-10-21 | Dionysus deferred | — | Scope focus; curse replaced by scam | — |
| D-022 | 2026-10-23 | Upgrades = pick 1 of 3 free cards, Clean and Gamble, reroll and extra card paid from workshop cash | fixed Capacity 3→4→5 upgrade; "one wallet" | Each run gets a different build, and upgrades join push-your-luck | [upgrades](features/upgrades/design.md) |
| D-023 | 2026-10-27 | Plan B: lightning is the only hazard; Minotaur cut | keep Minotaur | Scope; recorded in the project's planning notes. Smuggled packages stay in the design (see D-027) | [day-cycle-and-storm](features/day-cycle-and-storm/design.md) |
| D-024 | 2026-11-17 | Spec-driven: this GDD and `features/` are the source of truth; the Unity build is a prototype | GDD as an after-the-fact description of the build | Design decisions come first; the prototype supplies starting numbers | all |
| D-025 | 2026-11-17 | Run = 3 normal days; one run quota checked after Day 3; pass → Day 4 boss, fail → game over | 7 days with a daily rising quota; 3 days + boss with no gate | The run stays short; a single gate makes Day 3 the decision. 7 days becomes a later option | [run-and-quota](features/run-and-quota/design.md) |
| D-026 | 2026-11-17 | Visible HP (10), carried between days, paid repair in the Garage | hidden damage with a report bill (D-015) | Every damage source is readable, which keeps losses fair | [damage-and-repair](features/damage-and-repair/design.md) |
| D-027 | 2026-11-17 | A failed Chance (scam) delivery deals HP damage | scam only costs the pay | Restores the stakes of D-017; the prototype's scam only lost the payout | [packages](features/packages/design.md), [damage-and-repair](features/damage-and-repair/design.md) |
| D-028 | 2026-11-17 | Cargo is unlimited; no slot limit, no 2-slot Zeus | 3 slots with capacity cards | Owner decision; capacity cards and the Zeus slot price are removed | [packages](features/packages/design.md), [upgrades](features/upgrades/design.md) |
| D-029 | 2026-11-17 | No combo multiplier | keep the prototype's ×0.25 per step, max ×3 | Owner decision; the quota must be re-tuned | [combo](features/combo/design.md), [run-and-quota](features/run-and-quota/design.md) |
| D-030 | 2026-11-17 | Normal shift stays 60 s; a run is about 6–8 min | 90 s shifts (about 10 min); 180 s shifts (the old 15 min target) | Owner decision; short runs suit the slice and repeated playtests. The old 15 min target is dropped | [run-and-quota](features/run-and-quota/design.md) |
| D-031 | 2026-11-17 | Cash = all banked net income; spending never lowers profit | only surplus above the daily pace; one wallet (D-005) | Repair and relics stay affordable without slowing the quota | [run-and-quota](features/run-and-quota/design.md), [upgrades](features/upgrades/design.md) |
| D-032 | 2026-11-17 | No mid-run save: quitting to the menu loses the run | autosave in the Garage | A run is short; saves are not worth the MVP cost | [run-and-quota](features/run-and-quota/design.md) |
| D-033 | 2026-11-17 | Game over first shows the cause and the run totals, then the cutscene | cutscene only | The player must see why the run ended (roguelike rule) | [run-and-quota](features/run-and-quota/design.md) |
| D-034 | 2026-11-17 | Chance packages use three fixed risk tiers: 10 / 25 / 50% | random 0–100% (prototype); random within 5–60% | Readable at a glance (skulls); no absurd offers | [packages](features/packages/design.md) |
| D-035 | 2026-11-17 | A failed Chance delivery costs 2 HP | 1 HP; scaled by tier | The loss must bite: about $60 of repair | [packages](features/packages/design.md), [damage-and-repair](features/damage-and-repair/design.md) |
| D-036 | 2026-11-17 | Zeus pays a medium amount, about 2× Safe | about 5× Safe | The new map is smaller and city-like, so the detour is short | [packages](features/packages/design.md) |
| D-037 | 2026-11-17 | A failed Chance delivery may wreck the van | HP stops at 1 | Risk and HP are both visible; the player owns the choice | [packages](features/packages/design.md) |
| D-038 | 2026-11-17 | The report shows end-of-day HP only, no breakdown by source | one row per damage source | Keeps the report short; in-shift feedback names the source | [damage-and-repair](features/damage-and-repair/design.md) |
| D-039 | 2026-11-17 | Repair is full only, one button | partial repair per HP | Simple; one decision per visit | [damage-and-repair](features/damage-and-repair/design.md) |
| D-040 | 2026-11-17 | Cash buys relics (plus repair and rerolls); no extra card for cash | extra card only (D-022); both | The relic shelf is built and playable | [upgrades](features/upgrades/design.md) |
| D-041 | 2026-11-17 | The Cargo theme becomes a Delivery theme (Wide Dock, Blessed Courier) | drop to three themes | Keeps four themes after capacity cards were removed (D-028) | [upgrades](features/upgrades/design.md) |
| D-042 | 2026-11-17 | No Zeus ultimate; overtime lightning escalates absurdly until it kills the van | a fixed cutoff after 30 / 45 / 60 s | Owner decision; the end comes from the storm itself, so greed is punished gradually | [day-cycle-and-storm](features/day-cycle-and-storm/design.md) |
| D-043 | 2026-11-17 | Big Lightning Rod's price: the shift is 10 s shorter | light lightning during the shift | The old "storm 1 hour earlier" has no clock to refer to | [upgrades](features/upgrades/design.md) |
| D-044 | 2026-11-17 | Day 1: Safe + Zeus; Day 2: + Chance; Day 3: everything, in every run | everything from Day 1 after the tutorial | Teaches one system per day in a 3-day run | [run-and-quota](features/run-and-quota/design.md) |
| D-045 | 2026-11-17 | No fine for undelivered packages | keep 10% per package | With unlimited cargo it would read as a hidden punishment | [run-and-quota](features/run-and-quota/design.md) |
| D-046 | 2026-11-17 | Trials are MVP: pick 1 of 3 before Day 2 and Day 3; Day 1 always Standard | trials from Day 1; trials later | The owner's day flow; Day 1 stays readable for new players and the tutorial | [trials](features/trials/design.md) |
| D-047 | 2026-11-17 | Danger sets shift lightning: 1 = only in the lightning area, 2 = on the map lightly, 3 = on the map busily | danger only scales the overtime storm | Danger is felt in every shift, not only by players who work overtime | [trials](features/trials/design.md), [day-cycle-and-storm](features/day-cycle-and-storm/design.md) |
| D-048 | 2026-11-17 | Intensity = number of jobs, a reward | intensity as pressure (traffic, tighter zones) | Keeps danger as the only price of a trial | [trials](features/trials/design.md), [packages](features/packages/design.md) |
| D-049 | 2026-11-17 | No trial on the boss day; fixed setup | trials on the boss day too | The race is challenge enough; value means nothing without money | [trials](features/trials/design.md), [boss-charon](features/boss-charon/design.md) |
| D-050 | 2026-11-17 | Lightning Rod = a shield that absorbs one strike and refills 20 s after use | refill on each delivery; refill at HQ | The old "1× per day" was used up unseen and felt useless | [upgrades](features/upgrades/design.md) |
| D-051 | 2026-11-17 | The shield is shown on the HUD with a refill ring | only an effect when it absorbs | Players can plan around a shield they can see | [upgrades](features/upgrades/design.md) |
| D-052 | 2026-11-17 | Big Lightning Rod = shield refills twice as fast; price stays shift −10 s | two shields; full immunity at danger 1–2 | Same mechanic, stronger, with a readable price | [upgrades](features/upgrades/design.md) |
| D-053 | 2026-11-17 | Relic "Lightning Rod" becomes Grounding Coil: the shield also blocks big strikes | faster refill; remove the relic | A different function, not just a bigger number | [upgrades](features/upgrades/design.md) |
| D-054 | 2026-11-17 | Trials are rolled with a reward budget per danger (3 / 4 / 5–6) | hand-made templates; only "danger 3 needs one +++" | No trial is strictly worse; danger +++ always pays | [trials](features/trials/design.md) |
| D-055 | 2026-11-17 | Drift is in the design as handling only, no reward | drift fills nitro | Keeps drift a skill, not a resource loop | [driving](features/driving/design.md) |
| D-056 | 2026-11-17 | Nitro refills from deliveries and slowly over time | also from drift | Same as the prototype; ties boosts to doing the job | [driving](features/driving/design.md) |
| D-057 | 2026-11-17 | The "Simple to play" pillar is unchanged: 4 drive keys + E; drift and nitro are optional extras | rewrite the pillar to include Space and Shift | The game stays finishable with the core keys | [driving](features/driving/design.md) |
| D-058 | 2026-11-17 | HQ ends the day only after the shift clock reaches 0 | end the day early at any time | No early bail-out; the shift is always played in full | [day-cycle-and-storm](features/day-cycle-and-storm/design.md) |
| D-059 | 2026-11-17 | Job mix: one Zeus job per normal day; from Day 2, 25% of new jobs are Chance (scam); the rest Safe | Zeus repeatable (max 1 open); Zeus only on Day 1 | Zeus stays a special moment each day; scam is common but not dominant | [packages](features/packages/design.md) |
| D-060 | 2026-11-17 | E works anywhere inside a marker's zone at any speed; no stopping | slow below 2 m/s; hold E 0.5 s | The game is fast-paced; stopping would be friction | [packages](features/packages/design.md) |
| D-061 | 2026-11-17 | Chance (scam) pay = a Safe pay roll × 2 / 4 / 9 by tier | fixed ranges per tier | One formula, tied to the Safe economy | [packages](features/packages/design.md) |
| D-062 | 2026-11-17 | Shift lightning: danger 1 every 3 s inside each lightning area; danger 2 every 6 s and danger 3 every 2.5 s at random points within 40 m of the van | random points over the whole map; softer or harder rates | The player always sees and feels the chosen danger | [day-cycle-and-storm](features/day-cycle-and-storm/design.md), [trials](features/trials/design.md) |
| D-063 | 2026-11-17 | Overtime escalation: after the 25 s ramp, every 10 s gap ×0.8 (min 0.25 s), +1 simultaneous strike, big-strike interval ×0.8 | every 5 s; every 15 s | A skilled driver cannot survive past about 50–60 s of overtime | [day-cycle-and-storm](features/day-cycle-and-storm/design.md) |
| D-064 | 2026-11-17 | Every normal strike costs 2 HP, in the shift and in overtime | 1 HP in the shift, 2 HP in overtime | One value for one look | [day-cycle-and-storm](features/day-cycle-and-storm/design.md) |
| D-065 | 2026-11-17 | Taking the free card is mandatory (Start is locked until one is taken); a wrecked day still gives the card | skippable pick; no card after a wreck | A free card has no downside to refuse; a wreck is punished enough | [upgrades](features/upgrades/design.md) |
| D-066 | 2026-11-17 | Boss day spawns only Safe packages, shown as souls | all package types | The race is about routes and speed | [boss-charon](features/boss-charon/design.md) |
| D-067 | 2026-11-17 | Shift HUD: time bar / OVERTIME, today's earnings, HP + shield, nitro, direction arrow; no quota bar | also a quota pace bar | Keep the HUD to what changes the next decision | [hud](features/hud/design.md) |
| D-068 | 2026-11-17 | Keyboard and gamepad in the MVP; gamepad uses the racing layout: RT gas, LT brake, left stick steer, A pick up / deliver, B drift, LB nitro, Start pause | keyboard only; Forza-style (A drift, X interact); Hot Wheels-style (A nitro) | Common racing convention; the core action stays on the main face button | [ui-input](features/ui-input/design.md) |
| D-069 | 2026-11-17 | Garage = one hub screen with the van in the middle; report and card draw open as overlays in order | a step-by-step wizard of screens | Matches the prototype, which already works | [ui-screens](features/ui-screens/design.md) |
| D-070 | 2026-11-17 | Feedback kept: scam slot machine and wreck slow motion, speed feel (FOV, wind lines, camera lean), Hermes's start-of-day bark. Cut: slow motion and camera swing on pickup | keep the pickup reveal | Slow motion stays special; pickup must not break a fast-paced flow | [ui-feedback](features/ui-feedback/design.md) |
| D-071 | 2026-11-17 | MVP UI is graybox only; the spec carries HTML/CSS graybox wireframes, not final art | finished UI art | Programmers can build and test the flow before any art exists | [ui-screens](features/ui-screens/design.md) |
| D-072 | 2026-11-17 | Pause menu: Resume, Controls, Settings, Quit to menu (with a confirm) | Restart run; Resume and Quit only | Covers the basics without a mid-run restart shortcut | [ui-screens](features/ui-screens/design.md) |
| D-073 | 2026-11-17 | Settings: master / music / effects volume; fullscreen or windowed and resolution. No rebinding, no vibration | also vibration toggle; tutorial toggle | The minimum a Mac game needs | [ui-screens](features/ui-screens/design.md), [ui-input](features/ui-input/design.md) |
| D-074 | 2026-11-17 | In-game text is English only | Indonesian; both with a language switch | One language for the MVP, same as the docs | [ui-screens](features/ui-screens/design.md) |

## Open questions
- **Assumptions to confirm:** design questions were settled on 2026-11-17 (D-030 to D-045). What remains are prototype tuning numbers: run quota $600, 120 s boss shift, Safe pay and the 0.65 multiplier, open pickups and spawn interval, storm numbers, HP amounts and repair price, Gamble chance, reroll price, card and relic numbers, Iris's pace; plus the audience and the time bar on the HUD.
- **Re-tune after the combo cut:** the prototype's income and quota were tuned with bonuses up to ×3. How to find out: playtest Day 1–3 without combo and compare profit to the quota.
- **Push your luck without capacity:** unlimited cargo removes the old lever (Zeus's 2 slots). Remaining levers are overtime, scam odds and the Zeus detour. How to find out: playtest whether picking up Zeus is still a decision.
- **Reward on a failed run:** a restart gives nothing; decide on a small reward (record, light unlock) later.
- **Other open items from the old GDD:** third hazard (needed or not); anti-pillars; playtest success criteria; a tuning-numbers table (this version puts numbers in each feature note).

## Change log
**0.5 (2026-11-17):** UI guide for UI programmers: ui-screens with graybox wireframes, ui-feedback, ui-input, and an Events (logic → UI) section in every gameplay spec (D-068 to D-074).
**0.4 (2026-11-17):** Made implementable: interact, job mix, pay formula, shift lightning, escalation formula, Garage and boss rules, HUD spec (D-058 to D-067).
**0.3 (2026-11-17):** Lightning shield with refill, trial reward budget, driving with drift and nitro (D-050 to D-057).
**0.2 (2026-11-17):** Assumption review: D-030 to D-045 logged, remaining prototype numbers marked [TUNE]. Trials designed (D-046 to D-049); screens and flow added.
**0.1 (2026-11-17):** Docs split into GDD + features/; original GDD archived. Designed run-and-quota, day-cycle-and-storm, packages, damage-and-repair, upgrades, boss-charon; combo cut (D-029). Decisions D-023 to D-029 logged; D-006, D-011, D-013, D-015, D-020 marked superseded or obsolete. The old 7-day plan, hidden damage and the 3-slot capacity are replaced as described in the decisions.
