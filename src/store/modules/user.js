import {signInByUid,signInByPhone, getUserInfo} from "@/api/user";
import {removeToken, setToken} from "@/utils/auth";
import {Message} from "element-ui";
import router from "@/router";

const actions = {
  signInByUid({commit}, {uid, password}) {
    signInByUid({uid: uid.trim(), password: password}).then(response => {
      if (response){
        const {data} = response
        if (!data) {
          Message("用户名或密码错误，请重新输入！")
        } else {
          // 保存到store中
          commit('SET_TOKEN', data.token)
          commit('SET_USER', data.user)
          // 保存到cookie中
          setToken(data.token)
        }
      }
    }).catch(error => {
      console.log(error)
    })
  },
  signInByPhone({commit}, {phone, captcha}) {
    signInByPhone({phone: phone.trim(), captcha: captcha}).then(response => {
      if (response){
        const {data} = response
        if (!data) {
          Message("验证码错误，请重新输入！")
        } else {
          // 保存到store中
          commit('SET_TOKEN', data.token)
          commit('SET_USER', data.user)
          // 保存到cookie中
          setToken(data.token)
        }
      }
    }).catch(error => {
      console.log(error)
    })
  },

  removeToken({commit}) {
    removeToken()
    commit('REMOVE_TOKEN')
  },
  removeUserInfo({commit}) {
    commit('REMOVE_USER_INFO')
  },
  getUserInfo({commit}, token) {
    getUserInfo(token).then(res=>{
      const {data} = res
      console.log("getInfo",data)
      commit('SET_USER',data)
    })
  }
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USER(state, user) {
    state.userInfo = user
  },
  REMOVE_TOKEN(state) {
    state.token = ''
  },
  REMOVE_USER_INFO(state) {
    state.userInfo = ''
  }
}

const state = {
  token:'',
  userInfo: '',
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

