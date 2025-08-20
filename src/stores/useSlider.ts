// src/composables/useSlider.ts
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

export type UseSliderOptions = {
  length: number;
  startIndex?: number;
  autoplay?: boolean;
  intervalMs?: number;
  loop?: boolean;
};

export function useSlider(opts: UseSliderOptions) {
  const { length, startIndex = 0, autoplay = true, intervalMs = 3500, loop = true } = opts;

  const index = ref(Math.min(Math.max(startIndex, 0), Math.max(length - 1, 0)));
  const timer = ref<number | null>(null);
  const isHovering = ref(false);
  const isDragging = ref(false);
  const startX = ref(0);
  const deltaX = ref(0);

  const goTo = (i: number) => {
    if (length === 0) return;
    if (loop) {
      index.value = (i + length) % length;
    } else {
      index.value = Math.min(Math.max(i, 0), length - 1);
    }
  };

  const next = () => goTo(index.value + 1);
  const prev = () => goTo(index.value - 1);

  const play = () => {
    if (!autoplay || length <= 1) return;
    stop();
    timer.value = window.setInterval(() => {
      if (!isHovering.value && !isDragging.value) next();
    }, intervalMs);
  };

  const stop = () => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  // Touch/drag handlers
  const onPointerDown = (e: PointerEvent) => {
    isDragging.value = true;
    startX.value = e.clientX;
    deltaX.value = 0;
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging.value) return;
    deltaX.value = e.clientX - startX.value;
  };
  const onPointerUp = () => {
    if (!isDragging.value) return;
    const threshold = 40; // px
    if (deltaX.value <= -threshold) next();
    else if (deltaX.value >= threshold) prev();
    isDragging.value = false;
    deltaX.value = 0;
  };

  onMounted(() => {
    window.addEventListener("keydown", onKeydown);
    play();
  });
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeydown);
    stop();
  });

  watch(() => opts.length, () => {
    // keep index in range if images change
    goTo(index.value);
  });

  return {
    index,
    next,
    prev,
    goTo,
    play,
    stop,
    isHovering,
    isDragging,
    deltaX,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
