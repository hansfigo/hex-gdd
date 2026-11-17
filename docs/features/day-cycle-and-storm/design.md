# Day cycle, overtime and storm

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

Every normal day is a short shift that ends at a clock, followed by a tempting overtime where deliveries pay more while Zeus's storm hunts the van and keeps escalating until it kills. The player decides by playing when to run home. Serves **Push your luck** and **Bro thinks he's smart**.

## Rules
1. **Shift:** the van starts at HQ; the shift clock counts down from the shift length (60 s, minus 10 s with Big Lightning Rod). Packages spawn during the shift ([packages](../packages/design.md)).
2. **Shift lightning** follows the trial's danger ([trials](../trials/design.md)) (D-047, D-062):
   - Danger 1: strikes only inside the lightning area (a circle around Zeus's palace and one around the Electrical Plant), one every 3 s per area, at a random point in the area.
   - Danger 2: one strike every 6 s at a random point within 40 m of the van, not aimed at it.
   - Danger 3: one strike every 2.5 s at a random point within 40 m of the van, not aimed at it.
   - Every interval varies ±30% at random. Each is a `strike` ([hazards](../hazards/design.md)).
3. **HQ during the shift** does nothing: the day cannot end before the clock reaches 0 (D-058).
4. **Overtime** starts automatically when the clock reaches 0: a banner, a red pulse, and the HUD time bar turns into an OVERTIME label. From then on, entering the HQ zone and pressing E ends the day. Deliveries pay ×1.5. Overtime money is safe only once the day ends at HQ: a wreck forfeits it ([damage-and-repair](../damage-and-repair/design.md)).
5. **Overtime storm:** `strike`s ([hazards](../hazards/design.md)) aim at the van's position plus its heading (lead). 95% land within 0.6 m of the aimed point, the rest are near misses 1.5–3 m away. After each strike there is a 30% chance of a second strike aimed a little further ahead. The gap between strikes ramps from 2.0 s to 0.85 s over the first 25 s of overtime. Shift lightning (rule 2) stops when overtime starts.
6. **Big strike:** every 12–18 s in overtime a `big-strike` ([hazards](../hazards/design.md)) is aimed where the van will be halfway through its warning.
7. **Escalation** (D-042, D-063): after the 25 s ramp, every 10 s the gap between strikes is multiplied by 0.8 (never below 0.25 s), one more simultaneous strike is added to each volley, and the big-strike interval is multiplied by 0.8. There is no fixed cutoff; the storm eventually makes survival impossible.
   ```
   t = seconds since overtime started
   if t <= 25: gap = lerp(2.0, 0.85, t / 25); volley = 1
   else:       k = floor((t - 25) / 10)
               gap = max(0.25, 0.85 * 0.8^k); volley = 1 + k
   bigStrikeInterval = random(12, 18) * 0.8^max(0, k)
   ```
8. What a strike does to the van, and what counters it, is defined once in [hazards](../hazards/design.md).
9. **HQ is safe:** while the van is inside the HQ zone in overtime the storm pauses.
10. The map edge is guarded by the `boundary` hazard ([hazards](../hazards/design.md)).
11. The boss day has no overtime: when its clock reaches 0 the day ends ([boss-charon](../boss-charon/design.md)).
12. The sky darkens as the shift runs out (direction). The HUD shows the clock as a bar, not numbers ([hud](../hud/design.md)).

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Normal shift length | 60 (D-030) | s | |
| Shift lightning interval: danger 1 (per lightning area) / danger 2 / danger 3 | 3 / 6 / 2.5 (D-062) [TUNE] | s | Danger 3 should hurt but not wreck a careful driver in one shift |
| Shift lightning interval random variation | ±30 [TUNE] | % | |
| Shift lightning radius around the van (danger 2–3) | 40 (D-062) [TUNE] | m | |
| Lightning area radius (danger 1) | 35 [TUNE] | m | Re-measure on the new city map |
| Overtime pay multiplier | ×1.5 | factor | About half of players still take at least one overtime delivery |
| Overtime strike gap, start → end of ramp | 2.0 → 0.85 [TUNE] | s | |
| Overtime ramp length | 25 [TUNE] | s | |
| Escalation step / gap factor / minimum gap | every 10 s / ×0.8 / 0.25 (D-063) [TUNE] | s / factor / s | A skilled driver cannot survive past about 50–60 s of overtime |
| Overtime double-strike chance | 30 [TUNE] | % | |
| Big-strike interval | 12–18, shrinks with escalation [TUNE] | s | |
| Overtime aimed strikes / near misses | 95 / 5; spread 0.6 m / 1.5–3 m [TUNE] | % / m | |

## Edge cases
- Pausing freezes the clock and the storm.
- A strike during the Zeus ward is turned away; it does not use the lightning shield.
- The Day 1 tutorial may hold the clock until its script ends (later feature).
- Entering HQ during the shift shows "Come back after your shift" and does nothing else.

## History
- 2026-11-17: strike, big strike and boundary behaviour moved to [hazards](../hazards/design.md) (D-080); this note keeps the schedule.
- 2026-11-17: designed from the prototype. Replaces the old 06:00–20:00 hour table; Minotaur stays cut (D-023); the prototype's Zeus ultimate is replaced by escalation (D-042).
- 2026-11-17: made implementable: shift lightning placement and rates (D-062), escalation formula (D-063), one damage value (D-064), HQ only after the clock (D-058).
