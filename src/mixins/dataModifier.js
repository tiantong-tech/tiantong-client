import { isStrictEqual } from '@/utils/common'

export default function (params, dataSource) {
  const mixin = {
    computed: {
      changedParams () {
        const result = {}
        Object.keys(this[params])
          .forEach(key => {
            if (!isStrictEqual(this[params][key], this[dataSource][key])) {
              result[key] = this[params][key]
            }
          })

        return result
      },
      isChanged () {
        return !!Object.keys(this.changedParams).length
      },
      isModified () {
        return !!Object.keys(this.changedParams).length
      }
    },
    created () {
      Object.keys(this[params]).forEach(key => {
        this[params][key] = this[dataSource][key]
      })
    }
  }

  mixin.beforeRouteLeave = mixin.beforeRouteUpdate = function (to, from, next) {
    if (!this.isChanged) {
      return next()
    }
    this.$confirm({
      title: '提示',
      content: '信息尚未保存，是否确认离开此页面',
      handler: () => next()
    })
  }

  return mixin
}
