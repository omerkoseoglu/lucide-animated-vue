<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const LINE_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
  },
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
      <motion.line
        :animate="controls"
        :transition="{ duration: 0.2 }"
        :variants="LINE_VARIANTS"
        x1="19"
        x2="10"
        y1="4"
        y2="4"
      />
      <motion.line
        :animate="controls"
        :transition="{ duration: 0.2 }"
        :variants="LINE_VARIANTS"
        x1="14"
        x2="5"
        y1="20"
        y2="20"
      />
      <motion.line
        :animate="controls"
        :transition="{
          delay: 0.1,
          duration: 0.4,
        }"
        :variants="{
          normal: { pathLength: 1, pathOffset: 0 },
          animate: {
            pathLength: [0, 1],
            pathOffset: [1, 0],
          },
        }"
        x1="15"
        x2="9"
        y1="4"
        y2="20"
      />
    </svg>
  </div>
</template>
