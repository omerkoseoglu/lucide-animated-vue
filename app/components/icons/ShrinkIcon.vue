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
  stiffness: 250,
  damping: 25,
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
        d="M9 4.2V9m0 0H4.2M9 9 3 3"
        :transition="DEFAULT_TRANSITION"
        :variants="{
          normal: { translateX: '0%', translateY: '0%' },
          animate: { translateX: '1px', translateY: '1px' },
        }"
      />
      <motion.path
        :animate="controls"
        d="M15 4.2V9m0 0h4.8M15 9l6-6"
        :transition="DEFAULT_TRANSITION"
        :variants="{
          normal: { translateX: '0%', translateY: '0%' },
          animate: { translateX: '-1px', translateY: '1px' },
        }"
      />
      <motion.path
        :animate="controls"
        d="M9 19.8V15m0 0H4.2M9 15l-6 6"
        :transition="DEFAULT_TRANSITION"
        :variants="{
          normal: { translateX: '0%', translateY: '0%' },
          animate: { translateX: '1px', translateY: '-1px' },
        }"
      />
      <motion.path
        :animate="controls"
        d="m15 15 6 6m-6-6v4.8m0-4.8h4.8"
        :transition="DEFAULT_TRANSITION"
        :variants="{
          normal: { translateX: '0%', translateY: '0%' },
          animate: { translateX: '-1px', translateY: '-1px' },
        }"
      />
    </svg>
  </div>
</template>
