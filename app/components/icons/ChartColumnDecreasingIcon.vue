<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

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
      <motion.path
        :animate="controls"
        :custom="1"
        d="M13 17V9"
        initial="visible"
        :variants="LINE_VARIANTS"
      />
      <motion.path
        :animate="controls"
        :custom="2"
        d="M18 17v-3"
        initial="visible"
        :variants="LINE_VARIANTS"
      />
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path
        :animate="controls"
        :custom="0"
        d="M8 17V5"
        initial="visible"
        :variants="LINE_VARIANTS"
      />
    </svg>
  </div>
</template>
