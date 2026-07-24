<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      delay: 0.1 * custom,
      opacity: { delay: 0.1 * custom },
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
      <motion.path :animate="controls" d="M6 19V5" :variants="VARIANTS" />
      <motion.path :animate="controls" d="M10 19V6.8" :variants="VARIANTS" />
      <motion.path :animate="controls" d="M14 19v-7.8" :variants="VARIANTS" />
      <motion.path :animate="controls" d="M18 5v4" :variants="VARIANTS" />
      <motion.path :animate="controls" d="M18 19v-6" :variants="VARIANTS" />
      <motion.path :animate="controls" d="M22 19V9" :variants="VARIANTS" />
      <motion.path
        :animate="controls"
        :custom="2"
        d="M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65"
        :variants="VARIANTS"
      />
    </svg>
  </div>
</template>
