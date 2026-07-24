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
      <motion.path
        :animate="controls"
        d="M17 12H7"
        :variants="{
          normal: { translateX: 0 },
          animate: {
            translateX: [0, 3, -3, 2, -2, 0],
            transition: {
              ease: 'linear',
              translateX: {
                duration: 1,
              },
            },
          },
        }"
      />
      <path d="M19 18H5" />
      <path d="M21 6H3" />
    </svg>
  </div>
</template>
