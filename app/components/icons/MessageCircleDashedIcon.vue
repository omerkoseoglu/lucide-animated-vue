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
          'M13.5 3.1c-.5 0-1-.1-1.5-.1s-1 .1-1.5.1',
          'M19.3 6.8a10.45 10.45 0 0 0-2.1-2.1',
          'M20.9 13.5c.1-.5.1-1 .1-1.5s-.1-1-.1-1.5',
          'M17.2 19.3a10.45 10.45 0 0 0 2.1-2.1',
          'M10.5 20.9c.5.1 1 .1 1.5.1s1-.1 1.5-.1',
          'M3.5 17.5 2 22l4.5-1.5',
          'M3.1 10.5c0 .5-.1 1-.1 1.5s.1 1 .1 1.5',
          'M6.8 4.7a10.45 10.45 0 0 0-2.1 2.1',
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
