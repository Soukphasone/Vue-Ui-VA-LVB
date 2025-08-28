<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { currentLanguage } from '@/i18n'
import { defineProps } from 'vue'
import { useOpenModalStore } from '@/stores/modal'
import showModals from '@/components/Modals/showModals.vue'
import { branches } from '@/stores/branchBankList'
import { formatDateTime } from '@/service/Format'

const props = defineProps({
  data: Object,
  value: String,
  role: String
})
const check = ref(currentLanguage.value)
const { t } = useI18n()
const isOpen = useOpenModalStore()
const data = ref(props?.data || '')
const titleModal = ref('')
const messageModal = ref('')
const toggleModal = (value) => {
  if (value === 'approve') {
    isOpen.isAuthorizeVA = true
  } else {
    isOpen.isEdit = true
  }
}
watch(currentLanguage, (newLanguage) => {
  check.value = newLanguage
})
watch(
  () => props,
  (setUpadate) => {
    if (setUpadate) {
      data.value = setUpadate?.data || ''
    }
  },
  { deep: true }
)
</script>
<template>
  <div class="flex items-center justify-center">
    <!-- Modal Overlay -->
    <transition name="fade-scale">
      <div
        v-if="isOpen.isDetail"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-999"
      >
        <!-- Modal Content -->
        <div class="bg-white py-8 px-4 rounded-2xl shadow-lg w-[600px]">
          <div class="flex justify-start" style="margin-top: -20px">
            <button
              @click="isOpen.isDetail = false"
              class="flex items-center justify-center w-10 h-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-8 h-8 text-red-500 hover:text-red-600 rounded-lg border border-red-300 hover:bg-gray-50"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h2 class="flex justify-center font-bold text-xl text-gray-600 mb-4">
            {{ t('customer_information') }}
          </h2>
          <div class="space-y-2.5">
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[250px]">
                {{ t('alias_number') }}
              </label>
              <span class="w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300">
                {{ data.ALIAS + data.ALIAS_TYPE }}</span
              >
            </div>
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[250px]">
                {{ t('service_name') }}
              </label>
              <span class="w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300">
                {{ data.SERVICE_NAME }}</span
              >
            </div>
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[250px]">
                {{ t('branch_register') }}
              </label>
              <span class="w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300">
                <div
                  v-for="branch_name in branches"
                  :key="branch_name.BRNCODEFCC"
                >
                  <p v-if="branch_name.BRNCODEFCC === data.BRANCH_CREATE">
                    {{ branch_name.UNITNAME}}
                  </p>
                </div>
              </span>
            </div>
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[250px]">
                {{ t('account_number_cif') }}
              </label>
              <span class="w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300">
                {{ data.CIF }}</span
              >
            </div>
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[250px]">
                {{ t('account_name') }}
              </label>
              <span class="w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300">
                {{ data.ACCTNAME }}</span
              >
            </div>
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[250px]">
                {{ t('account_number') }}
              </label>
              <span class="w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300">
                {{ data.ACCTNO + ' - ' + data.CCY }}</span
              >
            </div>
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[250px]">
                {{ t('payment_type') }}
              </label>
              <span class="w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300">
                <p v-if="data.ALIAS_TYPE === 1">
                  {{ t('va_tranfer') }}
                </p>
                <p v-else>
                  {{ t('bill_payment') }}
                </p>
              </span>
            </div>
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[250px]">
                {{ t('user_create') }}
              </label>
              <span class="w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300">
                {{ data.USER_CREATE }}</span
              >
            </div>
            <div v-if="data.USER_APPROVE" class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[250px]">
                <P v-if="data.STATUS === 1">
                {{ t('user_approve') }}
                </P>
                <P v-else-if="data.STATUS === 2">
                {{ t('user_reject') }}
                </P>
              </label>
              <span class="w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300">
                {{ data.USER_APPROVE }}</span
              >
            </div>
            <div v-if="data.USER_EDIT" class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[250px]">
                {{ t('user_edit') }}
              </label>
              <span class="w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300">
                {{ data.USER_CREATE }}</span
              >
            </div>
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[250px]">
                {{ t('created_date') }}
              </label>
              <span class="w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300">
                {{ formatDateTime(data.DATE_INSERT) }}</span
              >
            </div>
            <div v-if="data.DATE_EDIT" class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[250px]">
                {{ t('updated_at') }}
              </label>
              <span class="w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300">
                {{ formatDateTime(data.DATE_EDIT) }}</span
              >
            </div>
            <div v-if="props.role === 'Maker'">
              <span class="flex gap-4 justify-center mt-10">
                <button
                  @click="isOpen.isDeleteVA = true"
                  class="flex justify-center py-2 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-500 focus:outline-none"
                >
                  {{ t('delete') }}
                </button>
                <button
                  @click.prevent="toggleModal(value)"
                  class="flex justify-center py-2 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none"
                >
                  <p v-if="value === 'approve'">
                    {{ t('approve') }}
                  </p>
                  <p v-else>
                    {{ t('edit') }}
                  </p>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <showModals
    :show-success-modal="showSuccess"
    :title="titleModal"
    :message="messageModal"
    @close="showSuccess = false"
  />
  <showModals
    :show-error-modal="showError"
    :title="titleModal"
    :message="messageModal"
    @close="showError = false"
  />
</template>
