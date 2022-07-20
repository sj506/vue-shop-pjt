import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state() {
    return {
      user: {},
      getProductList: {},
      idx: 0,
    };
  },
  mutations: {
    setUser: (state, data) => {
      state.user = data;
    },
    getProductList: (state, data) => {
      state.getProductList = data;
    },
    getIdx: (state, data) => {
      state.getIdx = data;
    },
  },
  plugins: [
    createPersistedState({
      paths: ['user'],
    }),
  ],
});
