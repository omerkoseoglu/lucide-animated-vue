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
      <path d="M12 8V4H8" />
      <rect height="12" rx="2" width="16" x="4" y="8" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <motion.line
        :animate="controls"
        initial="normal"
        :variants="{
          normal: { y1: 13, y2: 15 },
          animate: {
            y1: [13, 14, 13],
            y2: [15, 14, 15],
            transition: {
              duration: 0.5,
              ease: 'easeInOut',
              delay: 0.2,
            },
          },
        }"
        :x1="15"
        :x2="15"
      />
      <motion.line
        :animate="controls"
        initial="normal"
        :variants="{
          normal: { y1: 13, y2: 15 },
          animate: {
            y1: [13, 14, 13],
            y2: [15, 14, 15],
            transition: {
              duration: 0.5,
              ease: 'easeInOut',
              delay: 0.2,
            },
          },
        }"
        :x1="9"
        :x2="9"
      />
    </svg>
  </div>
</template>
