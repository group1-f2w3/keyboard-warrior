import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPlaying: false,
    winner: '',
    loser: '',
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
      fadeoutBgm()

      function fadeoutBgm() {
        let fadeOutDuration = 3000
        let updateFreq = 200
        let currentVolume = state.bgm.volume
        let interval = currentVolume / (fadeOutDuration / updateFreq)

        let ref = setInterval(fadeout, updateFreq)
        function fadeout() {
          if (state.bgm.volume - interval <= 0) {
            clearInterval(ref)
            state.bgm.pause()
            state.bgm.currentTime = 0
          } else {
            state.bgm.volume = state.bgm.volume - interval
          }
        }
      }
    },
    SET_RESULT(state, payload) {
      state.winner = payload.winner
      state.loser = payload.loser
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
    setResult({ commit }, payload) {
      commit('SET_RESULT', payload)
    },
  },
  modules: {},
})
