<script setup>
import useLoginPage from './LoginPage'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Loading from '@/components/Loading/Loading.vue'
const { userName, passWord, errorMessage, isLoading, isShowEye, handleShowEye, handleLogin } =
  useLoginPage()
</script>

<template>
  <DefaultLayout>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-">
      <div
        class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="flex justify-center">
            <img src="@/assets/images/logo/LVB.png" alt="loginLogo" class="w-50" />
          </div>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
            <div>
              <label
                for="Username"
                class="block mb-2 text-sm text-gray-900"
                >{{ $t('user_name') }}</label
              >
              <input
                v-model="userName"
                type="text"
                name="userName"
                id="userName"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter User Name"
                required
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-gray-900">{{
                $t('password')
              }}</label>
              <div class="relative">
                <input
                  v-model="passWord"
                  :type="isShowEye ? 'text' : 'password'"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  v-if="passWord.length >= 1"
                  type="button"
                  @click="handleShowEye"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                >
                  <span v-if="isShowEye">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6 text-gray-700"
                    >
                      <path
                        d="M12 4.5c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Zm0 12a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5Z"
                      />
                      <path
                        d="M3 3l18 18M12 12"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span v-else>
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-gray-700"
                    >
                      <path
                        d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8Zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6Zm0-10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div v-if="errorMessage" class="text-center text-red-600">{{ errorMessage }}</div>
            <button
              class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <span v-if="isLoading" class="flex flex-col justify-center items-center">
                <Loading size="20px" />
              </span>
              <span v-else>{{ $t('login') }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
