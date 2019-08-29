<template>
  <div id="level">
    <nav class="level container is-mobile" style="padding: 0 1rem 0 1rem">
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
          v-if="!isAuthed"
          route="/login"
          text="用户登录"
        ></LevelRouteItem>
        <LevelProfileItem v-else>
          <router-link class="dropdown-item" to="/profile">
            用户信息
          </router-link>
          <router-link class="dropdown-item" to="/login">
            退出登陆
          </router-link>
        </LevelProfileItem>
      </div>
    </nav>
  </div>
</template>

<script>
import Token from '@/providers/token'
import LevelRouteItem from './LevelRouteItem'
import LevelProfileItem from './LevelProfileItem'

export default {
  name: 'Level',
  components: {
    LevelRouteItem,
    LevelProfileItem
  },
  computed: {
    isAuthed: () => Token.state.isAuthed,
    currentRoute () {
      return this.$route.fullPath
    }
  }
}
</script>
