<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import useLoginPage from './LoginPage'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Loading from '@/components/Loading/Loading.vue'
import { svgIcons } from '@/stores/svgIcons'
const {
  userName,
  passWord,
  checkError,
  errorMessage,
  isLoading,
  isShowEye,
  toUppercase,
  handleShowEye,
  handleLogin
} = useLoginPage()
</script>

<template>
  <DefaultLayout>
    <div
      v-if="isLoading"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-9999"
    >
      <span class="mt-45">
        <Loading />
      </span>
    </div>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen bg-login">
      <div class="w-full bg-white rounded-xl shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-2">
          <div>
            <div class="flex justify-center mb-4">
              <img src="@/assets/images/logo/LVB.png" alt="loginLogo" class="w-40" />
            </div>
          </div>
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div
              class="relative rounded-lg block py-2 px-2 w-full outline-none"
              :class="{
                'border border-primary': !userName,
                'border border-red-500': checkError && !userName,
                'border border-green-500': userName || !checkError
              }"
            >
              <div class="flex items-center gap-3">
                <span
                  v-html="svgIcons.User"
                  class="w-7 h-7"
                  :class="{
                    'text-primary': !userName,
                    'text-red-500': checkError && !userName,
                    'text-black': userName || !checkError
                  }"
                >
                </span>
                <input
                  v-model="userName"
                  @input="toUppercase"
                  type="text"
                  :placeholder="$t('enter_name')"
                  class="text-gray-900 placeholder-gray-500 outline-none w-full"
                />
              </div>
            </div>
            <div
              class="relative rounded-lg block py-2 px-2 w-full outline-none"
              :class="{
                'border border-primary': !passWord,
                'border border-red-500': checkError && !passWord,
                'border border-green-500': passWord || !checkError
              }"
            >
              <div class="flex items-center gap-3">
                <span
                  v-html="svgIcons.KetLock"
                  class="w-7 h-7"
                  :class="{
                    'text-primary': !passWord,
                    'text-red-500': checkError && !passWord,
                    'text-black': passWord || !checkError
                  }"
                >
                </span>
                <input
                  v-model="passWord"
                  :type="isShowEye ? 'text' : 'password'"
                  :placeholder="$t('enter_password')"
                  class="text-gray-900 placeholder-gray-500 outline-none w-full"
                />
                <button
                  v-if="passWord.length > 0"
                  type="button"
                  @click="handleShowEye('old-password')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                >
                  <span v-if="isShowEye" v-html="svgIcons.HideEye" class="w-6 h-6 text-gray-700">
                  </span>
                  <span v-else v-html="svgIcons.ShowEye" class="w-6 h-6 text-gray-700"> </span>
                </button>
              </div>
            </div>
            <div>
              <button
                class="w-full text-white bg-primary hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
              >
                <span>{{ $t('login') }}</span>
              </button>
            </div>
            <div
              v-if="errorMessage"
              class="flex justify-center items-center gap-2 font-medium mt-4 text-red-500 animate-pulse text-center"
            >
              <span v-html="svgIcons.Warning" class="w-6 h-6 text-red-500"> </span>
              {{ $t(errorMessage) }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
