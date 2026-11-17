# Trials

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

Before each normal shift (except Day 1) the player picks one of three trials. A trial sets three dials for that shift: how dangerous the lightning is, how much packages pay and how many packages appear. Danger is the price; value and intensity are the reward. Serves **Push your luck**: the player chooses the day's risk before driving.

## Rules
1. Flow of a normal day: Garage → Start → choose a trial → shift → overtime or go home → report → Garage (D-046).
2. Day 1 has no choice: it always uses the Standard trial (danger 1, value 2, intensity 2), on every run, so the first day and the tutorial stay readable (D-046).
3. The boss day has no trial; it uses its own fixed setup ([boss-charon](../boss-charon/design.md)) (D-049).
4. Each offer shows three trials with three different danger levels (1, 2 and 3), shuffled. Each dial is shown as 1 to 3 pluses with a one-line explanation on hover.
5. **Danger** sets the lightning during the shift (D-047):
   - 1: lightning only inside the lightning area around Zeus's palace and the Electrical Plant.
   - 2: lightning anywhere on the map, at a low rate.
   - 3: lightning anywhere on the map, at a busy rate.
   Overtime's storm hunts the van at every danger level ([day-cycle-and-storm](../day-cycle-and-storm/design.md)).
6. **Value** multiplies the pay of every package that shift.
7. **Intensity** sets how many open pickups the map keeps and how fast new ones appear (D-048). It is a reward: more jobs means more money within the 60 s shift.
8. **Reward budget** (D-054): the reward of a trial is value + intensity, and it is fixed by its danger, so a higher danger always pays more and no trial is strictly worse than another.

   | Danger | Reward budget (value + intensity) | Possible (value, intensity) |
   |---|---|---|
   | 1 | 3 | (1, 2), (2, 1) |
   | 2 | 4 | (1, 3), (2, 2), (3, 1) |
   | 3 | 5 or 6, 50/50 | (2, 3), (3, 2), (3, 3) |

   Generation, per offer:
   ```
   dangers = shuffle([1, 2, 3])
   for d in dangers:
       budget = 3 if d == 1 else 4 if d == 2 else random_choice([5, 6])
       value  = random_int(max(1, budget - 3), min(3, budget - 1))   # inclusive
       intensity = budget - value
       offer.add(Trial(d, value, intensity))
   ```
   Every dial ends in 1–3. Danger 3 never gets a dial below 2, so "danger +++ with value + and intensity +" cannot happen. The Day 1 Standard trial (1, 2, 2) is a fixed exception and is never rolled.
9. **Acceptance:** over 10,000 rolled offers, every offer has dangers {1, 2, 3}; for every trial, value + intensity equals its danger's budget; reward(danger 3) > reward(danger 2) > reward(danger 1) in every offer.
10. The chosen trial is shown on the HUD during the shift and on the report.

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Value multiplier, level 1 / 2 / 3 | ×0.75 / ×1.0 / ×1.5 [TUNE] | factor | Which danger level players pick most |
| Open pickups, intensity 1 / 2 / 3 | 4 / 6 / 9 [TUNE] | jobs | |
| New job interval, intensity 1 / 2 / 3 | 3.5 / 2.5 / 1.6 [TUNE] | s | |
| Shift lightning per danger level | see [day-cycle-and-storm](../day-cycle-and-storm/design.md) rule 2 (D-062) | — | Danger 3 should hurt but not wreck a careful driver in one shift |

## Edge cases
- A Zeus ward protects the van from shift lightning at every danger level ([packages](../packages/design.md)).
- On Day 2 Chance packages appear for the first time (D-044) whatever the trial.
- The quota is the same whatever trials the player picks; trials change how fast it is reached.

## Open questions
- [TUNE] Value and intensity numbers are the prototype's.

## History
- 2026-11-17: designed (D-046 to D-049), from the owner's day flow and the prototype's trial picker. Was an "idea / later" row.
