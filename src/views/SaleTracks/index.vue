<template>
  <div
    class="container"
    style="margin-top: 2rem"
  >
    <keep-alive>
      <router-view
        @close="$router.push('/sale/tracks/')"
        :item="item"
      ></router-view>
    </keep-alive>
    <div
      v-if="isNoneSelected"
      class="is-flex" style="height: 48px"
    >
      <div class="field has-addons">
        <div class="control">
          <input
            v-model="params.search"
            @keypress.enter="search"
            type="text" class="input"
            placeholder=""
          >
        </div>
        <div class="control">
          <a
            @click="search"
            class="button is-info"
            :class="isLoading && 'is-loading'"
          >
            <span class="icon">
              <i class="iconfont icon-search"></i>
            </span>
          </a>
        </div>
      </div>
      <div class="is-flex-auto"></div>
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
              @click="handleSelectAll"
            >
              <Checkbox :value="selectedStatus"></Checkbox>
            </th>
            <th>销售类型</th>
            <th>状态</th>
            <th>姓名</th>
            <th>电话</th>
            <th>邮箱</th>
            <th>公司</th>
            <th>项目名</th>
            <th>创建日期</th>
            <th>其他</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td
              class="is-checkbox"
              @click="item.$selected = !item.$selected"
            >
              <Checkbox :value="item.$selected"></Checkbox>
            </td>
            <td>{{item.type}}</td>
            <td>{{item.status}}</td>
            <td>{{item.name}}</td>
            <td>{{item.phone_number}}</td>
            <td>{{item.email}}</td>
            <td>{{item.company}}</td>
            <td>{{item.project_name}}</td>
            <td>
              <TimeWrapper :value="item.created_at"></TimeWrapper>
            </td>
            <td>
              <router-link :to="`/sale/tracks/${item.id}/manage`">
                管理
              </router-link>
              &nbsp;
              <router-link :to="`/sale/tracks/${item.id}/data`">
                详细参数
              </router-link>
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
import axios from '@/providers/axios'
import dataSource from '@/mixins/dataSource'
import Pagination from '@/components/Pagination'
import TimeWrapper from '@/components/wrappers/Time'

export default {
  name: 'SaleTracks',
  components: {
    Pagination,
    TimeWrapper
  },
  mixins: [ dataSource ],
  props: {

  },
  data: () => ({

  }),
  computed: {

  },
  methods: {
    handleDelete () {
      const ids = this.selectedIds
      const handleThen = () => {
        this.$notify({
          type: 'success',
          text: '信息已删除'
        })
        this.search()
      }

      this.$confirm({
        title: '删除信息',
        content: '选中的信息将被删除',
        handler: () => axios.post('sale/tracks/delete', { ids }).then(handleThen)
      })
    }
  },
  created () {
    this.initialize('sale/tracks/search')
  }
}
</script>
