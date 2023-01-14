import { createStore } from "vuex";
import todosModule from "./todo/index";
import snackBarModule from "./snackbar/index";

const store = createStore({
  modules: {
    todos: todosModule,
    snackbar: snackBarModule,
  },
});
export default store;
