# Boss day: Charon's soul race

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

If the run quota is met after Day 3, Day 4 is Charon's day. Instead of a profit quota, Hermes races Iris Express to deliver 12 souls. Iris is only a score on a bar: she has no van. First to 12 ends the day. Serves **Push your luck** (the race rewards fast, clean deliveries over detours) and gives the run its own climax.

## Rules
1. Played only after a successful Day 3 ([run-and-quota](../run-and-quota/design.md)). Before it, a banner announces the boss day in the Garage; the race and its short dialogue (Charon, Iris, Charon) play on the map.
2. Only Safe packages spawn on the boss day, shown as souls; no Zeus and no Chance (scam) jobs (D-066). Every delivery is 1 soul. HP carries over from Day 3; the lightning shield and nitro work as usual. Shift lightning uses the danger 1 setup (lightning areas only), drawn blue. Iris gains a soul after a random interval, now and then in a quick chain.
3. Iris's pace has a rubber band: each soul Hermes is ahead of her makes her slightly faster, each soul behind slightly slower, within limits.
4. First to 12 souls wins and the day ends. If the shift clock runs out first, or the van is wrecked, Iris wins. HQ does nothing on the boss day.
   ```
   irisTimer starts at random(5, 7)
   each frame: irisTimer -= dt
   when irisTimer <= 0: iris += 1
       lead = hermes - iris
       irisTimer = (random() < 0.12) ? 0.6
                 : random(5.5, 8) * clamp(1 - 0.06 * lead, 0.6, 1.25)
   ```
5. Hermes winning ends the run on the ending scene (four lines of dialogue, then "TO BE CONTINUED..."). Iris winning is game over ([run-and-quota](../run-and-quota/design.md)).
6. The boss day has no overtime and no money quota; income does not matter.
7. Lightning on the boss day is blue (visual only).

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Soul target | 12 | souls | |
| Boss shift length | 120 | s | Enough room for 12 deliveries |
| Iris first soul | 5–7 | s | |
| Iris interval | 5.5–8 | s | A strong player with no upgrades only just wins |
| Iris chain chance | 12 | % | |
| Iris chain delay | 0.6 | s | |
| Rubber band per soul ahead/behind | 0.06 | factor | |
| Rubber band limits | 0.6–1.25 | factor | |

## Events (logic → UI)
The logic raises these; UI and feedback ([ui-feedback](../ui-feedback/design.md)) only listen and read. Names are engine-neutral.

| Event / state | Data | When |
|---|---|---|
| `raceChanged` | hermes, iris, target | either side gains a soul |
| `raceEnded` | winner (hermes, iris) | someone reaches 12, or the clock or a wreck ends the day |

## Edge cases
- A scam delivery that fails gives no soul.
- Both players cannot reach 12 at once; the first event decides.
- Pausing freezes Iris.

## Open questions
- [TUNE] All numbers are the prototype's.
- The Iris race may be too easy once cards are strong; watch win rate by upgrades owned.

## History
- 2026-11-17: designed from the prototype. New since the old GDD (it only had "teaser region berikutnya" after Day 7). Gated by D-025.
