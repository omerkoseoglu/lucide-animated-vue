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
      <motion.path
        :animate="controls"
        d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1"
        :initial="{ pathLength: 1 }"
        :variants="{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [0, 1],
            transition: { duration: 0.4, ease: 'linear' },
          },
        }"
      />
      <motion.path
        :animate="controls"
        d="M2 12c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1"
        :initial="{ pathLength: 1 }"
        :variants="{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [0, 1],
            transition: { duration: 0.4, ease: 'linear' },
          },
        }"
      />
      <motion.path
        :animate="controls"
        d="M2 18c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1"
        :initial="{ pathLength: 1 }"
        :variants="{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [0, 1],
            transition: { duration: 0.4, ease: 'linear' },
          },
        }"
      />
    </svg>
  </div>
</template>
