import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import Vuex from "vuex";
import Vue from 'vue';

Vue.use(Vuex);

const initialState = {
  editMode: false
};

export default new Vuex.Store({
  state: {...initialState},
  mutations,
  actions,
  getters,
});
