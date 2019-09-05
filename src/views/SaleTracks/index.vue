<template>
  <div
    class="container"
    style="margin-top: 2rem"
  >
    <keep-alive>
      <router-view
        @close="$router.push('/sale/tracks')"
        @updated="getDataSet"
        :item="find(id)"
      ></router-view>
    </keep-alive>
    <div
      v-if="isSelectedNone"
      class="is-flex" style="height: 48px"
    >
      <div class="field has-addons">
        <div class="control">
          <div class="select">
            <select v-model="params.status">
              <option :value="undefined">全部</option>
              <option
                v-for="status in statuses" :key="status"
                :value="status"
              >
                {{status}}
              </option>
            </select>
          </div>
        </div>
        <div class="control">
          <input
            v-model="params.search"
            @keypress.enter="getDataSet"
            type="text" class="input"
            placeholder=""
          >
        </div>
        <div class="control">
          <a
            @click="getDataSet"
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
              @click="selectAll"
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
          <tr v-for="item in dataSet" :key="item.id">
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
import enums from '@/providers/enums'
import dataSet from '@/mixins/data-set.js'
import TimeWrapper from '@/components/wrappers/Time'

export default {
  name: 'SaleTracks',
  components: {
    TimeWrapper
  },
  mixins: [
    new dataSet({
      url: 'sale/tracks'
    })
  ],
  props: {
    id: {}
  },
  data: () => ({
  }),
  computed: {
    statuses () {
      return enums.saleTrackStatuses
    }
  },
  methods: {
  }
}
</script>
