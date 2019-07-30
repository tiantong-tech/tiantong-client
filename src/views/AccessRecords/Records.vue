<template>
  <div>
    <table
      v-if="!isLoading"
      class="table is-fullwidth is-centered is-nowrap"
    >
      <thead>
        <th>IP 地址</th>
        <th>省份</th>
        <th>城市</th>
        <th>资源类型</th>
        <th>资源</th>
        <th>浏览时间</th>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{item.ip}}</td>
          <td>{{item.province || '未知'}}</td>
          <td>{{item.city || '未知'}}</td>
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
import dataSource from '@/mixins/dataSource'
// import TimeWrapper from '@/components/wrappers/Time'

export default {
  name: 'Records',
  mixins: [ dataSource ],
  components: {
    // TimeWrapper,
  },
  created () {
    this.initialize({
      url: '/yuchuan/access/records/search',
      params: {
        page_size: 20
      }
    })
  }
}
</script>
