<script setup lang="ts">
import { AnimatePresence, motion, useAnimationControls } from "motion-v";
import { ref, watch } from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), { size: 28 });

const KEYBOARD_PATHS = [
  { id: "key1", d: "M10 8h.01" },
  { id: "key2", d: "M12 12h.01" },
  { id: "key3", d: "M14 8h.01" },
  { id: "key4", d: "M16 12h.01" },
  { id: "key5", d: "M18 8h.01" },
  { id: "key6", d: "M6 8h.01" },
  { id: "key7", d: "M7 16h10" },
  { id: "key8", d: "M8 12h.01" },
];

const isHovered = ref(false);
const controls = useAnimationControls();
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

watch(isHovered, async (hovered) => {
  if (hovered) {
    await controls.start((i: number) => ({
      opacity: [1, 0.2, 1],
      transition: {
        duration: 1.5,
        times: [0, 0.5, 1],
        delay: i * 0.2 * Math.random(),
        repeat: 1,
        repeatType: "reverse",
      },
    }));
  } else {
    controls.stop();
    controls.set({ opacity: 1 });
  }
});
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
      <rect height="16" rx="2" width="20" x="2" y="4" />
      <AnimatePresence>
        <motion.path
          v-for="(path, index) in KEYBOARD_PATHS"
          :key="path.id"
          :animate="controls"
          :custom="index"
          :d="path.d"
          :initial="{ opacity: 1 }"
        />
      </AnimatePresence>
    </svg>
  </div>
</template>
