<!-- Example in any page/component -->
<script setup lang="ts">
import ImageSlider from '@/components/Slider/ImageSlier.vue'

const slides = [
  // { src: "/src/assets/images/slide-images/1.jpg", caption: "" },
  { src: '/src/assets/images/slide-images/2.jpg', caption: '' },
  { src: '/src/assets/images/slide-images/3.jpg', caption: '' },
  { src: '/src/assets/images/slide-images/4.jpg', caption: '' },
  { src: '/src/assets/images/slide-images/5.jpg', caption: '' }
]
</script>

<template>
  <div class="flex flex-grow items-center justify-between mb-4 rounded-xl p-2">
    <div class="flex justify-start items-center gap-2">
      <img src="/src/assets/images/logo/champa-full-blue-2.png" alt="" class="w-15" />
      <img src="/src/assets/images/logo/champa-full-blue-2.png" alt="" class="w-10" />
      <img src="/src/assets/images/logo/champa-full-blue-2.png" alt="" class="w-5" />
    </div>
    <div class="flex justify-end items-center gap-2">
      <img src="/src/assets/images/logo/champa-full-blue-2.png" alt="" class="w-5" />
      <img src="/src/assets/images/logo/champa-full-blue-2.png" alt="" class="w-8" />
      <img src="/src/assets/images/logo/champa-full-blue-2.png" alt="" class="w-10" />

      <img src="/src/assets/images/logo/LVB.png" alt="" class="w-50" />
    </div>
  </div>
  <div class="max-w-full mx-auto">
    <ImageSlider :slides="slides" aspect="aspect-[16/]" rounded="rounded-xl" :intervalMs="4000" />
  </div>
</template>
