<template>
  <div v-if="isLoaded" id="members-field" class="field">
    <label class="label">销售负责人</label>
    <div class="control">
      <a
        class="button" @click="isShow = !isShow"
        v-class:is-focused="isShow"
        style="justify-content: left; min-width: 280px;"
      >
        <span>{{valuesName ? valuesName : '无'}}</span>
        <span class="is-flex-auto"></span>
        <span class="icon">
          <i :class="`iconfont icon-arrow-${isShow ? 'up' : 'down'}`"></i>
        </span>
      </a>
    </div>
    <div v-if="isShow" style="height: 0.5rem"></div>
    <div class="control">
      <nav
        v-if="isShow"
        style="max-width: 280px;"
        class="panel is-size-6 is-unselectable"
      >
        <p
          class="panel-heading is-size-6 has-text-weight-bold is-flex"
          style="border-bottom: none"
        >
          <span>选择用户</span>
        </p>
        <div
          v-if="false"
          class="panel-block"
          style="border-bottom: none"
        >
          <p class="control has-icons-left">
            <input class="input is-small" type="text">
            <span class="icon is-small is-left">
              <i class="iconfont icon-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <p class="panel-tabs" v-if="false">
          <a class="is-active">全部用户</a>
          <a>已选择</a>
        </p>
        <div style="overflow: auto">
          <a
            v-for="user in users" :key="user.id"
            @click="handleSelect(user.id)"
            class="panel-block"
          >
            <span>
              {{getUserPanelData(user)}}
            </span>
            <span class="is-flex-auto"></span>
            <span
              v-if="value.includes(user.id)"
              class="icon has-text-success"
            >
              <i class="iconfont is-size-6 icon-selected"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import users from '@/providers/users.js'

export default {
  name: 'MembersField',
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    isShow: false
  }),
  computed: {
    users: users.items,
    isLoaded: () => users.state.isLoaded,
    valuesName () {
      return this.value.map(id => users.state.data[id].name || '(未知用户)').join('，')
    }
  },
  methods: {
    getUserPanelData (user) {
      let res = user.name || ''
      // if (user.email) {
      //   res += ` (${user.email})`
      // }

      return res || '未知用户'
    },
    handleSelect (id) {
      const index = this.value.indexOf(id)
      const value = [...this.value]

      if (index === -1) {
        value.push(id)
      } else {
        value.splice(index, 1)
      }

      this.$emit('input', value)
    }
  },
  created () {
    users.reload()
  }
}
</script>

<style lang="sass">
#members-field
  a.panel-block
    &:last-child
      border-bottom-left-radius: 0.25rem
      border-bottom-right-radius: 0.25rem
</style>
