<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

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

const LINE_VARIANTS: Variants = {
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

const rectControls = useAnimationControls();
const pathControls = useAnimationControls();
const lineControls = useAnimationControls();
const isControlled = ref(false);

function startAnimation() {
  isControlled.value = true;
  rectControls.start("animate");
  pathControls.start("animate");
  lineControls.start("animate");
}

function stopAnimation() {
  isControlled.value = true;
  rectControls.start("normal");
  pathControls.start("normal");
  lineControls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) {
    rectControls.start("animate");
    pathControls.start("animate");
    lineControls.start("animate");
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    rectControls.start("normal");
    pathControls.start("normal");
    lineControls.start("normal");
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
      <motion.rect
        :animate="rectControls"
        height="20"
        initial="normal"
        rx="5"
        ry="5"
        :variants="RECT_VARIANTS"
        width="20"
        x="2"
        y="2"
      />
      <motion.path
        :animate="pathControls"
        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
      <motion.line
        :animate="lineControls"
        initial="normal"
        :variants="LINE_VARIANTS"
        x1="17.5"
        x2="17.51"
        y1="6.5"
        y2="6.5"
      />
    </svg>
  </div>
</template>
