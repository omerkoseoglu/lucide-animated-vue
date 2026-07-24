<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const LINES_CONTAINER_VARIANTS: Variants = {
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0 },
  },
  hidden: {
    transition: { staggerChildren: 0.06, staggerDirection: -1 },
  },
};

const LINE_VARIANTS: Variants = {
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.35, ease: "linear" },
  },
  hidden: {
    pathLength: 0,
    opacity: 1,
    transition: { duration: 0.2, ease: "linear" },
  },
};

const controls = useAnimationControls();
const isControlled = ref(false);

async function replayLines() {
  await controls.start("hidden");
  await controls.start("visible");
}

function startAnimation() {
  isControlled.value = true;
  replayLines();
}

function stopAnimation() {
  isControlled.value = true;
  controls.start("visible");
}

defineExpose({ startAnimation, stopAnimation });

async function handleMouseEnter() {
  if (!isControlled.value) {
    await replayLines();
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    controls.start("visible");
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
      <path
        d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"
      />
      <motion.g :animate="controls" initial="visible" :variants="LINES_CONTAINER_VARIANTS">
        <motion.path d="M8 8H14" :variants="LINE_VARIANTS" />
        <motion.path d="M8 12H16" :variants="LINE_VARIANTS" />
        <motion.path d="M8 16H13" :variants="LINE_VARIANTS" />
      </motion.g>
    </motion.svg>
  </div>
</template>
