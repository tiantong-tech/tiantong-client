import * as qiniu from 'qiniu-js'
import axios from '@/providers/axios'

const config = {
  useCdnDomain: true,
  region: qiniu.region.z0
}

const putExtra = {
  fname: '',
  params: {}
}

// const observe = {
//   next (res) {
//     console.log('已上传大小，单位为字节：' + res.total.loaded)
//     console.log('本次上传的总量控制信息，单位为字节：' + res.total.size)
//     console.log('当前上传进度，范围：0～100：' + res.total.percent)
//   },
//   error (err) {
//     console.log(err)
//   },
//   complete () {

//   }
// }

export function upload (file) {
  return {
    async subscribe (observer) {
      const { data: token } = await axios.post('/news/qiniu/token')
      const key = null

      qiniu.upload(file, key, token, putExtra, config)
        .subscribe(observer)
    }
  }
}

export function uploadByToken (file, token) {
  return {
    subscribe (observer) {
      const key = null

      qiniu.upload(file, key, token, putExtra, config)
        .subscribe(observer)
    }
  }
}

export default {
  upload,
  uploadByToken
}
