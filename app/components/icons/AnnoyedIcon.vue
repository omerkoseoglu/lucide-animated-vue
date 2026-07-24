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
    transition: { duration: 0.2, ease: "easeOut" },
  },
  animate: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const mouthVariants: Variants = {
  normal: {
    scaleX: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  animate: {
    scaleX: 0.8,
    y: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const leftEyebrowVariants: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    x: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  animate: {
    rotate: 15,
    y: -1,
    x: -0.5,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

const rightEyebrowVariants: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    x: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  animate: {
    rotate: 15,
    y: -1,
    x: 0.5,
    transition: {
      duration: 0.25,
      ease: "easeOut",
      delay: 0.05,
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
      <motion.path :animate="controls" d="M8 15h8" initial="normal" :variants="mouthVariants" />
      <motion.path
        :animate="controls"
        d="M8 9h2"
        initial="normal"
        :variants="leftEyebrowVariants"
      />
      <motion.path
        :animate="controls"
        d="M14 9h2"
        initial="normal"
        :variants="rightEyebrowVariants"
      />
    </motion.svg>
  </div>
</template>
