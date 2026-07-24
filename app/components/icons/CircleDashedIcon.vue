<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const PATH_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
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
        v-for="(d, index) in [
          'M10.1 2.182a10 10 0 0 1 3.8 0',
          'M13.9 21.818a10 10 0 0 1-3.8 0',
          'M17.609 3.721a10 10 0 0 1 2.69 2.7',
          'M2.182 13.9a10 10 0 0 1 0-3.8',
          'M20.279 17.609a10 10 0 0 1-2.7 2.69',
          'M21.818 10.1a10 10 0 0 1 0 3.8',
          'M3.721 6.391a10 10 0 0 1 2.7-2.69',
          'M6.391 20.279a10 10 0 0 1-2.69-2.7',
        ]"
        :key="d"
        :animate="controls"
        :custom="index + 1"
        :d="d"
        :variants="PATH_VARIANTS"
      />
    </svg>
  </div>
</template>
