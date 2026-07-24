<script setup lang="ts">
import { motion, useAnimationControls } from "motion-v";
import { onUnmounted, ref } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const WIFI_LEVELS = [
  { d: "M12 20h.01", initialOpacity: 1, delay: 0 },
  { d: "M8.5 16.429a5 5 0 0 1 7 0", initialOpacity: 1, delay: 0.1 },
];

const controls = useAnimationControls();
const questionControls = useAnimationControls();
const isControlled = ref(false);
const hideTimer = ref<ReturnType<typeof setTimeout> | null>(null);

function scheduleHide() {
  if (hideTimer.value) clearTimeout(hideTimer.value);
  hideTimer.value = setTimeout(() => {
    questionControls.start("hide");
  }, 1500);
}

function cancelHide() {
  if (hideTimer.value) {
    clearTimeout(hideTimer.value);
    hideTimer.value = null;
  }
}

onUnmounted(() => cancelHide());

async function startAnimation() {
  isControlled.value = true;
  await controls.start("fadeOut");
  controls.start("fadeIn");
  questionControls.start("show");
  scheduleHide();
}

function stopAnimation() {
  isControlled.value = true;
  cancelHide();
  controls.start("fadeIn");
  questionControls.start("hide");
}

defineExpose({ startAnimation, stopAnimation });

async function handleMouseEnter() {
  if (!isControlled.value) {
    cancelHide();
    await controls.start("fadeOut");
    controls.start("fadeIn");
    questionControls.start("show");
    scheduleHide();
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    cancelHide();
    controls.start("fadeIn");
    questionControls.start("hide");
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
        :key="level.d"
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
      <motion.text
        :animate="questionControls"
        dominant-baseline="central"
        fill="currentColor"
        font-size="8"
        font-weight="bold"
        :initial="{ opacity: 0, scale: 0 }"
        stroke="none"
        :style="{ transformOrigin: '12px 8px' }"
        text-anchor="middle"
        :variants="{
          hide: {
            opacity: 0,
            scale: 0,
            transition: { duration: 0.15 },
          },
          show: {
            opacity: 1,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 18,
              delay: 0.1,
            },
          },
        }"
        x="12"
        y="8"
      >
        ?
      </motion.text>
    </svg>
  </div>
</template>
