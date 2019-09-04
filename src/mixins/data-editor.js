import axios from '@/providers/axios'
import { isStrictEqual } from '@/utils/common'

export default function ({
  url,
  data = 'data',
  params = 'params',
  dataId = 'id',
  paramsId = 'id',
  confirmTitle = '提示',
  confirmContent = '信息尚未保存，是否确认离开',
  text = '数据已更新',
}) {
  const mixin = {}
  const config = { url, data, params, dataId, paramsId, text, confirmTitle, confirmContent }

  bindHooks(mixin, config)
  bindMethods(mixin, config)
  bindComputed(mixin, config)

  return mixin
}

function bindComputed (mixin, { data, params }) {
  mixin.computed = {
    changedParams () {
      const result = {}
      Object.keys(this[params])
        .forEach(key => {
          if (!isStrictEqual(this[params][key], this[data][key])) {
            result[key] = this[params][key]
          }
        })

      return result
    },
    isChanged () {
      return !!Object.keys(this.changedParams).length
    },
    // todo remove
    isModified () {
      return !!Object.keys(this.changedParams).length
    }
  }
}

function bindMethods (mixin, { url, data, params, dataId, paramsId, text }) {
  mixin.methods = {
    handleSave () {
      if (!this.isChanged) return

      const keys = Object.keys(this.changedParams)
      this.changedParams[paramsId] = this[data][dataId]

      this.beforeUpdate && this.beforeUpdate()
      return axios.post(url, this.changedParams)
        .then(() => {
          keys.forEach(key => {
            this[data][key] = this[params][key]
          })

          this.$notify({ text })
          this.updated && this.updated()
        })
    }
  }
}

function bindHooks (mixin, { data, params }) {
  mixin.beforeRouteLeave = mixin.beforeRouteUpdate = function (to, from, next) {
    if (!this.isChanged) {
      return next()
    }
    this.$confirm({
      title: '提示',
      content: '信息尚未保存，是否离开页面',
      handler: () => next()
    })
  }
  mixin.created = function () {
    Object.keys(this[params]).forEach(key => {
      this[params][key] = this[data][key]
    })
  }
}
