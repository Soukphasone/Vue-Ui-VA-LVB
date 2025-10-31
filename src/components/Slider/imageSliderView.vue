<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import ImageSlider from '@/components/Slider/ImageSlider.vue'
const slides = ref(JSON.parse(localStorage.getItem('imagesData')) || [])
</script>
<template>
  <ImageSlider :slides="slides" aspect="aspect-[16/]" rounded="rounded-3" :intervalMs="6000" />
</template>
