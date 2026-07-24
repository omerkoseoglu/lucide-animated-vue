<script setup lang="ts">
import type { Transition } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 15,
  mass: 0.3,
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
        :transition="DEFAULT_TRANSITION"
        :variants="{
          normal: { x1: 3 },
          animate: { x1: 3 },
        }"
        x1="3"
        x2="21"
        y1="6"
        y2="6"
      />
      <motion.line
        :animate="controls"
        :transition="DEFAULT_TRANSITION"
        :variants="{
          normal: { x1: 9 },
          animate: { x1: 5 },
        }"
        x1="9"
        x2="21"
        y1="12"
        y2="12"
      />
      <motion.line
        :animate="controls"
        :transition="DEFAULT_TRANSITION"
        :variants="{
          normal: { x1: 7 },
          animate: { x1: 12 },
        }"
        x1="7"
        x2="21"
        y1="18"
        y2="18"
      />
    </svg>
  </div>
</template>
