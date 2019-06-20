<template>
  <div class="container" style="margin-top: 2rem; width: 840px">
    <keep-alive>
      <router-view
        @created="getDataSource"
      ></router-view>
    </keep-alive>
    <div
      v-if="isNoneSelected"
      class="is-flex" style="height: 48px"
    >
      <div class="field has-addons">
        <div class="control">
          <input
            v-model="params.query"
            type="text" class="input"
            placeholder="Id / 用户名 / 邮箱"
            @keypress.enter="getDataSource"
          >
        </div>
        <div class="control">
          <a
            class="button is-info"
            :class="dataSource.isLoading && 'is-loading'"
            @click="getDataSource"
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
        v-if="!dataSource.isLoading"
        class="table is-centered is-fullwidth is-nowrap"
      >
        <thead>
          <tr>
            <th
              style="width: 1px; cursor: pointer"
              @click="handleSelectAll"
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
          <tr v-for="user in users" :key="user.id">
            <td
              style="cursor: pointer"
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
            <td>{{user.created_at.substr(0, 10)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="height: 1rem"></div>
      <Pagination
        v-if="!dataSource.isLoading"
        v-bind="dataSource"
        @change="handleChangePage"
      ></Pagination>
    <div style="height: 1rem"></div>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import Pagination from '@/components/Pagination'
import CellGroups from './CellGroups'

export default {
  name: 'users',
  components: {
    Pagination,
    CellGroups
  },
  data: () => ({
    params: {
      page: 1,
      page_size: 20,
      query: ''
    },
    dataSource: {
      page: 0,
      total: 0,
      page_size: 0,
      list: [],
      data: {},
      isLoading: false
    }
  }),
  computed: {
    users () {
      return this.dataSource.list.map(id => this.dataSource.data[id])
    },
    isAllSelected () {
      return this.users.every(user => user.$selected) && this.users.length
    },
    isNoneSelected () {
      return !this.users.some(user => user.$selected)
    },
    selectedStatus () {
      if (this.isAllSelected) return true
      else if (this.isNoneSelected) return false
      else return 'minus'
    },
    selectedIds () {
      return this.users.filter(user => user.$selected)
        .map(user => user.id)
    }
  },
  methods: {
    handleSelectAll () {
      const value = this.selectedStatus === true ? false : true

      this.users.forEach(user => user.$selected = value)
    },
    handleChangePage (page) {
      this.params.page = page
      this.getDataSource()
    },
    handleDelete () {
      const ids = this.selectedIds
      const handleThen = () => {
        this.$notify({
          type: 'success',
          text: '用户已删除'
        })
        this.getDataSource()
      }

      this.$confirm({
        title: '删除用户',
        content: '确认将删除所有选中的用户',
        handler: () => axios.post('users/delete', { ids }).then(handleThen)
      })
    },
    getDataSource () {
      const dataSource = this.dataSource
      dataSource.list = []
      dataSource.data = {}
      dataSource.isLoading = false

      const handleBefore = () => {
        dataSource.isLoading = true
      }
      const handleThen = response => {
        const { data, page, page_size, total } = response.data

        dataSource.page = page
        dataSource.total = total
        dataSource.pageSize = page_size

        data.forEach(item => {
          item.$selected = false

          dataSource.list.push(item.id)
          this.$set(dataSource.data, item.id, item)
        })
      }
      const handleFinally = () => {
        dataSource.isLoading = false
      }

      handleBefore()
      axios.post('/users/search', this.params)
        .then(handleThen)
        .finally(handleFinally)
    }
  },
  created () {
    this.getDataSource()
  }
}
</script>
