<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const STAMP_VARIANTS: Variants = {
  normal: {
    translateY: 0,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
  animate: {
    translateY: [0, 4, 4, -1, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      times: [0, 0.35, 0.65, 0.82, 1],
    },
  },
};

const INK_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.4 },
  },
  animate: {
    opacity: [1, 0.4, 1.4, 1],
    scaleX: [1, 0.85, 0.85, 1],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      times: [0, 0.35, 0.65, 1],
    },
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
      <motion.path
        :animate="controls"
        d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13"
        initial="normal"
        :variants="STAMP_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z"
        initial="normal"
        :variants="STAMP_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M5 22h14"
        initial="normal"
        :style="{ transformOrigin: '12px 22px' }"
        :variants="INK_VARIANTS"
      />
    </svg>
  </div>
</template>
