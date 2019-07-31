<template>
  <p class="level-item">
    <a
      v-if="isActive !== null ? isActive : $route.path.indexOf(route) === -1"
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
    text: String,
    isActive: {
      default: null
    }
  }
}
</script>
