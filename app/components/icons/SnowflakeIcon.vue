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
    rotate: 0,
  },
  animate: {
    rotate: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
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
    <motion.svg
      :animate="controls"
      fill="none"
      :height="size"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :style="{ transformOrigin: 'center' }"
      :variants="PATH_VARIANTS"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m10 20-1.25-2.5L6 18" />
      <path d="M10 4 8.75 6.5 6 6" />
      <path d="m14 20 1.25-2.5L18 18" />
      <path d="m14 4 1.25 2.5L18 6" />
      <path d="m17 21-3-6h-4" />
      <path d="m17 3-3 6 1.5 3" />
      <path d="M2 12h6.5L10 9" />
      <path d="m20 10-1.5 2 1.5 2" />
      <path d="M22 12h-6.5L14 15" />
      <path d="m4 10 1.5 2L4 14" />
      <path d="m7 21 3-6-1.5-3" />
      <path d="m7 3 3 6h4" />
    </motion.svg>
  </div>
</template>
