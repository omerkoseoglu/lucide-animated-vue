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
      height="28"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M4.677 21.5a2 2 0 0 0 1.313.5H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2.5" />
      <motion.g
        :animate="controls"
        :transition="{ type: 'spring', stiffness: 50, damping: 10 }"
        :variants="G_VARIANTS"
      >
        <path d="m3.2 12.9-.9-.4" />
        <path d="m3.2 15.1-.9.4" />
        <path d="m4.9 11.2-.4-.9" />
        <path d="m4.9 16.8-.4.9" />
        <path d="m7.5 10.3-.4.9" />
        <path d="m7.5 17.7-.4-.9" />
        <path d="m9.7 12.5-.9.4" />
        <path d="m9.7 15.5-.9-.4" />
        <circle cx="6" cy="14" r="3" />
      </motion.g>
    </svg>
  </div>
</template>
