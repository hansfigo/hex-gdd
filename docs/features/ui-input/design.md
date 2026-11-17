# UI input

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

Keyboard (with mouse in menus) and gamepad are both supported in the MVP (D-068). The gamepad map follows the common racing layout (triggers for throttle and brake) with the core action, pick up and deliver, on the main face button. Serves **Simple to play**: the core loop needs only steering, throttle, brake and one action button.

## Rules
1. **Driving actions** (D-068):

   | Action | Keyboard | Gamepad (Xbox / PlayStation) |
   |---|---|---|
   | Accelerate | W or ↑ | RT / R2 |
   | Brake / reverse | S or ↓ | LT / L2 |
   | Steer | A / D or ← / → | Left stick |
   | Pick up / deliver / end the day at HQ (`{interact}`) | E | A / Cross |
   | Drift (hold, `{drift}`) | Space | B / Circle |
   | Nitro (hold, `{nitro}`) | Left Shift or left mouse button | LB / L1 |
   | Look around (camera orbit, D-077) | Mouse move | Right stick |
   | Pause (`{pause}`) | Esc | Start / Options |

2. **Menu actions:** navigate with arrows, WASD or mouse / D-pad or left stick; `{confirm}` = Enter, Space or E / A; `{back}` = Esc / B; pick card or trial 1–3 = keys 1, 2, 3 / D-pad + A; `{skip}` (hold 1 s) = Tab / View button.
3. **Device in use:** the last device that sent input decides every key prompt and glyph. Text uses tokens (`{interact}`, `{drift}`, `{nitro}`, `{pause}`, `{confirm}`, `{back}`, `{skip}`) that resolve to the right key name.
4. Analog input: steering and triggers are analog on a gamepad; keyboard steering ramps in over 0.2 s [TUNE] so a tap is not a full lock.
5. No rebinding and no vibration in the MVP (vibration was not chosen for settings, D-073).

## Numbers
| Name | Value | Unit | What to watch in playtests |
|---|---|---|---|
| Stick and trigger dead zone | 0.15 [TUNE] | of full range | Drift of a worn stick does not steer |
| Keyboard steering ramp to full lock | 0.2 [TUNE] | s | |
| Skip hold time | 1 | s | |

## Edge cases
- Both devices pressed at once: the inputs are combined; prompts follow the most recent one.
- A gamepad disconnecting during a shift opens the pause menu.

## History
- 2026-11-17: designed (D-068). Gamepad map chosen after comparing Forza Horizon, GRID, Hot Wheels Unleashed and Crazy Taxi layouts.
