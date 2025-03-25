<script setup>
import PreviewPage from '@/components/Previews/PreviewPage.vue'
import { ref, watch } from 'vue'
import { exportToPDF } from '@/stores/exportPDF'
import { currentLanguage } from '@/i18n'
const data = JSON.parse(localStorage.getItem('dataReport'))
const contentToExport = ref(null)
const check = ref(currentLanguage.value)
watch(currentLanguage, (newLanguage) => {
  check.value = newLanguage
})
const exportPDF = () => {
  if (contentToExport.value) {
    exportToPDF(contentToExport.value)
  }
}
</script>
<template>
  <div :class="check === 'vn' ? '' : 'font-lao'">
    <div v-if="data">
      <div class="flex px-6 py-1 justify-end">
        <button class="flex gap-2 bg-primary text-whiter py-1 px-3 rounded-3" @click="exportPDF">
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 20h14a2 2 0 0 0 2-2v-4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 10l5-5m0 0l-5-5m5 5H9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          Export to PDF
        </button>
      </div>
      <div ref="contentToExport">
        <PreviewPage />
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col items-center justify-center min-h-screen">
        <svg
          class="w-20 h-20 text-red-600 animate-pulse"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="50" cy="50" r="40" class="opacity-50" />
          <line x1="30" y1="30" x2="70" y2="70" class="opacity-75" />
          <line x1="70" y1="30" x2="30" y2="70" class="opacity-75" />
        </svg>
        <p class="mt-2 text-gray-500 text-sm">{{ $t('no_data') }}</p>
      </div>
    </div>
  </div>
</template>
