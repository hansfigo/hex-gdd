// Graybox wireframes for the UI spec. Positions are percentages of a 16:9 frame.
// kind: box (default), button, locked (disabled), panel, overlay (dimmed backdrop), text (no frame), world (game view element).

export type Region = {
  x: number; y: number; w: number; h: number
  label: string; note?: string
  kind?: 'box' | 'button' | 'locked' | 'panel' | 'overlay' | 'text' | 'world'
}
export type Screen = { title: string; world?: boolean; regions: Region[]; states?: string[] }

export const screens: Record<string, Screen> = {
  'main-menu': {
    title: 'Main menu',
    regions: [
      { x: 30, y: 14, w: 40, h: 18, label: 'HERMES EXPRESS', note: 'title logo', kind: 'text' },
      { x: 40, y: 42, w: 20, h: 9, label: 'Start', kind: 'button' },
      { x: 40, y: 54, w: 20, h: 9, label: 'Settings', kind: 'button' },
      { x: 40, y: 66, w: 20, h: 9, label: 'Quit', kind: 'button' },
      { x: 30, y: 84, w: 40, h: 7, label: 'Press any key', note: 'fades in and out until first input', kind: 'text' },
    ],
    states: ['First input focuses Start. Start → opening cutscene on a new run.'],
  },

  'garage-hub': {
    title: 'Garage hub',
    regions: [
      { x: 2, y: 3, w: 30, h: 16, label: 'Run panel', note: 'Day 2 / 3 · profit $310 / $600 quota bar', kind: 'panel' },
      { x: 76, y: 3, w: 22, h: 10, label: 'Cash $140', kind: 'panel' },
      { x: 30, y: 22, w: 40, h: 50, label: 'Van on turntable', note: 'shows owned upgrades on the van', kind: 'world' },
      { x: 2, y: 30, w: 24, h: 34, label: 'Van panel', note: 'HP 6 / 10 · 10 segments', kind: 'panel' },
      { x: 4, y: 55, w: 20, h: 8, label: 'Repair $120', note: 'full repair only', kind: 'button' },
      { x: 74, y: 22, w: 24, h: 50, label: 'Relic shelf', note: '3 slots: name, effect, price · OWNED', kind: 'panel' },
      { x: 2, y: 68, w: 24, h: 14, label: 'Owned cards', note: 'icons, hover for effect', kind: 'panel' },
      { x: 36, y: 80, w: 28, h: 13, label: 'Start shift', note: 'locked until today\'s card is taken', kind: 'button' },
    ],
    states: [
      'Day 1 first visit: no report, no card; Start is unlocked; a short how-to panel opens once per session.',
      'Before the boss day: a red banner "Charon awaits" across the top; Start reads "Face Charon".',
      'Repair disabled (dashed) when HP is full or cash is below the price; the price is still shown.',
    ],
  },

  report: {
    title: 'End-of-day report (overlay)',
    regions: [
      { x: 0, y: 0, w: 100, h: 100, label: '', kind: 'overlay' },
      { x: 28, y: 6, w: 44, h: 86, label: '', kind: 'panel' },
      { x: 32, y: 9, w: 36, h: 8, label: 'Day 2 report', kind: 'text' },
      { x: 32, y: 19, w: 36, h: 7, label: 'Deliveries   $186', note: 'rows count up one by one', kind: 'box' },
      { x: 32, y: 27, w: 36, h: 7, label: 'Overtime lost   −$40', note: 'wreck only', kind: 'box' },
      { x: 32, y: 35, w: 36, h: 7, label: 'Wreck fine   −$73', note: 'wreck only', kind: 'box' },
      { x: 32, y: 45, w: 36, h: 9, label: 'Net   $73', kind: 'box' },
      { x: 32, y: 57, w: 36, h: 8, label: 'Run quota bar', note: 'fills from before to after', kind: 'box' },
      { x: 34, y: 67, w: 32, h: 10, label: 'SUCCESS / FAILED', note: 'verdict stamp', kind: 'text' },
      { x: 40, y: 80, w: 20, h: 8, label: 'Continue', kind: 'button' },
    ],
    states: ['Confirm during the count-up skips to the end; Continue appears only after the stamp.', 'Day 3: the verdict shows the quota check (QUOTA MET → boss, QUOTA MISSED → game over).'],
  },

  'card-draw': {
    title: 'Card draw (overlay)',
    regions: [
      { x: 0, y: 0, w: 100, h: 100, label: '', kind: 'overlay' },
      { x: 30, y: 5, w: 40, h: 8, label: 'Take one card', kind: 'text' },
      { x: 12, y: 20, w: 22, h: 50, label: 'Card 1', note: 'theme · CLEAN · effect', kind: 'panel' },
      { x: 39, y: 20, w: 22, h: 50, label: 'Card 2', note: 'theme · GAMBLE · effect + price', kind: 'panel' },
      { x: 66, y: 20, w: 22, h: 50, label: 'Card 3', note: 'theme · CLEAN · effect', kind: 'panel' },
      { x: 16, y: 72, w: 14, h: 6, label: '1', kind: 'text' },
      { x: 43, y: 72, w: 14, h: 6, label: '2', kind: 'text' },
      { x: 70, y: 72, w: 14, h: 6, label: '3', kind: 'text' },
      { x: 40, y: 83, w: 20, h: 9, label: 'Reroll $30', note: 'price rises per reroll', kind: 'button' },
      { x: 76, y: 85, w: 22, h: 8, label: 'Cash $140', kind: 'text' },
    ],
    states: ['Hover / focus lifts a card. Pick with click, 1 / 2 / 3, or D-pad + A.', 'Reroll is locked (dashed) when cash < price; it disappears after a card is taken.', 'No skip: the overlay closes only when a card is taken (D-065).'],
  },

  'trial-select': {
    title: 'Choose your trial (Day 2–3)',
    regions: [
      { x: 30, y: 5, w: 40, h: 8, label: 'Choose your trial', kind: 'text' },
      { x: 10, y: 18, w: 24, h: 58, label: 'Calm shift', note: 'Danger + · Value ++ · Intensity +', kind: 'panel' },
      { x: 38, y: 18, w: 24, h: 58, label: 'Stormy shift', note: 'Danger ++ · Value ++ · Intensity ++', kind: 'panel' },
      { x: 66, y: 18, w: 24, h: 58, label: 'Thunder shift', note: 'Danger +++ · Value +++ · Intensity ++', kind: 'panel' },
      { x: 20, y: 80, w: 60, h: 10, label: 'Info line', note: 'plain-language effect of the focused dial', kind: 'box' },
    ],
    states: ['Pick with click, 1 / 2 / 3, or D-pad + A; the shift loads at once.', 'Back (Esc / B) returns to the Garage hub.'],
  },

  'shift-hud': {
    title: 'Shift HUD',
    world: true,
    regions: [
      { x: 2, y: 3, w: 30, h: 7, label: 'Time bar', note: '→ OVERTIME label at 0', kind: 'box' },
      { x: 2, y: 11, w: 30, h: 6, label: 'Trial dials', note: 'D++ V++ I+ (Day 2–3)', kind: 'text' },
      { x: 70, y: 3, w: 28, h: 7, label: 'HP bar · 10 segments', kind: 'box' },
      { x: 92, y: 11, w: 6, h: 9, label: 'Shield', note: 'refill ring', kind: 'box' },
      { x: 2, y: 86, w: 22, h: 10, label: 'Today $86', note: 'counts up on delivery', kind: 'box' },
      { x: 76, y: 87, w: 22, h: 8, label: 'Nitro ▮▮▯', kind: 'box' },
      { x: 45, y: 4, w: 10, h: 10, label: '↑', note: 'direction arrow', kind: 'box' },
      { x: 40, y: 44, w: 14, h: 14, label: 'Van', kind: 'world' },
      { x: 62, y: 30, w: 10, h: 12, label: 'Marker', note: 'type · $ · skulls', kind: 'world' },
      { x: 20, y: 58, w: 10, h: 12, label: 'Strike ring', note: 'ground warning', kind: 'world' },
      { x: 28, y: 76, w: 44, h: 8, label: 'Dialogue strip', note: 'barks and tutorial lines', kind: 'box' },
    ],
    states: ['Boss day: "Today $" is replaced by the soul race bars (Hermes vs Iris, /12).', 'World elements (dotted) are drawn in the game view, not on the HUD layer.'],
  },

  'scam-reveal': {
    title: 'Scam reveal (pop-up in slow motion)',
    world: true,
    regions: [
      { x: 30, y: 22, w: 40, h: 40, label: '', kind: 'panel' },
      { x: 33, y: 26, w: 34, h: 8, label: 'Smuggled package · 25%', kind: 'text' },
      { x: 34, y: 37, w: 10, h: 18, label: 'Reel 1', kind: 'box' },
      { x: 45, y: 37, w: 10, h: 18, label: 'Reel 2', kind: 'box' },
      { x: 56, y: 37, w: 10, h: 18, label: 'Reel 3', kind: 'box' },
      { x: 33, y: 64, w: 34, h: 9, label: 'JACKPOT +$36 / BUST −2 HP', note: 'result line', kind: 'text' },
    ],
    states: ['Reels stop one by one; the result is the real roll. No input; the game resumes when it ends.'],
  },

  'wreck-popup': {
    title: 'Wreck pop-up',
    world: true,
    regions: [
      { x: 0, y: 0, w: 100, h: 100, label: '', kind: 'overlay' },
      { x: 30, y: 26, w: 40, h: 46, label: '', kind: 'panel' },
      { x: 33, y: 30, w: 34, h: 9, label: 'VAN WRECKED', kind: 'text' },
      { x: 33, y: 42, w: 34, h: 7, label: 'Overtime lost   −$40', kind: 'box' },
      { x: 33, y: 50, w: 34, h: 7, label: 'Half of today kept   $73', kind: 'box' },
      { x: 40, y: 61, w: 20, h: 8, label: 'Continue', kind: 'button' },
    ],
    states: ['Shown after the wreck scene (controls locked, slow motion, explosion). Continue ends the day → report.'],
  },

  pause: {
    title: 'Pause menu',
    world: true,
    regions: [
      { x: 0, y: 0, w: 100, h: 100, label: '', kind: 'overlay' },
      { x: 38, y: 14, w: 24, h: 8, label: 'Paused', kind: 'text' },
      { x: 40, y: 28, w: 20, h: 9, label: 'Resume', kind: 'button' },
      { x: 40, y: 40, w: 20, h: 9, label: 'Controls', kind: 'button' },
      { x: 40, y: 52, w: 20, h: 9, label: 'Settings', kind: 'button' },
      { x: 40, y: 64, w: 20, h: 9, label: 'Quit to menu', note: 'asks to confirm', kind: 'button' },
    ],
    states: ['Esc / Start opens and closes it; time, clock, storm and Iris are frozen.', 'Quit to menu → "Quit? This run will be lost." Yes / No (D-032).'],
  },

  'game-over': {
    title: 'Game-over summary',
    regions: [
      { x: 28, y: 8, w: 44, h: 10, label: 'RUN OVER', kind: 'text' },
      { x: 28, y: 20, w: 44, h: 10, label: 'Quota missed by $85', note: 'or: Iris won 12–9', kind: 'box' },
      { x: 28, y: 33, w: 44, h: 26, label: 'Run totals', note: 'money earned · day reached · HP lost · cards taken', kind: 'panel' },
      { x: 30, y: 66, w: 18, h: 9, label: 'Continue', note: '→ cutscene', kind: 'button' },
      { x: 52, y: 66, w: 18, h: 9, label: 'Main menu', kind: 'button' },
    ],
    states: ['After the game-over cutscene: Try again (new run, Day 1) or Main menu.'],
  },
}
