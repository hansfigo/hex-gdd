# Packages

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

Packages appear at pickup markers around the map (the Crazy Taxi model). The player drives into a marker, presses E, drives to the destination and presses E again. Money is paid on delivery. There are three kinds: Safe for steady money, Zeus's god package for a blessing that leaves with the package, and Chance (smuggled, "scam") for a visible gamble. Serves **Push your luck** and **Whimsical & comedic**.

## Rules
1. **Interact (E):** pressing E while the van is inside a marker's zone picks the package up (pickup marker) or delivers it (destination marker). The van does **not** need to slow down or stop: the game is fast-paced (D-060). Leniency: the zone counts 1 m wider than drawn, a press up to 0.4 s after leaving the zone still counts, and a press up to 0.3 s before entering is buffered and fires on arrival.
2. If several actions are possible at once, E does all of them in one press: deliver every carried package whose destination is here, then pick up every package here.
3. Money is paid on delivery, never on pickup.
4. **Cargo is unlimited** (D-028): no slot limit, no weight.
5. **Spawning:** the map keeps a target number of open pickups (set by the trial's intensity, see [trials](../trials/design.md)) and adds one new job every spawn interval while below the target. At least one open pickup is always within 60 m of the van [TUNE]. No new jobs are added once 15 s or less of the shift are left.
6. **Mix** (D-059): each new job is Chance with 25% chance from Day 2 on (0% on Day 1), otherwise Safe. Zeus is not part of the random mix: exactly one Zeus job spawns per normal day, on Day 1 at the start of the shift and on Day 2–3 at a random time between 10 s and 30 s into the shift [TUNE]. At most one Zeus job exists at a time.
7. **Routes:** a pickup is placed 15–110 m from the van; its destination is 60–250 m from the pickup and at least 45 m from HQ [TUNE: prototype values; re-measure on the new city map].
8. Every marker shows the package type, its pay, and an arrow to its destination. A Chance marker also shows its tier as 1, 2 or 3 skulls and the failure percentage.
9. **Safe:** pays a random whole amount from the Safe pay range.
10. **Zeus (god package, Offering):** pickup at Zeus's palace, destination the Electrical Plant. From pickup, the van has the **Zeus ward**: lightning that would hit it is turned away (golden aura, RESIST pop-up). The ward ends on delivery or after the ward duration, whichever comes first. *The blessing belonged to the package, not you.*
11. **Chance (scam):** on spawn each Chance job gets a tier (1, 2 or 3, equally likely [TUNE]) with its failure chance (D-034) and its pay: `chancePay = round(rollSafePay() × tierMultiplier)` (D-061). At delivery roll once: success pays; failure pays nothing, costs the van 2 HP (D-035) and throws it into the air as feedback. A slot-machine reveal plays either way.
12. **Pay formula** for every delivery, rounded to whole dollars once at the end:
    `paid = round(base × globalPayMultiplier × trialValueMultiplier × upgradePayMultiplier × (inOvertime ? overtimePayMultiplier : 1))`, where `base` is the Safe roll, the Zeus roll or the Chance pay above.
13. Only Zeus's package exists as a god package in the MVP; other gods are later.
14. Carried and open packages disappear when the day ends; there is no fine (D-045).

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Safe package base pay | 10–19, whole dollars | $ | Income per minute vs the run quota |
| Zeus package base pay | 20–34, about 2× Safe (D-036) | $ | Worth the detour on the smaller city map |
| Chance (scam) package failure chance, tier 1 / 2 / 3 | 10 / 25 / 50 (D-034) | % | Share of players who take each tier |
| Chance (scam) package pay multiplier on a Safe roll, tier 1 / 2 / 3 | ×2 / ×4 / ×9 (D-061) [TUNE] | factor | Each tier's expected value should sit a little above a Safe job |
| Chance (scam) package share of new jobs, Day 2–3 | 25 (D-059) [TUNE] | % | |
| Zeus jobs per normal day | 1 (D-059) | jobs | |
| Zeus job spawn time, Day 2–3 | 10–30 s into the shift [TUNE] | s | |
| Global pay multiplier | 0.65 [TUNE] | factor | Single dial for the whole economy |
| Open pickups on the map / new job interval | set by trial intensity, see [trials](../trials/design.md) | jobs / s | |
| Nearest open pickup, max distance from the van | 60 [TUNE] | m | |
| No new jobs in the last | 15 | s of shift | |
| Zeus ward duration | 30 | s | Long enough for the plant run, short enough to matter |
| Failed Chance (scam) delivery damage | 2 (D-035) | HP | Same as a lightning strike |
| Interact leniency: zone padding / after leaving / before entering | 1 / 0.4 / 0.3 | m / s / s | Missed E presses at full speed |

## Events (logic → UI)
The logic raises these; UI and feedback ([ui-feedback](../ui-feedback/design.md)) only listen and read. Names are engine-neutral.

| Event / state | Data | When |
|---|---|---|
| `jobSpawned` / `jobRemoved` | job id, type, tier, failChance, pay, pickup, destination | a job appears or disappears |
| `jobPickedUp` | job id | E picks it up |
| `delivered` | job id, type, paid | a Safe or Zeus delivery is paid |
| `scamResolved` | job id, success, paid | a Chance delivery is rolled; pay or damage is applied when the reveal reports done |
| `zeusWardStarted` / `zeusWardEnded` | seconds / reason (delivered, expired) | Zeus's package is picked up / the ward ends |
| state | openJobs, carriedJobs, todayEarnings, nearestTarget | read by markers, HUD earnings and the arrow |

## Edge cases
- A failed Chance delivery can wreck the van when HP is 2 or less (D-037).
- A failed Chance delivery in overtime pays nothing; overtime money already earned is lost if the wreck follows.
- The Zeus ward does not stop Chance (scam) damage.
- Pressing E at full speed through a marker counts; overshooting by up to 0.4 s still counts.

## Open questions
- Why ×2 / ×4 / ×9: with −2 HP (about $60 of repair) on failure, each tier's expected value is just above a Safe job at these multipliers (tier 1 ≥ 1.9×, tier 2 ≥ 3.6×, tier 3 ≥ 8.7×).
- With unlimited cargo the old "Zeus costs 2 slots" price is gone; check in playtests whether picking up Zeus is still a real decision.
- The Day 1 tutorial (two Safe packages, then Zeus, scripted strikes) is a later feature ([GDD](../../GDD.md#feature-index)).

## History
- 2026-11-17: designed. D-028 (unlimited cargo) supersedes the 3-slot capacity and Zeus's 2 slots (D-020); D-027 restores the intent of D-017.
- 2026-11-17: made implementable: interact without stopping (D-060), job mix and Zeus once per day (D-059), Chance pay formula (D-061), full pay formula, route distances.
