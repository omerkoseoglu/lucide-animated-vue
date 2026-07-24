<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const SNOWFLAKE_VARIANTS: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const SNOWFLAKE_CHILD_VARIANTS: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.3, 1],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

const SNOWFLAKE_PATH = [
  { id: "snowflake1", d: "M8 15h.01" },
  { id: "snowflake2", d: "M8 19h.01" },
  { id: "snowflake3", d: "M12 17h.01" },
  { id: "snowflake4", d: "M12 21h.01" },
  { id: "snowflake5", d: "M16 15h.01" },
  { id: "snowflake6", d: "M16 19h.01" },
];

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
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <motion.g :animate="controls" initial="normal" :variants="SNOWFLAKE_VARIANTS">
        <motion.path
          v-for="(path, index) in SNOWFLAKE_PATH"
          :key="path.id"
          :d="path.d"
          :variants="SNOWFLAKE_CHILD_VARIANTS"
        />
      </motion.g>
    </svg>
  </div>
</template>
