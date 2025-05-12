<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { PATH } from '@/router/pathName'
import { formatNumber } from '@/service/Format'
import { takeOrder } from '@/service/GetPostAPI'
import { showAlert } from '@/stores/alert'

const router = useRouter()
const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])
const menuNames = ref(cart.value.map((item) => item.name))
const menuIds = ref(cart.value.map((item) => item.menu_id))
const quantities = ref(cart.value.map((item) => item.quantity))
const prices = ref(cart.value.map((item) => item.price))
watch(cart.value, (newUpdate) => {
  quantities.value = newUpdate.map((item) => item.quantity)
})

// Computed total price
const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

// Computed total items count
const totalItems = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0)
})

// Shipping cost (could be dynamic based on logic)
const shipping = computed(() => {
  return subtotal.value > 100 ? 0 : 0
})

// Total cost
const total = computed(() => {
  return subtotal.value + shipping.value
})

// Methods
const removeItem = (id) => {
  // cart.value = cart.value.filter((item) => item.code_id !== id)
  // Get current items from localStorage
  const storedItems = localStorage.getItem('cart')
  if (!storedItems) return
  // Parse and filter
  const items = JSON.parse(storedItems)
  const updatedItems = items.filter((item) => item.id !== id)
  cart.value = updatedItems
  menuNames.value = updatedItems.map((item) => item.name)
  menuIds.value = updatedItems.map((item) => item.menu_id)
  quantities.value = updatedItems.map((item) => item.quantity)
  // Save back to localStorage
  localStorage.setItem('cart', JSON.stringify(updatedItems))
}
const updateQuantity = (id, newQuantity) => {
  // if (newQuantity < 1) return
  // const item = cart.value.find((item) => item.id === id)
  const index = cart.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    cart.value[index].quantity = newQuantity
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }
}
const buyOrder = async () => {
  const orders = {
    MENU_IDS: menuIds.value,
    USER_ID: 1,
    MENU_NAME: menuNames.value,
    QUANTITIES: quantities.value,
    PRICES: prices.value
  }
  console.log('Order_for_buy', orders)
  try {
    const _buyOrder = await takeOrder(orders)
    console.log('Order buy', _buyOrder)
    if (_buyOrder.data) {
      showAlert(
        'Buy Order',
        'Success',
        'success',
        'Yes',
        'cancel',
        '#86e54c',
        '#28a745',
        '#dc3545',
        false,
        false,
        2000
      )
    }
  } catch (error) {
    console.log(object)
  }
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
  <div class="container mx-auto px-4 py-4">
    <h1 class="text-2xl font-bold mb-6">Your Cart ({{ totalItems }} items)</h1>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Cart Items List -->
      <div class="lg:w-2/3">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <!-- Cart Header -->
          <div class="hidden md:grid grid-cols-12 bg-gray-100 p-4 border-b">
            <div class="col-span-5 font-medium text-gray-600">Product</div>
            <div class="col-span-2 font-medium text-gray-600">Price</div>
            <div class="col-span-3 font-medium text-gray-600">Quantity</div>
            <div class="col-span-2 font-medium text-gray-600">Total</div>
          </div>

          <!-- Cart Items -->
          <div v-for="item in cart" :key="item.id" class="p-4 border-b last:border-b-0">
            <div class="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
              <!-- Product Info -->
              <div class="md:col-span-5 flex items-center space-x-4">
                <img :src="item.img" :alt="item.name" class="w-20 h-20 object-cover rounded" />
                <div>
                  <h3 class="font-medium">{{ item.name }}</h3>
                  <button
                    @click="removeItem(item.id)"
                    class="text-red-500 hover:text-red-700 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <!-- Price -->
              <div class="md:col-span-2 text-gray-700">
                <span class="md:hidden font-medium mr-2">Price:</span>
                {{ formatNumber(item.price) }} KIP
              </div>

              <!-- Quantity -->
              <div class="md:col-span-3">
                <div class="flex items-center">
                  <button
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="w-8 h-8 border rounded-l flex items-center justify-center hover:bg-gray-100"
                    :class="{ 'opacity-50 cursor-not-allowed': item.quantity === 1 }"
                    :disabled="item.quantity === 1"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    v-model.number="item.quantity"
                    @change="updateQuantity(item.id, item.quantity)"
                    class="w-12 h-8 border-t border-b text-center"
                  />
                  <button
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="w-8 h-8 border rounded-r flex items-center justify-center hover:bg-gray-100"
                    :class="{ 'opacity-50 cursor-not-allowed': item.quantity >= 10 }"
                    :disabled="item.quantity >= 10"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Total -->
              <div class="md:col-span-2 font-medium">
                <span class="md:hidden font-medium mr-2">Total:</span>
                {{ formatNumber(item.price * item.quantity) }} KIP
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:w-1/3">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>

          <div class="space-y-3">
            <div class="flex justify-between">
              <span>Subtotal ({{ totalItems }} items)</span>
              <span>{{ subtotal }} KIP</span>
            </div>

            <div class="flex justify-between">
              <span>Shipping</span>
              <span>{{ shipping === 0 ? 'Free' : `${shipping} KIP` }}</span>
            </div>

            <div class="border-t pt-3 mt-3">
              <div class="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{{ formatNumber(total) }} KIP</span>
              </div>
            </div>
          </div>

          <button
            @click="buyOrder"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-6 font-medium transition-colors"
          >
            Proceed to Checkout
          </button>

          <div class="mt-4 text-sm text-gray-500">
            <p>or <a href="#" class="text-blue-600 hover:underline">continue shopping</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
