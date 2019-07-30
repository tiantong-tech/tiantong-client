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
        <th>设备数量</th>
        <th>浏览次数</th>
        <th>浏览资源数</th>
        <th>首次浏览</th>
        <th>最后浏览</th>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{item.address}}</td>
          <td>{{item.province || '未知'}}</td>
          <td>{{item.city || '未知'}}</td>
          <td>{{item.devices}}</td>
          <td>{{item.counts}}</td>
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
  name: 'IPs',
  mixins: [ dataSource ],
  components: {
    // TimeWrapper,
  },
  created () {
    this.initialize({
      url: '/yuchuan/access/ips/search',
      params: {
        page_size: 20
      }
    })
  }
}
</script>
