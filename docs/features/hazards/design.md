# Hazards

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

The catalogue of everything on the map that can hurt the van. Each hazard is a self-contained module: what it is, how it warns, what it does, what counters it, and its numbers. Other specs only decide **when and where** a hazard appears (the trial's danger in [trials](../trials/design.md), the overtime storm in [day-cycle-and-storm](../day-cycle-and-storm/design.md)) and refer to it by its id. Serves **Push your luck**: every hazard is telegraphed, so getting hit is the price of a choice, not bad luck (D-080).

## Rules
1. **Module shape.** Every hazard defines: id, source (who spawns it), telegraph, effect, counters, numbers. A new hazard is added as a new module here; schedulers only reference its id.
2. **Readability with the chase camera** (D-077): every telegraph is visible from behind the van at speed: a ground ring plus a vertical light column, so a warning ahead of the van or partly behind buildings is still seen.
3. Hit grace: after any hazard damages the van, no hazard can damage it again for 1 s.
4. Pausing freezes every telegraph and timer.

### `strike`: lightning strike
- **Source:** shift lightning (trial danger) and the overtime storm.
- **Telegraph:** a ground ring that fills over the warning time, with a thin light column.
- **Effect:** at the end of the warning, the strike hits everything within the hit radius of its point. The van loses 2 HP (D-064).
- **Counters:** drive out of the ring; Zeus's ward turns it away; the lightning shield absorbs one ([upgrades](../upgrades/design.md)).

### `big-strike`: big violet strike
- **Source:** the overtime storm only.
- **Telegraph:** a wide violet ring and column that fill over 3.5 s.
- **Effect:** the van loses 5 HP if inside the radius when it lands.
- **Counters:** leave the circle; Zeus's ward; the lightning shield only with the Grounding Coil relic (D-053).

### `boundary`: Zeus's wrath at the map edge
- **Source:** the van drives more than the boundary margin past the outermost road.
- **Telegraph:** a warning banner with a countdown on screen.
- **Effect:** at 0 the van is wrecked outright (the day fails, see [damage-and-repair](../damage-and-repair/design.md)).
- **Counters:** drive back inside; the countdown resets. Ward and shield do not help.

### `crash`: collisions
- **Source:** buildings, props, traffic and anything solid.
- **Telegraph:** none (the world itself).
- **Effect:** an impact of 12 m/s or more costs 1 HP; an impact between 4 and 12 m/s is a bump and costs 0.5 HP; below 4 m/s nothing. The first 2.5 s of a day are free (the van drops onto the road).
- **Counters:** drive cleanly; the Soft / Steel Bumper cards only lower repair cost.

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| `strike` warning time | 0.65–1.7 [TUNE] | s | Readable from the chase camera at speed |
| `strike` hit radius | 1.2 [TUNE] | m | |
| `strike` damage | 2 (D-064) | HP | |
| `big-strike` radius / warning | 9 / 3.5 [TUNE] | m / s | |
| `big-strike` damage | 5 [TUNE] | HP | |
| `boundary` margin / countdown | 60 / 5 [TUNE] | m / s | |
| `crash` damage: crash (≥ 12 m/s) / bump (4–12 m/s) | 1 / 0.5 [TUNE] | HP | Crashes per day in a normal run |
| `crash` grace at day start | 2.5 | s | |
| Hit grace after any damage | 1 | s | |

## Edge cases
- Two strikes landing in the same 1 s grace window cost HP only once.
- A strike landing on HQ while the van is parked there in overtime does not happen: the storm pauses at HQ ([day-cycle-and-storm](../day-cycle-and-storm/design.md)).
- A failed Chance (scam) delivery also costs HP but is not a hazard; it lives in [packages](../packages/design.md).

## Open questions
- A third hazard type (old GDD question) can be added as a new module without changing the schedulers.

## History
- 2026-11-17: designed as a modular catalogue (D-080). Strike, big strike and boundary moved here from day-cycle-and-storm; crash amounts moved here from damage-and-repair.
