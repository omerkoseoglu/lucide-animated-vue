<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const PHONE_CALL_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    scale: 1,
  },
  animate: {
    rotate: [10, 20, -10, 10, 0],
    scale: [1, 1.1, 1.2, 1.1, 1],
    transition: {
      duration: 0.9,
      ease: "easeInOut",
    },
  },
};

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  fadeOut: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
  fadeIn: (i: number) => ({
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: i * 0.1,
    },
  }),
};

const svgControls = useAnimationControls();
const pathControls = useAnimationControls();
const isControlled = ref(false);

async function runPathIntro() {
  await pathControls.start("fadeOut");
  pathControls.start("fadeIn");
}

async function startAnimation() {
  isControlled.value = true;
  await Promise.all([svgControls.start("animate"), runPathIntro()]);
}

function stopAnimation() {
  isControlled.value = true;
  svgControls.start("normal");
  pathControls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });

async function handleMouseEnter() {
  if (!isControlled.value) {
    await Promise.all([svgControls.start("animate"), runPathIntro()]);
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    svgControls.start("normal");
    pathControls.start("normal");
  }
}
</script>

<template>
  <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <motion.svg
      :animate="svgControls"
      fill="none"
      :height="size"
      initial="normal"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :style="{ overflow: 'visible' }"
      :variants="PHONE_CALL_VARIANTS"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        :animate="pathControls"
        :custom="2"
        d="M13 2a9 9 0 0 1 9 9"
        :initial="{ opacity: 1 }"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="pathControls"
        :custom="1"
        d="M13 6a5 5 0 0 1 5 5"
        :initial="{ opacity: 1 }"
        :variants="PATH_VARIANTS"
      />
      <path
        d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      />
    </motion.svg>
  </div>
</template>
