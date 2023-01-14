import { createStore } from "vuex";
import todosModule from "./todo/index";

const store = createStore({
  modules: {
    todos: todosModule,
  },
});
export default store;
