<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const DOT_VARIANTS: Variants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.3,
    },
  }),
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  default: { opacity: 1 },
};

const controls = useAnimationControls();
const isControlled = ref(false);

async function startAnimation() {
  isControlled.value = true;
  await controls.start("hidden");
  await controls.start("visible");
}

async function stopAnimation() {
  isControlled.value = true;
  controls.start("default");
}

defineExpose({ startAnimation, stopAnimation });

async function handleMouseEnter() {
  if (!isControlled.value) {
    await controls.start("hidden");
    await controls.start("visible");
  }
}

async function handleMouseLeave() {
  if (!isControlled.value) {
    await controls.start("default");
  }
}
</script>

<template>
  <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <motion.svg
      :animate="controls"
      fill="none"
      :height="size"
      initial="default"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        :custom="0"
        cx="7.5"
        cy="7.5"
        fill="currentColor"
        r=".5"
        :variants="DOT_VARIANTS"
      />
      <motion.circle
        :custom="1"
        cx="18.5"
        cy="5.5"
        fill="currentColor"
        r=".5"
        :variants="DOT_VARIANTS"
      />
      <motion.circle
        :custom="2"
        cx="11.5"
        cy="11.5"
        fill="currentColor"
        r=".5"
        :variants="DOT_VARIANTS"
      />
      <motion.circle
        :custom="3"
        cx="7.5"
        cy="16.5"
        fill="currentColor"
        r=".5"
        :variants="DOT_VARIANTS"
      />
      <motion.circle
        :custom="4"
        cx="17.5"
        cy="14.5"
        fill="currentColor"
        r=".5"
        :variants="DOT_VARIANTS"
      />
      <path d="M3 3v16a2 2 0 0 0 2 2h16" stroke-width="2" />
    </motion.svg>
  </div>
</template>
