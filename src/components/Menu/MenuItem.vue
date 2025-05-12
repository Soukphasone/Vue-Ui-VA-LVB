<script setup>
import { ref } from 'vue'
import { formatNumber } from '@/service/Format'
import { useRouter } from 'vue-router'
import { PATH } from '@/router/pathName'
import eventBus from '@/eventBus'
import { showAlert } from '@/stores/alert'
defineProps({
  id: Number,
  name: String,
  menu_id: Number,
  description: String,
  price: Number,
  imageUrl: String,
  isPopular: Boolean,
  isVegetarian: Boolean,
  isSignature: Boolean
})
const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])
const router = useRouter()
const menuDetail = (menu) => {
  localStorage.setItem('menuDetail', JSON.stringify(menu))
  router.push(PATH.MENU_DETAIL)
}
const refreshCart = () => {
  eventBus.emit('refresh')
}
const addToCart = async (menu) => {
  // Get existing cart or create empty array if none exists
  const existingCart = JSON.parse(localStorage.getItem('cart')) || []

  // Check if item already exists in cart
  const itemExists = existingCart.some((item) => item.id === menu.id)
  if (itemExists) {
    return
  }
  showAlert(
    'Add to cart',
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
  // Add new item to cart
  const updatedCart = [...existingCart, menu]

  // Save back to localStorage
  localStorage.setItem('cart', JSON.stringify(updatedCart))
  cart.value = updatedCart
  //
  refreshCart()
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
    <!-- Image Section -->
    <div
      @click="menuDetail({ name: name, price: price, img: imageUrl, description: description })"
      class="h-48 overflow-hidden"
    >
      <img
        :src="imageUrl || 'https://placehold.co/600x400/amber-100/amber-800?text=No+Image'"
        :alt="name"
        class="w-full h-full object-cover transition duration-300 hover:scale-105"
      />
    </div>

    <!-- Content Section -->
    <div class="p-6">
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-bold text-amber-900">{{ name }}</h3>
        <span class="text-amber-700 font-medium">{{ formatNumber(price) }} Kip</span>
      </div>
      <p class="text-gray-600 mt-2">{{ description }}</p>

      <!-- Badges -->
      <div class="mt-3 flex justify-between items-center">
        <div>
          <span v-if="isPopular" class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
            Popular
          </span>
          <span v-if="isVegetarian" class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            Vegetarian
          </span>
          <span v-if="isSignature" class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
            Signature
          </span>
        </div>

        <button
          v-if="cart.some((item) => item.id === id)"
          class="bg-blue-500 text-white text-xs px-2 py-1 rounded"
        >
          Added
        </button>
        <button
          @click.prevent="
            addToCart({
              id: id,
              name: name,
              menu_id: menu_id,
              price: price,
              quantity: 1,
              img: imageUrl,
              description: description
            })
          "
          v-else
          class="bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-400 hover:font-bold"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>
