<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [0, 1, 0.5, 1],
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
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
      <motion.path :animate="controls" d="m7 7 10 10-5 5V2l5 5L7 17" :variants="PATH_VARIANTS" />
      <motion.line
        :animate="controls"
        :variants="{
          normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
          animate: {
            pathLength: [0, 1],
            opacity: [0, 1],
            pathOffset: [1, 0],
            transition: {
              duration: 0.4,
            },
          },
        }"
        x1="18"
        x2="21"
        y1="12"
        y2="12"
      />
      <motion.line
        :animate="controls"
        :variants="{
          normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
          animate: {
            pathLength: [0, 1],
            opacity: [0, 1],
            pathOffset: [-1, 0],
            transition: {
              duration: 0.2,
            },
          },
        }"
        x1="3"
        x2="6"
        y1="12"
        y2="12"
      />
    </svg>
  </div>
</template>
