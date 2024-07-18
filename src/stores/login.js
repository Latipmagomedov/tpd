import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {
  const token = ref('')
  const user = ref({})

  const setToken = (value) => {
    token.value = value
    localStorage.setItem('token', value)
  }

  const deleteToken = () => {
    token.value = ''
  }

  const setUser = (data) => {
    user.value = data
  }

  return { token, user, setToken, deleteToken, setUser }
})
