<template>
  <div id="app">
    <Level v-if="isInitialized"></Level>
    <div v-if="isInitialized">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view v-if="isInitialized"/>
    <Loader v-if="!isInitialized"></Loader>
    <Confirmer></Confirmer>
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
    Confirmer: () => import('./tools/Confirmer')
  },
  computed: {
    isInitialized: () => store.state.isInitialized
  },
  created () {
    token.handleAuth()
      // .then(() => sleep(1000))
      .finally(() => store.commit('setInitialized'))
  }
}
</script>

<style lang="sass" src="@/assets/sass/index.sass"></style>
