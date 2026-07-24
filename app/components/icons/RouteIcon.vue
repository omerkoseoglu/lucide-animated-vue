<script setup lang="ts">
import type { Transition, Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const CIRCLE_TRANSITION: Transition = {
  duration: 0.3,
  delay: 0.1,
  opacity: { delay: 0.15 },
};

const CIRCLE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
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
      <motion.circle
        :animate="controls"
        cx="6"
        cy="19"
        r="3"
        :transition="CIRCLE_TRANSITION"
        :variants="CIRCLE_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"
        :transition="{ duration: 0.7, delay: 0.5, opacity: { delay: 0.5 } }"
        :variants="{
          normal: {
            pathLength: 1,
            opacity: 1,
            pathOffset: 0,
          },
          animate: {
            pathLength: [0, 1],
            opacity: [0, 1],
            pathOffset: [1, 0],
          },
        }"
      />
      <motion.circle
        :animate="controls"
        cx="18"
        cy="5"
        r="3"
        :transition="CIRCLE_TRANSITION"
        :variants="CIRCLE_VARIANTS"
      />
    </svg>
  </div>
</template>
