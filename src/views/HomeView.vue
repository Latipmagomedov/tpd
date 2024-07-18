<script setup>
import { onMounted, ref } from 'vue'
import { useLoginStore } from '@/stores/login.js'
import authApi from '@/api/auth.js'
import SplashScreen from '@/components/SplashScreen.vue'
import UserLabel from '@/components/UserLabel.vue'
import TapCoin from '@/components/TapCoin.vue'
import EnergyBar from '@/components/EnergyBar.vue'

const loginStore = useLoginStore()

const showLoader = ref(true)

const balance = ref(0)
const energy = ref(0)
const maxEnergy = ref(0)

const energyRestoration = () => {
  setInterval(() => {
    if (energy.value < maxEnergy.value) energy.value += 3
    if (energy.value >= maxEnergy.value) energy.value = maxEnergy.value
    if (energy.value < 0) energy.value = 0
  }, 1000)
}
const tap = () => {
  balance.value++
  if (energy.value > 0) energy.value--
}
const hideAnimation = () => {
  setTimeout(() => {
    showLoader.value = false
    energyRestoration()
  }, 1000)
}

const postClaim = async () => {
  await authApi.postClaim({
    id: loginStore.user.id,
    points: balance.value
  })
}

const getUser = async () => {
  const response = await authApi.getUser()
  loginStore.setUser(response)
  maxEnergy.value = 1000
  energy.value = response?.energy_balance
  balance.value = response?.balance
  hideAnimation()
  setInterval(() => {
    postClaim()
  }, 5000)
}
const postLogin = async () => {
  const response = await authApi.postLogin(window.Telegram.WebApp.initData)
  if (response.token) {
    await loginStore.setToken(response.token)
    await getUser()
  }
}

onMounted(() => {
  postLogin()
})
</script>

<template>
  <div class="home">
    <div v-if="loginStore.user.first_name" class="home__wrapper container">
      <div class="home__group">
        <UserLabel
          v-if="loginStore.user?.first_name"
          :name="loginStore.user?.first_name"
          :lastName="loginStore.user?.last_name"
          :photo="loginStore.user?.photo" />
        <div class="home__balance">
          <img src="@/assets/icons/coin.svg" alt="coin">
          <div class="home__balance-num">{{ balance?.toLocaleString() }}</div>
        </div>
        <TapCoin @tap="tap" :energy="energy" class="home__tap-coin" />
      </div>

      <EnergyBar class="home__energy-bar" :energy="energy" :maxEnergy="maxEnergy" />
    </div>

    <Transition name="fade">
      <SplashScreen v-if="showLoader" />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100dvh;
  padding-bottom: 58px;
  overflow-y: auto;

  &__wrapper {
    height: 100%;
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 600px;
  }

  &__group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__balance {
    margin-top: 52px;
    display: flex;
    align-items: center;

    img {
      width: 40px;
    }

    &-num {
      margin-left: 12px;
      font-size: 40px;
      font-weight: 600;
      line-height: 47.4px;
    }
  }

  &__tap-coin {
    margin-top: 40px;
  }

  &__energy-bar {
    margin-top: 40px;
  }
}
</style>
