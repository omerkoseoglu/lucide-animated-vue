<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const FRAME_VARIANTS: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 1 },
};

const LINE_VARIANTS: Variants = {
  visible: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 },
};

const controls = useAnimationControls();
const isControlled = ref(false);

async function startAnimation() {
  isControlled.value = true;
  await controls.start((i) => ({
    pathLength: 0,
    opacity: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }));
  await controls.start((i) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.3 },
  }));
}

function stopAnimation() {
  isControlled.value = true;
  controls.start("visible");
}

defineExpose({ startAnimation, stopAnimation });

async function handleMouseEnter() {
  if (!isControlled.value) {
    await controls.start((i) => ({
      pathLength: 0,
      opacity: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }));
    await controls.start((i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.3 },
    }));
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    controls.start("visible");
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
      <motion.path d="M3 7V5a2 2 0 0 1 2-2h2" :variants="FRAME_VARIANTS" />
      <motion.path d="M17 3h2a2 2 0 0 1 2 2v2" :variants="FRAME_VARIANTS" />
      <motion.path d="M21 17v2a2 2 0 0 1-2 2h-2" :variants="FRAME_VARIANTS" />
      <motion.path d="M7 21H5a2 2 0 0 1-2-2v-2" :variants="FRAME_VARIANTS" />
      <motion.path
        :animate="controls"
        :custom="0"
        d="M7 8h8"
        initial="visible"
        :variants="LINE_VARIANTS"
      />
      <motion.path
        :animate="controls"
        :custom="1"
        d="M7 12h10"
        initial="visible"
        :variants="LINE_VARIANTS"
      />
      <motion.path
        :animate="controls"
        :custom="2"
        d="M7 16h6"
        initial="visible"
        :variants="LINE_VARIANTS"
      />
    </svg>
  </div>
</template>
