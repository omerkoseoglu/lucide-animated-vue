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
      initial="normal"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :transition="{
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
      }"
      :variants="{
        normal: {
          rotate: 0,
          scale: 1,
        },
        animate: {
          rotate: [2, 4, -2, 0],
          scale: [1.05, 0.95, 1.02, 1],
        },
      }"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
      <motion.path
        :animate="controls"
        d="M7 11V7a5 5 0 0 1 10 0v4"
        initial="normal"
        :transition="{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }"
        :variants="{
          normal: {
            pathLength: 0.8,
          },
          animate: {
            pathLength: 1,
          },
        }"
      />
    </motion.svg>
  </div>
</template>
