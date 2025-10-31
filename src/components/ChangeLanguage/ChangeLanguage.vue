<script setup>
import { ref, watch, computed } from 'vue'
import flagLaos from '@/assets/images/flags/laos-flag.png'
import flagVietnam from '@/assets/images/flags/vietnam-flag.png'
import flagEngland from '@/assets/images/flags/england-flag.png'
import laos from '@/assets/images/flags/laos-flag2.png'
import vietnam from '@/assets/images/flags/vietnam-flag2.png'
import england from '@/assets/images/flags/england-flag2.png'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { currentLanguage } from '@/i18n'
import { svgIcons } from '@/stores/svgIcons'
const { locale } = useI18n()
const check = ref(currentLanguage.value)
const target = ref(null)
const isOpen = ref(false)
const selected = ref(currentLanguage.value)
const options = ref([
  {
    value: 'en',
    img: flagEngland
  },
  {
    value: 'la',
    img: flagLaos
  },
  {
    value: 'vn',
    img: flagVietnam
  }
])
watch(currentLanguage, (newLanguage) => {
  locale.value = newLanguage
  check.value = newLanguage
})
onClickOutside(target, () => {
  isOpen.value = false
})
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
const selectOption = (option) => {
  selected.value = option.value
  currentLanguage.value = option.value
  isOpen.value = false
  localStorage.setItem('language', option.value)
}
const optionLanguage = computed(() => options.value.filter((opt) => opt.value !== selected.value))
const getImagePath = (img) => {
  if (img === 'la') {
    return laos
  }
  if (img === 'en') {
    return england
  }
  if (img === 'vn') {
    return vietnam
  }
}
</script>
<template>
  <div class="relative inline-block text-left">
    <!-- Dropdown button -->
    <button
      @click="toggleDropdown"
      @keydown.esc="isOpen = false"
      ref="target"
      class="inline-flex gap-2 items-center justify-start w-40 rounded-2xl shadow-md hover:bg-gray-50 px-4 py-1 text-sm font-medium text-gray-700 focus:outline-none"
    >
      <img :src="getImagePath(check)" alt="" class="w-7 h-7 rounded-full" />
      {{ $t('lg') }}
      <span
        v-html="svgIcons.ArrowDropDown"
        class="absolute top-1/2 -translate-y-1/2 fill-current right-0 px-2"
        :class="{ 'rotate-180': isOpen }"
      >
      </span>
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isOpen"
      class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
    >
      <div class="py-1">
        <button
          v-for="lang in optionLanguage"
          :key="lang.value"
          @click="selectOption(lang)"
          class="flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <img :src="lang.img" alt="" class="w-6 rounded-sm" />
          {{ $t(lang.value) }}
        </button>
      </div>
    </div>
  </div>
</template>
