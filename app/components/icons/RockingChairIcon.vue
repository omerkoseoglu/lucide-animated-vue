<script setup lang="ts">
import type { Transition, Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 12,
  mass: 0.4,
};

const ROCKING_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [-5, 5, -5],
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror" as const,
      duration: 1.2,
      ease: "easeInOut",
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
    <motion.svg
      :animate="controls"
      fill="none"
      :height="size"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :style="{ originX: '10%', originY: '90%' }"
      :variants="ROCKING_VARIANTS"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.polyline
        :animate="controls"
        points="3.5 2 6.5 12.5 18 12.5"
        :transition="DEFAULT_TRANSITION"
      />
      <motion.line
        :animate="controls"
        :transition="DEFAULT_TRANSITION"
        x1="9.5"
        x2="5.5"
        y1="12.5"
        y2="20"
      />
      <motion.line
        :animate="controls"
        :transition="DEFAULT_TRANSITION"
        x1="15"
        x2="18.5"
        y1="12.5"
        y2="20"
      />
      <motion.path
        :animate="controls"
        d="M2.75 18a13 13 0 0 0 18.5 0"
        :transition="DEFAULT_TRANSITION"
      />
    </motion.svg>
  </div>
</template>
