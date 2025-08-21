<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { defineProps, defineEmits } from 'vue'
import { useOpenModalStore } from '@/stores/modal'
import { CustomerAccount, UpdateVA } from '@/service/Get_Post_API'
// import { formatDate } from '@/service/Format.ts'
import showModals from '@/components/Modals/showModals.vue'
import eventBus from '@/eventBus'
const props = defineProps({
  data: Object
})
const userData = JSON.parse(localStorage.getItem('userData'))
const emit = defineEmits(['update:data'])
const { t } = useI18n()
const isOpen = useOpenModalStore()
const cif = ref(props.data?.CIF || '')
const accountName = ref(props.data?.ACCTNAME || '')
const accountNumber = ref(props.data?.ACCTNO || '')
const aliasT = ref(props.data?.ALIAS_TYPE || '')
const ccy = ref(props.data?.CCY || '')
const checkCIF = ref('')
const selectedAccountNo = ref('')
const selectedAliasType = ref('')
const dropdownAccountNo = ref(false)
const dropdownAliasType = ref(false)
const accountNumberList = ref([])
const isLoading = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const titleModal = ref('')
const messageModal = ref('')
const aliasType = [
  { id: 1, label: 'va_tranfer' },
  { id: 2, label: 'bill_payment' }
]
const validateCIF = (event) => {
  cif.value = event.target.value.replace(/\D/g, '').slice(0, 9) // Limits to 9 digits
}
const toggleDropdown = (value) => {
  if (value === 'acc-no') {
    dropdownAccountNo.value = !dropdownAccountNo.value
  }
  if (value === 'alias-type') {
    dropdownAliasType.value = !dropdownAliasType.value
  }
}
const selected = (name, data) => {
  if (data) {
    if (name === 'account') {
      accountNumber.value = data.ACCOUNT_NUMBER
      ccy.value = data.CCY
      selectedAccountNo.value = data
      !dropdownAccountNo.value
    }
    if (name === 'alias') {
      aliasT.value = data.id
      selectedAliasType.value = data
      !dropdownAliasType.value
    }
  }
}
watch(
  () => props.data,
  (setUpadate) => {
    if (setUpadate) {
      cif.value = setUpadate.CIF || ''
      accountName.value = setUpadate.ACCTNAME || ''
      accountNumber.value = setUpadate.ACCTNO || ''
      aliasT.value = setUpadate.ALIAS_TYPE || ''
      ccy.value = setUpadate.CCY || ''
      getCustomerAccount()
    }
  },
  { deep: true }
)
const handleCheckCIF = async () => {
  const _res = await getCustomerAccount()
  if (_res) {
    accountName.value = _res[0].AC_NAME
    checkCIF.value = '0'
    const _check = _res[0].ACCOUNT_DETAILS
    if (_check.length === 1) {
      accountNumber.value = _check[0].ACCOUNT_NUMBER
      selectedAccountNo.value = _check[0]
    }
    if (_check.length > 1) {
      dropdownAccountNo.value = true
    }
  } else {
    messageModal.value = 'Please check again'
    titleModal.value = 'Incorrect CIF number'
    showError.value = true
    checkCIF.value = '1'
    dropdownAccountNo.value = false
  }
}
const getCustomerAccount = async () => {
  const data = { CIF: cif.value }
  const _res = await CustomerAccount(data)
  if (_res.data.length) {
    accountNumberList.value = _res.data[0].ACCOUNT_DETAILS
    return _res.data
  } else {
    return 0
  }
}
const resetData = () => {
  isOpen.isEdit = false
  checkCIF.value = ''
  cif.value = props.data?.CIF
  accountName.value = props.data?.ACCTNAME
  accountNumber.value = props.data?.ACCTNO
  aliasT.value = props.data?.ALIAS_TYPE
  selectedAccountNo.value = ''
  selectedAliasType.value = ''
  dropdownAccountNo.value = false
  dropdownAliasType.value = false
}
const handleUpdate = async () => {
  const data = {
    ID: props.data?.ID,
    ACCOUNT_NUMBER: accountNumber.value,
    ACCOUNT_NAME: accountName.value,
    ALIAS_TYPE: aliasT.value,
    CIF: cif.value,
    CUSTOMER_NAME: accountName.value,
    USER_EDIT: userData.EMPNAME,
    CCY: ccy.value
  }
  // isLoading.value = true
  try {
    const _res = await UpdateVA(data)
    if (_res.message === 'Success') {
      titleModal.value = 'Update'
      messageModal.value = 'Success'
      showSuccess.value = true
      isOpen.isDetail = false
      refreshVA()
      resetData()
    }
    if (_res.message === 'This account is already') {
      titleModal.value = 'This account is already'
      messageModal.value = 'Please try again'
      showError.value = true
    }
    if (!_res.data) {
      titleModal.value = 'Fail'
      messageModal.value = 'Please try again'
      showError.value = true
    }
  } finally {
    // isLoading.value = false
  }
}

const refreshVA = () => {
  eventBus.emit('refresh')
}
</script>
<template>
  <div class="flex items-center justify-center">
    <!-- Modal Overlay -->
    <transition name="fade-scale">
      <div
        v-if="isOpen.isEdit"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-999"
      >
        <!-- Modal Content -->
        <div class="bg-white p-6 rounded-2xl shadow-lg w-[600px]">
          <h2 class="flex justify-center font-bold text-xl text-gray-600 mb-4">
            {{ t('customer_information') }}
          </h2>
          <div class="space-y-4">
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[400px]">
                {{ t('account_number_cif') }}
              </label>
              <div class="flex items-center gap-2 w-full">
                <span class="relative block w-full">
                  <input
                    type="text"
                    @input="validateCIF"
                    v-model="cif"
                    class="bg-gray-50 border border-primary text-primary rounded-lg focus:outline-none py-1 px-2 w-full animate-pulse"
                    :class="{
                      'placeholder-none border border-green-500': checkCIF === '0',
                      'border border-red-500': checkCIF === '1'
                    }"
                  />
                  <span
                    v-if="checkCIF === '0'"
                    class="absolute inset-y-0 right-0 flex items-center px-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span
                    v-else-if="checkCIF === '1'"
                    class="absolute inset-y-0 right-0 flex items-center px-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-6 h-6 text-red-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </span>

                <button
                  @click.prevent="handleCheckCIF"
                  class="flex items-center gap-1 border border-primary hover:bg-gray-100 py-1 px-2 rounded-lg text-primary min-w-[110px]"
                  :class="{ 'border border-red-500 text-red-500': checkCIF === '1' }"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-5 h-5"
                    >
                      <!-- Corners -->
                      <path d="M7 3H5a2 2 0 0 0-2 2v2" />
                      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                      <path d="M3 17v2a2 2 0 0 0 2 2h2" />
                      <!-- Scan line -->
                      <path d="M3 12h18" />
                    </svg>
                  </span>
                  <span>{{ t('check') }}</span>
                </button>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[400px]">
                {{ t('account_name') }}
              </label>
              <span
                class="bg-gray-50 w-full py-1 px-2 rounded-lg text-red-600 border-b border-gray-300"
              >
                {{ accountName }}</span
              >
            </div>
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[400px]">
                {{ t('account_number') }}
              </label>

              <button
                class="dropdown-account-number text-left focus:outline-none w-full bg-gray-50 rounded-lg border-b border-gray-300 mr-1"
                @click.prevent="toggleDropdown('acc-no')"
                @keydown.esc="dropdownAccountNo = false"
              >
                <div class="flex items-center dropdown-selected-account-number">
                  <span class="text-red-600 px-2 py-0.5" v-if="selectedAccountNo">{{
                    selectedAccountNo.ACCOUNT_NUMBER + ' ' + selectedAccountNo.CCY
                  }}</span>
                  <span class="px-2 py-0.5 text-red-600" v-else>
                    {{ accountNumber + ' ' + ccy }}
                  </span>
                  <div class="absolute right-0 mr-5 px-2">
                    <svg
                      class="absolute top-1/2 -translate-y-1/2 fill-current"
                      :class="{ 'rotate-180': dropdownAccountNo }"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill=""
                      />
                    </svg>
                  </div>
                </div>
                <ul
                  v-if="dropdownAccountNo"
                  class="dropdown-list-account-number max-h-[300px] overflow-y-auto z-999"
                >
                  <li
                    v-for="account in accountNumberList"
                    :key="account.ACCOUNT_NUMBER"
                    :style="{
                      backgroundColor:
                        account.ACCOUNT_NUMBER === selectedAccountNo?.ACCOUNT_NUMBER ||
                        accountNumber === account.ACCOUNT_NUMBER
                          ? '#f8f8f8'
                          : '',
                      color:
                        account.ACCOUNT_NUMBER === selectedAccountNo?.ACCOUNT_NUMBER ||
                        accountNumber === account.ACCOUNT_NUMBER
                          ? '#fc6868  '
                          : ''
                    }"
                    class="flex gap-1.5 dropdown-item-account-number text-gray-500"
                    @click="selected('account', account)"
                  >
                    <span> {{ account.ACCOUNT_NUMBER }}</span>
                    <span> {{ account.CCY }}</span>
                  </li>
                </ul>
              </button>
            </div>
            <div class="flex gap-3 items-center">
              <label class="font-medium text-gray-900 w-[400px]">
                {{ t('payment_type') }}
              </label>
              <button
                class="dropdown-account-number text-left focus:outline-none w-full bg-gray-50 rounded-lg border-b border-gray-300 mr-1"
                @click.prevent="toggleDropdown('alias-type')"
                @keydown.esc="dropdownAliasType = false"
              >
                <div class="flex items-center dropdown-selected-account-number">
                  <span class="text-red-600 px-2 py-0.5" v-if="selectedAliasType">{{
                    t(selectedAliasType.label)
                  }}</span>
                  <span class="px-2 py-0.5 text-red-600" v-else>
                    <p v-if="aliasT === 1">{{ t('va_tranfer') }}</p>
                    <p v-else-if="aliasT === 2">{{ t('bill_payment') }}</p>
                  </span>
                  <div class="absolute right-0 mr-5 px-2">
                    <svg
                      class="absolute top-1/2 -translate-y-1/2 fill-current"
                      :class="{ 'rotate-180': dropdownAliasType }"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill=""
                      />
                    </svg>
                  </div>
                </div>
                <ul
                  v-if="dropdownAliasType"
                  class="dropdown-list-account-number max-h-[300px] overflow-y-auto z-999"
                >
                  <li
                    v-for="alias in aliasType"
                    :key="alias.id"
                    :style="{
                      backgroundColor:
                        alias.id === selectedAliasType?.id || aliasT === alias.id ? '#f8f8f8' : '',
                      color:
                        alias.id === selectedAliasType?.id || aliasT === alias.id ? '#fc6868  ' : ''
                    }"
                    class="dropdown-item-account-number text-gray-500"
                    @click="selected('alias', alias)"
                  >
                    <span> {{ t(alias.label) }}</span>
                  </li>
                </ul>
              </button>
            </div>
            <div>
              <span class="flex justify-center mt-10 gap-x-4">
                <button
                  @click="resetData"
                  class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-500 focus:outline-none"
                >
                  {{ t('cancel') }}
                </button>
                <button
                  @click="handleUpdate"
                  class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none"
                >
                  {{ t('update') }}
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
