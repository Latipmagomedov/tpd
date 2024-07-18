<script setup></script>

<template>
  <div class="access-denied">
    <div class="access-denied__title">Play on your mobile</div>
  </div>
</template>

<style scoped lang="scss">
.access-denied {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--brand-color);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 99999;

  &__title {
    max-width: 300px;
    font-size: 28px;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
  }
}
</style>
