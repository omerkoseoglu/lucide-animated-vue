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
      <motion.rect
        :animate="controls"
        height="6"
        rx="2"
        :transition="DEFAULT_TRANSITION"
        :variants="{
          normal: { scaleY: 1 },
          animate: { scaleY: 0.8 },
        }"
        width="10"
        x="7"
        y="9"
      />
      <motion.path
        :animate="controls"
        d="M22 20H2"
        :transition="DEFAULT_TRANSITION"
        :variants="{
          normal: { translateY: 0, scaleX: 1 },
          animate: {
            translateY: -2,
            scaleX: 0.9,
          },
        }"
      />
      <motion.path
        :animate="controls"
        d="M22 4H2"
        :transition="DEFAULT_TRANSITION"
        :variants="{
          normal: { translateY: 0, scaleX: 1 },
          animate: {
            translateY: 2,
            scaleX: 0.9,
          },
        }"
      />
    </svg>
  </div>
</template>
