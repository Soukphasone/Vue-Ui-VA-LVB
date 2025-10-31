import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useOpenModalStore = defineStore('open-modal', () => {
  const isLogOut = ref(false)
  const isDetail = ref(false)
  const isEdit = ref(false)
  const isDeleteVA = ref(false)
  const isAuthorizeVA = ref(false)
  const isRejectVA = ref(false)
  const isSuccess = ref(false)
  const isError = ref(false)
  const isBill = ref(false)
  return { isLogOut, isDetail, isEdit, isDeleteVA, isAuthorizeVA, isRejectVA, isSuccess, isError, isBill }
})
