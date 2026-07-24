<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      delay: 0.15 * custom,
      opacity: { delay: 0.1 * custom },
    },
  }),
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
        :custom="0"
        cx="12"
        cy="4.5"
        r="2.5"
        :variants="VARIANTS"
      />
      <motion.path :animate="controls" :custom="1" d="m10.2 6.3-3.9 3.9" :variants="VARIANTS" />
      <motion.circle
        :animate="controls"
        :custom="0"
        cx="4.5"
        cy="12"
        r="2.5"
        :variants="VARIANTS"
      />
      <motion.path :animate="controls" :custom="2" d="M7 12h10" :variants="VARIANTS" />
      <motion.circle
        :animate="controls"
        :custom="0"
        cx="19.5"
        cy="12"
        r="2.5"
        :variants="VARIANTS"
      />
      <motion.path :animate="controls" :custom="3" d="m13.8 17.7 3.9-3.9" :variants="VARIANTS" />
      <motion.circle
        :animate="controls"
        :custom="0"
        cx="12"
        cy="19.5"
        r="2.5"
        :variants="VARIANTS"
      />
    </svg>
  </div>
</template>
