<template>
  <div
    class="container"
    style="margin-top: 2rem;"
  >
    <div class="is-flex">
      <div style="min-width: 180px; max-width: 180px">
        <aside class="menu">
          <p class="menu-label">
            选项
          </p>
          <ul class="menu-list">
            <li v-for="(tab, key) in tabs" :key="key">
              <a
                v-active="currentTab === key"
                @click="currentTab = key"
              >
                {{tab.text}}
              </a>
            </li>
          </ul>
        </aside>
      </div>
      <div style="width: 1rem"></div>
      <div class="is-flex-auto">
        <Component :is="tabs[currentTab].component">
        </Component>
      </div>
    </div>
  </div>
</template>

<script>
import IPs from './IPs'
import Records from './Records'
import Devices from './Devices'
import DeviceClear from './DeviceClear'

export default {
  name: 'YuchuanAccessRecords',
  components: {
    Records
  },
  data: () => ({
    currentTab: 0,
    tabs: [
      { text: '设备', component: Devices },
      { text: 'IP 地址', component: IPs },
      { text: '浏览记录', component: Records },
      { text: '操作', component: DeviceClear },
    ]
  })
}
</script>
