<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

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

const pathControls = useAnimationControls();
const isControlled = ref(false);

async function runPathIntro() {
  await pathControls.start("fadeOut");
  pathControls.start("fadeIn");
}

async function startAnimation() {
  isControlled.value = true;
  await runPathIntro();
}

function stopAnimation() {
  isControlled.value = true;
  pathControls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });

async function handleMouseEnter() {
  if (!isControlled.value) {
    await runPathIntro();
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    pathControls.start("normal");
  }
}
</script>

<template>
  <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <motion.svg
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
      <rect height="8" rx="2" width="20" x="2" y="14" />
      <path d="M6.01 18H6" />
      <path d="M10.01 18H10" />
      <path d="M15 10v4" />
      <motion.path
        :animate="pathControls"
        :custom="1"
        d="M17.84 7.17a4 4 0 0 0-5.66 0"
        :initial="{ opacity: 1 }"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="pathControls"
        :custom="2"
        d="M20.66 4.34a8 8 0 0 0-11.31 0"
        :initial="{ opacity: 1 }"
        :variants="PATH_VARIANTS"
      />
    </motion.svg>
  </div>
</template>
