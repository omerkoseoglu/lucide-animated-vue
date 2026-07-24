<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const STEM_VARIANTS: Variants = {
  normal: { y: 0 },
  animate: {
    y: 2,
    transition: { duration: 0.1 },
  },
};

const BELL_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -2, 2, -2, 2, -1, 1, 0],
    transition: {
      delay: 0.1,
      duration: 0.28,
      ease: "easeInOut",
    },
  },
};

const SOUND_WAVES_VARIANTS: Variants = {
  normal: { opacity: 0, scale: 1 },
  animate: {
    opacity: [0, 1, 0],
    scale: [0.8, 1, 1.3],
    transition: {
      delay: 0.13,
      duration: 0.7,
      ease: "easeOut",
      times: [0, 0.2, 1],
    },
  },
};

const controls = useAnimationControls();
const isControlled = ref(false);

function triggerEffect() {
  controls.start("animate").then(() => {
    controls.start("normal");
  });
}

function startAnimation() {
  isControlled.value = true;
  triggerEffect();
}

function stopAnimation() {
  isControlled.value = true;
  controls.start("normal");
}

defineExpose({ startAnimation, stopAnimation });
</script>

<template>
  <div>
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
      <path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" />
      <motion.g
        :animate="controls"
        initial="normal"
        :style="{ originX: '50%', originY: '100%' }"
        :variants="BELL_VARIANTS"
      >
        <path d="M20 16a8 8 0 1 0-16 0" />
        <motion.g :variants="STEM_VARIANTS">
          <path d="M10 4h4" />
          <path d="M12 4v4" />
        </motion.g>
      </motion.g>
      <motion.g
        :animate="controls"
        initial="normal"
        :style="{ originX: '14px', originY: '18px' }"
        :variants="SOUND_WAVES_VARIANTS"
      >
        <path d="M2 13a7 7 0 0 1 1-3.5" opacity="0.7" stroke-width="1.5" />
        <path d="M21 13a7 7 0 0 0-1-3.5" opacity="0.7" stroke-width="1.5" />
      </motion.g>
    </svg>
  </div>
</template>
