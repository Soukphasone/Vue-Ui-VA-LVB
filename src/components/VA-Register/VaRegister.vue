<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Loading from '@/components/Loading/Loading.vue'
import { useI18n } from 'vue-i18n'
import { CustomerAccount, RegisterVA, ServiceRegsiter } from '@/service/Get_Post_API'
import showModals from '@/components/Modals/showModals.vue'
import SearchInput from '../Search/SearchInput.vue'
import BillRegisterModal from '../Modals/BillRegisterModal.vue'
import { useOpenModalStore } from '@/stores/modal'
import { svgIcons } from '@/stores/svgIcons'

const userData = JSON.parse(localStorage.getItem('userData'))
const { t } = useI18n()
const steps = ['service_name', 'customer_information', 'review']
const currentStep = ref(1)
const showSuccess = useOpenModalStore()
const showError = ref(false)
const serviceData = ref([])
const isLoading = ref(false)
const isLoadingMore = ref(false)
const itemsPerPage = ref(10)
const currentPage = ref(1)
const selectedIndex = ref(null)
const titleModal = ref('')
const messageModal = ref('' || 'check_again')
const serviceName = ref('')
const accountNumberList = ref([])
const dropdownAccountNo = ref(false)
const selectedAccountNo = ref('')
const checkCIF = ref()
const search = ref('')
const checkError = ref('')
const dataBill = ref([])
const formData = ref({
  aliasId: '',
  serviceId: '',
  serviceName: '',
  serviceProfile: '',
  cif: '',
  accountNumber: '',
  accountName: '',
  customerName: '',
  aliasType: '',
  aliasTypeValue: '',
  ccy: '',
  branch: ''
})
const aliasType = [
  { value: '1', label: 'va_tranfer' },
  { value: '2', label: 'bill_payment' }
]
const selectAccount = (account) => {
  selectedAccountNo.value = account
  formData.value.accountNumber = account.ACCOUNT_NUMBER
  formData.value.ccy = account.CCY
  !dropdownAccountNo.value
}
const toggleDropdownAcNo = () => {
  dropdownAccountNo.value = !dropdownAccountNo.value
}
async function nextStep() {
  if (currentPage.value === 1) {
    if (!formData.value.serviceName || formData.value.serviceName === '') {
      titleModal.value = 'pl_choose_service_name'
      messageModal.value = 'check_again'
      showError.value = true
      return
    }
  }
  if (currentStep.value === 2) {
    if (!formData.value.cif) {
      titleModal.value = 'pl_enter_cif'
      showError.value = true
      return
    }
    if (formData.value.cif.length !== 9) {
      titleModal.value = 'pl_enter_cif_9_digits'
      showError.value = true
      return
    }
    if (!formData.value.accountNumber) {
      titleModal.value = 'pl_select_account_no'
      showError.value = true
      return
    }
    if (!formData.value.aliasType) {
      titleModal.value = 'Choose an alias type'
      showError.value = true
      return
    }
  }
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}
function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
function getAlisType(value) {
  formData.value.aliasTypeValue = value
  const type = aliasType.find((type) => type.value === value)
  return type ? type.label : ''
}
const validateCif = (event) => {
  formData.value.cif = event.target.value.replace(/\D/g, '').slice(0, 9) // Limits to 9 digits
}

const toggleSelection = (service) => {
  if (selectedIndex.value === service.SERVICE_PROFILE) {
    selectedIndex.value = null
    formData.value.serviceName = null 
  } else {
    selectedIndex.value = service.SERVICE_PROFILE
    formData.value.serviceId = service.SERVICE_ID
    formData.value.serviceProfile = service.SERVICE_PROFILE
    formData.value.serviceName = service.SERVICE_NAME
    serviceName.value = service.SERVICE_NAME
  }
}
async function handleSubmit() {
  const data = {
    ACCOUNT_NUMBER: formData.value.accountNumber,
    ACCOUNT_NAME: formData.value.accountName,
    ALIAS_TYPE: formData.value.aliasTypeValue,
    CIF: formData.value.cif,
    CUSTOMER_NAME: formData.value.accountName,
    BRANCE_CREATE: userData.HR_BRN_CODE,
    SERVICE_ID: formData.value.serviceId,
    API_TYPE: 1,
    CCY: formData.value.ccy,
    SERVICE_PROFILE: formData.value.serviceProfile
  }
  isLoading.value = true
  try {
    const _res = await RegisterVA(data)
    if (_res.message === 'SUCCESS') {
      dataBill.value = _res.data[0]
      showSuccess.isBill = true
      resetForm()
    }
    if (_res.message === 'This account is already registered') {
      titleModal.value = 'account_already_registered'
      showError.value = true
    }
    if (!_res.data) {
      titleModal.value = 'Fail'
      messageModal.value = 'Please try again'
      showError.value = true
    }
  } finally {
    isLoading.value = false
  }
}

const fetchServiceData = async () => {
  const data = {
    USER_ID: userData.EMPID
  }
  isLoading.value = true
  try {
    const _res = await ServiceRegsiter(data)
    if (_res.data.length > 0) {
      serviceData.value = _res.data
    } else {
      serviceData.value = []
    }
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}
const checkCustomerCIF = async () => {
  const data = { CIF: formData.value.cif }
  isLoading.value = true
  try {
    const _res = await CustomerAccount(data)
    return _res
  } catch (error) {
    console.error('Error checking CIF:', error)
  } finally {
    isLoading.value = false
  }
}
onMounted(fetchServiceData)
const filteredItems = computed(() => {
  return serviceData.value
    .filter((item) => item.SERVICE_NAME.toLowerCase().includes(search.value.toLowerCase()))
    .slice(0, currentPage.value * itemsPerPage.value)
})
const canLoadMore = computed(() => {
  return filteredItems.value.length < serviceData.value.length
})
watch(
  () => formData.value.cif,
  async (newVal) => {
    // Only run when length is 9 and step is 2
    if (newVal.length === 9 && currentStep.value === 2) {
      const res = await checkCustomerCIF()
      if (res.data.length > 0) {
        checkError.value = '0'
        showError.value = false
        checkCIF.value = true
        formData.value.accountName = res.data[0].AC_NAME
        const accountNumber = res.data[0].ACCOUNT_DETAILS
        if (accountNumber.length === 1) {
          selectedAccountNo.value = accountNumber[0]
          formData.value.accountNumber = accountNumber[0].ACCOUNT_NUMBER
          formData.value.ccy = accountNumber[0].CCY
        }
        if (accountNumber.length > 1) {
          dropdownAccountNo.value = true
          accountNumberList.value = res.data[0].ACCOUNT_DETAILS
        }
      } else {
        titleModal.value = 'invalid_cif'
        showError.value = true
        checkError.value = '2'
        formData.value.accountName = ''
        formData.value.accountNumber = ''
        selectedAccountNo.value = ''
        accountNumberList.value = []
        dropdownAccountNo.value = false
        checkCIF.value = false
      }
    } else {
      // Reset if user deletes numbers or length < 9
      selectedAccountNo.value = ''
      accountNumberList.value = []
      dropdownAccountNo.value = false
      checkCIF.value = false
    }
  }
)

const loadMore = () => {
  isLoadingMore.value = true
  setTimeout(() => {
    isLoadingMore.value = false
    currentPage.value++
  }, 500)
}
async function resetForm() {
  formData.value = {
    cif: '',
    serviceName: '',
    accountNumber: '',
    accountName: '',
    customerName: '',
    aliasType: ''
  }
  search.value = ''
  accountNumberList.value = []
  selectedAccountNo.value = ''
  selectedIndex.value = null
  dropdownAccountNo.value = false
  currentStep.value = 1
}
</script>
<template>
  <div class="min-h-screen bg-gray-100" style="margin-top: -15px">
    <div class="max-w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Form Header -->
      <div class="bg-primary py-4 px-6">
        <h1 class="text-2xl font-bold text-white md:text-center">{{ t('registration') }}</h1>
      </div>

      <!-- Progress Steps -->
      <div class="px-6 py-4 border-b">
        <div class="flex justify-center items-center gap-20">
          <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center"
              :class="{
                'bg-primary text-white': currentStep >= index + 1,
                'bg-gray-200 text-gray-600': currentStep < index + 1
              }"
            >
              {{ index + 1 }}
            </div>
            <span
              class="text-xs mt-1"
              :class="{
                'font-medium text-primary': currentStep >= index + 1,
                'text-gray-500': currentStep < index + 16
              }"
            >
              {{ t(step) }}
            </span>
          </div>
        </div>
      </div>
      <div v-show="currentStep === 1" class="flex justify-end w-full">
        <div v-if="serviceData.length > 0" class="mr-2 p-2 w-70">
          <SearchInput v-model="search" />
        </div>
      </div>
      <!-- Form Content -->
      <form @submit.prevent="handleSubmit">
        <!-- Step 2: Personal Information -->
        <div v-show="currentStep === 1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div></div>
          </div>
          <div v-if="isLoading" class="flex flex-col justify-center items-center">
            <div class="mt-15">
              <Loading />
            </div>
          </div>
          <div
            v-else-if="!isLoading && filteredItems.length <= 0"
            class="flex flex-col justify-center items-center"
          >
            <div class="flex flex-col items-center justify-center mt-20">
              <span v-html="svgIcons.NoData" class="w-20 h-20 text-red-600 animate-pulse"></span>
              <p class="mt-2 text-gray-500 text-sm">{{ t('no_data') }}</p>
            </div>
          </div>
          <table v-else class="w-full table-auto">
            <thead>
              <tr class="bg-gray-50 border-b text-center">
                <th class="p-2 w-[65px] font-medium text-black">{{ t('stt') }}</th>
                <th class="px-2 max-w-[50px] font-medium text-black">{{ t('choose') }}</th>
                <th class="py-2 px-8 font-medium text-black text-left">{{ t('service_name') }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in filteredItems"
                :key="item.SERVICE_PROFILE"
                class="text-gray-700"
              >
                <td class="p-2 border text-center">
                  <p>{{ index + 1 }}</p>
                </td>
                <td class="p-2 border-b">
                  <label class="flex items-center justify-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      :checked="selectedIndex === item.SERVICE_PROFILE"
                      @change="toggleSelection(item)"
                      class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:outline-none"
                    />
                  </label>
                </td>
                <td class="items-center px-8 border-b">
                  <p>{{ item.SERVICE_NAME }}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-center justify-center text-center mt-3">
            <div v-if="filteredItems.length >= 10">
              <span v-if="isLoadingMore">
                <Loading size="25" />
              </span>
              <button
                v-else-if="canLoadMore"
                class="p-0.5 px-6 border border-gray-300 bg-white rounded-xl hover:bg-gray-100"
                @click="loadMore"
              >
                {{ t('more') }} ...
              </button>
            </div>
          </div>
        </div>

        <div v-show="currentStep === 2" class="h-[320px] px-4">
          <div
            v-if="isLoading"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-9999"
          >
            <span>
              <Loading />
            </span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="flex w-full gap-2">
              <span class="text-gray-600 min-w-[120px]">{{ t('service_name') }}:</span>
              <span class="text-red-500">
                {{ formData.serviceName }}
              </span>
            </div>
            <div class="flex w-full gap-2 ml:0 md:ml-2.5">
              <span class="text-gray-600 min-w-[150px]">{{ t('account_name') }}:</span>
              <span class="text-red-500 animate-pulse">
                {{ formData.accountName }}
              </span>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="relative block w-full">
              <input
                type="text"
                v-model="formData.cif"
                @input="validateCif"
                :placeholder="t('enter_cif')"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-700"
                :class="{
                  'border border-primary-400 text-primary': checkError === '0',
                  'border border-red-500 text-red-500': checkError === '2'
                }"
              />
              <span
                v-if="checkCIF === true"
                class="absolute inset-y-0 right-0 flex items-center px-4"
              >
                <span v-html="svgIcons.Authorized" class="w-9 h-9 text-green-500"></span>
              </span>
              <span
                v-else-if="checkCIF === false"
                class="absolute inset-y-0 right-0 flex items-center px-4"
              >
                <span v-html="svgIcons.Delete" class="w-9 h-9 text-red-500"></span>
              </span>
            </div>
            <div
              class="dropdown-container border border-gray-300 rounded-md py-1 w-full md:w-[60%]"
              :class="{ 'border border-primary-400': selectedAccountNo }"
            >
              <button
                class="dropdown-account-number text-left focus:outline-none w-full"
                @click.prevent="toggleDropdownAcNo"
                @keydown.esc="dropdownAccountNo = false"
              >
                <div class="flex items-center dropdown-selected-account-number">
                  <span class="text-red-500 px-3" v-if="selectedAccountNo">{{
                    selectedAccountNo.ACCOUNT_NUMBER + ' ' + selectedAccountNo.CCY
                  }}</span>
                  <span class="px-3" v-else> {{ t('account_number') }} </span>
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
                        account.ACCOUNT_NUMBER === selectedAccountNo?.ACCOUNT_NUMBER
                          ? '#f8f8f8'
                          : '',
                      color:
                        account.ACCOUNT_NUMBER === selectedAccountNo?.ACCOUNT_NUMBER
                          ? '#fc6868  '
                          : ''
                    }"
                    class="flex gap-1.5 dropdown-item-account-number text-gray-500"
                    @click="selectAccount(account)"
                  >
                    <span> {{ account.ACCOUNT_NUMBER }}</span>
                    <span> {{ account.CCY }}</span>
                  </li>
                </ul>
              </button>
            </div>
          </div>
          <div class="w-full mt-6">
            <div>
              <div class="flex justify-start md:justify-center gap-3 p-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div v-for="type in aliasType" :key="type.value" class="flex items-center">
                    <input
                      type="radio"
                      :id="`aliasType-${type.value}`"
                      :value="type.value"
                      v-model="formData.aliasType"
                      class="h-7 w-7 text-blue-600 focus:ring-blue-500 border-gray-300"
                      required
                    />
                    <label
                      :for="`aliasType-${type.value}`"
                      class="ml-2 block text-sm text-gray-700"
                    >
                      {{ t(type.label) }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Step 3: Review & Submit -->
        <div v-show="currentStep === 3">
          <div class="p-4">
            <h3 class="font-bold text-primary text-lg mb-4">{{ t('customer_information') }}</h3>
            <div>
              <div class="flex w-full">
                <span class="text-primary w-[30%]">{{ t('service_name') }}:</span>
                <span class="text-red-500 w-[70%]">
                  {{ formData.serviceName }}
                </span>
              </div>
              <div class="flex w-full">
                <span class="text-primary w-[30%]">{{ t('account_number_cif') }}:</span>
                <span class="text-red-500 w-[70%]">
                  {{ formData.cif }}
                </span>
              </div>
              <div class="flex w-full">
                <span class="text-primary w-[30%]">{{ t('account_number') }}:</span>
                <span class="text-red-500 w-[70%]">
                  {{ formData.accountNumber + ' ' + formData.ccy }}
                </span>
              </div>
              <div class="flex w-full">
                <span class="text-primary w-[30%]">{{ t('account_name') }}:</span>
                <span class="text-red-500 w-[70%]">
                  {{ formData.accountName }}
                </span>
              </div>
              <div class="flex w-full">
                <span class="text-primary w-[30%]">{{ t('customer_name') }}:</span>
                <span class="text-red-500 w-[70%]">
                  {{ formData.accountName }}
                </span>
              </div>
              <div class="flex w-full">
                <span class="text-primary w-[30%]">{{ t('payment_type') }}:</span>
                <span class="text-red-500 w-[70%]">
                  {{ t(getAlisType(formData.aliasType)) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Navigation -->
        <div class="flex justify-between p-4">
          <button
            v-if="currentStep > 1"
            @click="prevStep"
            type="button"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            {{ t('back') }}
          </button>
          <div v-else></div>
          <!-- Empty div to maintain space -->

          <button
            v-if="currentStep < steps.length"
            @click="nextStep"
            type="button"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 ocus:outline-none"
          >
            {{ t('next') }}
          </button>

          <button
            v-if="currentStep === steps.length"
            type="submit"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none`"
          >
            {{ t('register') }}
          </button>
        </div>
      </form>
    </div>
    <showModals
      :show-error-modal="showError"
      :title="titleModal"
      :message="messageModal"
      @close="showError = false"
    />
  </div>
  <BillRegisterModal :data="dataBill" :service="serviceName" />
</template>
