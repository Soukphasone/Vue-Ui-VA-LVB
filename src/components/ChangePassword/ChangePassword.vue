<script setup>
import { ref, watch } from 'vue'
import useChangePassword from './ChangePassword'
import { currentLanguage } from '@/i18n'
const check = ref(currentLanguage.value)
watch(currentLanguage, (newLanguage) => {
  check.value = newLanguage
})
const {
  isModalOpen,
  newPassword,
  oldPassword,
  confirmPassword,
  errorMessage,
  isShowEyeOldPass,
  isShowEyeNewPass,
  isShowEyeConPass,
  isLoading,
  handleShowEye,
  handleChangePass
} = useChangePassword()
</script>

<template>
  <div :class="check === 'vn' ? '' : 'font-lao'">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50 bg-change-pass"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="flex justify-center">
            <p class="text-xl text-black">{{ $t('change_password') }}</p>
          </div>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleChangePass">
            <div>
              <label for="oldPassword" class="block mb-2 text-gray-900 dark:text-white">{{
                $t('old_password')
              }}</label>
              <div class="relative">
                <input
                  v-model="oldPassword"
                  :type="isShowEyeOldPass ? 'text' : 'password'"
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="••••••••"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  v-if="oldPassword.length > 0"
                  type="button"
                  @click="handleShowEye('old-password')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                >
                  <span v-if="isShowEyeOldPass">
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
                      viewBox="'0 0 24 24'"
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
            <div>
              <label for="newPassword" class="block mb-2 text-gray-900 dark:text-white">
                {{ $t('new_password') }}
              </label>
              <div class="relative">
                <input
                  v-model="newPassword"
                  :type="isShowEyeNewPass ? 'text' : 'password'"
                  name="newPassword"
                  id="newPassword"
                  placeholder="••••••••"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  v-if="newPassword.length > 0"
                  type="button"
                  @click="handleShowEye('new-password')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                >
                  <span v-if="isShowEyeNewPass">
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
                      viewBox="'0 0 24 24'"
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

            <div>
              <label for="confirmPassword" class="block mb-2 text-gray-900 dark:text-white">{{
                $t('confirm_password')
              }}</label>
              <div class="relative">
                <input
                  v-model="confirmPassword"
                  :type="isShowEyeConPass ? 'text' : 'password'"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  v-if="confirmPassword.length > 0"
                  type="button"
                  @click="handleShowEye('confirm-password')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                >
                <span v-if="isShowEyeConPass">
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
                      viewBox="'0 0 24 24'"
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
            <div v-if="errorMessage" class="text-center text-red-600">
              {{ errorMessage }}
            </div>
            <button
              class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <span v-if="isLoading" class="flex flex-col justify-center items-center">
                <Loading size="20px" />
              </span>
              <span v-else>{{ $t('confirm') }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
