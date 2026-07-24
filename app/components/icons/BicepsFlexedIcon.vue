<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const BICEPS_FLEXED_SVG_VARIANTS: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, 15, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const BICEPS_FLEXED_PATH_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    scale: 1,
  },
  animate: {
    rotate: [0, 15, 0],
    scale: [1, 1.3, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
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
      <motion.path
        :animate="controls"
        d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1"
        initial="normal"
        :variants="BICEPS_FLEXED_PATH_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M15 14a5 5 0 0 0-7.584 2"
        initial="normal"
        :variants="BICEPS_FLEXED_SVG_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M9.964 6.825C8.019 7.977 9.5 13 8 15"
        initial="normal"
        :variants="BICEPS_FLEXED_SVG_VARIANTS"
      />
    </motion.svg>
  </div>
</template>
