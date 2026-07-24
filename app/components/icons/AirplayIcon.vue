<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls, easeInOut, easeOut } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const DURATION = 0.3;

const SCREEN_VARIANTS = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: { duration: DURATION },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: DURATION * 2,
      ease: easeInOut,
    },
  },
};

const TRIANGLE_VARIANTS = {
  normal: {
    scale: 1,
    opacity: 1,
    transition: { duration: DURATION },
  },
  animate: {
    scale: [0.6, 1.1, 1],
    opacity: [0, 1],
    transition: {
      duration: DURATION * 2,
      ease: easeOut,
    },
  },
};

const controls = useAnimationControls();
const isControlled = ref(false);

async function startAnimation() {
  isControlled.value = true;
  await controls.start("animate");
  controls.start("normal");
}

function stopAnimation() {
  isControlled.value = true;
  controls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });

async function handleMouseEnter() {
  if (!isControlled.value) {
    await controls.start("animate");
    controls.start("normal");
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
      <motion.path
        :animate="controls"
        d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"
        :variants="SCREEN_VARIANTS"
      />
      <motion.path :animate="controls" d="M12 15l5 6H7z" :variants="TRIANGLE_VARIANTS" />
    </svg>
  </div>
</template>
