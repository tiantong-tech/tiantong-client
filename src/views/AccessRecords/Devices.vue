<template>
  <div>
    <table
      v-if="!isLoading"
      class="table is-fullwidth is-centered is-nowrap"
    >
      <thead>
        <th>浏览次数</th>
        <th>使用过的 IP 数</th>
        <th>浏览资源数</th>
        <th>首次浏览</th>
        <th>最后浏览</th>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{item.counts}}</td>
          <td>{{item.ips}}</td>
          <td>{{item.resources}}</td>
          <td>{{item.created_at}}</td>
          <td>{{item.last_recorded_at}}</td>
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
  name: 'Devices',
  mixins: [ dataSource ],
  components: {
    // TimeWrapper,
  },
  created () {
    this.initialize({
      url: '/yuchuan/access/devices/search',
      params: {
        page_size: 20
      }
    })
  }
}
</script>
