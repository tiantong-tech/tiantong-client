<template>
  <div>
    <table
      v-if="!isLoading"
      class="table is-fullwidth is-centered is-nowrap"
    >
      <thead>
        <th>IP 地址</th>
        <th>地区</th>
        <th>设备数量</th>
        <th>浏览次数</th>
        <th>浏览资源数</th>
        <th>首次浏览</th>
        <th>最后浏览</th>
      </thead>
      <tbody>
        <tr v-for="item in dataSet" :key="item.id">
          <td>{{item.address}}</td>
          <Location :data="item"></Location>
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
import dataSet from '@/mixins/data-set.js'
import Location from './LocationWrapper'

export default {
  name: 'IPs',
  mixins: [
    new dataSet({
      url: '/yuchuan/access/ips'
    })
  ],
  components: {
    Location
  }
}
</script>
