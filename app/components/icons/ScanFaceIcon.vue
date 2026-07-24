<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const controls = useAnimationControls();
const isControlled = ref(false);

const faceVariants: Variants = {
  visible: { scale: 1 },
  hidden: {
    scale: 0.9,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const cornerVariants: Variants = {
  visible: { scale: 1, rotate: 0, opacity: 1 },
  hidden: {
    scale: 1.2,
    rotate: 45,
    opacity: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const mouthVariants: Variants = {
  visible: { scale: 1, opacity: 1 },
  hidden: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.3, delay: 0.1 },
  },
};

async function startAnimation() {
  isControlled.value = true;
  await controls.start("hidden");
  await controls.start("visible");
}

function stopAnimation() {
  isControlled.value = true;
  controls.start("visible");
}

defineExpose({ startAnimation, stopAnimation });

async function handleMouseEnter() {
  if (!isControlled.value) {
    await controls.start("hidden");
    await controls.start("visible");
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
      :animate="controls"
      fill="none"
      :height="size"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :variants="faceVariants"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        :animate="controls"
        d="M3 7V5a2 2 0 0 1 2-2h2"
        initial="visible"
        :variants="cornerVariants"
      />
      <motion.path
        :animate="controls"
        d="M17 3h2a2 2 0 0 1 2 2v2"
        initial="visible"
        :variants="cornerVariants"
      />
      <motion.path
        :animate="controls"
        d="M21 17v2a2 2 0 0 1-2 2h-2"
        initial="visible"
        :variants="cornerVariants"
      />
      <motion.path
        :animate="controls"
        d="M7 21H5a2 2 0 0 1-2-2v-2"
        initial="visible"
        :variants="cornerVariants"
      />
      <motion.path
        :animate="controls"
        d="M8 14s1.5 2 4 2 4-2 4-2"
        initial="visible"
        :variants="mouthVariants"
      />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </motion.svg>
  </div>
</template>
