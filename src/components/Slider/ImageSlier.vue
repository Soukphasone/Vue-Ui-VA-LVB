<!-- src/components/ImageSlider.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { useSlider } from "@/stores/useSlider";

type Slide = {
  src: string;
  alt?: string;
  caption?: string;
};

const props = withDefaults(defineProps<{
  slides: Slide[];
  autoplay?: boolean;
  intervalMs?: number;
  loop?: boolean;
  aspect?: string; // e.g. "aspect-[16/9]" or "aspect-video"
  rounded?: string; // e.g. "rounded-2xl"
}>(), {
  autoplay: true,
  intervalMs: 6000,
  loop: true,
  aspect: "aspect-video",
  rounded: "rounded-2xl",
});

const slider = useSlider({
  length: props.slides.length,
  autoplay: props.autoplay,
  intervalMs: props.intervalMs,
  loop: props.loop,
});

const transformStyle = computed(() => `transform: translateX(calc(${ -slider.index.value } * 100% + ${ slider.deltaX.value }px));`);
</script>

<template>
  <div
    class="relative w-full select-none"
    @mouseenter="slider.isHovering = true"
    @mouseleave="slider.isHovering = false"
  >
    <!-- viewport -->
    <div
      class="overflow-hidden"
      :class="[aspect, rounded]"
      @pointerdown="slider.onPointerDown"
      @pointermove.prevent="slider.onPointerMove"
      @pointerup="slider.onPointerUp"
      @pointercancel="slider.onPointerUp"
      @pointerleave="slider.onPointerUp"
    >
      <!-- track -->
      <div
        class="flex h-full w-full transition-transform duration-300 ease-out"
        :style="transformStyle"
        :class="{ 'transition-none': slider.isDragging }"
      >
        <div
          v-for="(s, i) in slides"
          :key="i"
          class="shrink-0 grow-0 basis-full relative"
        >
          <img
            :src="s.src"
            :alt="s.alt ?? `Slide ${i+1}`"
            class="h-full w-full object-cover"
            draggable="false"
          />
          <div
            v-if="s.caption"
            class="absolute inset-x-0 bottom-0 bg-black/40 text-white px-4 py-2 text-sm"
          >
            {{ s.caption }}
          </div>
        </div>
      </div>
    </div>

    <!-- arrows -->
    <button
      type="button"
      class="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white shadow rounded-full"
      @click="slider.prev"
      aria-label="Previous slide"
    >
      ‹
    </button>
    <button
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white shadow rounded-full"
      @click="slider.next"
      aria-label="Next slide"
    >
      ›
    </button>

    <!-- dots -->
    <div class="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
      <button
        v-for="(s, i) in slides"
        :key="'dot-' + i"
        class="h-2.5 w-2.5 rounded-full border border-white/70"
        :class="slider.index === i ? 'bg-white' : 'bg-white/30'"
        @click="slider.goTo(i)"
        :aria-label="`Go to slide ${i+1}`"
      />
    </div>
  </div>
</template>

<style scoped>
/* improves dragging feel on desktop */
div[draggable="false"], img { user-select: none; -webkit-user-drag: none; }
</style>
