<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

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

const circleControls = useAnimationControls();
const path1Controls = useAnimationControls();
const path2Controls = useAnimationControls();
const path3Controls = useAnimationControls();
const isControlled = ref(false);

function startAnimation() {
  isControlled.value = true;
  circleControls.start("animate");
  path1Controls.start("animate");
  path2Controls.start("animate");
  path3Controls.start("animate");
}

function stopAnimation() {
  isControlled.value = true;
  circleControls.start("normal");
  path1Controls.start("normal");
  path2Controls.start("normal");
  path3Controls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) {
    circleControls.start("animate");
    path1Controls.start("animate");
    path2Controls.start("animate");
    path3Controls.start("animate");
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    circleControls.start("normal");
    path1Controls.start("normal");
    path2Controls.start("normal");
    path3Controls.start("normal");
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
      <motion.circle
        :animate="circleControls"
        cx="12"
        cy="12"
        initial="normal"
        r="10"
        :variants="CIRCLE_VARIANTS"
      />
      <motion.path
        :animate="path1Controls"
        d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="path2Controls"
        d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="path3Controls"
        d="M8.56 2.75c4.37 6 6 9.42 8 17.72"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
    </svg>
  </div>
</template>
