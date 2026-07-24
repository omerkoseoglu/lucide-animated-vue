<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const SQUARE_VARIANTS: Variants = {
  normal: { transition: { duration: 0.4 } },
  animate: { transition: { duration: 0.6, ease: "easeInOut" } },
};

const PATH_VARIANTS: Variants = {
  normal: { d: "m8 12 4 4 4-4", translateY: 0, opacity: 1 },
  animate: {
    d: "m8 12 4 4 4-4",
    translateY: [0, -3, 0],
    transition: { duration: 0.4 },
  },
};

const SECOND_PATH_VARIANTS: Variants = {
  normal: { d: "M12 8v8", opacity: 1 },
  animate: {
    d: ["M12 8v8", "M12 8v5", "M12 8v8"],
    transition: { duration: 0.4 },
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
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.rect
        :animate="controls"
        height="18"
        initial="normal"
        rx="2"
        :variants="SQUARE_VARIANTS"
        width="18"
        x="3"
        y="3"
      />
      <motion.path
        :animate="controls"
        d="m8 12 4 4 4-4"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M12 8v8"
        initial="normal"
        :variants="SECOND_PATH_VARIANTS"
      />
    </svg>
  </div>
</template>
