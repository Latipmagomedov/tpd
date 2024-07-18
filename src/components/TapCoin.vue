<script setup>
import { ref } from 'vue'

const props = defineProps({
  energy: Number
})

const emit = defineEmits(['tap'])

const tapCoinElem = ref(null)
const addAnimations = (event, target) => {
  const block = target
  const animationDuration = 2000

  const animation = document.createElement('span')
  animation.textContent = '1'
  animation.className = 'animation-num'
  animation.style.left = (event.pageX - tapCoinElem.value?.offsetLeft) + 'px'
  animation.style.top = (event.pageY - tapCoinElem.value?.offsetTop) + 'px'
  block.appendChild(animation)

  setTimeout(() => {
    animation.style.display = 'block'
    setTimeout(() => {
      animation.style.display = 'none'
      block.removeChild(animation)
    }, animationDuration)
  }, 200)
}

const stylePerspective = ref('perspective(1000px) rotateX(0deg) rotateY(0deg)')
const startPerspectiveAnimation = (e) => {
  const event = e.targetTouches[0]
  const x = event.pageX / document.body.offsetWidth - 0.5
  const y = 0.5 - event.pageY / document.body.offsetHeight

  stylePerspective.value = `perspective(1000px) rotateX(${y * 40}deg) rotateY(${x * 40}deg)`
}

const endPerspectiveAnimation = () => {
  setTimeout(() => {
    stylePerspective.value = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }, 0)
}

const touchEnd = (event) => {
  if (props.energy < 1) return
  endPerspectiveAnimation()
  window.Telegram.WebApp.HapticFeedback.impactOccurred('medium')
  Object.keys(event.changedTouches).forEach(function(key) {
    emit('tap')
    addAnimations(event.changedTouches[key], event.currentTarget)
  })
}
</script>

<template>
  <div ref="tapCoinElem"
       @touchstart="startPerspectiveAnimation"
       @touchend="touchEnd"
       class="tap-coin"
       :style="{transform: stylePerspective}"
  >
    <img src="@/assets/images/tap-skins/tap-skin.png" class="tap-coin__skin" alt="tap coin">
    <div class="tap-coin__shadow"></div>
  </div>
</template>

<style scoped lang="scss">
.tap-coin {
  position: relative;
  width: 308px;
  height: 351px;
  transition: transform 0s;

  &__skin {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    object-fit: contain;
    z-index: 2;
  }

  &__shadow {
    position: absolute;
    left: 50%;
    bottom: 27px;
    transform: translateX(-50%);
    width: 262px;
    height: 262px;
    border-radius: 100%;
    z-index: 1;
    background: var(--blue-color);
    mix-blend-mode: lighten;
    opacity: 0.5;
    filter: blur(100px);

  }

  &::v-deep(.animation-num) {
    position: absolute;
    display: none;
    animation: move-up 2s forwards;
    color: var(--yellow-color);
    font-size: 32px;
    font-style: italic;
    font-weight: 600;
    line-height: 37.92px;
    z-index: 4;

    @keyframes move-up {
      from {
        opacity: 1;
        transform: translate(0, 0);
      }
      to {
        opacity: 0;
        transform: translate(0, -200px);
      }
    }
  }
}
</style>
