<script setup>
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import flatPicker from 'flatpickr'
import { CustomerRegisterList } from '@/service/Get_Post_API'
import { dateSearch, formatDate, formatDateShort } from '@/service/Format.ts'
import Loading from '@/components/Loading/Loading.vue'
import { currentLanguage } from '@/i18n'
import SearchInput from '../Search/SearchInput.vue'
import CustomerDetail from '../Modals/CustomerDetail.vue'
import CustomerEdit from '../Modals/CustomerEdit.vue'
import showModals from '../Modals/showModals.vue'
import { useOpenModalStore } from '@/stores/modal'
import eventBus from '@/eventBus'
import { dayList, dayListLao, dayListViet } from '@/stores/branchBankList'

const userData = JSON.parse(localStorage.getItem('userData'))
const { t } = useI18n()
const check = ref(currentLanguage.value)
const isOpen = useOpenModalStore()
const target = ref(null)
const targetBranch = ref(null)
const targetDays = ref(null)
const flatPickerInstance = ref(null)
const datePicker = ref(null)
const selectedValueDate = ref('')
const selectedNameDay = ref(null)
const hideNameDay = ref(false)
const isDropdownOpenDays = ref(false)
const isDropdownOpenBranch = ref(false)
const isDropdownOpenCtTpye = ref(false)
const dataReport = ref([])
const isLoading = ref(false)
const today = new Date()
const dateFrom = ref('')
const dateTo = ref('')
const search = ref('')
const dataDeail = ref([])
const dataEdit = ref([])
const selectedItems = ref([]) // ChexBox
const checkItemData = ref(false)
const showError = ref(false)
const titleModal = ref('')
const messageModal = ref('')
// Computed property to check if all are selected
const isAllSelected = computed(
  () => selectedItems.value.length > 0 && selectedItems.value.length === dataReport.value.length
)

// Toggle Select All
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = []
    checkItemData.value = false
  } else {
    selectedItems.value = dataReport.value.map((item) => item.ID)
    checkItemData.value = true
  }
}
// Toggle individual checkbox
const toggleSelection = (item) => {
  const id = item.ID
  const newSelectedItems = [...selectedItems.value] // Create a copy for immutability

  const index = newSelectedItems.indexOf(id)

  if (index !== -1) {
    newSelectedItems.splice(index, 1)
  } else {
    newSelectedItems.push(id)
  }

  selectedItems.value = newSelectedItems
  checkItemData.value = newSelectedItems.length > 0
}
const queryDate = async () => {
  if(!dateFrom.value || !dateTo.value){
    titleModal.value = 'Please select day'
    showError.value= true
  }
  fetchData()
}
const toggleModal = (name, data) => {
  if (data) {
    if (name === 'detail') {
      selectedItems.value = [data.ID]
      dataDeail.value = data
      isOpen.isDetail = true
    }
  }
  if (name === 'authorize') {
    if (!checkItemData.value) {
      titleModal.value = 'please_select_some_items'
      showError.value = true
      return
    }
    titleModal.value = 'authorize'
    isOpen.isAuthorizeVA = true
  }
  if (name === 'delete') {
    if (!checkItemData.value) {
      titleModal.value = 'please_select_some_items'
      showError.value = true
      return
    }
    titleModal.value = 'delete'
    isOpen.isDeleteVA = true
  }
}
const fetchData = async () => {
  const data = {
    BRANCH: '',
    // BRANCH: userData.HR_BRN_CODE,
    STATUS: 0,
    DATE_FROM: dateFrom.value,
    DATE_TO: dateTo.value
  }
  isLoading.value = true
  try {
    const _res = await CustomerRegisterList(data)
    if (_res.data.length > 0) {
      dataReport.value = _res.data
    } else {
      dataReport.value = []
    }
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}
const filteredItems = computed(() =>
  dataReport.value.filter(
    (item) =>
      item.SERVICE_NAME.toLowerCase().includes(search.value.toLowerCase()) ||
      item.ACCTNAME.toLowerCase().includes(search.value.toLowerCase()) ||
      item.CIF.toLowerCase().includes(search.value.toLowerCase()) ||
      item.ACCTNO.toLowerCase().includes(search.value.toLowerCase())
  )
)
onMounted(fetchData)
const reSet = () => {
  fetchData()
  selectedItems.value = []
}
const calculateDateRange = (daysAgo) => {
  const startDate = new Date()
  startDate.setDate(today.getDate() - daysAgo)
  return { startDate, endDate: today }
}
const toggleDropdown = (item) => {
  if (item === 'customer-type') {
    isDropdownOpenCtTpye.value = !isDropdownOpenCtTpye.value
  }
  if (item === 'days') {
    isDropdownOpenDays.value = !isDropdownOpenDays.value
  }
  if (item === 'branch') {
    isDropdownOpenBranch.value = !isDropdownOpenBranch.value
  }
}
const selectDay = async (data) => {
  selectedNameDay.value = data
  selectedValueDate.value = data.value
  !isDropdownOpenDays.value
  if (!flatPickerInstance.value) return
  let range = { startDate: null, endDate: null }
  switch (selectedValueDate.value) {
    case 'today':
      range = { startDate: today, endDate: today }
      break
    case 'last7days':
      range = calculateDateRange(7)
      break
    case 'last15days':
      range = calculateDateRange(15)
      break
    case 'last30days':
      range = calculateDateRange(30)
      break
    case 'last60days':
      range = calculateDateRange(60)
      break
    case 'last90days':
      range = calculateDateRange(90)
      break
    default:
      range = { startDate: null, endDate: null }
      break
  }
  if (range.startDate && range.endDate) {
    flatPickerInstance.value.setDate([range.startDate, range.endDate])
    const formattedRange = `${formatDateShort(range.startDate)} - ${formatDateShort(range.endDate)}`
    datePicker.value.value = formattedRange
    dateFrom.value = dateSearch(range.startDate)
    dateTo.value = dateSearch(range.endDate)
    hideNameDay.value = false
  }
}
onMounted(async () => {
  // const threeMonthsAgo = new Date()
  // threeMonthsAgo.setMonth(today.getMonth() - 3)
  flatPickerInstance.value = flatPicker(datePicker.value, {
    mode: 'range',
    dateFormat: 'd/m/Y',
    // minDate: threeMonthsAgo,
    maxDate: today,
    // defaultDate: [today, today],
    onChange: async (selectedDates) => {
      if (selectedDates.length === 2) {
        const formattedRange = `${formatDateShort(selectedDates[0])} - ${formatDateShort(
          selectedDates[1]
        )}`
        dateFrom.value = dateSearch(selectedDates[0])
        dateTo.value = dateSearch(selectedDates[1])
        datePicker.value.value = formattedRange
        hideNameDay.value = true
      }
    }
  })
})
onClickOutside(target, () => {
  isDropdownOpenCtTpye.value = false
})
onClickOutside(targetBranch, () => {
  isDropdownOpenBranch.value = false
})
onClickOutside(targetDays, () => {
  isDropdownOpenDays.value = false
})
watch(currentLanguage, (newLanguage) => {
  check.value = newLanguage
})
onMounted(() => {
  eventBus.on('refresh', reSet)
})

onUnmounted(() => {
  eventBus.off('refresh', reSet)
})
</script>
<template>
  <div class="w-full mx-auto rounded-lg shadow-md overflow-hidden" style="margin-top: -15px">
    <div class="bg-primary py-4 px-6">
      <h1 class="text-2xl font-bold text-white md:text-center">Customer Registration List</h1>
    </div>
    <div class="max-w-full overflow-x-auto border border-gray-300 bg-gray-50">
      <div class="flex flex-grow items-center justify-between py-3 px-4">
        <div class="flex justify-center items-center">
          <div class="inline-flex items-center rounded-2 border border-gray-300 text-sm">
            <div>
              <div class="dropdown-container flex border-r border-gray-300 text-gray-600">
                <button
                  class="dropdown-date text-left focus:outline-none"
                  @click="toggleDropdown('days')"
                  @keydown.esc="isDropdownOpenDays = false"
                  ref="targetDays"
                >
                  <div class="flex items-center dropdown-selected-date w-[130px]">
                    <p v-if="!hideNameDay">
                      {{ selectedNameDay ? selectedNameDay.name : t('select_day') }}
                    </p>
                    <p v-else class="text-center mr-5">xxx-xxx-xxx</p>
                    <div class="absolute right-0 mr-4 px-2 px-2">
                      <svg
                        class="absolute top-1/2 -translate-y-1/2 fill-current"
                        :class="{ 'rotate-180': isDropdownOpenDays }"
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
                  <ul v-if="isDropdownOpenDays" class="dropdown-list-date">
                    <li
                      v-for="account in check === 'en'
                        ? dayList
                        : check === 'vn'
                          ? dayListViet
                          : dayListLao"
                      :key="account.id"
                      :style="{
                        backgroundColor: account.id === selectedNameDay?.id ? 'lightgray' : ''
                      }"
                      class="dropdown-item-date"
                      @click="selectDay(account)"
                    >
                      {{ account.name }}
                    </li>
                  </ul>
                </button>
              </div>
            </div>
            <div class="relative flex items-center">
              <span class="absolute left-0 pl-2 text-dark-5">
                <!-- Calendar Icon SVG -->
                <svg
                  class="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 3.3125H15.8125V2.625C15.8125 2.25 15.5 1.90625 15.0937 1.90625C14.6875 1.90625 14.375 2.21875 14.375 2.625V3.28125H5.59375V2.625C5.59375 2.25 5.28125 1.90625 4.875 1.90625C4.46875 1.90625 4.15625 2.21875 4.15625 2.625V3.28125H2.5C1.4375 3.28125 0.53125 4.15625 0.53125 5.25V16.125C0.53125 17.1875 1.40625 18.0937 2.5 18.0937H17.5C18.5625 18.0937 19.4687 17.2187 19.4687 16.125V5.25C19.4687 4.1875 18.5625 3.3125 17.5 3.3125ZM2.5 4.71875H4.1875V5.34375C4.1875 5.71875 4.5 6.0625 4.90625 6.0625C5.3125 6.0625 5.625 5.75 5.625 5.34375V4.71875H14.4687V5.34375C14.4687 5.71875 14.7812 6.0625 15.1875 6.0625C15.5937 6.0625 15.9062 5.75 15.9062 5.34375V4.71875H17.5C17.8125 4.71875 18.0625 4.96875 18.0625 5.28125V7.34375H1.96875V5.28125C1.96875 4.9375 2.1875 4.71875 2.5 4.71875ZM17.5 16.6562H2.5C2.1875 16.6562 1.9375 16.4062 1.9375 16.0937V8.71875H18.0312V16.125C18.0625 16.4375 17.8125 16.6562 17.5 16.6562Z"
                    fill=""
                  />
                  <path
                    d="M9 9.59375H8.3125C8.125 9.59375 8 9.71875 8 9.90625V10.5938C8 10.7813 8.125 10.9062 8.3125 10.9062H9C9.1875 10.9062 9.3125 10.7813 9.3125 10.5938V9.90625C9.3125 9.71875 9.15625 9.59375 9 9.59375Z"
                    fill=""
                  />
                  <path
                    d="M11.8438 9.59375H11.1562C10.9687 9.59375 10.8438 9.71875 10.8438 9.90625V10.5938C10.8438 10.7813 10.9687 10.9062 11.1562 10.9062H11.8438C12.0313 10.9062 12.1562 10.7813 12.1562 10.5938V9.90625C12.1562 9.71875 12.0313 9.59375 11.8438 9.59375Z"
                    fill=""
                  />
                  <path
                    d="M14.6875 9.59375H14C13.8125 9.59375 13.6875 9.71875 13.6875 9.90625V10.5938C13.6875 10.7813 13.8125 10.9062 14 10.9062H14.6875C14.875 10.9062 15 10.7813 15 10.5938V9.90625C15 9.71875 14.875 9.59375 14.6875 9.59375Z"
                    fill=""
                  />
                  <path
                    d="M6 12H5.3125C5.125 12 5 12.125 5 12.3125V13C5 13.1875 5.125 13.3125 5.3125 13.3125H6C6.1875 13.3125 6.3125 13.1875 6.3125 13V12.3125C6.3125 12.125 6.15625 12 6 12Z"
                    fill=""
                  />
                  <path
                    d="M9 12H8.3125C8.125 12 8 12.125 8 12.3125V13C8 13.1875 8.125 13.3125 8.3125 13.3125H9C9.1875 13.3125 9.3125 13.1875 9.3125 13V12.3125C9.3125 12.125 9.15625 12 9 12Z"
                    fill=""
                  />
                  <path
                    d="M11.8438 12H11.1562C10.9687 12 10.8438 12.125 10.8438 12.3125V13C10.8438 13.1875 10.9687 13.3125 11.1562 13.3125H11.8438C12.0313 13.3125 12.1562 13.1875 12.1562 13V12.3125C12.1562 12.125 12.0313 12 11.8438 12Z"
                    fill=""
                  />
                  <path
                    d="M14.6875 12H14C13.8125 12 13.6875 12.125 13.6875 12.3125V13C13.6875 13.1875 13.8125 13.3125 14 13.3125H14.6875C14.875 13.3125 15 13.1875 15 13V12.3125C15 12.125 14.875 12 14.6875 12Z"
                    fill=""
                  />
                  <path
                    d="M6 14.4062H5.3125C5.125 14.4062 5 14.5312 5 14.7187V15.4063C5 15.5938 5.125 15.7187 5.3125 15.7187H6C6.1875 15.7187 6.3125 15.5938 6.3125 15.4063V14.7187C6.3125 14.5312 6.15625 14.4062 6 14.4062Z"
                    fill=""
                  />
                  <path
                    d="M9 14.4062H8.3125C8.125 14.4062 8 14.5312 8 14.7187V15.4063C8 15.5938 8.125 15.7187 8.3125 15.7187H9C9.1875 15.7187 9.3125 15.5938 9.3125 15.4063V14.7187C9.3125 14.5312 9.15625 14.4062 9 14.4062Z"
                    fill=""
                  />
                  <path
                    d="M11.8438 14.4062H11.1562C10.9687 14.4062 10.8438 14.5312 10.8438 14.7187V15.4063C10.8438 15.5938 10.9687 15.7187 11.1562 15.7187H11.8438C12.0313 15.7187 12.1562 15.5938 12.1562 15.4063V14.7187C12.1562 14.5312 12.0313 14.4062 11.8438 14.4062Z"
                    fill=""
                  />
                </svg>
              </span>
              <!-- Date picker -->
              <input
                :placeholder="t('date')"
                ref="datePicker"
                type="text"
                class="w-full bg-transparent pl-[40px] text-gray-600 outline-none transition placeholder-gray-600"
              />
            </div>
          </div>
          <button
            class="flex gap-1 items-center rounded-lg hover:bg-gray-100 px-2 py-0.5 ml-2 text-gray-800 focus:outline-none"
            :class="dateFrom && dateTo? 'border border-primary':'border border-primary-200'"
            @click="queryDate"
          >
            <svg
              class="w-5 h-5 transition duration-200"
              :class="dateFrom && dateTo? 'text-primary':'text-primary-300'"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 10 17.5a7.5 7.5 0 0 0 6.65-3.85z"
              />
            </svg>
            {{ t('apply') }}
          </button>
          <div class="flex gap-2 ml-2">
            <button
              @click.prevent="toggleModal('delete')"
              class="flex items-center gap-1 text-gray-800 rounded-lg px-2 py-0.5 hover:bg-gray-100"
              :class="checkItemData ? 'border border-red-500' : 'border border-red-200'"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  :class="checkItemData ? 'text-red-500' : 'text-red-200'"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              <span> {{ t('delete') }}</span>
            </button>
            <button
              @click.prevent="toggleModal('authorize')"
              class="flex items-centers gap-1 text-gray-800 rounded-lg px-2 hover:bg-gray-100"
              :class="checkItemData ? 'border border-green-500' : 'border border-green-300'"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  :class="checkItemData ? 'text-green-600' : 'text-green-300'"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>
                {{ t('authorize') }}
              </span>
            </button>
          </div>
        </div>
        <div>
          <SearchInput v-model="search" />
        </div>
      </div>
      <div
        v-if="isLoading"
        class="flex flex-col justify-center items-center bg-gray-100 min-h-screen"
      >
        <div class="mb-60">
          <Loading />
        </div>
      </div>
      <table
        v-else-if="!isLoading && dataReport.length"
        class="w-full table-auto"
        :class="{
          'h-40': isDropdownOpenCtTpye,
          'h-100': isDropdownOpenBranch,
          'h-60': isDropdownOpenDays
        }"
      >
        <thead>
          <tr class="bg-gray-100 border-t border-b text-left text-sm font-bold text-gray-600">
            <th class="p-2 w-[65px] font-medium text-black">{{ t('stt') }}</th>
            <th class="px-4 w-[10px] font-medium text-black text-left">
              <div v-if="dataReport.length > 1" class="flex items-center gap-2">
                <span>
                  <label class="flex items-center justify-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      :checked="isAllSelected"
                      @change="toggleSelectAll"
                      class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:outline-none"
                    />
                  </label>
                </span>
                <span>{{ t('all') }}</span>
              </div>
              <div v-else>{{ t('choose') }}</div>
            </th>
            <th class="py-2 px-4 min-w-[120px]">{{ t('created_at') }}</th>
            <th class="py-2 px-4 min-w-[250px]">{{ t('service_name') }}</th>
            <th class="min-w-[120px] px-4">{{ t('account_number_cif') }}</th>
            <th class="min-w-[210px] px-4">{{ t('account_number') }}</th>
            <th class="min-w-[200px] px-2">{{ t('account_name') }}</th>
            <th class="min-w-[140px] px-2">{{ t('status') }}</th>
            <th class="min-w-[100px] px-2 text-center">
              <span>{{ t('view_detail') }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in filteredItems" :key="index" class="text-sm">
            <td class="p-2 w-[65px] border-b text-center border border">
              <p>{{ index + 1 }}</p>
            </td>
            <td class="px-4 w-[10px] border-b">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  :checked="selectedItems.includes(customer.ID)"
                  @change="() => toggleSelection(customer)"
                  class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:outline-none"
                />
              </label>
            </td>
            <td class="py-2 px-4 border-b text-left">
              <p class="text-black">
                {{ formatDate(customer.DATE_INSERT) }}
              </p>
            </td>
            <td class="py-2 px-4 border-b text-left">
              <p class="text-black">
                {{ customer.SERVICE_NAME }}
              </p>
            </td>
            <td class="px-4 border-b">
              <p class="text-black">{{ customer.CIF }}</p>
            </td>
            <td class="px-4 border-b">
              <p class="text-black">{{ customer.ACCTNO + ' - ' + customer.CCY }}</p>
            </td>
            <td class="px-2 border-b">
              <p class="text-black">{{ customer.ACCTNAME }}</p>
            </td>
                 <td class="px-2 border-b text-gray-800">
              <div
                v-if="customer.STATUS === 0"
                class="relative border-b border-gray-400 rounded-sm px-1 py-0.5"
              >
                <div class="flex gap-1">
                  <p>
                    {{ t('unauthorized') }}
                  </p>
                  <span class="absolute right-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div
                v-else-if="customer.STATUS === 1"
                class="relative border-b border-gray-400 rounded-sm px-1 py-0.5"
              >
                <div class="flex gap-1">
                  <p>
                    {{ t('authorized') }}
                  </p>
                  <span class="absolute right-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </td>
            <td class="px-2 border-b text-center">
              <button
                @click.prevent="toggleModal('detail', customer)"
                class="p-2 rounded hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-gray-600 hover:text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-else
        class="flex flex-col justify-center items-center bg-gray-100 min-h-screen border-t"
      >
        <div class="flex flex-col items-center justify-center mb-60">
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
          <p class="mt-2 text-gray-500 text-sm">{{ t('no_data') }}</p>
        </div>
      </div>
    </div>
  </div>
  <CustomerDetail :data="dataDeail" value="approve" />
  <CustomerEdit :data="dataEdit" />
  <showModals
    :show-success-modal="isOpen.isSuccess"
    :title="t(titleModal)"
    :message="t('success')"
    @close="isOpen.isSuccess = false"
  />
  <showModals
    :show-error-modal="showError"
    :title="titleModal"
    :message="messageModal"
    @close="showError = false"
  />
  <showModals
    :show-confirm-modal="isOpen.isDeleteVA"
    :id="selectedItems"
    :title="$t('dou_you_want_delete_this_account')"
    :message="$t('confirm')"
    value="delete-va"
    @close="isOpen.isDeleteVA = false"
  />
  <showModals
    :show-confirm-modal="isOpen.isAuthorizeVA"
    :id="selectedItems"
    :title="$t('do_you_want_approve')"
    :message="$t('confirm')"
    value="authorize-va"
    @close="isOpen.isAuthorizeVA = false"
  />
</template>
