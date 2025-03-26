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
  checkError,
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
        class="w-full bg-white rounded-xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6">
          <div class="flex justify-center mb-10">
            <p class="text-xl text-black">{{ $t('change_password') }}</p>
          </div>
          <form class="space-y-4" @submit.prevent="handleChangePass">
            <div
              class="relative rounded-lg block py-2 px-2 w-full outline-none"
              :class="{
                'border border-primary': !oldPassword,
                'border border-red-500': checkError && !oldPassword,
                'border border-green-500': oldPassword || !checkError
              }"
            >
              <div class="flex items-center gap-3">
                <svg
                  class="w-7 h-7"
                  :class="{
                    'text-primary': !oldPassword,
                    'text-red-500': checkError && !oldPassword,
                    'text-black': oldPassword || !checkError
                  }"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 11V8a4 4 0 10-8 0v3M7 11h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z"
                  />
                  <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                </svg>
                <input
                  v-model="oldPassword"
                  :type="isShowEyeOldPass ? 'text' : 'password'"
                  :placeholder="$t('enter_old_password')"
                  class="text-gray-900 placeholder-gray-500 outline-none w-full"
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

              <!-- <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 focus:outline-none"
                ></button> -->
            </div>
            <div
              class="relative rounded-lg block py-2 px-2 w-full outline-none"
              :class="{
                'border border-primary': !newPassword,
                'border border-red-500': checkError && !newPassword,
                'border border-green-500': newPassword || !checkError
              }"
            >
              <div class="flex items-center gap-3">
                <svg
                  class="w-7 h-7"
                  :class="{
                    'text-primary': !newPassword,
                    'text-red-500': checkError && !newPassword,
                    'text-black': newPassword || !checkError
                  }"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 11V8a4 4 0 10-8 0v3M7 11h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z"
                  />
                  <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                </svg>
                <input
                  v-model="newPassword"
                  :type="isShowEyeNewPass ? 'text' : 'password'"
                  :placeholder="$t('enter_new_password')"
                  class="text-gray-900 placeholder-gray-500 outline-none w-full"
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
            <div
              class="relative rounded-lg block py-2 px-2 w-full outline-none"
              :class="{
                'border border-primary': !confirmPassword,
                'border border-red-500': checkError && !confirmPassword,
                'border border-green-500': confirmPassword || !checkError
              }"
            >
              <div class="flex items-center gap-3">
                <svg
                  class="w-7 h-7"
                  :class="{
                    'text-primary': !confirmPassword,
                    'text-red-500': checkError && !confirmPassword,
                    'text-black': confirmPassword || !checkError
                  }"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 11V8a4 4 0 10-8 0v3M7 11h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z"
                  />
                  <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                </svg>
                <input
                  v-model="confirmPassword"
                  :type="isShowEyeConPass ? 'text' : 'password'"
                  :placeholder="$t('enter_confirm_password')"
                  class="text-gray-900 placeholder-gray-500 outline-none w-full"
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

              <!-- <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 focus:outline-none"
                ></button> -->
            </div>
            <div v-if="errorMessage" class="text-center text-red-600">
              {{ errorMessage }}
            </div>
            <div>
              <button
                class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
              >
                <span v-if="isLoading" class="flex flex-col justify-center items-center">
                  <Loading size="20px" />
                </span>
                <span v-else>{{ $t('confirm') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
