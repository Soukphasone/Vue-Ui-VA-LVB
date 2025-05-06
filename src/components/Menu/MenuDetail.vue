<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { PATH } from '@/router/pathName'
import { formatNumber } from '@/service/Format'

const menuDetail = JSON.parse(localStorage.getItem('menuDetail'))
const router = useRouter()
const quantity = ref(1)
const menuName = menuDetail.name
const description = menuDetail.description
const price = menuDetail.price
const img = menuDetail.img
const shippingRate = 0

const increment = () => {
  if (quantity.value < 25) {
    quantity.value++
  }
}

const decrement = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const subtotal = computed(() => quantity.value * price)
const shipping = computed(() => quantity.value * shippingRate)
const total = computed(() => subtotal.value + shipping.value)

const placeOrder = () => {
  alert(`Order placed for ${quantity.value} items. Total: ${total.value.toFixed(2)} kip`)
}

const addToCart = () => {
  alert(`Added ${quantity.value} items to cart`)
}
</script>

<template>
  <div @click.prevent="router.push(PATH.HOME)" class="p-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="w-6 h-6 text-gray-800 hover:text-blue-500 cursor-pointer"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  </div>
  <div class="min-h-screen bg-gray-50 py-0 sm:py-4 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <!-- Product Image -->
      <div class="h-48 w-full bg-gray-200 flex items-center justify-center">
        <img
          :src="img"
          alt="Premium Widget Pro"
          class="h-full w-full object-cover"
        />
      </div>

      <!-- Product Header -->
      <div class="p-8">
        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Product</div>
        <h1 class="block mt-1 text-lg leading-tight font-medium text-black">{{ menuName }}</h1>
        <p class="mt-2 text-gray-500">
          {{ description }}
        </p>
      </div>

      <!-- Price Display -->
      <div class="px-8 pb-4">
        <div class="flex items-center">
          <span class="text-3xl font-bold text-gray-900">{{ formatNumber(price) }} KIP</span>
          <span class="ml-2 text-sm text-gray-500">/each</span>
        </div>
        <p class="mt-1 text-sm text-green-600">In stock (25 available)</p>
      </div>

      <!-- Quantity Selector -->
      <div class="px-8 pb-6">
        <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
        <div class="flex items-center">
          <button
            @click="decrement"
            :disabled="quantity <= 1"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            v-model.number="quantity"
            min="1"
            max="25"
            class="w-16 text-center border-t border-b border-gray-300 py-2 px-2 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            @click="increment"
            :disabled="quantity >= 25"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="bg-gray-50 px-8 py-6 border-t border-gray-200">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
        <div class="flex justify-between mb-2">
          <span class="text-gray-600">Subtotal</span>
          <span class="font-medium">{{ formatNumber(subtotal)}} KIP</span>
        </div>
        <div class="flex justify-between mb-2">
          <span class="text-gray-600">Shipping</span>
          <span class="font-medium">{{ shipping}} KIP</span>
        </div>
        <div class="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
          <span>Total</span>
          <span>{{ formatNumber(total) }} KIP</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="px-8 py-4 bg-white">
        <button
          @click="placeOrder"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
        >
          Place Order
        </button>
        <button
          @click="addToCart"
          class="w-full mt-3 bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3 px-4 border border-indigo-300 rounded-lg shadow-sm transition duration-150 ease-in-out"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
