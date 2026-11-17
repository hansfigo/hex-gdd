# UI feedback

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

What the player sees, hears and feels when something happens. Each row names the moment that triggers it. Kept to graybox quality: simple shapes, flashes and placeholder sounds. Serves **Whimsical and comedic** and **Bro thinks he's smart** (every outcome is readable).

## Rules
1. Feedback never changes the rules: money, HP and timers are settled by the logic; feedback only shows them.
2. Slow motion is used only for the scam reveal and the wreck (D-070). Picking up a package has **no** slow motion or camera swing (the prototype's pickup reveal is cut).
3. Every event in the table below has a sound placeholder, even if the art is a plain flash.

| Event | Visual | Camera / time | Sound | Duration |
|---|---|---|---|---|
| `jobPickedUp` | marker turns into a drop marker; "+1" package on the van bed | — | pickup blip | — |
| `delivered` | pay pops above the van; HUD "Today" counts up in small steps | — | rising cash-register ticks | 0.6 s [TUNE] |
| `scamResolved` | slot-machine pop-up; JACKPOT: gold burst; BUST: flash, shockwave, the van is thrown up | slow motion during the reels; hard shake on bust | reel ticks, jackpot jingle or boom | 2.5 s [TUNE] |
| `hpChanged` (loss) | van flashes red; HP segments drop | shake scaled by damage; short hit-stop on a crash | hit thud / crunch | 0.15 s flash |
| HP ≤ 3 (`stageChanged` to 2) | screen edges pulse red; black smoke on the van | — | heartbeat loop | while HP ≤ 3 |
| `strikeWarning` | ring on the ground that fills until the strike; big strike: wide violet ring | — | crackle building up | warning time |
| `strikeLanded` | bolt and flash at the spot | shake if near the van | thunder | 0.3 s |
| `shieldAbsorbed` / ward block | bolt bounces off a shield (blue) or the golden aura; "RESIST" pops up | small kick | chime | 0.5 s |
| `zeusWardStarted` / `ended` | golden aura on the van with seconds left; "LIGHTNING WARD" tag once | — | blessing hum / fade | ward time |
| `overtimeStarted` | "OVERTIME ×1.5" banner; whole screen pulses red; HUD arrow points home | — | alarm sting; music turns tense | pulse until home |
| `wreckStarted` | fireball, black smoke column, white flash; the van hops | controls lock, slow motion, hard shake | explosion | 2 s [TUNE], then the wreck pop-up |
| `dayStarted` | Hermes bark in the dialogue strip; trial dials on the HUD | — | voice blips | 3 s |
| Speed (`speed01`) | wind streaks near top speed; light vignette | FOV widens with speed; camera leans into turns (D-070) | wind | continuous |
| `boostStarted` | stronger streaks; nitro bar drains | FOV kick | whoosh | boost time |
| Drift (`driftStarted`) | tyre smoke and skid marks | — | tyre squeal | while drifting |
| `dayEnded` | report count-up, cash ring, stamp (SUCCESS confetti / FAILED ash) | shake on FAILED | stamp hit | see [ui-screens](../ui-screens/design.md) |
| `repairPurchased` | HP segments refill one by one in the Garage | — | wrench clinks | 0.8 s [TUNE] |

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Scam reveal length | 2.5 [TUNE] | s | Long enough to feel, short enough not to break the flow |
| Wreck scene length before the pop-up | 2 [TUNE] | s | |
| Slow-motion time scale (scam, wreck) | 0.25 [TUNE] | × | |
| Camera FOV at rest → top speed | +0 → +10 [TUNE] | degrees | Motion sickness complaints |

## Edge cases
- Two scam deliveries pressed quickly one after another: the second reveal waits for the first to end; money lands after each.
- A strike lands during the scam reveal: it is held until the reveal ends (time is slowed anyway).
- Pause during slow motion is blocked until it ends (see [ui-screens](../ui-screens/design.md)).

## History
- 2026-11-17: designed from the prototype's feedback scripts (ScamGamble, WreckFx, CashRegisterJuice, DamageFeedback, LowHpJuice, OvertimeJuice, ZeusResistFx, SpeedFov, SpeedLines, CameraLean, DriftEffects) and D-070. Pickup slow motion cut.
