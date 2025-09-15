<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import imageSliderView from '@/components/Slider/imageSliderView.vue'
import Exchagne from './Exchagne.vue'
import champa_full_blue from '@/assets/images/logo/champa-full-blue-2.png'
import logo_26 from '@/assets/images/logo/Logo-26-LVB.png'
import LVB_TOWER from '@/assets/images/logo/LVB-tower.png'

const icons = [
  {
    name: champa_full_blue,
    size: 'w-15'
  },
  {
    name: champa_full_blue,
    size: 'w-25'
  },
  {
    name: champa_full_blue,
    size: 'w-15'
  },
  {
    name: logo_26,
    size: 'w-35'
  },
  {
    name: champa_full_blue,
    size: 'w-15'
  },
  {
    name: champa_full_blue,
    size: 'w-25'
  },
  {
    name: champa_full_blue,
    size: 'w-15'
  }
]
</script>
<template>
  <div class="flex gap-4">
    <div class="w-full mx-auto">
      <imageSliderView />
      <div class="flex gap-4">
        <Exchagne class="py-4" />
        <div class="w-full py-4">
          <img :src="LVB_TOWER" alt="" class="w-full rounded-lg" />
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
