<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const SUN_VARIANTS: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -5, 5, -2, 2, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

const MOON_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const sunControls = useAnimationControls();
const moonControls = useAnimationControls();
const isControlled = ref(false);

function startAnimation() {
  isControlled.value = true;
  sunControls.start("animate");
  moonControls.start("animate");
}

function stopAnimation() {
  isControlled.value = true;
  sunControls.start("normal");
  moonControls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) {
    sunControls.start("animate");
    moonControls.start("animate");
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    sunControls.start("normal");
    moonControls.start("normal");
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
      <motion.g :animate="sunControls" initial="normal" :variants="SUN_VARIANTS">
        <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
      </motion.g>
      <motion.path
        v-for="(d, index) in [
          'M12 2v2',
          'M12 20v2',
          'm4.9 4.9 1.4 1.4',
          'm17.7 17.7 1.4 1.4',
          'M2 12h2',
          'M20 12h2',
          'm6.3 17.7-1.4 1.4',
          'm19.1 4.9-1.4 1.4',
        ]"
        :key="d"
        :animate="moonControls"
        :custom="index + 1"
        :d="d"
        initial="normal"
        :variants="MOON_VARIANTS"
      />
    </svg>
  </div>
</template>
