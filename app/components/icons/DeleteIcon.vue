<script setup lang="ts">
import type { Variants, Transition } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const LID_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: { y: -1.1 },
};

const SPRING_TRANSITION: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
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
      <motion.g :animate="controls" :transition="SPRING_TRANSITION" :variants="LID_VARIANTS">
        <path d="M3 6h18" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </motion.g>
      <motion.path
        :animate="controls"
        d="M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8"
        :transition="SPRING_TRANSITION"
        :variants="{
          normal: { d: 'M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8' },
          animate: { d: 'M19 9v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V9' },
        }"
      />
      <motion.line
        :animate="controls"
        :transition="SPRING_TRANSITION"
        :variants="{
          normal: { y1: 11, y2: 17 },
          animate: { y1: 11.5, y2: 17.5 },
        }"
        x1="10"
        x2="10"
        y1="11"
        y2="17"
      />
      <motion.line
        :animate="controls"
        :transition="SPRING_TRANSITION"
        :variants="{
          normal: { y1: 11, y2: 17 },
          animate: { y1: 11.5, y2: 17.5 },
        }"
        x1="14"
        x2="14"
        y1="11"
        y2="17"
      />
    </svg>
  </div>
</template>
