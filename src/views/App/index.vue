<template>
  <div id="app" v-if="isDataLoaded">
    <Level v-if="isInitialized"></Level>
    <Notifications @hook:created="initialize('notifications')"></Notifications>
    <router-view v-if="isInitialized"/>
    <Loader v-else></Loader>
    <Confirmer @hook:created="initialize('confirmer')"></Confirmer>
  </div>
</template>

<script>
import store from '@/providers/store'
import Loader from '@/components/Loader'
// import { sleep } from '@/utils/async'
import users from '@/providers/users'

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
      confirmer: false,
      notifications: false
    }
  }),
  computed: {
    isAuthed () {
      return store.state.isAuthed
    },
    isInitialized () {
      return Object.values(this.initialized)
        .every(val => val) && store.state.isTokenChecked
    },
    isDataLoaded () {
      return true
    }
  },
  methods: {
    initialize (key) {
      this.initialized[key] = true
    }
  },
  watch: {
    isAuthed: {
      immediate: true,
      handler (val) {
        if (val) {
          users.get()
        }
      }
    }
  }
}
</script>

<style lang="sass" src="@/assets/sass/index.sass"></style>
