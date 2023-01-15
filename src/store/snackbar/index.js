export const SNACKBAR_SUCCESS = "success";
export const SNACKBAR_FAILURE = "failure";

export default {
  namespaced: true,
  state() {
    return {
      show: false,
      message: "",
      timeout: 2000,
      state: null,
    };
  },
  mutations: {
    changeSnackbarOpenState(state, payload) {
      state.show = payload.show;
      state.message = payload.message;
      state.state = payload.state;
    },
  },
  actions: {
    showSnackbar(context, payload) {
      context.commit("changeSnackbarOpenState", {
        show: true,
        message: payload.message,
        state: payload.state,
      });
      setTimeout(() => {
        context.dispatch("hideSnackbar");
      }, context.state.timeout);
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
    isSnackbarSuccess(state) {
      return state.state === SNACKBAR_SUCCESS;
    },
  },
};
