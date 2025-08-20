import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useOpenModalStore = defineStore('open-modal', () => {
  const isLogOut = ref(false)
  const isDetail = ref(false)
  const isEdit = ref(false)
  const isDeleteVA = ref(false)
  const isAuthorizeVA = ref(false)
  const isSuccess = ref(false)
  return { isLogOut, isDetail, isEdit, isDeleteVA, isAuthorizeVA, isSuccess }
})
export const useOpenModalBill = defineStore('open-bill', () => {
  const isOpenModal = ref(false)
  function toggleCustomer() {
    isOpenModal.value = !isOpenModal.value
  }
  return { isOpenModal, toggleCustomer }
})
export const useOpenModalDetail = defineStore('open-customer-detail', () => {
  const isOpenModal = ref(false)
  function toggleCustomerDetail() {
    isOpenModal.value = !isOpenModal.value
  }
  return { isOpenModal, toggleCustomerDetail }
})
export const useOpenModalEdit = defineStore('open-customer-edit', () => {
  const isOpenModal = ref(false)
  function toggleCustomerEdit() {
    isOpenModal.value = !isOpenModal.value
  }
  return { isOpenModal, toggleCustomerEdit }
})
export const useOpenModalDelete = defineStore('open-customer-delete', () => {
  const isOpenModal = ref(false)
  function toggleCustomerDelete() {
    isOpenModal.value = !isOpenModal.value
  }
  return { isOpenModal, toggleCustomerDelete }
})
