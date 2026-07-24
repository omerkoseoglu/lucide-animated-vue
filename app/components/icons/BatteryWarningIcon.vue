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
      <path d="M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" />
      <path d="M22 14v-4" />
      <path d="M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
      <motion.g
        :animate="controls"
        initial="normal"
        :style="{ originX: '50%', originY: '50%' }"
        :variants="{
          normal: { opacity: 1, scale: 1 },
          animate: {
            opacity: [1, 0.4, 1],
            scale: [1, 1.1, 1],
            transition: {
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            },
          },
        }"
      >
        <path d="M10 17h.01" />
        <path d="M10 7v6" />
      </motion.g>
    </svg>
  </div>
</template>
