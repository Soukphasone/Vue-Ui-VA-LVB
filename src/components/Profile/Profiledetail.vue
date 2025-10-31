<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Viewprofile from './Viewprofile.vue'
import { useOpenModalStore } from '@/stores/modal'
import { svgIcons } from '@/stores/svgIcons'
const userData = JSON.parse(localStorage.getItem('userData'))
const isOpen = useOpenModalStore()
</script>

<template>
  <div class="mx-auto bg-white rounded-2xl shadow-md p-6">
    <!-- Profile Header -->
    <div class="flex items-center space-x-2 text-left">
      <viewprofile />
      <div>
        <h2 class="text-lg font-semibold text-gray-800">{{ userData.EMPNAME }}</h2>
        <p class="text-sm text-gray-600">{{ userData.HR_BRN_CODE + ' '+ userData.HR_BRN_NAME }}</p>
      </div>
    </div>

    <!-- Profile Details -->
    <div class="mt-6 space-y-3 text-left">
      <div class="flex items-center space-x-3">
        <span v-html="svgIcons.Department"></span>
        <span class="text-sm text-primary">{{ userData.DEP }}</span>
      </div>
      <div class="flex items-center space-x-3 text-sm">
        <span v-html="svgIcons.Email" class="w-5 h-5 text-gray-500"></span>
        <span class="text-sm text-primary">{{ userData.EMAIL }}</span>
      </div>
      <div class="flex items-center space-x-3 text-sm">
        <span v-html="svgIcons.Phone" class="w-5 h-5 text-gray-500"></span>
        <span class="text-sm text-primary">{{ userData.MOBILE }}</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <button class="mt-10 flex space-x-2 items-center" @click="isOpen.isLogOut = true">
      <span v-html="svgIcons.Exit" class="w-8 h-8"> </span>
      <span class="text-red-500 hover:text-red-600 text-lg">{{ $t('logout') }}</span>
    </button>
  </div>
</template>
