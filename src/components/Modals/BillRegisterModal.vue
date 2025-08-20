<script setup>
import { ref, watch } from 'vue'
import { defineProps } from 'vue'
import { formatDateTime } from '@/service/Format'
import { useOpenModalBill } from '@/stores/modal'
import { branchesLao, branches } from '@/stores/branchBankList'
import { useI18n } from 'vue-i18n'
import { currentLanguage } from '@/i18n'
const props = defineProps({
  service: String,
  data: Object
})
const isOpen = useOpenModalBill()
const data = ref(props.data)
const { t } = useI18n()
const check = ref(currentLanguage.value)
const date = ref(new Date())

watch(
  () => props.data,
  (setData) => {
    if (setData) {
      data.value = setData || ''
      date.value = new Date()
    }
  },
  { deep: true }
)
watch(currentLanguage, (newLanguage) => {
  check.value = newLanguage
})
const printPage = () => {
  window.print()
  isOpen.isOpenModal = false
}
</script>

<template>
  <div>
    <!-- Only this area will be printed -->
    <div class="flex items-center justify-center">
      <transition name="fade-scale">
        <div
          v-if="isOpen.isOpenModal"
          class="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-999"
        >
          <!-- Modal Content -->
          <div class="p-4 rounded-2xl shadow-lg w-[650px] bg-bill">
            <div class="flex justify-start">
              <button
                @click="isOpen.isOpenModal = false"
                class="flex items-center justify-center w-10 h-10 bg-red-400 rounded-max hover:bg-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-8 h-8 text-white"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <span class="flex justify-center font-bold text-white text-xl">
              {{ t('success_ragister') }}
            </span>
            <div class="print-area mt-6">
              <div class="bg-white text-gray-800 p-4 rounded-2xl shadow-2xl w-full">
                <div class="flex flex-grow items-center justify-between">
                  <div class="flex items-center gap-2">
                    <img src="@/assets/images/logo/LVB-Logo.png" alt="" class="w-10" />
                    <span class="text-sm">{{ t('lao_viet_bank') }}</span>
                  </div>
                  <div class="flex items-center text-sm">
                    {{ formatDateTime(date) }}
                  </div>
                </div>
                <div class="flex justify-center mt-5 font-semibold">
                  {{ t('bill_va_register') }}
                </div>
                <div class="mt-5">
                  <div class="flex w-full text-sm">
                    <div class="w-[30%]">{{ t('alias_number') }}:</div>
                    <div class="w-[70%] text-red-500 font-bold">
                      {{ data.ALIAS + data.ALIAS_TYPE + 'XXXXXXXXX' }}
                    </div>
                  </div>
                  <div class="flex w-full text-sm">
                    <div class="w-[30%]">{{ t('branch_register') }}:</div>
                    <div
                      v-for="branch_name in check === 'la' ? branchesLao : branches"
                      :key="branch_name.branch_id"
                    >
                      <span
                        class="w-[70%] text-red-500"
                        v-if="branch_name.branch_id === data.BRANCH_CREATE"
                        >{{ branch_name.branch_id + ' - ' + branch_name.name }}</span
                      >
                    </div>
                  </div>
                  <div class="flex w-full text-sm">
                    <div class="w-[30%]">{{ t('service_name') }}:</div>
                    <div class="w-[70%] text-red-500">{{ props.service }}</div>
                  </div>
                  <div class="flex w-full">
                    <div class="w-[30%]">{{ t('account_number_cif') }}:</div>
                    <div class="w-[70%] text-red-500">{{ data.CIF }}</div>
                  </div>
                  <div class="flex w-full">
                    <div class="w-[30%]">{{ t('account_number') }}:</div>
                    <div class="w-[70%] text-red-500">{{ data.ACCTNO + ' - ' + data.CCY }}</div>
                  </div>
                  <div class="flex w-full">
                    <div class="w-[30%]">{{ t('account_name') }}:</div>
                    <div class="w-[70%] text-red-500">{{ data.ACCTNAME }}</div>
                  </div>
                  <div class="flex w-full">
                    <div class="w-[30%]">{{ t('payment_type') }}:</div>
                    <div class="w-[70%] text-red-500">
                      <span v-if="data.ALIAS_TYPE === 1">{{ t('va_tranfer') }}</span>
                      <span v-else>{{ t('bill_payment') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="flex gap-x-4 py-6">
                <button
                  @click="isOpen.isOpenModal = false"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-500 focus:outline-none"
                >
                  {{ t('skip') }}
                </button>
                <button
                  @click="printPage"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                >
                  {{ t('print_bill') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
