<template>
  <div id="level">
    <nav class="level is-mobile container">
      <div class="level-left">
        <router-link id="logo" to="/" tag="a">
          天瞳科技
        </router-link>
        <div style="width: 2rem"></div>
        <LevelRouteItem
          v-if="$groups('root', 'admin')"
          route="/users"
          text="用户管理"
        ></LevelRouteItem>
        <LevelRouteItem
          v-if="$groups('root', 'admin', 'sale')"
          route="/sale/tracks"
          text="销售追踪"
        ></LevelRouteItem>
        <LevelRouteItem
          v-if="$groups('root', 'admin', 'sale')"
          route="/sale/projects"
          text="销售项目"
        ></LevelRouteItem>
        <LevelRouteItem
          v-if="$groups('root', 'admin', 'sale')"
          route="/yuchuan/access/records"
          text="网站监控"
        ></LevelRouteItem>
        <LevelRouteItem
          v-if="$groups('root', 'admin', 'sale')"
          route="/news"
          text="新闻管理"
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
