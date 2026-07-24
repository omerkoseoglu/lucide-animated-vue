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

const RECT_VARIANTS: Variants = {
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

const CIRCLE_VARIANTS: Variants = {
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
const rectControls = useAnimationControls();
const circleControls = useAnimationControls();
const isControlled = ref(false);

function startAnimation() {
  isControlled.value = true;
  pathControls.start("animate");
  rectControls.start("animate");
  circleControls.start("animate");
}

function stopAnimation() {
  isControlled.value = true;
  pathControls.start("normal");
  rectControls.start("normal");
  circleControls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) {
    pathControls.start("animate");
    rectControls.start("animate");
    circleControls.start("animate");
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    pathControls.start("normal");
    rectControls.start("normal");
    circleControls.start("normal");
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
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
      <motion.rect
        :animate="rectControls"
        height="12"
        initial="normal"
        :variants="RECT_VARIANTS"
        width="4"
        x="2"
        y="9"
      />
      <motion.circle
        :animate="circleControls"
        cx="4"
        cy="4"
        initial="normal"
        r="2"
        :variants="CIRCLE_VARIANTS"
      />
    </svg>
  </div>
</template>
