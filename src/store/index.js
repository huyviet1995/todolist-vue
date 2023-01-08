import { createStore } from "vuex";

const METHOD_POST = "POST";
const METHOD_PUT = "PUT";
const METHOD_DELETE = "DELETE";
const METHOD_GET = "GET";

const store = createStore({
  state() {
    return {
      todos: [],
    };
  },
  mutations: {
    loadTodos(state, payload) {
      state.todos = payload;
    },
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
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to send request"
        );
        throw error;
      }
      newRequest.id = responseData.name;
      context.commit("addTodo", newRequest);
    },
    async deleteTodo(context, todoId) {
      const url = `https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${todoId}.json`;
      const response = await fetch(url, {
        method: METHOD_DELETE,
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to delete the todo"
        );
        throw error;
      }
      context.commit("deleteTodo", todoId);
    },
    toggleMarkAsCompleted(context, todoId) {
      context.commit("toggleMarkAsCompleted", todoId);
    },
    async editTodo(context, data) {
      const { id, label } = data;
      const url = `https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`;
      const response = await fetch(url, {
        method: METHOD_PUT,
        body: JSON.stringify({
          label,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to send request"
        );
        throw error;
      }
      context.commit("editTodo", {
        id,
        label,
      });
    },
    async loadTodos(context) {
      const url = `https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json`;
      const response = await fetch(url, {
        method: METHOD_GET,
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to send request"
        );
        throw error;
      }
      context.commit(
        "loadTodos",
        Object.entries(responseData).map((todo) => ({
          id: todo[0],
          label: todo[1].label,
          isCompleted: todo[1].isCompleted,
        }))
      );
    },
  },
  getters: {
    todoItems(state) {
      return state.todos;
    },
  },
});

export default store;
