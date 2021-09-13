import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutation from './mutation'
// import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutation,
  // actions,
})

export default store