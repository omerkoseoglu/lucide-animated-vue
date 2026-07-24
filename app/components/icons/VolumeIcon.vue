<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const isHovered = ref(false);
const isControlled = ref(false);

function startAnimation() {
  isControlled.value = true;
  isHovered.value = true;
}

function stopAnimation() {
  isControlled.value = true;
  isHovered.value = false;
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) isHovered.value = true;
}

function handleMouseLeave() {
  if (!isControlled.value) isHovered.value = false;
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
      <path
        d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
      />
      <AnimatePresence :initial="false" mode="wait">
        <motion.g v-if="isHovered" key="volume-icon-active">
          <motion.path
            :animate="{ opacity: 1, transition: { delay: 0.1 } }"
            d="M16 9a5 5 0 0 1 0 6"
            :exit="{ opacity: 0 }"
            :initial="{ opacity: 0 }"
          />
          <motion.path
            :animate="{ opacity: 1, transition: { delay: 0.2 } }"
            d="M19.364 18.364a9 9 0 0 0 0-12.728"
            :exit="{ opacity: 0 }"
            :initial="{ opacity: 0 }"
          />
        </motion.g>
        <motion.g v-else key="volume-icon-inactive">
          <motion.line
            :animate="{ pathLength: [0, 1], opacity: [0, 1], transition: { delay: 0.1 } }"
            :exit="{ pathLength: 1, opacity: 1 }"
            :initial="{ pathLength: 1, opacity: 1 }"
            x1="22"
            x2="16"
            y1="9"
            y2="15"
          />
          <motion.line
            :animate="{ pathLength: [0, 1], opacity: [0, 1], transition: { delay: 0.2 } }"
            :exit="{ pathLength: 1, opacity: 1 }"
            :initial="{ pathLength: 1, opacity: 1 }"
            x1="16"
            x2="22"
            y1="9"
            y2="15"
          />
        </motion.g>
      </AnimatePresence>
    </svg>
  </div>
</template>
