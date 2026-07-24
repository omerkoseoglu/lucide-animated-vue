<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const HEART_DRAW_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 },
  draw: { pathLength: [0, 1], opacity: [0, 1] },
};

const HEART_PULSE_VARIANTS: Variants = {
  normal: { scale: 1 },
  pulse: { scale: [1, 1.08, 1] },
};

const LINE_VARIANTS: Variants = {
  normal: { pathLength: 1, pathOffset: 0, opacity: 1 },
  animate: { pathLength: [0, 1], pathOffset: [1, 0], opacity: [0, 1] },
};

const heartDrawControls = useAnimationControls();
const heartPulseControls = useAnimationControls();
const lineControls = useAnimationControls();
const isControlled = ref(false);

async function startAnimation() {
  isControlled.value = true;
  heartDrawControls.start("hidden", { duration: 0 });
  await lineControls.start("animate", {
    duration: 0.6,
    ease: "linear",
    opacity: { duration: 0.1 },
  });
  await heartDrawControls.start("draw", {
    duration: 0.5,
    ease: "easeOut",
    opacity: { duration: 0.1 },
  });
  heartPulseControls.start("pulse", {
    duration: 0.9,
    repeat: 1,
    ease: "easeInOut",
  });
}

function stopAnimation() {
  isControlled.value = true;
  heartDrawControls.start("normal", { duration: 0.3 });
  heartPulseControls.start("normal", { duration: 0.3 });
  lineControls.start("normal", { duration: 0.3 });
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) {
    startAnimation();
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    stopAnimation();
  }
}
</script>

<template>
  <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <svg
      fill="none"
      :height="size"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        :animate="heartPulseControls"
        :style="{ originX: '12px', originY: '12px' }"
        :variants="HEART_PULSE_VARIANTS"
      >
        <motion.path
          :animate="heartDrawControls"
          d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
          :variants="HEART_DRAW_VARIANTS"
        />
      </motion.g>
      <motion.path
        :animate="lineControls"
        d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"
        :variants="LINE_VARIANTS"
      />
    </svg>
  </div>
</template>
