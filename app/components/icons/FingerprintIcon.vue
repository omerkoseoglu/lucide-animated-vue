<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const PATH_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    opacity: [0, 0, 1, 1, 1],
    pathLength: [0.1, 0.3, 0.5, 0.7, 0.9, 1],
    transition: {
      opacity: { duration: 0.5 },
      pathLength: {
        duration: 2,
      },
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
      <path
        d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"
        fill="none"
        :stroke-opacity="0.4"
        stroke-width="2"
      />
      <motion.path
        :animate="controls"
        d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"
        :variants="PATH_VARIANTS"
      />
      <path d="M14 13.12c0 2.38 0 6.38-1 8.88" fill="none" :stroke-opacity="0.4" stroke-width="2" />
      <motion.path
        :animate="controls"
        d="M14 13.12c0 2.38 0 6.38-1 8.88"
        :variants="PATH_VARIANTS"
      />
      <path
        d="M17.29 21.02c.12-.6.43-2.3.5-3.02"
        fill="none"
        :stroke-opacity="0.4"
        stroke-width="2"
      />
      <motion.path
        :animate="controls"
        d="M17.29 21.02c.12-.6.43-2.3.5-3.02"
        :variants="PATH_VARIANTS"
      />
      <path d="M2 12a10 10 0 0 1 18-6" fill="none" :stroke-opacity="0.4" stroke-width="2" />
      <motion.path :animate="controls" d="M2 12a10 10 0 0 1 18-6" :variants="PATH_VARIANTS" />
      <path d="M2 16h.01" fill="none" :stroke-opacity="0.4" stroke-width="2" />
      <motion.path :animate="controls" d="M2 16h.01" :variants="PATH_VARIANTS" />
      <path d="M21.8 16c.2-2 .131-5.354 0-6" fill="none" :stroke-opacity="0.4" stroke-width="2" />
      <motion.path :animate="controls" d="M21.8 16c.2-2 .131-5.354 0-6" :variants="PATH_VARIANTS" />
      <path
        d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"
        fill="none"
        :stroke-opacity="0.4"
        stroke-width="2"
      />
      <motion.path
        :animate="controls"
        d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"
        :variants="PATH_VARIANTS"
      />
      <path d="M8.65 22c.21-.66.45-1.32.57-2" fill="none" :stroke-opacity="0.4" stroke-width="2" />
      <motion.path
        :animate="controls"
        d="M8.65 22c.21-.66.45-1.32.57-2"
        :variants="PATH_VARIANTS"
      />
      <path d="M9 6.8a6 6 0 0 1 9 5.2v2" fill="none" :stroke-opacity="0.4" stroke-width="2" />
      <motion.path :animate="controls" d="M9 6.8a6 6 0 0 1 9 5.2v2" :variants="PATH_VARIANTS" />
    </svg>
  </div>
</template>
