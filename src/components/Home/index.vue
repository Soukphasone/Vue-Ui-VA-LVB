<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import ImageSlider from '@/components/Slider/ImageSlier.vue'
import img1 from '@/assets/images/slide-images/1.jpg'
import img2 from '@/assets/images/slide-images/2.jpg'
import img3 from '@/assets/images/slide-images/3.jpg'
import img4 from '@/assets/images/slide-images/4.jpg'
import logo from '@/assets/images/logo/champa-full-blue-2.png'
import lvb from '@/assets/images/logo/LVB.png'
import { isTokenExpired } from '@/stores/checkToken'
import { logout } from '@/stores/clearStorage'
import { onMounted } from 'vue'
const checkToken = () => {
  const token = localStorage.getItem('authToken')
  if (isTokenExpired(token)) {
    logout()
  }
}
onMounted(checkToken)
const slides = [
  { src: img1, caption: '' },
  { src: img2, caption: '' },
  { src: img3, caption: '' },
  { src: img4, caption: '' }
]
</script>
<template>
  <div class="flex flex-grow items-center justify-between mb-4 rounded-xl p-2">
    <div class="flex justify-start items-center gap-2">
      <img :src="logo" class="w-15" />
      <img :src="logo" class="w-10" />
      <img :src="logo" class="w-5" />
    </div>
    <div class="flex justify-end items-center gap-2">
      <img :src="logo" class="w-5" />
      <img :src="logo" class="w-8" />
      <img :src="logo" class="w-10" />
      <img :src="lvb" class="w-50" />
    </div>
  </div>

  <div class="max-w-full mx-auto">
    <ImageSlider :slides="slides" aspect="aspect-[16/]" rounded="rounded-xl" :intervalMs="6000" />
  </div>
</template>
