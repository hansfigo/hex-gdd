<template>
  <figure class="core-loop">
    <svg viewBox="0 0 680 840" role="img" aria-labelledby="cl-title cl-desc">
      <title id="cl-title">Hermes Express core loop</title>
      <desc id="cl-desc">One run: Garage, choose trial, 60 second shift, overtime, end-of-day report. Day 1 to 2 loop back to the Garage; Day 3 checks the quota. Meeting it leads to the Charon boss race; missing it or losing the race leads to game over and back to Day 1. A wreck at 0 HP fails the day and goes to the report.</desc>
      <defs>
        <marker id="cl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </marker>
      </defs>

      <g v-for="n in nodes" :key="n.title" :class="['node', n.kind]">
        <rect :x="n.x" :y="n.y" width="240" height="56" rx="8" />
        <text class="title" :x="n.x + 120" :y="n.y + 19">{{ n.title }}</text>
        <text class="sub" :x="n.x + 120" :y="n.y + 38">{{ n.sub }}</text>
      </g>

      <g class="lines">
        <line x1="180" y1="96" x2="180" y2="134" marker-end="url(#cl-arrow)" />
        <line x1="180" y1="192" x2="180" y2="230" marker-end="url(#cl-arrow)" />
        <line x1="180" y1="288" x2="180" y2="326" marker-end="url(#cl-arrow)" />
        <line x1="180" y1="384" x2="180" y2="422" marker-end="url(#cl-arrow)" />
        <line x1="180" y1="480" x2="180" y2="518" marker-end="url(#cl-arrow)" />
        <path d="M300 260 L340 260 L340 356" />
        <line x1="300" y1="356" x2="378" y2="356" marker-end="url(#cl-arrow)" />
        <path d="M500 384 L500 452 L302 452" marker-end="url(#cl-arrow)" />
        <line x1="300" y1="548" x2="378" y2="548" marker-end="url(#cl-arrow)" />
        <path d="M60 548 L30 548" />
        <path d="M60 740 L30 740 L30 68 L58 68" marker-end="url(#cl-arrow)" />
        <line x1="500" y1="576" x2="500" y2="614" marker-end="url(#cl-arrow)" />
        <path d="M420 576 L420 596 L180 596 L180 710" marker-end="url(#cl-arrow)" />
        <line x1="500" y1="672" x2="500" y2="710" marker-end="url(#cl-arrow)" />
        <path d="M380 644 L340 644 L340 740 L302 740" marker-end="url(#cl-arrow)" />
      </g>

      <g class="labels">
        <text x="190" y="308">clock hits 0</text>
        <text x="348" y="300">HP hits 0</text>
        <text x="340" y="536" text-anchor="middle">Day 3</text>
        <text x="510" y="595">yes</text>
        <text x="192" y="616">no</text>
        <text x="510" y="691">Hermes wins</text>
        <text x="332" y="694" text-anchor="end">Iris wins</text>
      </g>

      <g class="legend">
        <rect class="sw gray" x="60" y="804" width="12" height="12" rx="2" /><text x="80" y="810">Normal step</text>
        <rect class="sw coral" x="220" y="804" width="12" height="12" rx="2" /><text x="240" y="810">Risk or failure</text>
        <rect class="sw teal" x="400" y="804" width="12" height="12" rx="2" /><text x="420" y="810">Progress and win</text>
      </g>
    </svg>
  </figure>
</template>

<script setup lang="ts">
const nodes = [
  { kind: 'gray', x: 60, y: 40, title: 'Garage', sub: 'Repair, take card, relics' },
  { kind: 'gray', x: 60, y: 136, title: 'Choose trial', sub: 'Day 2–3; Day 1 fixed' },
  { kind: 'gray', x: 60, y: 232, title: 'Shift, 60 s', sub: 'Pick up, deliver, earn' },
  { kind: 'coral', x: 60, y: 328, title: 'Overtime', sub: '×1.5 pay, storm escalates' },
  { kind: 'gray', x: 60, y: 424, title: 'End-of-day report', sub: 'Back at HQ, press E' },
  { kind: 'gray', x: 60, y: 520, title: 'Which day?', sub: 'Day 1–2 loop, Day 3 on' },
  { kind: 'coral', x: 380, y: 328, title: 'Wreck, HP 0', sub: 'Day failed, 50% kept' },
  { kind: 'gray', x: 380, y: 520, title: 'Quota met?', sub: 'Run profit ≥ quota' },
  { kind: 'teal', x: 380, y: 616, title: "Boss: Charon's race", sub: 'First to 12 souls' },
  { kind: 'teal', x: 380, y: 712, title: 'Ending', sub: 'To be continued' },
  { kind: 'coral', x: 60, y: 712, title: 'Game over', sub: 'Cause, totals, back to Day 1' },
]
</script>

<style scoped>
.core-loop { margin: 24px 0; max-width: 680px; }
svg { width: 100%; height: auto; font-family: var(--vp-font-family-base); }
.node rect { stroke-width: 0.75; }
.node.gray rect { fill: var(--gdd-gray-bg); stroke: var(--gdd-gray-line); }
.node.coral rect { fill: var(--gdd-coral-bg); stroke: var(--gdd-coral-line); }
.node.teal rect { fill: var(--gdd-teal-bg); stroke: var(--gdd-teal-line); }
.node text { text-anchor: middle; dominant-baseline: central; }
.node .title { font-size: 14px; font-weight: 600; }
.node .sub { font-size: 12px; opacity: 0.8; }
.node.gray text { fill: var(--gdd-gray-fg); }
.node.coral text { fill: var(--gdd-coral-fg); }
.node.teal text { fill: var(--gdd-teal-fg); }
.lines line, .lines path { fill: none; stroke: var(--vp-c-text-2); stroke-width: 1.25; }
.labels text, .legend text { font-size: 12px; fill: var(--vp-c-text-2); dominant-baseline: central; }
.legend .sw { stroke-width: 0.75; }
.legend .gray { fill: var(--gdd-gray-bg); stroke: var(--gdd-gray-line); }
.legend .coral { fill: var(--gdd-coral-bg); stroke: var(--gdd-coral-line); }
.legend .teal { fill: var(--gdd-teal-bg); stroke: var(--gdd-teal-line); }
</style>
