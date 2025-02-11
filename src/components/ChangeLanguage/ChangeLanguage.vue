<script setup>
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { currentLanguage } from '@/i18n'
// Handle language switching
const { locale } = useI18n()
const check = ref(currentLanguage.value)
// Watch for changes in the global language state and update the i18n locale
watch(currentLanguage, (newLanguage) => {
  locale.value = newLanguage
  check.value = newLanguage
})

// Dropdown functionality
const isOpen = ref(false)
const selected = ref(currentLanguage.value)
const options = ref([
  {
    value: 'en',
    language: 'US (EN)',
    lg: 'EN',
    img: 'england-flag.png'
  },
  {
    value: 'la',
    language: 'ລາວ (LA)',
    lg: 'LA',
    img: 'laos-flag.png'
  },
  {
    value: 'vn',
    language: 'Tiếng việt (VN)',
    lg: 'VN',
    img: 'vietnam-flag.png'
  }
])
const target = ref(null)
onClickOutside(target, () => {
  isOpen.value = false
})
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  selected.value = option
  currentLanguage.value = option
  isOpen.value = false
  localStorage.setItem('language', option)
}
const getImagePath = (img) => {
  var la = 'laos-flag2.png'
  var en = 'england-flag2.png'
  var vn = 'vietnam-flag2.png'
  if (img === 'la') {
    return new URL(`/src/assets/images/flags/${la}`, import.meta.url).href
  }
  if (img === 'en') {
    return new URL(`/src/assets/images/flags/${en}`, import.meta.url).href
  }
  if (img === 'vn') {
    return new URL(`/src/assets/images/flags/${vn}`, import.meta.url).href
  }
  return new URL(`/src/assets/images/flags/${img}`, import.meta.url).href
}
</script>
<template>
  <div class="relative flex space-x-1" ref="target">
    <div class="custom-select">
      <button
        class="flex items-center bt-change-language focus:outline-none"
        @click="toggleDropdown"
        @keydown.esc="isOpen=false"
      >
        <span> <img :src="getImagePath(check)" alt="flag" class="flag-bt" /></span>
      </button>
      <ul v-if="isOpen" class="dropdown-bt-change-language">
        <li v-for="option in options" :key="option.value" @click="selectOption(option.value)">
          <img :src="getImagePath(option.img)" alt="flag" class="flag-icon-change-language" />

          <span style="margin-top: -3px"> {{ option.lg }}</span>
        </li>
      </ul>
    </div>
    <div class="flex items-center text-gray-700 dark:text-whiter text-lg">{{ $t('lg') }}</div>
  </div>
</template>

<style>
.custom-select {
  position: relative;
  display: inline-block;
}
.custom-select .bt-change-language {
  /* background: #f0f0f0; */
  padding: 5px 5px;
  cursor: pointer;
  display: flex;
  font-size: 20px;
  color: black;
  /* border: 2px solid rgb(165, 165, 165) */
}

.custom-select .dropdown-bt-change-language {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #ccc;
  list-style: none;
  /* padding: 5px 10px 5px 5px; */
  margin: 5px 0 0 0;
  width: 70px;
  color: black;
  z-index: 100;
  border-radius: 5px;
}

.dropdown-bt-change-language li {
  padding: 10px 7px 8px 7px;
  /* cursor: pointer; */
  font-size: 15px;
  display: flex;
  gap: 10px;
}

.flag-icon-change-language {
  width: 25px;
  height: 18px;
}

.bt-change-language .flag-bt {
  width: 35px;
}

.dropdown-bt-change-language li:hover {
  background: #eee;
  border-radius: 5px;
}
</style>
