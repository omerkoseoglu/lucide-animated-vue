<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const FACE_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  animate: {
    rotate: [0, -3, 3, -2, 0],
    scale: [1, 1.04, 1, 1.02, 1],
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const MOUTH_VARIANTS: Variants = {
  normal: {
    scaleX: 1,
    scaleY: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  animate: {
    scaleX: [1, 1.25, 1],
    scaleY: [1, 1.15, 1],
    transition: { duration: 0.6, times: [0, 0.5, 1], ease: "easeInOut" },
  },
};

const EYE_VARIANTS: Variants = {
  normal: {
    scaleY: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  animate: (custom: number) => ({
    scaleY: [1, 0.1, 1],
    transition: { duration: 0.4, delay: custom * 0.15, ease: "easeInOut" },
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
  if (!isControlled.value) controls.start("animate");
}

function handleMouseLeave() {
  if (!isControlled.value) controls.start("normal");
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
      :variants="FACE_VARIANTS"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        :animate="controls"
        d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"
        initial="normal"
        :variants="MOUTH_VARIANTS"
      />
      <motion.path
        :animate="controls"
        :custom="0"
        d="M15 12h.01"
        initial="normal"
        :variants="EYE_VARIANTS"
      />
      <path
        d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"
      />
      <motion.path
        :animate="controls"
        :custom="1"
        d="M9 12h.01"
        initial="normal"
        :variants="EYE_VARIANTS"
      />
    </motion.svg>
  </div>
</template>
