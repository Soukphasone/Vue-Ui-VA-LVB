import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    message: 'search'
  }),
  actions: {
    setMessage(newMessage: string) {
      this.message = newMessage;
    }
  }
});
