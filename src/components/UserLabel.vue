<script setup>
defineProps({
  name: String,
  lastName: String,
  photo: String
})
</script>

<template>
  <div class="user">
    <div class="user__content">
      <img v-if="photo" :src="photo" class="user__img" alt="user">
      <div v-else class="user__img-empty">{{ name[0] }}</div>
      <div class="user__name">{{ name }} {{lastName}}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user {
  position: relative;
  padding: 0 16px;
  height: 48px;
  border-radius: 49px;
  background: linear-gradient(100.13deg, #EA6CFF 0%, rgba(255, 255, 255, 0.06) 49.5%, #359EFF 100%);

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 2.5px);
    height: calc(100% - 2.5px);
    border-radius: 49px;
    background-color: var(--dark-light-color);
  }

  &__content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
  }

  &__img {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    overflow: hidden;
    object-fit: cover;
  }

  &__img-empty {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    background-color: var(--blue-color);
  }

  &__name {
    max-width: 200px;
    margin-left: 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 18.96px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
