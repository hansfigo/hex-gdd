# Upgrades (cards and relics)

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

Between days the Garage is the player's hub: read the report, repair the van, take one free card, and optionally spend cash on rerolls and relics. Each run builds a different van. Cards come in Clean (solid, no downside) and Gamble (stronger, with a price). Serves **Push your luck**.

## Rules
1. After each report of Day 1, 2 and 3 (when the run continues) the Garage offers 3 cards. The player must take exactly 1 for free: Start stays locked until a card is taken (D-065). A wrecked day still gives the card.
2. Each slot of an offer is a Gamble with a set chance, otherwise Clean; at least 1 card in every offer is Clean when the pool allows it.
3. The player may **reroll** all three cards before picking, for cash. The price rises with every reroll on the same offer.
4. Each card appears at most once per run. A card already owned is never offered again.
5. The Garage also has a **relic shelf**: 3 relics, bought with cash, each with a special effect. Relics are never offered as free cards.
6. All cards and relics are lost on game over ([run-and-quota](../run-and-quota/design.md)).
7. Repair is also paid here ([damage-and-repair](../damage-and-repair/design.md)).
8. Cargo is unlimited (D-028), so there are no capacity cards.
9. **Lightning shield** (from Lightning Rod or Big Lightning Rod): the van holds one shield. A normal strike that would hit the van is absorbed instead (RESIST effect, no HP lost) and the shield empties; it refills by itself after the refill time (D-050). Big violet strikes ignore the shield unless the van has the Grounding Coil relic (D-053).
10. The HUD shows a shield icon with a refill ring while the van has a shield (D-051).
11. Owning both rod cards gives one shield with the faster 10 s refill. Big Lightning Rod alone also grants the shield.
12. While Zeus's ward is active ([packages](../packages/design.md)), strikes are turned away by the ward and the shield is not used.
13. Grounding Coil appears on the relic shelf only when the van already has a shield.

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Cards per offer | 3 | cards | |
| Gamble chance per slot | 35 [TUNE] | % | Share of Gamble cards taken |
| Reroll price | 30 + 30 per earlier reroll [TUNE] | $ | Rerolls per run |
| Relic slots | 3 | relics | |
| Shield refill, Lightning Rod / Big Lightning Rod | 20 / 10 [TUNE] | s | Strikes absorbed per shift; the card should feel worth a pick |

**Cards (Clean / Gamble)**

| Card | Kind | Effect |
|---|---|---|
| Engine | Clean | Speed +20% |
| Turbo | Gamble | Speed +35%, grip −20% |
| Lightning Rod | Clean | A lightning shield that absorbs one normal strike, then refills 20 s after use (D-050) |
| Big Lightning Rod | Gamble | The shield refills twice as fast (10 s), but the shift is 10 s shorter, so overtime and the storm come sooner (D-052, D-043) |
| Soft Bumper | Clean | Repair price −10% |
| Steel Bumper | Gamble | Repair price −40%, acceleration −10% |
| Nitro Tank | Clean | +1 nitro bar ([driving](../driving/design.md)) |
| Wide Dock | Clean | Pickup and drop zones +50% wider [TUNE] (Delivery theme, D-041) |
| Blessed Courier | Gamble | Zeus ward lasts +15 s, but Safe packages pay −10% [TUNE] (Delivery theme, D-041) |

**Relics (price)**

| Relic | Price | Effect |
|---|---|---|
| Hephaestus Wrench | 120 | Repairs cost half |
| Grounding Coil | 160 | The lightning shield also absorbs big violet strikes (D-053) |
| Overtime Contract | 180 | Overtime deliveries pay +0.5× more |
| Hermes' Sandals | 220 | The van is 8% faster |
| Golden Wings | 260 | Every delivery pays 15% more |

## Edge cases
- Rerolling is only possible before the free pick.
- If the pool is exhausted the offer shows fewer than 3 cards.
- Cash is spent in one place across repair, rerolls and relics; spending never lowers profit.

## Open questions
- [TUNE] Card and relic numbers, the Gamble chance and the reroll price are the prototype's.
- Cargo theme replaced by a Delivery theme (D-041); its two cards are new and untested.
- Cash buys relics only; the old "extra card for cash" is dropped (D-040).
- The old pool target was about 16 cards; the prototype has 7 cards and 5 relics.

## History
- 2026-11-17: designed. Capacity cards (Roof Rack, Overload) removed by D-028. Relics added from the prototype. Combo and pay multipliers no longer interact with the cut combo (D-029).
