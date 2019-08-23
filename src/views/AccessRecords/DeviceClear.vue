<template>
  <div>
    <div class="field">
      <label class="label is-size-4">设备扫描</label>
      <div class="control content">
        <p>
          对所有设备执行扫描，如果该设备的访问量为 0，
          将提取它的设备型号（user agent），并将其加入黑名单。
        </p>
        <p>
          若两个设备型号相同，但一条有访问记录，另一条没有访问记录，
          该设备将会被误杀，这一问题将会在设备确认中得到解决。
        </p>
        <Button
          class="is-info"
          @click="handleConfirm(types.scan)"
          :is-loading="types.scan.isLoading"
        >
          开始扫描
        </Button>
      </div>
    </div>
    <div style="height: 1rem"></div>
    <div class="field">
      <label class="label is-size-4">黑名单观察</label>
      <div class="control content">
        <p>
          黑名单中的设备将拥有一个观察期（30天），如果在观察期内，设备出现访问量，它将会被移除黑名单。
        </p>
        <p>观察期内未被移除的设备，将会在黑名单中被确认</p>
      </div>
      <Button
        class="is-info"
        @click="handleConfirm(types.confirm)"
        :is-loading="types.confirm.isLoading"
      >
        执行观察
      </Button>
    </div>
    <div style="height: 1rem"></div>
    <div class="field">
      <label class="label is-size-4">设备清理</label>
      <div class="control content">
        <p>
          根据黑名单对记录中的设备执行清理。
        </p>
        <Button
          class="is-info"
          @click="handleConfirm(types.clear)"
          :is-loading="types.clear.isLoading"
        >
          开始清理
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/providers/axios'

export default {
  name: 'DeviceClear',
  data: () => ({
    types: {
      scan: {
        isLoading: false,
        api: '/devices/blacklist/scan',
        then (data, confirm) {
          confirm({
            title: '扫描完成',
            content: '被加入黑名单观察的设备数量：' + data.devices
          })
        }
      },
      confirm: {
        isLoading: false,
        api: '/devices/blacklist/confirm',
        then (data, confirm) {
          confirm({
            title: '确认完成',
            content: `确认生效的设备数：${data.confirmed}，移除名单的设备数：${data.unconfirmed}`
          })
        }
      },
      clear: {
        isLoading: false,
        api: '/devices/blacklist/clear',
        then (data, confirm) {
          confirm({
            title: '清理完成',
            content: `总共清理设备数据 ${data.devices} 条`
          })
        }
      }
    }
  }),
  methods: {
    handleConfirm (type) {
      type.isLoading = true
      axios.post(type.api)
        .then(response => {
          type.then(response.data, this.$confirm)
        })
        .finally(() => {
          type.isLoading = false
        })
    }
  }
}
</script>
