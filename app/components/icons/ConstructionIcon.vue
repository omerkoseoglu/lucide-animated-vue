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
      <defs>
        <motion.pattern
          :animate="controls"
          height="14"
          id="stripes"
          initial="normal"
          patternUnits="userSpaceOnUse"
          :variants="{
            normal: {
              x: 0,
            },
            animate: {
              x: [0, 6],
              transition: {
                duration: 1,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
              },
            },
          }"
          width="6"
        >
          <path d="M-4 -2 L14 30" stroke="currentColor" stroke-width="2" />
        </motion.pattern>
      </defs>
      <rect fill="url(#stripes)" height="8" rx="1" width="20" x="2" y="6" />
      <path d="M17 14v7" />
      <path d="M7 14v7" />
      <path d="M17 3v3" />
      <path d="M7 3v3" />
    </svg>
  </div>
</template>
