import { createStore } from "vuex";

const METHOD_POST = "POST";

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
    editTodo(state, payload) {
      const { id, label } = payload;
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            label,
          };
        }
        return todo;
      });
    },
  },
  actions: {
    async addTodo(context, data) {
      // Create a new object to store the data that is going to be sent.
      const newRequest = {
        label: data.label,
        isCompleted: data.isCompleted,
      };
      const response = await fetch(
        "https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json",
        {
          method: METHOD_POST,
          body: JSON.stringify(newRequest),
        }
      );
      const responseData = await response.json();
      if (!responseData.name) {
        const error = new Error(
          responseData.message || "Failed to send request"
        );
        throw error;
      }
      newRequest.id = responseData.name;
      context.commit("addTodo", newRequest);
    },
    deleteTodo(context, todoId) {
      context.commit("deleteTodo", todoId);
    },
    toggleMarkAsCompleted(context, todoId) {
      context.commit("toggleMarkAsCompleted", todoId);
    },
    editTodo(context, data) {
      const { id, label } = data;
      context.commit("editTodo", {
        id,
        label,
      });
    },
  },
  getters: {
    todoItems(state) {
      return state.todos;
    },
  },
});

export default store;
