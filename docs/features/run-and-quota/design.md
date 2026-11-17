# Run and quota

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

A run is three normal days that all count toward one profit quota, then a boss day if the quota was met. The player is never shut out early, but the verdict on Day 3 decides everything: pass and face Charon, miss and start over from Day 1. Serves the pillar **Push your luck** (every extra delivery raises the profit and the risk of the trip home).

## Rules
1. A run is Day 1, Day 2 and Day 3 (normal days). Day 4 is the boss day and is played only if the quota is met after Day 3 ([boss-charon](../boss-charon/design.md)). (D-025)
2. Each day: Garage → Start → trial (Day 2–3) → map shift → end-of-day report → Garage. The next day starts when the report is closed.
   Net income of a day: `income = sum of paid deliveries`; if wrecked, `income -= overtimeEarned`, then `net = floor(income × 0.5)`; otherwise `net = income`. Then `profit += net; cash += net`.
3. **Profit** is the net income banked at the end of each day. It counts toward the run quota and is never reduced by spending.
4. **Cash** is the same net income, spendable in the Garage (repair, reroll, relics; see [upgrades](../upgrades/design.md), [damage-and-repair](../damage-and-repair/design.md)). Spending lowers cash only.
5. There is **one run quota**, checked once, after the Day 3 report: profit ≥ quota continues to the boss, otherwise the run ends in game over. Days 1 and 2 have no pass or fail gate. The quota bar appears only on the report and in the Garage, not on the shift HUD (D-067).
6. A wrecked day (see [damage-and-repair](../damage-and-repair/design.md)) is marked FAILED but the run continues; only the kept share of its income reaches profit. A wrecked Day 3 still passes if profit meets the quota.
7. Game over (quota missed, or Iris wins the boss race) restarts from Day 1. Profit, cash, van HP, cards and relics all reset. There is no profile progress in the MVP.
8. Beating Charon ends the run on the ending screen ("to be continued").
9. The end-of-day report shows, one row at a time: delivery income, overtime money forfeited (wreck only), wreck fine (wreck only), net, then the run quota bar before and after the day, then the verdict stamp (SUCCESS, FAILED, run failed, run complete).
10. Game over first shows one summary screen: the cause ("quota missed by $X" or "Iris won 12–9"), total money, the day reached and HP lost. Then the game-over cutscene and Try Again. (D-033)
11. Systems are introduced by day, in every run (D-044): Day 1 has Safe packages and Zeus's package (the scripted tutorial on the first run only); Day 2 adds Chance packages; Day 3 has everything.
12. There is no fine for packages left undelivered at the end of the day (D-045).

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Normal days | 3 | days | Run length vs the session target |
| Run quota | 600 [TUNE] | $ profit | Re-tune after the combo cut: the prototype quota was tuned with combo bonuses up to ×3 |
| Normal shift length | 60 (D-030) | s | Enough deliveries per day to feel generous without a nitro or combo |
| Boss shift length | 120 [TUNE] | s | See [boss-charon](../boss-charon/design.md) |
| Net income floor | 0 | $ | A day never subtracts from profit |

## Edge cases
- Profit is never negative: a day with no deliveries banks 0.
- Quitting to the menu mid-run loses the run; there is no mid-run save (D-032).
- Hitting the quota early (before Day 3) gives no early exit; the run still plays all three days.

## Open questions
- [TUNE] Quota 600 is the prototype's value and must be re-tuned without combo.
- Session length is settled at about 6–8 min (D-030); cash is all banked net income (D-031).
- The old GDD's 7 days with a daily, rising quota is now a later option, not the MVP.

## History
- 2026-11-17: designed from the prototype's run loop and the owner's decisions D-025 (3 days + boss gate) and D-026 (visible HP). Supersedes the old 7-day daily-quota run (D-013).
