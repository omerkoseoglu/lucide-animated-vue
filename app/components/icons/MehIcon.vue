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
    transition: { duration: 0.3, ease: "easeOut" },
  },
  animate: {
    scale: [1, 1.05, 0.98, 1.02],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 0.7,
      times: [0, 0.4, 0.7, 1],
      ease: "easeInOut",
    },
  },
};

const mouthVariants: Variants = {
  normal: {
    scaleX: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  animate: {
    scaleX: [1, 1.2, 0.9, 1.1],
    y: [0, 0.5, -0.5, 0],
    transition: {
      duration: 0.6,
      times: [0, 0.3, 0.6, 1],
      ease: "easeInOut",
      delay: 0.1,
    },
  },
};

const leftEyeVariants: Variants = {
  normal: {
    scale: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  animate: {
    scale: [1, 1.3, 1, 1.2],
    x: [0, -0.3, 0.3, 0],
    transition: {
      duration: 0.5,
      times: [0, 0.3, 0.6, 1],
      ease: "easeInOut",
    },
  },
};

const rightEyeVariants: Variants = {
  normal: {
    scale: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  animate: {
    scale: [1, 1.3, 1, 1.2],
    x: [0, 0.3, -0.3, 0],
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
      <circle cx="12" cy="12" r="10" />
      <motion.line
        :animate="controls"
        initial="normal"
        :variants="mouthVariants"
        x1="8"
        x2="16"
        y1="15"
        y2="15"
      />
      <motion.line
        :animate="controls"
        initial="normal"
        :variants="leftEyeVariants"
        x1="9"
        x2="9.01"
        y1="9"
        y2="9"
      />
      <motion.line
        :animate="controls"
        initial="normal"
        :variants="rightEyeVariants"
        x1="15"
        x2="15.01"
        y1="9"
        y2="9"
      />
    </motion.svg>
  </div>
</template>
