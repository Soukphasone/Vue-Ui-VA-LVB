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
import { svgIcons } from '@/stores/svgIcons'

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
const checkDate = ref(false)
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
  if (!checkDate.value) {
    titleModal.value = 'pl_select_date'
    showError.value = true
    return
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
  if (name === 'reject') {
    if (!checkItemData.value) {
      titleModal.value = 'please_select_some_items'
      showError.value = true
      return
    }
    titleModal.value = 'reject'
    isOpen.isRejectVA = true
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
  checkItemData.value = false
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
    case 'all':
      range = { startDate: null, endDate: null }
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
    checkDate.value = true
  } else {
    selectedItems.value = []
    flatPickerInstance.value.setDate()
    dateFrom.value = ''
    dateTo.value = ''
    hideNameDay.value = false
    checkDate.value = true
  }
}
onMounted(async () => {
  flatPickerInstance.value = flatPicker(datePicker.value, {
    mode: 'range',
    dateFormat: 'd/m/Y',
    maxDate: today,
    onChange: async (selectedDates) => {
      if (selectedDates.length === 2) {
        const formattedRange = `${formatDateShort(selectedDates[0])} - ${formatDateShort(
          selectedDates[1]
        )}`
        dateFrom.value = dateSearch(selectedDates[0])
        dateTo.value = dateSearch(selectedDates[1])
        datePicker.value.value = formattedRange
        hideNameDay.value = true
        checkDate.value = true
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
                      <span
                        v-html="svgIcons.ArrowDropDown"
                        class="absolute top-1/2 -translate-y-1/2 fill-current"
                        :class="{ 'rotate-180': isDropdownOpenDays }"
                      >
                      </span>
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
              <span
                v-html="svgIcons.Calendar"
                class="absolute left-0 pl-2 text-dark-5 fill-primary"
              >
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
            :class="checkDate ? 'border border-primary' : 'border border-primary-200'"
            @click="queryDate"
          >
            <span
              v-html="svgIcons.Search"
              class="w-5 h-5 transition duration-200"
              :class="checkDate ? 'fill-primary' : 'fill-primary-300'"
            >
            </span>
            {{ t('apply') }}
          </button>
          <div class="flex gap-2 ml-2">
            <button
              @click.prevent="toggleModal('delete')"
              class="flex items-center gap-1 text-gray-800 rounded-lg px-2 py-0.5 hover:bg-gray-100"
              :class="checkItemData ? 'border border-red-500' : 'border border-red-200'"
            >
              <span
                v-html="svgIcons.Delete"
                class="w-6 h-6"
                :class="checkItemData ? 'text-red-500' : 'text-red-200'"
              >
              </span>

              <span> {{ t('delete') }}</span>
            </button>
            <button
              @click.prevent="toggleModal('reject')"
              class="flex items-center gap-1 text-gray-800 rounded-lg px-2 py-0.5 hover:bg-gray-100"
              :class="checkItemData ? 'border border-red-500' : 'border border-red-200'"
            >
              <span
                v-html="svgIcons.Reject"
                class="w-6 h-6"
                :class="checkItemData ? 'text-red-500' : 'text-red-200'"
              >
              </span>
              <span> {{ t('reject') }}</span>
            </button>
            <button
              @click.prevent="toggleModal('authorize')"
              class="flex items-centers gap-1 text-gray-800 rounded-lg px-2 hover:bg-gray-100"
              :class="checkItemData ? 'border border-green-500' : 'border border-green-300'"
            >
              <span
                v-html="svgIcons.Authorized"
                class="w-6 h-6"
                :class="checkItemData ? 'text-green-600' : 'text-green-300'"
              >
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
          'h-70': isDropdownOpenDays
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
              <div v-if="customer.STATUS === 0" class="relative rounded-sm px-1 py-0.5">
                <div class="flex items-center gap-2">
                  <span v-html="svgIcons.Delete" class="w-6 h-6 text-red-500">
                  </span>
                  <p>
                    {{ t('unauthorized') }}
                  </p>
                </div>
              </div>
              <div v-else-if="customer.STATUS === 1" class="relative rounded-sm px-1 py-0.5">
                <div class="flex items-center gap-2">
                  <span v-html="svgIcons.Authorized" class="w-6 h-6 text-green-500"> </span>
                  <p>
                    {{ t('authorized') }}
                  </p>
                </div>
              </div>
              <div v-else-if="customer.STATUS === 2" class="relative rounded-sm px-1 py-0.5">
                <div class="flex items-center gap-2 text-red-600">
                  <span v-html="svgIcons.Reject" class="w-6 h-6"> </span>
                  <p>
                    {{ t('rejected') }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-2 border-b text-center">
              <button
                @click="toggleModal('detail', customer)"
                class="p-2 rounded hover:bg-gray-200 transition w-10"
              >
                <span
                  v-html="svgIcons.EyeView"
                  class="h-6 w-6 text-orange-300 hover:text-orange-500"
                >
                </span>
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
          <span v-html="svgIcons.NoData" class="w-20 h-20 text-red-600 animate-pulse"></span>
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
    value="1"
    @close="isOpen.isAuthorizeVA = false"
  />
  <showModals
    :show-confirm-modal="isOpen.isRejectVA"
    :id="selectedItems"
    :title="$t('do_want_to_reject')"
    :message="$t('confirm')"
    value="2"
    @close="isOpen.isRejectVA = false"
  />
</template>
