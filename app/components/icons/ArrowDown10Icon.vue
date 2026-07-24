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
      <motion.g
        :animate="controls"
        :custom="1"
        initial="normal"
        :transition="SWAP_TRANSITION"
        :variants="SWAP_VARIANTS"
      >
        <path d="M17 10V4h-2" />
        <path d="M15 10h4" />
      </motion.g>
      <motion.rect
        :animate="controls"
        :custom="-1"
        height="6"
        initial="normal"
        ry="2"
        :transition="SWAP_TRANSITION"
        :variants="SWAP_VARIANTS"
        width="4"
        x="15"
        y="14"
      />
    </svg>
  </div>
</template>
