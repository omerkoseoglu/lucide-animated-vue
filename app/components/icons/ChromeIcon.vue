<script setup lang="ts">
import type { Transition, Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const TRANSITION: Transition = {
  duration: 0.3,
  opacity: { delay: 0.15 },
};

const VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      ...TRANSITION,
      delay: 0.1 * custom,
    },
  }),
};

const controls = useAnimationControls();
const isControlled = ref(false);

function startAnimation() {
  isControlled.value = true;
  controls.start("animate");
}

function stopAnimation() {
  isControlled.value = true;
  controls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) {
    controls.start("animate");
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    controls.start("normal");
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
      <circle cx="12" cy="12" r="10" />
      <motion.circle :animate="controls" :custom="0" cx="12" cy="12" r="4" :variants="VARIANTS" />
      <motion.line
        :animate="controls"
        :custom="3"
        :variants="VARIANTS"
        x1="21.17"
        x2="12"
        y1="8"
        y2="8"
      />
      <motion.line
        :animate="controls"
        :custom="3"
        :variants="VARIANTS"
        x1="3.95"
        x2="8.54"
        y1="6.06"
        y2="14"
      />
      <motion.line
        :animate="controls"
        :custom="3"
        :variants="VARIANTS"
        x1="10.88"
        x2="15.46"
        y1="21.94"
        y2="14"
      />
    </svg>
  </div>
</template>
