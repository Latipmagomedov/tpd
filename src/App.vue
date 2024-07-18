<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import AccessDenied from '@/components/AccessDenied.vue'

const blockVerticalScrollApp = (isBlock) => {
  const offset = isBlock ? 100 : 0

  document.body.style.marginTop = `${offset}px`
  document.body.style.paddingBottom = `${offset}px`
  document.body.style.height = window.innerHeight + offset + 'px'

  window.scrollTo(0, offset)
}
const isMobile = ref(true)
const deviceCheck = () => {
  const check = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  if (!check) isMobile.value = false
}

onMounted(() => {
  deviceCheck()
  window.Telegram.WebApp.expand()
  blockVerticalScrollApp(true)
})
</script>

<template>
  <div class="app">
    <AccessDenied v-if="!isMobile" />
    <RouterView />
  </div>
</template>

