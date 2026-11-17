# Shift HUD

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

What the player sees while driving a shift. Only what changes a decision in the next few seconds is on screen; the run quota lives on the report and in the Garage. Serves **Simple to play** and **Bro thinks he's smart** (every risk the player takes is visible).

## Rules
1. The shift HUD shows exactly these elements (D-067):
   - **Time bar** with a marker that moves as the shift runs out. At 0 it is replaced by an **OVERTIME** label (red pulse).
   - **Today's earnings:** money earned this shift so far. Counts up on each delivery.
   - **HP bar:** 10 segments, coloured by van state (clean / dented / badly damaged, thresholds in [damage-and-repair](../damage-and-repair/design.md)). Next to it, the **lightning shield icon** with a refill ring, only when the van has a shield ([upgrades](../upgrades/design.md)).
   - **Nitro bars:** one bar per nitro bar the van has, filling left to right ([driving](../driving/design.md)).
   - **Direction arrow:** points to the nearest destination of a carried package; with nothing carried, to the nearest open pickup. In overtime with nothing carried, it points to HQ.
2. The shift HUD does **not** show the run quota, a pace bar or the day's profit target (D-067).
3. World markers on packages (type, pay, skulls and failure % for Chance) are part of [packages](../packages/design.md), not of this HUD.
4. Boss day: the time bar, HP, shield and nitro stay; today's earnings is replaced by the soul race bar (Hermes vs Iris, out of 12) ([boss-charon](../boss-charon/design.md)).
5. The chosen trial's three dials are shown small under the time bar on Day 2–3 ([trials](../trials/design.md)).

## Edge cases
- When the Zeus ward is active, the shield icon shows a golden ward ring instead, with its seconds left.
- During the wreck sequence and pop-ups the HUD stays visible but frozen.

## History
- 2026-11-17: designed from the owner's HUD pick (D-067).
