# Combo

**Status:** cut · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

> **Cut on 2026-11-17 (D-029).** The prototype has a delivery combo; the design does not. Why: the owner chose not to keep it. Cut ideas come back, so the prototype's rules are kept below.

The prototype rewarded back-to-back deliveries with a growing money multiplier.

## What the prototype did (for reference only)
- Each delivery within 10 s of the previous one raised the combo by 1. An empty timer bar dropped it by 1.
- Multiplier = 1 + 0.25 × (combo − 1), capped at ×3. A failed Chance delivery reset it to 0.
- The bonus was paid on top of the normal pay.

## Consequences of the cut
- Income per day falls (the prototype quota of $600 was tuned with the multiplier), so the quota must be re-tuned ([run-and-quota](../run-and-quota/design.md)).
- Nothing else in the design depends on it.
- Removing the code and HUD from the prototype is a separate task.

## History
- 2026-11-17: cut, D-029.
