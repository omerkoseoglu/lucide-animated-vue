<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const controls = useAnimationControls();
const isControlled = ref(false);

const faceVariants: Variants = {
  normal: {
    scale: 1,
    rotate: 0,
    strokeWidth: 2,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  animate: {
    scale: [1, 1.15, 1.05, 1.1],
    rotate: [0, -3, 3, 0],
    strokeWidth: [2, 2.5, 2.5, 2.5],
    transition: {
      duration: 0.8,
      times: [0, 0.3, 0.6, 1],
      ease: "easeInOut",
    },
  },
};

const mouthVariants: Variants = {
  normal: {
    d: "M8 14s1.5 2 4 2 4-2 4-2",
    pathLength: 1,
    pathOffset: 0,
    strokeWidth: 2,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  animate: {
    d: "M7 13.5s2.5 3.5 5 3.5 5-3.5 5-3.5",
    pathLength: [0.3, 1, 1],
    pathOffset: [0, 0, 0],
    strokeWidth: 2.5,
    transition: {
      d: { duration: 0.4, ease: "easeOut" },
      pathLength: {
        duration: 0.5,
        times: [0, 0.5, 1],
        ease: "easeInOut",
      },
      delay: 0.1,
    },
  },
};

const eyeVariants: Variants = {
  normal: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  animate: {
    scale: [1, 1.5, 0.8, 1.2],
    opacity: [1, 1, 1, 1],
    transition: {
      duration: 0.5,
      times: [0, 0.3, 0.6, 1],
      ease: "easeInOut",
    },
  },
};

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
      initial="normal"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :variants="faceVariants"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle cx="12" cy="12" r="10" />
      <motion.path
        :animate="controls"
        d="M8 14s1.5 2 4 2 4-2 4-2"
        initial="normal"
        :variants="mouthVariants"
      />
      <motion.line
        :animate="controls"
        initial="normal"
        :variants="eyeVariants"
        x1="9"
        x2="9.01"
        y1="9"
        y2="9"
      />
      <motion.line
        :animate="controls"
        initial="normal"
        :variants="eyeVariants"
        x1="15"
        x2="15.01"
        y1="9"
        y2="9"
      />
    </motion.svg>
  </div>
</template>
