<template>
  <div>
    <table
      v-if="!isLoading"
      class="table is-fullwidth is-centered is-nowrap"
    >
      <thead>
        <th>IP 地址</th>
        <th>地区</th>
        <th>资源类型</th>
        <th>资源</th>
        <th>浏览时间</th>
      </thead>
      <tbody>
        <tr v-for="item in dataSet" :key="item.id">
          <td>{{item.ip}}</td>
          <Location :data="item"></Location>
          <td>网页</td>
          <td>{{item.resource}}</td>
          <td>
            {{item.created_at}}
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      v-if="!isLoading"
      v-bind="meta"
      @change="changePage"
    ></Pagination>
    <div style="height: 1rem"></div>
  </div>
</template>

<script>
import dataSet from '@/mixins/data-set.js'
import Location from './LocationWrapper'

export default {
  name: 'Records',
  mixins: [
    new dataSet({
      url: '/yuchuan/access/records'
    })
  ],
  components: {
    Location
  }
}
</script>
