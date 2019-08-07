import Store from './store'
import Router from './router'
import Storage from 'store'
import axios from './axios';

export default {
  get () {
    return Storage.get('token')
  },
  set (token) {
    Storage.set('token', token)
  },
  /**
   * 1. 若未传入 token 则从 storage 中读取
   * 2. 若 token 不为空则执行 auth，否则 logout
   * 3. 认证成功，设置 auth、 数据
   * 4. 认证失败，直接 logout
   */
  async handleAuth (token = '') {
    if (token) {
      this.set(token)
    } else {
      token = this.get()
    }
    if (token) {
      const handleThen = ({ data }) => {
        const { user: { groups }, token } = data

        token && this.set(token)
        Store.commit('setGroups', groups)
        Store.commit('setIsAuthed', true)
      }
      await getUserProfile().then(handleThen)

      return true
    }

    return false
  },
  /**
   * 1. 清理 store.auth
   * 2. 清理 storage.token
   * 3. 跳转至 /login 路由
   */
  handleLogout () {
    Store.commit('setIsAuthed', false)
    Storage.remove('token')
  }
}

function getUserProfile () {
  return axios.post('user/profile')
}
