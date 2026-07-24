<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const PATH_VARIANTS: Variants = {
  normal: {
    y: 0,
    x: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
  },
  animate: {
    y: -1.5,
    x: [-1, 1, -1, 1, -1, 0],
    transition: {
      y: {
        duration: 0.2,
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
      x: {
        duration: 0.3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  },
};

const SECONDARY_PATH_VARIANTS: Variants = {
  normal: {
    y: 0,
    x: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
  },
  animate: {
    y: -2.5,
    x: [-2, 2, -2, 2, -2, 0],
    transition: {
      y: {
        duration: 0.2,
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
      x: {
        duration: 0.3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  },
};

const controls = useAnimationControls();
const isControlled = ref(false);

function resetToNormal() {
  controls.stop();
  controls.start("normal").catch(() => {
    // ignore when interrupted by a new animation
  });
}

function startAnimation() {
  isControlled.value = true;
  controls.start("animate");
}

function stopAnimation() {
  isControlled.value = true;
  resetToNormal();
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) {
    controls.start("animate");
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    resetToNormal();
  }
}
</script>

<template>
  <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <motion.svg
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
      <motion.circle
        :animate="controls"
        cx="12"
        cy="13"
        initial="normal"
        r="8"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M5 3 2 6"
        initial="normal"
        :variants="SECONDARY_PATH_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="m22 6-3-3"
        initial="normal"
        :variants="SECONDARY_PATH_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M6.38 18.7 4 21"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M17.64 18.67 20 21"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="m9 13 2 2 4-4"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
    </motion.svg>
  </div>
</template>
