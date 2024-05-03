import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    isAddPostVisible: false,
  }),
  actions: {
    toggleAddPost() {
      this.isAddPostVisible = !this.isAddPostVisible
    },
  },
})
