import { createStore } from "vuex";
import todosModule from "./todo/index";
import snackBarModule from "./snackbar/index";
import authModule from "./auth/index";

const store = createStore({
  modules: {
    todos: todosModule,
    snackbar: snackBarModule,
    auth: authModule,
  },
});
export default store;
