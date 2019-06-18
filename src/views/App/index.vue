<template>
  <div id="app">
      <Level v-if="isInitialized"></Level>
      <Notifications @hook:created="initialize('notifications')"></Notifications>
      <router-view v-if="isInitialized"/>
    <Loader v-else></Loader>
    <Confirmer @hook:created="initialize('confirmer')"></Confirmer>
  </div>
</template>

<script>
import token from '@/providers/token'
import store from '@/providers/store'
import Loader from '@/components/Loader'
// import { sleep } from '@/utils/async'

export default {
  name: 'App',
  components: {
    Loader,
    Level: () => import('./Level/index.vue'),
    // Waiting: () => import('./tools/Waiting'),
    Confirmer: () => import('./tools/Confirmer'),
    Notifications: () => import('./tools/Notifications')
  },
  data: () => ({
    initialized: {
      token: false,
      confirmer: false,
      notifications: false
    }
  }),
  computed: {
    isInitialized: () => store.state.isInitialized
  },
  methods: {
    initialize (key) {
      this.initialized[key] = true
      Object.values(this.initialized)
        .every(value => value) && store.commit('setInitialized')
    }
  },
  created () {
    token.handleAuth()
      // .then(() => sleep(1000))
      .finally(() => this.initialize('token'))
  }
}
</script>

<style lang="sass" src="@/assets/sass/index.sass"></style>
