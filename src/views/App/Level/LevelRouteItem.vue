<template>
  <p class="level-item">
    <a
      v-if="$route.fullPath !== route"
      @click="$router.push(route)"
    >
      {{text}}
    </a>
    <strong v-else>{{text}}</strong>
  </p>
</template>

<script>
export default {
  name: 'LevelRouteItem',
  props: {
    route: {},
    text: String
  }
}
</script>
