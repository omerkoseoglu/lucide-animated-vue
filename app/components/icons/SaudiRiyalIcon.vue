<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const SAUDI_RIYAL_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.6,
      opacity: { duration: 0.1 },
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
      <motion.path
        :animate="controls"
        d="m20 19.5-5.5 1.2"
        initial="normal"
        :variants="SAUDI_RIYAL_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2"
        initial="normal"
        :variants="SAUDI_RIYAL_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2"
        initial="normal"
        :variants="SAUDI_RIYAL_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M20 10 4 13.5"
        initial="normal"
        :variants="SAUDI_RIYAL_VARIANTS"
      />
    </svg>
  </div>
</template>
