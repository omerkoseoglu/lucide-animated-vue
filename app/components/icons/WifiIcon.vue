<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const WIFI_LEVELS = [
  { d: "M12 20h.01", initialOpacity: 1, delay: 0 },
  { d: "M8.5 16.429a5 5 0 0 1 7 0", initialOpacity: 1, delay: 0.1 },
  { d: "M5 12.859a10 10 0 0 1 14 0", initialOpacity: 1, delay: 0.2 },
  { d: "M2 8.82a15 15 0 0 1 20 0", initialOpacity: 1, delay: 0.3 },
];

const controls = useAnimationControls();
const isControlled = ref(false);

async function startAnimation() {
  isControlled.value = true;
  await controls.start("fadeOut");
  controls.start("fadeIn");
}

function stopAnimation() {
  isControlled.value = true;
  controls.start("fadeIn");
}

defineExpose({ startAnimation, stopAnimation });

async function handleMouseEnter() {
  if (!isControlled.value) {
    await controls.start("fadeOut");
    controls.start("fadeIn");
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    controls.start("fadeIn");
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
        v-for="(level, index) in WIFI_LEVELS"
        :key="index"
        :animate="controls"
        :d="level.d"
        :initial="{ opacity: level.initialOpacity }"
        :variants="{
          fadeOut: {
            opacity: index === 0 ? 1 : 0,
            transition: { duration: 0.2 },
          },
          fadeIn: {
            opacity: 1,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: level.delay,
            },
          },
        }"
      />
    </svg>
  </div>
</template>
