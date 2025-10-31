<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import FullProfileImageView from './FullProfileImg.vue'
const userData = JSON.parse(localStorage.getItem('userData'))

const showViewer = ref(false)
const profileUrl = `${import.meta.env.VITE_SERVER_SRC}${userData.PICTURE}`

function openViewer() {
  showViewer.value = true
}
function onClose() {
  console.log('viewer closed')
}
</script>
<template>
  <div>
    <img
      @click="openViewer"
      :src="profileUrl"
      title="View"
      class="w-16 h-16 rounded-full object-cover cursor-pointer border hover:border-primary"
    />
    <FullProfileImageView v-model="showViewer" :src="profileUrl" alt="profile" @close="onClose" />
  </div>
</template>
