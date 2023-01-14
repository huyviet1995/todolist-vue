export default {
  namespaced: true,
  state() {
    return {
      show: false,
      message: "",
    };
  },
  mutations: {
    changeSnackbarOpenState(state, payload) {
      state.show = payload.show;
      state.message = payload.message;
    },
  },
  actions: {
    showSnackbar(context, payload) {
      context.commit("changeSnackbarOpenState", {
        show: true,
        message: payload,
      });
    },
    hideSnackbar(context) {
      context.commit("changeSnackbarOpenState", {
        show: false,
        message: "",
      });
    },
  },
  getters: {
    snackbarMessage(state) {
      return state.message;
    },
    isSnackbarOpen(state) {
      return state.show;
    },
  },
};
