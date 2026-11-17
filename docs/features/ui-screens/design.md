# UI screens

**Status:** designed · **Updated:** 2026-11-17 · [GDD](../../GDD.md)

Every screen and overlay the player sees, what is on it, how it is driven, and where it goes next. Built as **graybox UI** for the MVP (D-071): flat gray boxes and plain text, no final art. The wireframes below are the layout reference; positions are approximate. Gameplay rules live in the feature notes; this note says how they are shown. Feedback effects are in [ui-feedback](../ui-feedback/design.md), controls in [ui-input](../ui-input/design.md), and the in-shift HUD in [hud](../hud/design.md).

## Rules
1. **Graybox rules** (D-071): one sans-serif font; text at least 18 px at 1080p; gray boxes for panels and buttons; colour only where it carries meaning: red = danger or failure, green = success or money gained, gold = Zeus's ward, blue = lightning shield. Every interactive element shows its focus state (outline) for gamepad use.
2. All in-game text is English (D-074). Key names in text use input tokens such as `{interact}`, so they read "E" or "A" for the device in use ([ui-input](../ui-input/design.md)).
3. **Screen map:**
   ```
   Main menu → (new run) Opening cutscene → Garage hub (Day 1)
   Garage hub → Start → Trial select (Day 2–3) → Shift (HUD) → Report overlay → Card draw overlay → Garage hub
   Day 3 report: quota met → Garage hub (boss banner) → Start → Boss intro → Boss shift
                 quota missed → Game-over summary → Game-over cutscene → Try again / Main menu
   Boss shift: Hermes wins → Ending → Main menu · Iris wins → Game-over summary → …
   Pause menu: from any shift; Settings and Controls: from Main menu or Pause menu
   ```
4. **Main menu:** title, Start, Settings, Quit, and a "press any key" prompt that pulses until the first input. Start begins a new run (there is never a run to continue, D-032).
   <Wireframe name="main-menu" />
5. **Opening cutscene:** four full-screen pages, each with art (placeholder in graybox), a caption and sometimes a speaker line. `{confirm}` advances (and finishes a line that is still typing); holding `{skip}` for 1 s skips the whole cutscene. Plays at the start of every new run [TUNE: maybe first run only].
6. **Garage hub** (D-069): one screen with the van on a slowly turning turntable in the middle, showing its owned upgrades. Around it: the run panel (day, profit vs run quota bar), cash, the van panel (HP segments and Repair), the relic shelf, owned cards, and the Start button. After a shift the hub opens with the report overlay, then the card draw overlay, then the hub itself.
   <Wireframe name="garage-hub" />
7. **Report overlay:** rows count up one at a time with a cash-register tick, the quota bar fills from the old to the new profit, then the verdict stamp lands (SUCCESS green, FAILED red; on Day 3 QUOTA MET or QUOTA MISSED). `{confirm}` during the count-up jumps to the end; Continue appears after the stamp. Rows and formula: [run-and-quota](../run-and-quota/design.md).
   <Wireframe name="report" />
8. **Card draw overlay:** three cards are dealt from a deck and flipped one after another. Each card shows its theme, CLEAN or GAMBLE, and its effect (a Gamble card shows its price in red). Hover or focus lifts a card; pick with click, 1 / 2 / 3, or D-pad + `{confirm}`. Reroll (with its price) re-deals all three; it is locked when cash is short and gone after the pick. The overlay closes only when a card is taken (D-065). Not shown before Day 1 or after the run ends.
   <Wireframe name="card-draw" />
9. **Trial select** (Day 2–3): three trial cards, each with a name and danger / value / intensity as 1–3 pluses; an info line explains the focused dial in plain words. Pick with click, 1 / 2 / 3, or D-pad + `{confirm}`; the shift loads at once. `{back}` returns to the hub. Rules: [trials](../trials/design.md).
   <Wireframe name="trial-select" />
10. **Shift:** the HUD ([hud](../hud/design.md)) plus world markers on pickups and drops ([packages](../packages/design.md)): a light beam above each marker, a screen-space label (type box and 1–3 pay coins; no risk shown, D-075), and a floating `{interact}` keycap while the van is inside a zone. Off-screen targets are covered by the HUD direction arrow.
    <Wireframe name="shift-hud" />
11. **Scam reveal:** on delivering a Chance package, time slows and a three-reel slot machine appears over the van; the reels stop one by one and the result is the real roll (JACKPOT and the pay, or BUST and −2 HP). No input; play resumes when it ends.
    <Wireframe name="scam-reveal" />
12. **Wreck pop-up:** after the wreck scene ([ui-feedback](../ui-feedback/design.md)), a pop-up states the overtime lost and the half of today's income kept; Continue ends the day and opens the report.
    <Wireframe name="wreck-popup" />
13. **Dialogue strip:** a band along the bottom of the screen for Hermes's start-of-day bark (one random line per shift, D-070) and tutorial lines. Text types out with a voice blip per letter; `{confirm}` advances tutorial lines; barks fade by themselves after 3 s [TUNE] and never pause play.
14. **Pause menu** (D-072): Resume, Controls, Settings, Quit to menu. Opening it freezes time, the shift clock, the storm and Iris. Quit to menu asks "Quit? This run will be lost." with Yes / No.
    <Wireframe name="pause" />
15. **Settings** (D-073): master, music and effects volume (three sliders, 0–100%), and display mode (fullscreen / windowed) with resolution. Changes apply at once and are saved between sessions. **Controls** shows the button map for the device in use (view only, no rebinding in the MVP).
16. **Boss intro:** letterbox bars and three dialogue lines (Charon, Iris, Charon) at the start of the boss shift; `{confirm}` advances, then the race starts.
17. **Game-over summary** (D-033): the cause in one line ("Quota missed by $85" or "Iris won 12–9"), then run totals: money earned, day reached, HP lost, cards taken. Continue plays the game-over cutscene, which ends on Try again (new run, Day 1) and Main menu.
    <Wireframe name="game-over" />
18. **Ending:** letterbox, four lines of dialogue, then a black screen with "TO BE CONTINUED..." and "Thanks for playing."; any input returns to the main menu.
19. Screen changes use a short fade to black and back [TUNE: 0.3 s each way].

## Edge cases
- A gamepad connecting or disconnecting mid-screen swaps every key prompt at once; focus stays on the same element.
- Opening Pause during the scam reveal or the wreck scene is not allowed; Pause opens once they end.
- Resizing the window keeps the 16:9 layout centred, with empty bars at the sides or top.

## Open questions
- [TUNE] Opening cutscene on every new run or only the first.
- The new city map may need a different off-screen indicator than the single arrow.

## History
- 2026-11-17: designed from the prototype's screens (GarageHub, ReportUI, CardDrawUI, TrialSelectUI, ScamGamble, WreckFx, PauseMenu, MainMenu, DialogueBox, EndingUI) and the owner's UI decisions D-068 to D-074.
