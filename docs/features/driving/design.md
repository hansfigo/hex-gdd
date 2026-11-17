# Driving

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

An arcade van: grippy, quick to answer, glued to the road, never flips, and still a bit silly (hang time, a small bounce on landing). The game can be finished with the four drive keys and E alone. Two optional skills sit on top: a drift for sharp turns at speed and a nitro boost for long straights. Serves **Simple to play** and **Bro thinks he's smart** (a well-timed boost feels clever).

## Rules
1. **Core:** W/S (or ↑/↓) accelerate and brake/reverse, A/D (or ←/→) steer, E picks up and delivers. These five keys are all the game requires; the pillar stays "4 drive keys + E" (D-057).
2. **Drift (Space, hold):** while held above a minimum speed, sideways grip drops and the van turns quicker and loses a little speed; grip comes back shortly after release. Drift is handling only: it gives no money, nitro or other reward (D-055).
3. **Nitro (Left Shift or left click):** the van has nitro bars (1 at the start, more with the Nitro Tank card). Holding the button burns the current bar for higher top speed and acceleration, with a small instant kick at the start.
4. Nitro refills from two sources only (D-056): each delivered package adds part of a bar, and the bars refill slowly by themselves; the passive refill pauses for a moment after a boost ends.
5. A boost cannot start below a minimum charge. Bars fill in order; only the current bar burns.
6. Off the asphalt the van loses top speed and drags; steep slopes cost climbing power and the van slides back from slopes that are too steep, so players keep to the roads.
7. The van slides along walls and fences instead of snagging on them.
8. Upgrades change speed, grip and acceleration ([upgrades](../upgrades/design.md)); damage does not slow the van.

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Drift grip, normal → drifting | 12 → 1.5 [TUNE] | grip | Can a new player recover from a drift? |
| Drift turn boost | ×1.5 [TUNE] | factor | |
| Drift minimum speed | 6 [TUNE] | m/s | |
| Grip recovery after release | 0.4 [TUNE] | s | |
| Nitro bars at start | 1 | bars | |
| Nitro per delivery | 0.34 [TUNE] | bar | About 3 deliveries per bar |
| Passive nitro refill | 0.04 per s (a full bar in about 25 s) [TUNE] | bar/s | |
| Passive refill pause after a boost | 1.5 [TUNE] | s | |
| Nitro burn | 0.22 per s (a bar lasts about 4.5 s) [TUNE] | bar/s | |
| Minimum charge to start a boost | 0.08 [TUNE] | bar | |
| Boost multiplier (top speed and acceleration) | ×1.3 [TUNE] | factor | |
| Boost start kick | +3 [TUNE] | m/s | |
| Off-road top-speed loss | 25 [TUNE] | % | |

## Events (logic → UI)
The logic raises these; UI and feedback ([ui-feedback](../ui-feedback/design.md)) only listen and read. Names are engine-neutral.

| Event / state | Data | When |
|---|---|---|
| state | speed01 (0 at rest, 1 at top speed), steering, grounded | read every frame by camera and speed effects |
| `driftStarted` / `driftEnded` | — | drift begins / ends above the minimum speed |
| `boostStarted` / `boostEnded` | — | nitro starts / stops burning |
| `nitroChanged` | bars, charge | nitro fills or burns |

## Edge cases
- Drift below the minimum speed does nothing.
- Nitro and drift together are allowed.
- Nitro does not carry between days: every shift starts with empty bars (as in the prototype).
- The van is frozen while a pop-up, the wreck sequence or the pause menu is open.

## Open questions
- [TUNE] All numbers are the prototype's (ArcadeDrive, NitroSystem).
- The new, smaller city map may need lower top speeds or tighter turns; re-check on that map.

## History
- 2026-11-17: designed (D-055 to D-057). Drift and nitro came from the prototype and are now part of the design as optional skills.
