<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

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
      <rect height="20" rx="2" ry="2" width="14" x="5" y="2" />
      <motion.path
        :animate="controls"
        d="M12.667 8 10 12h4l-2.667 4"
        initial="normal"
        :variants="{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 0.4, 1],
            transition: {
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            },
          },
        }"
      />
    </svg>
  </div>
</template>
