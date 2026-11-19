# Audio

**Status:** idea · **Updated:** 2026-11-19 · [GDD](../../GDD.md)

The full list of sounds and music the MVP needs, grouped by where they play. Each row names the moment that triggers it, so audio can be built and checked against the other specs. Serves **Whimsical and comedic** (voice blips, cartoon hits) and **Push your luck** (the storm and overtime are heard before they are seen) (D-081).

## Rules
1. **Mix buses:** Master → Music, Effects (SFX + ambience), Voice. The three volume sliders in Settings (D-073) drive Master, Music and Effects; Voice follows Effects.
2. **Priority when busy:** hazard warnings and damage are never cut; ambience and engine duck first. Music ducks under the scam reveal and the wreck.
3. **3D or 2D:** world sounds (strikes, other cars, markers) are 3D and positioned; UI, music and the van's own engine are 2D.
4. **Variation:** every repeated sound (hits, blips, ticks, tyre squeal) has at least 3 variants or random pitch ±5% [TUNE] so it does not fatigue.
5. **Slow motion and pause:** slow motion lowers pitch on effects, not on music or UI; pause mutes the world and keeps UI sounds.
6. Graybox first: placeholders (free libraries or generated) are fine for the MVP; every row below needs at least a placeholder before playtests.

## Music
| Id | Where | Notes |
|---|---|---|
| `mus-menu` | Main menu, settings | Loop; sets the comedic Greek tone |
| `mus-hub` | Garage hub, report, card draw | Calm loop |
| `mus-shift` | Day shift | Upbeat driving loop; one layer intensity per trial [TUNE] |
| `mus-overtime` | Overtime | Tense layer or stinger switch on `overtimeStarted`; returns to calm at HQ |
| `mus-boss` | Boss shift (Charon vs Iris) | Own track |
| `mus-gameover` / `mus-ending` | Game-over and ending screens | Short stingers or loops |

## Van and driving
| Id | Trigger | Notes |
|---|---|---|
| `engine` | Always while driving | Loop, pitch and volume from speed and throttle; rougher when damaged (D-079) |
| `tyre-squeal` | Drift (`driftStarted`) | Loop while drifting |
| `nitro` | `boostStarted` / end | Whoosh start, loop, tail |
| `wind` | Near top speed | Loop scaled by `speed01` |
| `crash` / `bump` | `crash` hazard hit | Two weights, matching 1 HP and 0.5 HP |
| `brake` / `reverse-beep` | Braking hard, reversing | Optional, comedic |

## Packages and money
| Id | Trigger | Notes |
|---|---|---|
| `pickup` | `jobPickedUp` | Blip |
| `deliver` | `delivered` | Rising cash-register ticks |
| `marker-near` | Van enters a pickup or drop zone | Soft cue that `{interact}` is ready |
| `scam-reels` / `jackpot` / `bust` | `scamResolved` | Reel ticks, jingle or boom |
| `zeus-blessing` | Zeus's ward start / end | Hum and fade |

## Hazards and damage
| Id | Trigger | Notes |
|---|---|---|
| `strike-warn` | `strike` telegraph | Crackle that builds over the warning time; 3D, audible behind the camera |
| `strike-hit` | Strike lands | Thunder; louder near the van |
| `big-strike-warn` / `big-strike-hit` | `big-strike` | Deeper, longer than `strike` |
| `shield-block` | Shield or ward absorbs a hit | Chime |
| `boundary-alarm` | `boundary` countdown | Ticking alarm per second |
| `hp-loss` | `hpChanged` (loss) | Thud |
| `low-hp` | HP ≤ 3 | Heartbeat loop |
| `wreck` | `wreckStarted` | Explosion |
| `repair` | `repairPurchased` | Wrench clinks |

## Day and world
| Id | Trigger | Notes |
|---|---|---|
| `amb-city` | Day shift | City loop: traffic, birds |
| `amb-storm` | Overtime | Rain and distant thunder loop |
| `overtime-alarm` | `overtimeStarted` | Alarm sting |
| `day-start` | `dayStarted` | Short horn or bell |
| `hq-arrive` | Van reaches HQ | Relief cue |

## UI and voice
| Id | Trigger | Notes |
|---|---|---|
| `ui-move` / `ui-confirm` / `ui-back` / `ui-locked` | Menu focus, confirm, back, disabled button | Short clicks |
| `report-tick` / `stamp` | Report count-up, verdict stamp | SUCCESS and FAILED variants |
| `card-deal` / `card-flip` / `card-pick` / `reroll` | Card draw | |
| `voice-blip` | Dialogue text, per letter | One pitch per character (Hermes, Charon, Iris) — no recorded voice in the MVP |

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Default volumes Master / Music / Effects | 80 / 60 / 80 [TUNE] | % | Music never hides warnings |
| Music duck under scam and wreck | −8 [TUNE] | dB | |
| Random pitch on repeated sounds | ±5 [TUNE] | % | |
| Music crossfade | 1 [TUNE] | s | |

## Open questions
- Music source: original, commissioned, or licensed library.
- Does trial intensity add music layers, or only change ambience?

## History
- 2026-11-19: idea; asset list drafted from the feedback, hazards, driving and screen specs (D-081).
