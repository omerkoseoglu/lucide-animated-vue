<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const LINE_VARIANTS: Variants = {
  initial: { opacity: 1 },
  fadeOut: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  fadeIn: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.4,
      ease: "easeInOut",
    },
  }),
};

const controls = useAnimationControls();
const isControlled = ref(false);

async function startAnimation() {
  isControlled.value = true;
  await controls.start("fadeOut");
  controls.start("fadeIn");
}

function stopAnimation() {
  isControlled.value = true;
  controls.start("initial");
}

defineExpose({ startAnimation, stopAnimation });

async function handleMouseEnter() {
  if (!isControlled.value) {
    await controls.start("fadeOut");
    controls.start("fadeIn");
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    controls.start("initial");
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
      <rect height="10" rx="2" ry="2" width="16" x="2" y="7" />
      <line x1="22" x2="22" y1="11" y2="13" />
      <motion.line
        :animate="controls"
        :custom="0"
        initial="initial"
        :variants="LINE_VARIANTS"
        x1="6"
        x2="6"
        y1="11"
        y2="13"
      />
    </motion.svg>
  </div>
</template>
