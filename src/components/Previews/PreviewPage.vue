<script setup>
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatNumber, formatDate, formatTime, formatDateTime } from '@/service/Format.ts'
import eventBus from '@/eventBus'
import { currentLanguage } from '@/i18n'
const check = ref(currentLanguage.value)
watch(currentLanguage, (newLanguage) => {
  check.value = newLanguage
})

const userData = JSON.parse(localStorage.getItem('userData'))
const accountNumber = localStorage.getItem('accountNumber')
const now = new Date()
const { t } = useI18n()
const reportData = ref([])
const branchName = ref('')
const branchCode = ref('')
const accountType = ref('')
const currency = ref('')
const acStatus = ref('')
const dateFrom = ref('')
const dateTo = ref('')

const refresh = async () => {
  // Simulate an async operation (e.g., fetching new data)
  await new Promise((resolve) => setTimeout(resolve, 100)) // Example delay

  const data = JSON.parse(localStorage.getItem('dataReport'))
  const date = JSON.parse(localStorage.getItem('dateRange'))

  if (data && date) {
    reportData.value = data
    branchName.value = data[0]?.BRANCH_NAME
    branchCode.value = data[0]?.BRANCH_CODE
    accountType.value = data[0]?.ACCOUNT_TYPE
    currency.value = data[0]?.CCY
    acStatus.value = data[0]?.RECORD_STAT
    dateFrom.value = date.dataFrom._value
    dateTo.value = date.dataTo._value
  }
}

onMounted(() => {
  eventBus.on('refreshPreview', refresh)
})

onUnmounted(() => {
  eventBus.off('refreshPreview', refresh)
})

onMounted(() => {
  const data = JSON.parse(localStorage.getItem('dataReport'))
  const date = JSON.parse(localStorage.getItem('dateRange'))
  if (data && date) {
    reportData.value = data
    branchName.value = data[0]?.BRANCH_NAME
    branchCode.value = data[0]?.BRANCH_CODE
    accountType.value = data[0]?.ACCOUNT_TYPE
    currency.value = data[0]?.CCY
    acStatus.value = data[0]?.RECORD_STAT
    dateFrom.value = date.dataFrom._value
    dateTo.value = date.dataTo._value
  }
})
const totals = computed(() => {
  return reportData.value.reduce(
    (acc, transaction) => {
      acc.deposit += parseFloat(transaction.DEPOSIT || 0)
      acc.withdraw += parseFloat(transaction.WITHDRAW || 0)
      acc.openBal += parseFloat(transaction.OPEN_BAL || 0)
      acc.closeBal += parseFloat(transaction.CLOSE_BAL || 0)
      return acc
    },
    { deposit: 0, withdraw: 0, openBal: 0, closeBal: 0 }
  )
})
</script>

<template>
    <div class="grid grid-cols-3 gap-8">
      <div class="py-8 px-8 text-gray-700 text-sm">
        <div class="flex gap-2 items-center mb-3">
          <img src="@/assets/images/logo/LVB-Logo.png" alt="" class="w-20" />
          <span class="font-bold">LAO - VIET BANK</span>
        </div>
        <p class="font-semibold">{{ t('branch_name') }}: {{ branchName }}</p>
        <p class="font-semibold">{{ t('branch_code') }}: {{ branchCode }}</p>
        <p class="italic">Template: CASA04</p>
      </div>
      <div class="text-center text-black mt-35">
        <div class="font-semibold text-xl mb-4 uppercase">{{ t('account_statement') }}</div>
        <div class="">{{ t('date') }}: {{ dateFrom }} - {{ dateTo }}</div>
      </div>
      <div class="text-sm text-black mt-20">
        <div class="flex flex-grow items-center justify-between mb-4 text-sm">
          <div></div>
          <div class="items-center gap-3 text-black pr-20">
            <div class="flex gap-3">
              <p>{{ t('time_print') }}:</p>
              <p>{{ formatTime(now) }}</p>
            </div>
            <div class="flex gap-3">
              <p>{{ t('date_print') }}:</p>
              <p>{{ formatDate(now) }}</p>
            </div>
            <div class="flex gap-3">
              <p>{{ t('create_by') }}:</p>
              <p>{{ userData?.CIF }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-grow items-center justify-between mb-4 text-sm uppercase">
      <div class="text-black px-8">
        <div class="flex gap-3">
          <p class="font-semibold">{{ t('account_number') }}:</p>
          <p>{{ accountNumber }}</p>
        </div>
        <div class="flex gap-3">
          <p class="font-semibold">{{ t('account_name') }}:</p>
          <p>{{ userData?.FULLNAME }}</p>
        </div>
        <div class="flex gap-3">
          <p class="font-semibold">{{ t('opening_balance') }}:</p>
          <p>{{ formatNumber(totals.openBal) }}</p>
        </div>
        <div class="flex gap-3">
          <p class="font-semibold">{{ t('ending_balance') }}:</p>
          <p>{{ formatNumber(totals.closeBal) }}</p>
        </div>
      </div>
      <div class="items-center gap-3 text-black pr-20 uppercase">
        <div class="flex gap-3">
          <p class="font-semibold">{{ t('account_type') }}:</p>
          <p>{{ accountType }}</p>
        </div>
        <div class="flex gap-3">
          <p class="font-semibold">{{ t('currency') }}:</p>
          <p>{{ currency }}</p>
        </div>
        <div class="flex gap-3">
          <p class="font-semibold">{{ t('ac_status') }}:</p>
          <p>{{ acStatus }}</p>
        </div>
      </div>
    </div>
    <div class="px-7 mb-6">
      <div class="max-w-full overflow-x-auto bg-gray-50">
        <table class="w-full table-auto text-sm">
          <thead>
            <tr
              class="bg-gray-100 border-t border-b text-left dark:bg-meta-4 text-black text-center uppercase"
            >
              <th class="py-2 px-2 min-w-40 border border-black">
                {{ t('date') }}
              </th>
              <th class="py-2 px-2 border border-black">{{ t('tran_no') }}</th>
              <th class="py-2 px-2 border border-black">EVENT</th>
              <th class="py-2 px-2 border border-black">cheque no</th>
              <th class="py-2 px-2 border border-black">
                {{ t('description') }}
              </th>
              <th class="py-2 px-2 border border-black">
                {{ t('withdraw') }}
              </th>
              <th class="py-2 px-2 border border-black">
                {{ t('deposit') }}
              </th>

              <th class="py-2 px-2 border border-black">
                {{ t('balance') }}
              </th>
              <th class="py-2 px-2 border border-black">User</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in reportData" :key="index" class="text-center">
              <td class="px-1 border border-black">
                <p class="text-black">{{ item.TRN_DATE }}</p>
              </td>
              <td class="py-4 px-4 border border-black">
                <p class="text-black">{{ item.TRN_REF_NO }}</p>
              </td>
              <td class="py-4 px-4 border border-black">
                <p class="text-black">{{ item.EVENT }}</p>
              </td>
              <td class="py-4 px-4 border border-black">
                <p class="text-black">{{ item.EVENT_SR_NO }}</p>
              </td>
              <td class="py-4 px-4 border border-black">
                <p class="text-black">{{ item.DESCRIPTION }}</p>
              </td>
              <td class="items-center py-4 px-4 border border-black">
                <p class="text-black">{{ formatNumber(item.WITHDRAW) }}</p>
              </td>
              <td class="py-4 px-4 border border-black">
                <p class="text-black">{{ formatNumber(item.DEPOSIT) }}</p>
              </td>
              <td class="py-4 px-4 border border-black">
                <p class="text-black">{{ formatNumber(item.LUYKE_AMOUNT) }}</p>
              </td>
              <td class="py-4 px-4 border border-black">
                <p class="text-black">
                  {{ item.USER_ID }}
                </p>
              </td>
            </tr>
          </tbody>
          <tfoot class="bg-gray-100">
            <tr class="text-black">
              <td class="px-4 py-2 border border-black text-right" colspan="5">{{ t('total') }}</td>
              <td class="px-4 py-2 border border-black text-center">
                {{ formatNumber(totals.withdraw) }}
              </td>
              <td class="px-4 py-2 border border-black text-center">
                {{ formatNumber(totals.deposit) }}
              </td>
              <td class="px-4 py-2 border border-black" colspan="2"></td>
            </tr>
          </tfoot>
        </table>
        <div class="flex justify-center items-center mt-10">
          <table class="text-sm border-collapse">
            <tbody>
              <tr class="bg-gray-200">
                <td class="py-2 px-2 min-w-[200px] border border-black">
                  <p class="text-black dark:text-white uppercase">
                    {{ t('total_opening_balance') }}
                  </p>
                </td>
                <td class="py-2 px-2 min-w-[100px] border border-black">
                  <p class="text-black dark:text-white"></p>
                </td>
                <td class="py-2 px-2 min-w-[200px] border border-black">
                  <p class="text-black dark:text-white text-right">
                    {{ formatNumber(totals.openBal) }}
                  </p>
                </td>
              </tr>
              <tr class="text-center">
                <td class="py-2 px-2 border border-black">
                  <p class="text-black dark:text-white uppercase">{{ t('total_withdraw') }}</p>
                </td>
                <td class="py-2 px-2 border border-black">
                  <p class="text-black dark:text-white">{{ countDeposits }}</p>
                </td>
                <td class="py-2 px-2 border border-black">
                  <p class="text-black dark:text-white text-right">
                    {{ formatNumber(totals.withdraw) }}
                  </p>
                </td>
              </tr>
              <tr class="text-center">
                <td class="py-2 px-2 border border-black">
                  <p class="text-black dark:text-white uppercase">{{ t('total_deposit') }}</p>
                </td>
                <td class="py-2 px-2 border border-black">
                  <p class="text-black dark:text-white">{{ countWithdrawals }}</p>
                </td>
                <td class="py-2 px-2 border border-black">
                  <p class="text-black dark:text-white text-right">
                    {{ formatNumber(totals.deposit) }}
                  </p>
                </td>
              </tr>
              <tr class="bg-gray-200">
                <td class="py-2 px-2 min-w-[200px] border border-black">
                  <p class="text-black dark:text-white uppercase">
                    {{ t('total_ending_balance') }}
                  </p>
                </td>
                <td class="py-2 px-2 border border-black">
                  <p class="text-black dark:text-white"></p>
                </td>
                <td class="py-2 px-2 min-w-[200px] border border-black">
                  <p class="text-black dark:text-white text-right">
                    {{ formatNumber(totals.closeBal) }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>
