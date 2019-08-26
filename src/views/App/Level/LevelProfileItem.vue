<template>
  <div
    class="level-item is-unselectable"
    style="position: absolute"
  >
    <a
      class="icon is-medium"
      style="cursor: pointer"
      @click="isActive = !isActive"
      v-clickoutside="() => isActive = false"
    >
      <i class="iconfont icon-user"></i>
    </a>
    <div
      v-active="isActive"
      class="dropdown-menu is-right"
      style="margin-top: 0.25rem"
    >
      <div
        style="width: 140px"
        class="dropdown-content"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import clickoutside from '@/directives/clickoutside'

export default {
  name: 'ProfileItem',
  directives: {
    clickoutside
  },
  data: () => ({
    isActive: false
  })
}
</script>
