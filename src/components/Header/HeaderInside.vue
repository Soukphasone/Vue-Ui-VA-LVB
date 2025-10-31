<script setup>
import Flower_1 from '@/assets/images/logo/flower-1.png'
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="bg-primary max-w-full">
    <div class="flex flex-grow items-center justify-between py-2.5 px-4">
      <!-- Left icons -->
      <div class="flex gap-1">
        <img :src="Flower_1" alt="" class="w-6 h-6" />
        <img :src="Flower_1" alt="" class="w-8 h-8" />
        <img :src="Flower_1" alt="" class="w-11" />
      </div>
      <!-- Dynamic title -->
      <div>
        <h1 class="text-2xl font-bold text-white md:text-center">
          {{ title }}
        </h1>
      </div>
      <!-- Right icons -->
      <div class="flex gap-1">
        <img :src="Flower_1" alt="" class="w-11" />
        <img :src="Flower_1" alt="" class="w-8 h-8" />
        <img :src="Flower_1" alt="" class="w-6 h-6" />
      </div>
    </div>
  </div>
</template>
