import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getMyStatus } from '@/api/get'
import { getToken, setToken, removeToken, encrypt } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    platformsOptions: [],
    setting: {
      articlePlatform: []
    },
    options5: [{
      value: 'HTML',
      label: 'HTML'
    }, {
      value: 'CSS',
      label: 'CSS'
    }, {
      value: 'JavaScript',
      label: 'JavaScript'
    }]
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = encrypt(token)
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 获取用户显示的状态
    GetUserStatusList({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        getMyStatus().then(response => {
          console.log(response.data)
          // const data = response.data
          // if (data.statuscode === 0) {
          //   commit('SET_TOKEN', data.token)
          //   setToken(data.token)
          //   resolve()
          // } else if (data.statuscode === 10) {
          //   this.$message.error('username or password error')
          //   reject()
          // } else {
          //   reject()
          // }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(response => {
          getMyStatus().then(response => {
            console.log(response.data)
          })
          const data = response.data
          if (data.statuscode === 0) {
            commit('SET_TOKEN', data.token)
            setToken(data.token)
            resolve()
          } else if (data.statuscode === 10) {
            this.$message.error('username or password error')
            reject()
          } else {
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (response.data.statuscode === 0) {
            const data = response.data
            if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            commit('SET_INTRODUCTION', data.introduction)
            resolve(response)
          }
          reject()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
