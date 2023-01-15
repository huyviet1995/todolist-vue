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
      const mode = payload.mode;
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVlygBg2OVSO24rb2t_w5Hfqy87wJOT-Q";
      if (mode === "signup") {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVlygBg2OVSO24rb2t_w5Hfqy87wJOT-Q";
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
          responseData.message || "Failed to authenticate"
        );
        throw error;
      }

      // Show the snackbar message
      if (mode === "login") {
        context.dispatch(
          "snackbar/showSnackbar",
          "User logins successfully !",
          {
            root: true,
          }
        );
      } else {
        context.dispatch(
          "snackbar/showSnackbar",
          "User signs up successfully !",
          {
            root: true,
          }
        );
      }

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
