<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const PATH_VARIANTS: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [0, 1],
    transition: { duration: 0.4, ease: "linear" },
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
      :animate="controls"
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        :animate="controls"
        d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
      <circle cx="12" cy="12" r="3" />
      <motion.path
        :animate="controls"
        d="m18 22-3-3 3-3"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="controls"
        d="m6 2 3 3-3 3"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
    </motion.svg>
  </div>
</template>
