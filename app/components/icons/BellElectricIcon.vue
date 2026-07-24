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
    <motion.svg
      :animate="controls"
      fill="none"
      :height="size"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :style="{ transformBox: 'fill-box', transformOrigin: '50% 50%' }"
      :transition="{ duration: 0.9 }"
      :variants="{
        normal: { rotate: 0, translateX: 0, translateY: 0 },
        animate: {
          rotate: [0, -12, 12, -8, 8, 0],
          translateX: [0, -1.5, 1.5, -1, 1, 0],
          translateY: [0, -1, 1, -0.5, 0.5, 0],
        },
      }"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.518 17.347A7 7 0 0 1 14 19" />
      <motion.path
        :animate="controls"
        d="M18.8 4A11 11 0 0 1 20 9"
        :style="{ transformBox: 'fill-box', originX: '50%', originY: '50%' }"
        :transition="{ duration: 0.9 }"
        :variants="{
          normal: { translateX: 0, translateY: 0, rotate: 0 },
          animate: {
            translateX: [0, -0.8, 0.8, -0.6, 0.6, 0],
            translateY: [0, -0.5, 0.5, -0.3, 0.3, 0],
            rotate: [0, -6, 6, -4, 4, 0],
          },
        }"
      />
      <motion.path
        :animate="controls"
        d="M9 9h.01"
        :style="{ transformBox: 'fill-box', originX: '50%', originY: '50%' }"
        :transition="{ duration: 0.75 }"
        :variants="{
          normal: { translateX: 0, translateY: 0, rotate: 0, scale: 1 },
          animate: {
            translateX: [0, -1.6, 1.6, -1.2, 1.2, 0],
            translateY: [0, -1.2, 1.2, -0.8, 0.8, 0],
            rotate: [0, -10, 10, -7, 7, 0],
            scale: [1, 1.08, 0.95, 1.06, 0.98, 1],
          },
        }"
      />
      <circle cx="9" cy="9" r="7" />
      <rect height="6" rx="2" width="10" x="4" y="16" />
      <circle cx="20" cy="16" r="2" />
    </motion.svg>
  </div>
</template>
