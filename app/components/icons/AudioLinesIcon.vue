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
      <path d="M2 10v3" />
      <motion.path
        :animate="controls"
        d="M6 6v11"
        :variants="{
          normal: { d: 'M6 6v11' },
          animate: {
            d: ['M6 6v11', 'M6 10v3', 'M6 6v11'],
            transition: {
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
            },
          },
        }"
      />
      <motion.path
        :animate="controls"
        d="M10 3v18"
        :variants="{
          normal: { d: 'M10 3v18' },
          animate: {
            d: ['M10 3v18', 'M10 9v5', 'M10 3v18'],
            transition: {
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
            },
          },
        }"
      />
      <motion.path
        :animate="controls"
        d="M14 8v7"
        :variants="{
          normal: { d: 'M14 8v7' },
          animate: {
            d: ['M14 8v7', 'M14 6v11', 'M14 8v7'],
            transition: {
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
            },
          },
        }"
      />
      <motion.path
        :animate="controls"
        d="M18 5v13"
        :variants="{
          normal: { d: 'M18 5v13' },
          animate: {
            d: ['M18 5v13', 'M18 7v9', 'M18 5v13'],
            transition: {
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
            },
          },
        }"
      />
      <path d="M22 10v3" />
    </svg>
  </div>
</template>
