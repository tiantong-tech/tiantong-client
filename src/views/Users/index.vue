<template>
  <div class="container" style="margin-top: 2rem; width: 1024px">
    <keep-alive>
      <router-view
        @created="getDataSet"
      ></router-view>
    </keep-alive>
    <div v-if="isSelectedNone" class="is-flex">
      <div class="field has-addons">
        <div class="control">
          <input
            v-model="params.search"
            @keypress.enter="getDataSet"
            type="text" class="input"
            placeholder="Id / 用户名 / 邮箱"
          >
        </div>
        <div class="control">
          <a
            class="button is-info"
            :class="isLoading && 'is-loading'"
            @click="getDataSet"
          >
            <span class="icon">
              <i class="iconfont icon-search"></i>
            </span>
          </a>
        </div>
      </div>
      <div class="is-flex-auto"></div>
      <router-link
        to="users/create"
        class="button is-info"
      >
        创建用户
      </router-link>
    </div>
    <div
      v-else
      class="is-flex" style="height: 48px"
    >
      <div class="field">
        <div class="control">
          <a
            class="button is-light"
            style="width: 68px"
            @click="handleDelete"
          >
            <span>删除</span>
          </a>
        </div>
      </div>
    </div>
    <div>
      <table
        v-if="!isLoading"
        class="table is-centered is-fullwidth is-nowrap"
      >
        <thead>
          <tr>
            <th
              class="is-checkbox"
              @click="selectAll"
            >
              <Checkbox
                :value="selectedStatus"
              ></Checkbox>
            </th>
            <th>Id</th>
            <th>姓名</th>
            <th>用户名</th>
            <th>邮箱</th>
            <th>权限</th>
            <th>创建日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in dataSet" :key="user.id">
            <td
              class="is-checkbox"
              @click="user.$selected = !user.$selected"
            >
              <Checkbox :value="user.$selected">
              </Checkbox>
            </td>
            <td>{{user.id}}</td>
            <td>{{user.name}}</td>
            <td>{{user.username}}</td>
            <td>{{user.email}}</td>
            <CellGroups :value="user.groups"></CellGroups>
            <td>
              <TimeWrapper :value="user.created_at"></TimeWrapper>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      style="margin: 1rem 0 1rem"
      v-if="!isLoading"
      v-bind="meta"
      @change="changePage"
    ></Pagination>
  </div>
</template>

<script>
import dataSet from '@/mixins/data-set.js'
import TimeWrapper from '@/components/wrappers/Time'
import CellGroups from './CellGroups'

export default {
  name: 'users',
  components: {
    CellGroups,
    TimeWrapper
  },
  mixins: [
    new dataSet({
      url: '/users'
    })
  ],
  methods: {

  }
}
</script>
