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
    scale: [1, 1.15, 1, 1.1, 1.05],
    rotate: [0, 3, -2, 3, 0],
    strokeWidth: [2, 2.5, 2.5, 2.5, 2],
    transition: {
      duration: 1.2,
      times: [0, 0.2, 0.4, 0.6, 1],
      ease: "easeInOut",
      repeat: 0,
      repeatType: "reverse",
    },
  },
};

const mouthVariants: Variants = {
  normal: {
    d: "M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z",
    pathLength: 1,
    strokeWidth: 2,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  animate: {
    d: "M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z",
    pathLength: [0.7, 1, 1],
    strokeWidth: 2.5,
    scaleY: [1, 1.2, 1.1],
    y: [0, 0.5, 0.3],
    transition: {
      duration: 0.6,
      times: [0, 0.5, 1],
      ease: "easeInOut",
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
    scale: [1, 1.3, 1, 1.7],
    opacity: [1, 1, 1, 1],
    transition: {
      duration: 0.6,
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
      <circle cx="12" cy="12" r="10" />
      <motion.path :animate="controls" initial="normal" :variants="mouthVariants" />
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
