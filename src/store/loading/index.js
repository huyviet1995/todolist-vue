export default {
  namespaced: true,
  state() {
    return {
      isLoading: false,
    };
  },
  mutations: {
    setLoadingState(state, loadingState) {
      state.isLoading = loadingState;
    },
  },
  actions: {
    setLoadingState(context, loadingState) {
      context.commit("setLoadingState", loadingState);
    },
  },
  getters: {
    getLoadingState(state) {
      return state.isLoading;
    },
  },
};
