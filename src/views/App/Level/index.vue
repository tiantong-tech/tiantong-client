<template>
  <div id="level">
    <nav class="level is-mobile">
      <div class="level-left">
        <div id="logo" @click="handleLogoClick">
          天瞳科技
        </div>
      </div>
      <div class="level-right">
        <template v-if="!isAuthed">
          <LevelRouteItem
            route="/login"
            text="用户登录"
          ></LevelRouteItem>
        </template>
        <template v-else>
          <p
            class="level-item"
            @click="handleLogout"
          >
            <a>退出登录</a>
          </p>
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
import store from '@/providers/store'
import token from '@/providers/token'
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
  },
  methods: {
    handleLogoClick () {
      this.$router.push('/')
    },
    handleLogout () {
      this.$confirm({
        title: '退出登录',
        content: '确认后退出当前账户',
        handler: token.handleLogout
      })
    }
  }
}
</script>
