<script setup>
</script>

<template>
  <div class="splash-screen">
    <div class="splash-screen__banner">
      <img src="@/assets/images/splash-screen-banner.png" alt="TapDog">
    </div>

    <div class="splash-screen__loader">
      <svg class="splash-screen__loader-circle-svg" viewBox="25 25 50 50">
        <circle class="splash-screen__loader-circle-stroke" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.splash-screen {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--brand-color);
  background-image: url('@/assets/images/splash-screen.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 999;

  &__banner {
    width: 270px;
    margin-top: 5px;

    img {
      width: 100%;
    }
  }

  &__loader {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    position: absolute;
    left: 50%;
    bottom: 46px;
    transform: translateX(-50%);
    border: 2px solid rgba(10, 17, 36, 0.5);

    &-circle-svg {
      animation: loading-spinner-rotate 1.28973s linear infinite;
      height: 37.5px;
      transform-origin: center center;
      width: 37.5px;
      position: absolute;
      top: -4.7px;
      left: -4.7px;
    }

    &-circle-stroke {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      animation: loading-spinner-dash 2s ease-in-out infinite, loading-spinner-color 8s ease-in-out infinite;
      stroke-linecap: round;
      stroke-width: 3.2px;
    }
  }

  @keyframes loading-spinner-rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes loading-spinner-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }
  @keyframes loading-spinner-color {
    100%,
    0% {
      stroke: #E6F38A;

    }
    40% {
      stroke: #E6F38A;
    }
    66% {
      stroke: #E6F38A;
    }
    80%,
    90% {
      stroke: #E6F38A;
    }
  }
}
</style>
