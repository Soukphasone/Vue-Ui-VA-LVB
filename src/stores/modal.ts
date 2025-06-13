import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useOpenModalStore = defineStore('open', () => {
  const isOpenModal = ref(false)
  function toggleLogOut() {
    isOpenModal.value = !isOpenModal.value
  }

  return { isOpenModal, toggleLogOut }
})