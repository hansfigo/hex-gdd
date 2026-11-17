<template>
  <figure class="wf" v-if="screen">
    <div class="wf-frame" :class="{ 'wf-world': screen.world }" role="img" :aria-label="`Graybox wireframe: ${screen.title}`">
      <div
        v-for="(r, i) in screen.regions"
        :key="i"
        class="wf-r"
        :class="r.kind || 'box'"
        :style="{ left: r.x + '%', top: r.y + '%', width: r.w + '%', height: r.h + '%' }"
      >
        <span class="wf-label">{{ r.label }}</span>
        <span v-if="r.note" class="wf-note">{{ r.note }}</span>
      </div>
    </div>
    <figcaption>
      <strong>{{ screen.title }}</strong> · graybox, 16:9, positions approximate
      <ul v-if="screen.states && screen.states.length">
        <li v-for="s in screen.states" :key="s">{{ s }}</li>
      </ul>
    </figcaption>
  </figure>
  <p v-else class="wf-missing">Unknown wireframe: {{ name }}</p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { screens } from './wireframes'

const props = defineProps<{ name: string }>()
const screen = computed(() => screens[props.name])
</script>

<style scoped>
.wf { margin: 20px 0 28px; max-width: 100%; overflow-x: auto; }
.wf-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  min-width: 640px;
  container-type: inline-size;
  background: var(--wf-bg);
  border: 1px solid var(--wf-line);
  border-radius: 6px;
  overflow: hidden;
  font-family: var(--vp-font-family-base);
}
.wf-frame.wf-world {
  background-image: repeating-linear-gradient(135deg, transparent 0 14px, var(--wf-hatch) 14px 15px);
}
.wf-r {
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 4px;
  text-align: center;
  border: 1px solid var(--wf-line);
  background: var(--wf-box);
  border-radius: 4px;
  overflow: hidden;
}
.wf-label { font-size: clamp(10px, 1.9cqw, 14px); font-weight: 600; color: var(--wf-text); line-height: 1.2; }
.wf-note { font-size: clamp(9px, 1.55cqw, 12px); color: var(--wf-text-2); line-height: 1.2; }
.wf-r.button { background: var(--wf-button); border-width: 1.5px; }
.wf-r.locked { background: var(--wf-box); border-style: dashed; }
.wf-r.locked .wf-label { color: var(--wf-text-2); }
.wf-r.overlay { background: var(--wf-overlay); border: none; border-radius: 0; }
.wf-r.panel { background: var(--wf-panel); }
.wf-r.text { background: transparent; border: none; }
.wf-r.world { background: transparent; border-style: dotted; }
figcaption { margin-top: 8px; font-size: 13px; color: var(--vp-c-text-2); }
figcaption ul { margin: 4px 0 0; padding-left: 18px; }
figcaption li { margin: 0; }
.wf-missing { color: var(--vp-c-danger-1); }
</style>
