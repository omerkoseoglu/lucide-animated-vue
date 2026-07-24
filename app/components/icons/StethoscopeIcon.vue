<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const DURATION = 0.25;

const CALCULATE_DELAY = (i: number) => {
  return i === 0 ? 0.1 : i * DURATION + 0.1;
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
        d="M11 2v2"
        :transition="{
          duration: DURATION,
          delay: CALCULATE_DELAY(2),
          opacity: { delay: CALCULATE_DELAY(2) },
        }"
        :variants="{
          normal: {
            pathLength: 1,
            pathOffset: 0,
            opacity: 1,
            transition: { delay: 0 },
          },
          animate: {
            pathOffset: [1, 0],
            pathLength: [0, 1],
            opacity: [0, 1],
          },
        }"
      />
      <motion.path
        :animate="controls"
        d="M5 2v2"
        :transition="{
          duration: DURATION,
          delay: CALCULATE_DELAY(2),
          opacity: { delay: CALCULATE_DELAY(2) },
        }"
        :variants="{
          normal: {
            pathLength: 1,
            pathOffset: 0,
            opacity: 1,
            transition: { delay: 0 },
          },
          animate: {
            pathOffset: [1, 0],
            pathLength: [0, 1],
            opacity: [0, 1],
          },
        }"
      />
      <motion.path
        :animate="controls"
        d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"
        :transition="{
          duration: DURATION,
          delay: CALCULATE_DELAY(2),
          opacity: { delay: CALCULATE_DELAY(2) },
        }"
        :variants="{
          normal: {
            pathLength: 1,
            pathOffset: 0,
            opacity: 1,
            transition: { delay: 0 },
          },
          animate: {
            pathLength: [0, 1],
            pathOffset: [1, 0],
            opacity: [0, 1],
          },
        }"
      />
      <motion.path
        :animate="controls"
        d="M8 15a6 6 0 0 0 12 0v-3"
        :transition="{
          duration: DURATION,
          delay: CALCULATE_DELAY(1),
          opacity: { delay: CALCULATE_DELAY(1) },
        }"
        :variants="{
          normal: {
            pathLength: 1,
            pathOffset: 0,
            opacity: 1,
            transition: { delay: 0 },
          },
          animate: {
            pathOffset: [1, 0],
            pathLength: [0, 1],
            opacity: [0, 1],
          },
        }"
      />
      <motion.circle
        :animate="controls"
        cx="20"
        cy="10"
        r="2"
        :transition="{
          duration: DURATION,
          delay: CALCULATE_DELAY(0),
          opacity: { delay: CALCULATE_DELAY(0) },
        }"
        :variants="{
          normal: { pathLength: 1, opacity: 1, transition: { delay: 0 } },
          animate: {
            pathLength: [0, 1],
            opacity: [0, 1],
          },
        }"
      />
    </svg>
  </div>
</template>
