import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      todos: [
        { id: "1", label: "Todo 1", isCompleted: false },
        { id: "2", label: "Todo 2", isCompleted: false },
        { id: "3", label: "Todo 3", isCompleted: false },
      ],
    };
  },
  mutations: {
    addTodo(state, payload) {
      state.todos.push(payload);
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
    toggleMarkAsCompleted(state, todoId) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === todoId) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      });
    },
  },
  actions: {
    addTodo(context, data) {
      context.commit("addTodo", { ...data, id: Math.random() * 100 });
    },
    deleteTodo(context, todoId) {
      context.commit("deleteTodo", todoId);
    },
    toggleMarkAsCompleted(context, todoId) {
      context.commit("toggleMarkAsCompleted", todoId);
    },
  },
  getters: {
    todoItems(state) {
      return state.todos;
    },
  },
});

export default store;
