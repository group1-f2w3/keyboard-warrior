import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentWord: [],
    score: 0,
    isPlaying: false,
    winner: '',
    bgm: '',
  },
  mutations: {
    SET_IS_PLAYING(state, payload) {
      state.isPlaying = payload
    },
    SET_BGM(state, payload) {
      if (state.bgm) {
        state.bgm.pause()
        state.bgm.currentTime = 0
      }
      state.bgm = payload
      state.bgm.loop = true
      state.bgm.play()
    },

    STOP_BGM(state) {
      state.bgm.pause()
      state.bgm.currentTime = 0
    },
  },
  actions: {
    setBgm({ commit }, payload) {
      commit('SET_BGM', payload)
    },

    stopBgm({ commit }) {
      commit('STOP_BGM')
    },
    setIsPlaying({ commit }, payload) {
      commit('SET_IS_PLAYING', payload)
    },
  },
  modules: {},
})
