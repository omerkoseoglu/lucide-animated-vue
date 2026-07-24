<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const CIRCLES = [
  { cx: 9, cy: 5 },
  { cx: 9, cy: 12 },
  { cx: 9, cy: 19 },
  { cx: 15, cy: 5 },
  { cx: 15, cy: 12 },
  { cx: 15, cy: 19 },
];

const ROWS = 3;

const VARIANTS: Variants = {
  normal: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  animate: (data: { index: number }) => {
    const row = data.index % ROWS;
    const col = Math.floor(data.index / ROWS);
    const delay = row * 0.15 + col * (ROWS * 0.15 - 0.2);

    return {
      opacity: [1, 0.4, 1],
      scale: [1, 0.85, 1],
      transition: { delay, duration: 1, ease: "easeInOut" },
    };
  },
};

const controls = useAnimationControls();
const isControlled = ref(false);
const isAnimatingRef = ref(false);

async function startAnimation() {
  isControlled.value = true;
  if (isAnimatingRef.value) return;
  isAnimatingRef.value = true;
  await controls.start("animate");
  await controls.start("normal");
  isAnimatingRef.value = false;
}

async function stopAnimation() {
  isControlled.value = true;
  if (!isAnimatingRef.value) return;
  await controls.start("normal");
  isAnimatingRef.value = false;
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) {
    startAnimation();
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    stopAnimation();
  }
}
</script>

<template>
  <div
    class="inline-flex items-center justify-center"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
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
      <motion.circle
        v-for="(circle, index) in CIRCLES"
        :key="`${circle.cx}-${circle.cy}`"
        :animate="controls"
        :custom="{ index }"
        :cx="circle.cx"
        :cy="circle.cy"
        initial="normal"
        r="1"
        :variants="VARIANTS"
      />
    </svg>
  </div>
</template>
