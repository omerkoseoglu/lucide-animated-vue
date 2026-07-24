<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const KNIGHT_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 12,
    },
  },
  animate: {
    rotate: [0, 12, 38, 42, 38, 10, -5, 0],
    y: [0, -2, -9, -12, -9, -2, 1, 0],
    transition: {
      duration: 0.9,
      times: [0, 0.1, 0.3, 0.45, 0.6, 0.78, 0.9, 1],
      ease: "easeInOut",
    },
  },
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
      :style="{ overflow: 'visible' }"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        :animate="controls"
        initial="normal"
        :style="{ transformBox: 'view-box', transformOrigin: '12px 22px' }"
        :variants="KNIGHT_VARIANTS"
      >
        <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
        <path
          d="M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456"
        />
        <path d="m15 5 1.425-1.425" />
        <path d="m17 8 1.53-1.53" />
        <path d="M9.713 12.185 7 18" />
      </motion.g>
    </svg>
  </div>
</template>
