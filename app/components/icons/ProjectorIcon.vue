<script setup lang="ts">
import type { Variants } from "motion-v";
import { motion, useAnimationControls } from "motion-v";
import { ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const RAY_LINE_VARIANTS: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  visible: {
    pathLength: 1,
    opacity: 1,
  },
};

const PROJECTOR_BODY_VARIANTS: Variants = {
  normal: {
    scale: 1,
    y: 0,
  },
  animate: {
    scale: [1, 1.08, 1],
    y: [0, -1, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const pathControls = useAnimationControls();
const bodyControls = useAnimationControls();
const isControlled = ref(false);

async function startAll() {
  bodyControls.start("animate").catch(() => {
    // ignore when interrupted by a new animation
  });
  await pathControls.start("hidden");
  await pathControls.start("animate");
}

function stopAll() {
  bodyControls.start("normal").catch(() => {
    // ignore when interrupted
  });
  pathControls.start("visible").catch(() => {
    // ignore when interrupted
  });
}

function startAnimation() {
  isControlled.value = true;
  startAll().catch(() => {
    // ignore when interrupted
  });
}

function stopAnimation() {
  isControlled.value = true;
  stopAll();
}

defineExpose({ startAnimation, stopAnimation });

async function handleMouseEnter() {
  if (!isControlled.value) {
    await startAll();
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    stopAll();
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
        :animate="pathControls"
        d="M5 7 3 5"
        initial="visible"
        :variants="RAY_LINE_VARIANTS"
      />
      <motion.path
        :animate="pathControls"
        d="M9 6V3"
        initial="visible"
        :variants="RAY_LINE_VARIANTS"
      />
      <motion.path
        :animate="pathControls"
        d="m13 7 2-2"
        initial="visible"
        :variants="RAY_LINE_VARIANTS"
      />
      <motion.g :animate="bodyControls" initial="normal" :variants="PROJECTOR_BODY_VARIANTS">
        <circle cx="9" cy="13" r="3" />
        <path
          d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"
        />
        <path d="M16 16h2" />
      </motion.g>
    </svg>
  </div>
</template>
