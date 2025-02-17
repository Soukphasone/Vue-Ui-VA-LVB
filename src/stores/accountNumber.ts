import { defineStore } from 'pinia'

export const useAccountStore = defineStore({
  id: 'account',
  state: () => ({
    selectedAccount: null as Record<string, any> | null,
  }),
  actions: {
    updateAccount(account: Record<string, any>) {
      this.selectedAccount = account
    },
  },
})
