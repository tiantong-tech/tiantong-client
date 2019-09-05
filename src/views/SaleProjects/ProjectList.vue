<template>
  <div class="container">
    <div style="height: 1.5rem"></div>
    <div class="is-flex">
      <div class="field has-addons">
        <div class="control">
          <input
            v-model="params.search"
            @keypress.enter="getDataSet"
            type="text" class="input"
            placeholder="销售 / 公司 / 项目"
          >
        </div>
        <div class="control">
          <a
            class="button is-info"
            @click="getDataSet"
          >
            <span class="icon">
              <i class="iconfont icon-search"></i>
            </span>
          </a>
        </div>
      </div>
      <div class="is-flex-auto"></div>
      <a
        class="button is-info"
        @click="$router.push('/sale/projects/create')"
      >
        创建项目
      </a>
    </div>
    <table
      v-if="!isLoading"
      class="table is-fullwidth is-centered is-hoverable is-nowrap"
    >
      <thead>
        <th style="width: 1px">项目编号</th>
        <th>销售负责人</th>
        <th>项目名</th>
        <th>公司</th>
        <th>签约日期</th>
        <th>交付日期</th>
        <th>创建日期</th>
        <th style="width: 1px">项目状态</th>
      </thead>
      <tbody>
        <ListItem
          v-for="data in dataSet" :key="data.id"
          :project="data"
        ></ListItem>
      </tbody>
    </table>
    <Pagination
      style="margin: 1rem 0 1rem"
      v-if="!isLoading"
      v-bind="meta"
      @change="changePage"
    ></Pagination>
    <router-view></router-view>
  </div>
</template>

<script>
import dataSet from '@/mixins/data-set.js'
import ListItem from './ProjectListItem'

export default {
  name: 'SaleProjects',
  mixins: [
    new dataSet({
      url: '/projects'
    })
  ],
  components: {
    ListItem
  }
}
</script>
