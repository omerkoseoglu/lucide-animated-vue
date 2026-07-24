<script setup lang="ts">
import type { Transition, Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const SWAP_TRANSITION: Transition = {
  type: "spring",
  stiffness: 240,
  damping: 24,
};

const SWAP_VARIANTS: Variants = {
  normal: {
    translateY: 0,
  },
  animate: (custom: number) => ({
    translateY: custom * 10,
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
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <motion.path
        :animate="controls"
        :custom="1"
        d="M15 4h5l-5 6h5"
        initial="normal"
        :transition="SWAP_TRANSITION"
        :variants="SWAP_VARIANTS"
      />
      <motion.g
        :animate="controls"
        :custom="-1"
        initial="normal"
        :transition="SWAP_TRANSITION"
        :variants="SWAP_VARIANTS"
      >
        <path d="M20 18h-5" />
        <path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
      </motion.g>
    </svg>
  </div>
</template>
