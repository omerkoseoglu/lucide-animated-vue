<script setup lang="ts">
import type { Transition, Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const TRANSITION: Transition = {
  duration: 0.5,
  ease: "easeInOut",
  repeat: 1,
};

const Y_VARIANTS: Variants = {
  normal: {
    scale: 1,
    rotate: 0,
    opacity: 1,
  },
  animate: {
    scaleY: [1, 1.5, 1],
    opacity: [1, 0.8, 1],
  },
};

const X_VARIANTS: Variants = {
  normal: {
    scale: 1,
    rotate: 0,
    opacity: 1,
  },
  animate: {
    scaleX: [1, 1.5, 1],
    opacity: [1, 0.8, 1],
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
      <rect height="16" rx="2" width="16" x="4" y="4" />
      <rect height="6" rx="1" width="6" x="9" y="9" />
      <motion.path
        :animate="controls"
        d="M15 2v2"
        :transition="TRANSITION"
        :variants="Y_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M15 20v2"
        :transition="TRANSITION"
        :variants="Y_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M2 15h2"
        :transition="TRANSITION"
        :variants="X_VARIANTS"
      />
      <motion.path :animate="controls" d="M2 9h2" :transition="TRANSITION" :variants="X_VARIANTS" />
      <motion.path
        :animate="controls"
        d="M20 15h2"
        :transition="TRANSITION"
        :variants="X_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M20 9h2"
        :transition="TRANSITION"
        :variants="X_VARIANTS"
      />
      <motion.path :animate="controls" d="M9 2v2" :transition="TRANSITION" :variants="Y_VARIANTS" />
      <motion.path
        :animate="controls"
        d="M9 20v2"
        :transition="TRANSITION"
        :variants="Y_VARIANTS"
      />
    </svg>
  </div>
</template>
