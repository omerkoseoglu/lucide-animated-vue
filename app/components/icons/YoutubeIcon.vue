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
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: "linear",
      opacity: { duration: 0.1 },
    },
  },
};

const TRIANGLE_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: "linear",
      opacity: { duration: 0.1 },
    },
  },
};

const pathControls = useAnimationControls();
const triangleControls = useAnimationControls();
const isControlled = ref(false);

function startAnimation() {
  isControlled.value = true;
  pathControls.start("animate");
  triangleControls.start("animate");
}

function stopAnimation() {
  isControlled.value = true;
  pathControls.start("normal");
  triangleControls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) {
    pathControls.start("animate");
    triangleControls.start("animate");
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    pathControls.start("normal");
    triangleControls.start("normal");
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
        :animate="pathControls"
        d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="triangleControls"
        d="M10 15l5-3-5-3z"
        initial="normal"
        :variants="TRIANGLE_VARIANTS"
      />
    </svg>
  </div>
</template>
