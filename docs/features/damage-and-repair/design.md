# Damage and repair

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

The van has 10 visible hit points. Crashes, lightning and failed Chance deliveries take them away, and they stay lost from one day to the next until the player pays to repair them in the Garage. At 0 HP the van is wrecked and the day fails, but the run goes on. Every source of damage is visible, so a loss never feels random. Serves **Bro thinks he's smart**.

## Rules
1. Max HP is 10. HP carries from day to day; it never refills by itself. (D-026)
2. Each source of damage removes a fixed amount of HP (table below). The van flashes red and the camera reacts on every hit.
3. Visual state follows HP: above 6 clean, 4–6 dented (white smoke), 3 or less badly damaged (black smoke).
4. A health bar is always visible on the HUD. The money cost of repair appears only in the Garage.
5. **Repair** is optional and paid in the Garage with cash: one button restores all missing HP for the repair price. Cost is rounded up and reduced by upgrades ([upgrades](../upgrades/design.md)).
6. **Wreck:** at 0 HP controls lock, time slows, the van explodes, and a pop-up explains the fine. The day is FAILED: overtime money earned that day is forfeited, only half of the remaining income is kept, and the van is restored to full HP for free for the next day.
7. The only outside force that wrecks the van outright is leaving the map boundary for too long. Late overtime ends in a wreck through ever-heavier lightning, not a single strike ([day-cycle-and-storm](../day-cycle-and-storm/design.md)).
8. The end-of-day report shows only the van's HP at the end of the day, not a breakdown by source (D-038). In-shift hit feedback (flash, camera, pop-ups) is what tells the player where damage came from.
9. For the first 2.5 s of a day the van drops onto the road and takes no damage.

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Max HP | 10 | HP | |
| Crash | 1 (impact ≥ 12) | HP (m/s) | Crashes per day in a normal run |
| Soft bump | 0.5 (impact 4–12) | HP (m/s) | Not so frequent that it feels like noise |
| Lightning strike | 2 | HP | |
| Big strike | 5 | HP | |
| Failed Chance delivery | 2 (D-035) | HP | Is the gamble still tempting at the 25% tier? |
| Repair price | 30 per HP, rounded up | $ per HP | Share of cash spent on repair vs cards |
| Wreck income kept | 50 | % | Is a wreck painful but not a run-ender? |
| Dented / badly damaged at | 6 / 3 | HP | |

## Events (logic → UI)
The logic raises these; UI and feedback ([ui-feedback](../ui-feedback/design.md)) only listen and read. Names are engine-neutral.

| Event / state | Data | When |
|---|---|---|
| `hpChanged` | hp, delta, source (crash, bump, lightning, bigStrike, scam, boundary, repair) | any HP change |
| `stageChanged` | stage (0 clean, 1 dented, 2 badly damaged) | HP crosses 6 or 3 |
| `wreckStarted` / `wreckResolved` | — / overtimeForfeited, kept | HP reaches 0 / the wreck pop-up is closed |
| `repairPurchased` | hpBefore, price | Repair is pressed in the Garage |

## Edge cases
- A hit that would take HP below 0 stops at 0 and triggers the wreck once.
- Carried HP at the start of a day is at least 1 even after a wreck sequence, so the van always moves.
- Repair is full or nothing (D-039): with less cash than the full price the button is disabled and shows the price.
- Game over resets HP to 10.

## Open questions
- [TUNE] All HP amounts and the 30 $/HP price are the prototype's.
- Failed Chance delivery costs 2 HP, equal to a lightning strike (D-035).

## History
- 2026-11-17: designed. D-026 (visible HP and paid repair) supersedes the hidden-damage model (D-015: "HP removed, 3 states and a surprise bill"); D-027 adds scam damage.
