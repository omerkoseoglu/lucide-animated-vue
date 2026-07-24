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
  stiffness: 160,
  damping: 17,
  mass: 1,
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
          animate: { translateY: -4 },
          normal: {
            translateX: 0,
            rotate: 0,
            translateY: 0,
          },
        }"
        :x1="22"
        :x2="2"
        :y1="6"
        :y2="6"
      />
      <motion.line
        :animate="controls"
        :transition="DEFAULT_TRANSITION"
        :variants="{
          animate: { translateY: 4 },
          normal: {
            translateX: 0,
            rotate: 0,
            translateY: 0,
          },
        }"
        :x1="22"
        :x2="2"
        :y1="18"
        :y2="18"
      />
      <motion.line
        :animate="controls"
        :transition="DEFAULT_TRANSITION"
        :variants="{
          animate: { translateX: -4 },
          normal: {
            translateX: 0,
            rotate: 0,
            translateY: 0,
          },
        }"
        :x1="6"
        :x2="6"
        :y1="2"
        :y2="22"
      />
      <motion.line
        :animate="controls"
        :transition="DEFAULT_TRANSITION"
        :variants="{
          animate: { translateX: 4 },
          normal: {
            translateX: 0,
            rotate: 0,
            translateY: 0,
          },
        }"
        :x1="18"
        :x2="18"
        :y1="2"
        :y2="22"
      />
    </svg>
  </div>
</template>
