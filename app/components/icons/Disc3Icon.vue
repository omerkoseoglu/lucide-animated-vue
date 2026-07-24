<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" />
      <motion.g
        :animate="controls"
        :style="{ transformOrigin: '12px 12px' }"
        :transition="{ duration: 0.4, ease: 'easeInOut' }"
        :variants="{
          normal: { rotate: 0 },
          animate: { rotate: 90 },
        }"
      >
        <path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
        <path d="M18 12c0 1.7-.7 3.2-1.8 4.2" />
      </motion.g>
    </svg>
  </div>
</template>
