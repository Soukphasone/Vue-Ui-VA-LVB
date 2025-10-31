<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4">
    <h1 class="text-9xl font-extrabold text-red-700">404</h1>
    <p class="text-2xl md:text-3xl font-semibold mt-4">Page not found</p>
    <p class="text-gray-500 mt-2 text-center">
      Sorry, the page you’re looking for doesn’t exist or has been moved.
    </p>

    <router-link
      to="/home"
      class="mt-6 px-6 py-3 bg-primary text-white rounded-xl shadow hover:bg-primary-600 transition duration-200"
    >
      Back to Home
    </router-link>
  </div>
</template>

<style scoped>
h1 {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}
</style>
