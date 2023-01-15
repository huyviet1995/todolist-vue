import { createStore } from "vuex";
import todosModule from "./todo/index";
import snackBarModule from "./snackbar/index";
import authModule from "./auth/index";
import loadingModule from "./loading/index";

const store = createStore({
  modules: {
    todos: todosModule,
    snackbar: snackBarModule,
    auth: authModule,
    loading: loadingModule,
  },
});
export default store;
