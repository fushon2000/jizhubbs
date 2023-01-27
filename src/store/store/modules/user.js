const actions = {
  // user login
  login({commit}, userInfo) {
    const data = {token: 'admin'}
    commit('SET_TOKEN', data.token)
    setToken(data.token)

  },
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
}

const state = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

