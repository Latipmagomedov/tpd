<script setup>
defineProps({
  energy: Number,
  maxEnergy: Number
})
</script>

<template>
  <div class="energy">
    <div class="energy__content">
      <img src="@/assets/icons/flash.svg" class="energy__content-icon" alt="flash">
      <div class="energy__content-nums">
        {{ energy }} / {{ maxEnergy }}
      </div>
    </div>
    <div class="energy__bar">
      <div class="energy__bar-line" :style="{width: `${energy / maxEnergy * 100}%`}"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.energy {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__content {
    display: flex;
    align-items: center;

    &-icon {
      width: 28px;
    }

    &-nums {
      width: 100px;
      margin-left: 6px;
      font-size: 16px;
      font-weight: 600;
      line-height: 18.96px;
    }
  }

  &__bar {
    position: relative;
    width: calc(100% - 150px);
    height: 12px;
    border-radius: 55px;
    background-color: var(--gray-color);
    overflow: hidden;

    &-line {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      border-radius: 55px;
      background: linear-gradient(90deg, #0A1124 -6.34%, #858D50 31.3%, #E6F38A 72.35%, #FFFFFF 100%);
    }
  }
}
</style>
