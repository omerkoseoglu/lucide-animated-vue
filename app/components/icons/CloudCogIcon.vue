<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const G_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: 180 },
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
      <path d="M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2" />
      <motion.g
        :animate="controls"
        :transition="{ type: 'spring', stiffness: 50, damping: 10 }"
        :variants="G_VARIANTS"
      >
        <path d="m9.2 15.9-.9-.4" />
        <path d="m9.2 18.1-.9.4" />
        <path d="m10.9 14.2-.4-.9" />
        <path d="m10.9 19.8-.4.9" />
        <path d="m13.5 13.3-.4.9" />
        <path d="m13.5 20.7-.4-.9" />
        <path d="m15.7 15.5-.9.4" />
        <path d="m15.7 18.5-.9-.4" />
        <circle cx="12" cy="17" r="3" />
      </motion.g>
    </svg>
  </div>
</template>
