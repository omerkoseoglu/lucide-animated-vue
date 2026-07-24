<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const CLOUD_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
  },
  animate: {
    x: [-1, 1, -1, 1, 0],
    y: [-1, 1, -1, 1, 0],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const SUN_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const cloudControls = useAnimationControls();
const sunControls = useAnimationControls();
const isControlled = ref(false);

function startAnimation() {
  isControlled.value = true;
  cloudControls.start("animate");
  sunControls.start("animate");
}

function stopAnimation() {
  isControlled.value = true;
  cloudControls.start("normal");
  sunControls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) {
    cloudControls.start("animate");
    sunControls.start("animate");
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    cloudControls.start("normal");
    sunControls.start("normal");
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
      <motion.g :animate="cloudControls" initial="normal" :variants="CLOUD_VARIANTS">
        <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
      </motion.g>
      <motion.path
        v-for="(d, index) in [
          'M12 2v2',
          'm4.93 4.93 1.41 1.41',
          'M20 12h2',
          'm19.07 4.93-1.41 1.41',
          'M15.947 12.65a4 4 0 0 0-5.925-4.128',
        ]"
        :key="d"
        :animate="sunControls"
        :custom="index + 1"
        :d="d"
        initial="normal"
        :variants="SUN_VARIANTS"
      />
    </svg>
  </div>
</template>
