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
      <rect height="12" rx="2" width="16" x="2" y="6" />
      <path d="M22 14v-4" />
      <motion.rect
        :animate="controls"
        fill="currentColor"
        height="8"
        initial="normal"
        rx="1"
        stroke="none"
        :variants="{
          normal: { width: 0, opacity: 0 },
          animate: {
            width: 12,
            opacity: 1,
            transition: { duration: 0.4, ease: 'easeOut' },
          },
        }"
        x="4"
        y="8"
      />
    </svg>
  </div>
</template>
