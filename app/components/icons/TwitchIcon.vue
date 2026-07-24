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
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: "linear",
      opacity: { duration: 0.1 },
    },
  },
};

const LINE_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: "linear",
      opacity: { duration: 0.1 },
    },
  },
};

const pathControls = useAnimationControls();
const line1Controls = useAnimationControls();
const line2Controls = useAnimationControls();
const isControlled = ref(false);

function startAnimation() {
  isControlled.value = true;
  pathControls.start("animate");
  line1Controls.start("animate");
  line2Controls.start("animate");
}

function stopAnimation() {
  isControlled.value = true;
  pathControls.start("normal");
  line1Controls.start("normal");
  line2Controls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) {
    pathControls.start("animate");
    line1Controls.start("animate");
    line2Controls.start("animate");
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    pathControls.start("normal");
    line1Controls.start("normal");
    line2Controls.start("normal");
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
        :animate="pathControls"
        d="M21 2H3v16h5v4l4-4h5l4-4V2z"
        initial="normal"
        :variants="PATH_VARIANTS"
      />
      <motion.path
        :animate="line1Controls"
        d="M11 11V7"
        initial="normal"
        :variants="LINE_VARIANTS"
      />
      <motion.path
        :animate="line2Controls"
        d="M16 11V7"
        initial="normal"
        :variants="LINE_VARIANTS"
      />
    </svg>
  </div>
</template>
