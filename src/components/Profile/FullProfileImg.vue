<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  src: string
  alt?: string
}>()
const emit = defineEmits(['update:modelValue', 'close'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v)
})

function closeView() {
  modelValue.value = false
  emit('close')
}
</script>

<template>
  <transition name="zoom-fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <!-- backdrop -->
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <!-- image container -->
      <div
        class="relative max-w-5xl w-full h-[100vh] rounded-2xl overflow-hidden shadow-2xl"
        @click.stop
      >
        <!-- top controls -->
        <div class="absolute top-3 right-3 z-20 flex gap-2">
          <button
            class="flex items-center gap-2 p-2 rounded-full bg-gray-400 hover:bg-gray-300 w-10 h-10"
            @click="closeView"
            title="Close"
            aria-label="Close view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- image -->
        <div class="flex items-center justify-center w-full h-full bg-gray-500">
          <img
            :src="src"
            :alt="alt"
            class="max-w-full h-[100vh] object-contain transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.zoom-fade-enter-from,
.zoom-fade-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: all 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
</style>
