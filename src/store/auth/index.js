/* eslint-disable no-undef */
import router from "../../router";
import { ERROR_MESSAGE } from "../../utils/enum/error";
import { SNACKBAR_FAILURE, SNACKBAR_SUCCESS } from "../snackbar";

let timer;
export default {
  namespaced: true,
  state() {
    return {
      userId: null,
      token: null,
      email: null,
      tokenExpiration: null,
      didAutoLogout: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.email = payload.email;
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpiration = payload.tokenExpiration;
      state.didAutoLogout = false;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    },
  },
  actions: {
    async login(context, payload) {
      context.dispatch("auth", { ...payload, mode: "login" });
    },
    async signup(context, payload) {
      context.dispatch("auth", { ...payload, mode: "signup" });
    },
    async auth(context, payload) {
      // Set flag to show that the login request is being sent.
      context.dispatch("loading/setLoadingState", true, { root: true });
      const mode = payload.mode;
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        import.meta.env.VITE_APP_FIREBADE_SECRET_KEY
      }`;
      if (mode === "signup") {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
          import.meta.env.VITE_APP_FIREBADE_SECRET_KEY
        }`;
      }
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.error.message || "Failed to authenticate"
        );
        // Show the error message when the login fails.
        if (mode === "login") {
          context.dispatch(
            "snackbar/showSnackbar",
            {
              message:
                ERROR_MESSAGE[error.message] ?? "Failed to authenticated",
              state: SNACKBAR_FAILURE,
            },
            { root: true }
          );
        } else if (mode === "signup") {
          context.dispatch(
            "snackbar/showSnackbar",
            {
              message: "Failed to signup. Please try again",
              state: SNACKBAR_FAILURE,
            },
            { root: true }
          );
        }
        // Set flag to show that the login request is being sent.
        context.dispatch("loading/setLoadingState", false, { root: true });

        throw error;
      }

      // Show the snackbar message when the login succeeds
      if (mode === "login") {
        context.dispatch(
          "snackbar/showSnackbar",
          { message: "User logins successfully !", state: SNACKBAR_SUCCESS },
          {
            root: true,
          }
        );
      } else {
        context.dispatch(
          "snackbar/showSnackbar",
          { message: "User signs up successfully !", state: SNACKBAR_SUCCESS },
          {
            root: true,
          }
        );
      }

      // Set flag to show that the login request is being sent.
      context.dispatch("loading/setLoadingState", false, { root: true });

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("tokenExpiration", expirationDate);
      localStorage.setItem("email", responseData.email);

      timer = setTimeout(function () {
        context.dispatch("autoLogout");
      }, expiresIn);

      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        email: responseData.email,
      });
      router.push("/");
    },
    tryLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const email = localStorage.getItem("email");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      setTimeout(function () {
        context.dispatch("autoLogout");
      }, expiresIn);

      if (token && userId) {
        context.commit("setUser", {
          token,
          userId,
          email,
        });
      }
    },
    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");

      context.dispatch("todos/clearTodos", undefined, { root: true });

      clearTimeout(timer);

      context.commit("setUser", {
        token: null,
        userId: null,
        email: null,
      });
    },
    autoLogout(context) {
      context.dispatch("logout");
      context.commit("setAutoLogout");
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    email(state) {
      return state.email;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
  },
};
