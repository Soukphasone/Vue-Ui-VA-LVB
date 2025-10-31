<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted } from 'vue'
import { isTokenExpired } from '@/stores/checkToken'
import { logout } from '@/stores/clearStorage'
import imageSliderView from '@/components/Slider/imageSliderView.vue'
import Exchagne from './Exchagne.vue'
import champa_full_blue from '@/assets/images/logo/champa-full-blue-2.png'
import champa_animation from '@/assets/images/loading/load.gif'
import logo_26 from '@/assets/images/logo/Logo-26-LVB.png'
import LVB_TOWER from '@/assets/images/logo/LVB-tower.png'
const icons = [
  {
    name: champa_animation,
    size: 'w-15'
  },
  {
    name: champa_animation,
    size: 'w-25'
  },
  {
    name: champa_animation,
    size: 'w-15'
  },
  {
    name: logo_26,
    size: 'w-35'
  },
  {
    name: champa_animation,
    size: 'w-15'
  },
  {
    name: champa_animation,
    size: 'w-25'
  },
  {
    name: champa_animation,
    size: 'w-15'
  }
]
const checkToken = () => {
  const token = localStorage.getItem('authToken')
  if (isTokenExpired(token)) {
    logout()
  }
}
onMounted(checkToken)
</script>

<template>
  <div class="flex gap-4" data-aos="zoom-in-up">
    <div class="w-full mx-auto">
      <imageSliderView />
      <div class="flex gap-4">
        <Exchagne class="py-4" />
        <div class="w-full py-4">
          <img :src="LVB_TOWER" alt="" class="w-full rounded-3" />
        </div>
      </div>
    </div>
    <div>
      <div v-for="src in icons" :key="src.name" class="flex items-center justify-center">
        <img :src="src.name" alt="src" :class="`mb-4 ${src.size}`" />
      </div>
    </div>
  </div>
</template>
