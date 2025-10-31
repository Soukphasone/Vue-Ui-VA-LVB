<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { defineProps } from 'vue'
import { useOpenModalStore } from '@/stores/modal'
import { CustomerAccount, UpdateVA } from '@/service/Get_Post_API'
import { onClickOutside } from '@vueuse/core'
import showModals from '@/components/Modals/showModals.vue'
import eventBus from '@/eventBus'
import Loading from '@/components/Loading/Loading.vue'
import { svgIcons } from '@/stores/svgIcons'

const props = defineProps({
  data: Object
})
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
const targetAccount = ref(null)
const targetAliaType = ref(null)
const aliasType = [
  { id: 1, label: 'va_tranfer' },
  { id: 2, label: 'bill_payment' }
]
const validateCIF = (event) => {
  cif.value = event.target.value.replace(/\D/g, '').slice(0, 9)
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
  isLoading.value = true
  try {
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
      titleModal.value = t('invalid_cif')
      showError.value = true
      checkCIF.value = '1'
      dropdownAccountNo.value = false
    }
  } finally {
    isLoading.value = false
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
  isLoading.value = false
}
const handleUpdate = async () => {
  const data = {
    ID: props.data?.ID,
    ACCOUNT_NUMBER: accountNumber.value,
    ACCOUNT_NAME: accountName.value,
    ALIAS_TYPE: aliasT.value,
    CIF: cif.value,
    CUSTOMER_NAME: accountName.value,
    CCY: ccy.value
  }
  isLoading.value = true
  try {
    const _res = await UpdateVA(data)
    if (_res.message === 'SUCCESS') {
      titleModal.value = t('update_success')
      showSuccess.value = true
      isOpen.isDetail = false
      refreshVA()
      resetData()
      return
    }
    if (_res.message === 'This account is already') {
      titleModal.value = t('account_already_registered')
      showError.value = true
      isLoading.value = false
      return
    }
    titleModal.value = t('fail')
    showError.value = true
    isLoading.value = false
  } catch (error) {
    console.log(error)
  }
}
onClickOutside(targetAccount, () => {
  dropdownAccountNo.value = false
})
onClickOutside(targetAliaType, () => {
  dropdownAliasType.value = false
})
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
        <div
          v-if="isLoading"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-9999"
        >
          <span>
            <Loading />
          </span>
        </div>
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
                    <span v-html="svgIcons.Authorized" class="w-5 h-5 text-green-600"></span>
                  </span>
                  <span
                    v-else-if="checkCIF === '1'"
                    class="absolute inset-y-0 right-0 flex items-center px-2"
                  >
                    <span v-html="svgIcons.Delete" class="w-6 h-6 text-red-500"></span>
                  </span>
                </span>
                <button
                  @click.prevent="handleCheckCIF"
                  class="flex items-center gap-1 border border-primary hover:bg-gray-100 py-1 px-2 rounded-lg text-primary min-w-[110px]"
                  :class="{ 'border border-red-500 text-red-500': checkCIF === '1' }"
                >
                  <span
                    v-html="svgIcons.Scan_Check"
                    class="animate-pulse"
                    :class="{
                      'text-orange-600': checkCIF === '',
                      'text-green-600': checkCIF === '0',
                      'text-red-500': checkCIF === '1'
                    }"
                  ></span>
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
                ref="targetAccount"
              >
                <div class="flex items-center dropdown-selected-account-number">
                  <span class="text-red-600 px-2 py-0.5" v-if="selectedAccountNo">{{
                    selectedAccountNo.ACCOUNT_NUMBER + ' ' + selectedAccountNo.CCY
                  }}</span>
                  <span class="px-2 py-0.5 text-red-600" v-else>
                    {{ accountNumber + ' ' + ccy }}
                  </span>
                  <div class="absolute right-0 mr-5 px-2">
                    <span
                      v-html="svgIcons.ArrowDropDown"
                      class="absolute top-1/2 -translate-y-1/2 fill-current"
                      :class="{ 'rotate-180': dropdownAccountNo }"
                    >
                    </span>
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
                ref="targetAliaType"
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
                    <span
                      v-html="svgIcons.ArrowDropDown"
                      class="absolute top-1/2 -translate-y-1/2 fill-current"
                      :class="{ 'rotate-180': dropdownAliasType }"
                    >
                    </span>
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
  <showModals :show-success-modal="showSuccess" :title="titleModal" @close="showSuccess = false" />
  <showModals :show-error-modal="showError" :title="titleModal" @close="showError = false" />
</template>
