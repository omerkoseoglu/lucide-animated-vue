<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const ARROW_VARIANTS: Variants = {
  normal: {
    y: 0,
  },
  animate: {
    y: [0, 1, 0],
  },
};

const RAYS_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const arrowControls = useAnimationControls();
const raysControls = useAnimationControls();
const isControlled = ref(false);

function startAnimation() {
  isControlled.value = true;
  arrowControls.start("animate");
  raysControls.start("animate");
}

function stopAnimation() {
  isControlled.value = true;
  arrowControls.start("normal");
  raysControls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) {
    arrowControls.start("animate");
    raysControls.start("animate");
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    arrowControls.start("normal");
    raysControls.start("normal");
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
      <motion.g :animate="arrowControls" initial="normal" :variants="ARROW_VARIANTS">
        <path d="M12 10V2" />
        <path d="m16 6-4 4-4-4" />
      </motion.g>
      <motion.path
        v-for="(d, index) in [
          'm4.93 10.93 1.41 1.41',
          'M2 18h2',
          'M20 18h2',
          'm19.07 10.93-1.41 1.41',
          'M22 22H2',
          ,
        ]"
        :key="d"
        :animate="raysControls"
        :custom="index + 1"
        :d="d"
        initial="normal"
        :variants="RAYS_VARIANTS"
      />
      <path d="M16 18a4 4 0 0 0-8 0" />
    </svg>
  </div>
</template>
