<template>
  <div id="app" v-if="isLoaded">
    <Level v-if="isMounted"></Level>
    <Notifications @hook:created="mounted.notifications = true"></Notifications>
    <router-view v-if="isMounted"></router-view>
    <Confirmer @hook:created="mounted.confirmer = true"></Confirmer>
  </div>
  <Loader v-else></Loader>
</template>

<script>
import Token from '@/providers/token'
import Loader from '@/components/Loader'

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
    mounted: {
      confirmer: false,
      notifications: false
    }
  }),
  computed: {
    isLoaded () {
      return Token.state.isLoaded
    },
    isMounted () {
      return Object.values(this.mounted).every(val => val)
    }
  }
}
</script>

<style lang="sass" src="@/assets/sass/index.sass"></style>
