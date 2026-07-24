<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const SATELLITE_DISH_VARIANTS: Variants = {
  normal: {
    y: 0,
    rotate: 0,
  },
  animate: {
    y: [0, 1, 2, 0],
    rotate: [0, -15, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    transition: {
      duration: 1.1,
    },
  },
  fadeOut: {
    opacity: 0,
    transition: { duration: 1.1 },
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
      :variants="SATELLITE_DISH_VARIANTS"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 10a7.31 7.31 0 0 0 10 10Z" />
      <path d="m9 15 3-3" />
      <motion.path
        :animate="pathControls"
        :custom="1"
        d="M17 13a6 6 0 0 0-6-6"
        :initial="{ opacity: 1 }"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="pathControls"
        :custom="2"
        d="M21 13A10 10 0 0 0 11 3"
        :initial="{ opacity: 1 }"
        :variants="PATH_VARIANTS"
      />
    </motion.svg>
  </div>
</template>
