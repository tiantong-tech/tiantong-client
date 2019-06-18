<template>
  <div id="level">
    <nav class="level is-mobile container">
      <div class="level-left">
        <router-link id="logo" to="/" tag="a">
          天瞳科技
        </router-link>
        <div style="width: 2rem"></div>
        <LevelRouteItem
          route="/users"
          text="用户管理"
        ></LevelRouteItem>
      </div>
      <div class="level-right">
        <LevelRouteItem
          route="/login"
          :text="isAuthed ? '退出登录' : '用户登录'"
        ></LevelRouteItem>
      </div>
    </nav>
  </div>
</template>

<script>
import store from '@/providers/store'
import LevelRouteItem from './LevelRouteItem'

export default {
  name: 'Level',
  components: {
    LevelRouteItem
  },
  computed: {
    isAuthed: () => store.state.isAuthed,
    currentRoute () {
      return this.$route.fullPath
    }
  }
}
</script>
