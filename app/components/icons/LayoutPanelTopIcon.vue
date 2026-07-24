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
      <motion.rect
        :animate="controls"
        height="7"
        initial="normal"
        rx="1"
        :variants="{
          normal: { opacity: 1, translateY: 0 },
          animate: {
            opacity: [0, 1],
            translateY: [-5, 0],
            transition: {
              opacity: { duration: 0.5, times: [0.2, 1] },
              duration: 0.5,
            },
          },
        }"
        width="18"
        x="3"
        y="3"
      />
      <motion.rect
        :animate="controls"
        height="7"
        initial="normal"
        rx="1"
        :variants="{
          normal: { opacity: 1, translateX: 0 },
          animate: {
            opacity: [0, 1],
            translateX: [-10, 0],
            transition: {
              opacity: { duration: 0.7, times: [0.5, 1] },
              translateX: { delay: 0.3 },
              duration: 0.5,
            },
          },
        }"
        width="7"
        x="3"
        y="14"
      />
      <motion.rect
        :animate="controls"
        height="7"
        initial="normal"
        rx="1"
        :variants="{
          normal: { opacity: 1, translateX: 0 },
          animate: {
            opacity: [0, 1],
            translateX: [10, 0],
            transition: {
              opacity: { duration: 0.8, times: [0.5, 1] },
              translateX: { delay: 0.4 },
              duration: 0.5,
            },
          },
        }"
        width="7"
        x="14"
        y="14"
      />
    </svg>
  </div>
</template>
