<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue'
import { formatDate, formatNumber, dateExchange } from '@/service/Format'
import { ExchangeCurrency } from '@/service/Get_Post_API'

const userData = JSON.parse(localStorage.getItem('userData'))
const dataExchange = ref(JSON.parse(localStorage.getItem('Exchange')) || null)
const Exchagne = async () => {
  const body = {
    DATE: dateExchange(new Date()),
    BRANCH: userData?.HR_BRN_CODE,
    USER: userData?.EMPNAME
  }
  try {
    const _res = await ExchangeCurrency(body)
    if (_res.data) {
      localStorage.setItem('Exchange', JSON.stringify(_res?.data))
      if (!dataExchange.value) {
        return (dataExchange.value = _res?.data)
      }
      return
    }
    localStorage.setItem('Exchange', JSON.stringify(null))
  } catch (err) {
    console.log(err)
  }
}
onMounted(Exchagne)
const currencyInfo = {
  'USD/LAK': {
    name: 'USD',
    flag: new URL(`@/assets/images/flags/USD.png`, import.meta.url).href
  },
  'VND/LAK': {
    name: 'VND',
    flag: new URL(`@/assets/images/flags/vietnam-flag.png`, import.meta.url).href
  },
  'CNY/LAK': {
    name: 'CNY',
    flag: new URL(`@/assets/images/flags/CHINA.png`, import.meta.url).href
  },
  'THB/LAK': {
    name: 'THB',
    flag: new URL(`@/assets/images/flags/THB.png`, import.meta.url).href
  },
  'EUR/LAK': {
    name: 'EUR',
    flag: new URL(`@/assets/images/flags/EUR.png`, import.meta.url).href
  },
  'GBP/LAK': {
    name: 'GBP',
    flag: new URL(`@/assets/images/flags/GBP.png`, import.meta.url).href
  },
  'JPY/LAK': {
    name: 'JPY',
    flag: new URL(`@/assets/images/flags/JPY.png`, import.meta.url).href
  },
  'CAD/LAK': {
    name: 'CAD',
    flag: new URL(`@/assets/images/flags/CAD.png`, import.meta.url).href
  },
  'AUD/LAK': {
    name: 'AUD',
    flag: new URL(`@/assets/images/flags/AUD.png`, import.meta.url).href
  },
  'CHF/LAK': {
    name: 'CHF',
    flag: new URL(`@/assets/images/flags/CHF.png`, import.meta.url).href
  },
  'SGD/LAK': {
    name: 'SGD',
    flag: new URL(`@/assets/images/flags/SGD.png`, import.meta.url).href
  }
}
const getCurrencyName = (currency) => currencyInfo[currency]?.name
const getCurrencyFlage = (currency) => currencyInfo[currency]?.flag
</script>

<template>
  <div class="max-w-full mx-auto">
    <!-- Header -->
    <div class="bg-red-600 rounded-lg text-center text-white p-1 mb-2">
      <h1 class="text-lg font-bold">{{ $t('exchange') }}</h1>
      <p>{{ $t('date') + ': ' + formatDate(new Date()) }}</p>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 text-primary text-sm">
            <tr>
              <th class="min-w-30 px-6 py-3 text-left font-bold uppercase tracking-wider">
                {{ $t('currency') }}
              </th>
              <th class="min-w-25 px-6 py-3 text-left font-bold uppercase tracking-wider">
                {{ $t('buy') }}
              </th>
              <th class="min-w-25 px-6 py-3 text-left font-bold uppercase tracking-wider">
                {{ $t('sell') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="currency in dataExchange"
              :key="currency.BRANCH_CODE"
              class="hover:bg-gray-50 transition-colors duration-200"
            >
              <td class="px-6 py-2 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="mr-2">
                    <img
                      :src="getCurrencyFlage(currency.CURR)"
                      alt=""
                      class="w-6"
                      :class="
                        currency.CURR === 'JPY/LAK' || currency.CURR === 'SGD/LAK'
                          ? 'border h-4.5'
                          : 'h-4'
                      "
                    />
                  </div>
                  <div class="text-sm font-medium text-gray-900 mr-2">
                    {{ getCurrencyName(currency.CURR) }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                {{ formatNumber(currency.BUY_BY_CASH) }}
              </td>
              <td class="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatNumber(currency.BUY_BY_TRF) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0;
}

th,
td {
  border-bottom: 1px solid #e5e7eb;
}

tr:last-child td {
  border-bottom: none;
}
</style>
