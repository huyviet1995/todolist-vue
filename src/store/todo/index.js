import { SNACKBAR_SUCCESS } from "../snackbar";

const METHOD_POST = "POST";
const METHOD_PUT = "PUT";
const METHOD_DELETE = "DELETE";
const METHOD_GET = "GET";

export default {
  namespaced: true,
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
      const userId = context.rootGetters["auth/userId"];
      try {
        const requestBody = {
          label: data.label,
          isCompleted: data.isCompleted,
        };
        // Only send a request when the user has finished up their logins/signups..
        if (userId) {
          const url = `https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${userId}.json`;
          const responseData = await sendRequest(
            url,
            METHOD_POST,
            requestBody,
            "Failed to add todo"
          );
          requestBody.id = responseData.name;
        } else {
          requestBody.id = Math.floor(Math.random() * 1000);
        }
        context.commit("addTodo", requestBody);
        context.dispatch(
          "snackbar/showSnackbar",
          { message: "Todo added successfully", state: SNACKBAR_SUCCESS },
          {
            root: true,
          }
        );
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async deleteTodo(context, todoId) {
      const userId = context.rootGetters["auth/userId"];
      try {
        if (userId) {
          const url = `https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${userId}/${todoId}.json`;
          await sendRequest(url, METHOD_DELETE);
        }
        context.commit(
          "deleteTodo",
          todoId,
          undefined,
          "Failed to delete the todo please try again"
        );
        context.dispatch(
          "snackbar/showSnackbar",
          { message: `Item deleted successfully`, state: SNACKBAR_SUCCESS },
          {
            root: true,
          }
        );
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async toggleMarkAsCompleted(context, todoId) {
      const userId = context.rootGetters["auth/userId"];
      const selectedTodo = context.state.todos.find(
        (todo) => todo.id === todoId
      );
      // Toggle the isCompleted
      selectedTodo.isCompleted = !selectedTodo.isCompleted;
      let message;
      try {
        if (userId) {
          const url = `https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${userId}/${todoId}.json`;
          await sendRequest(url, METHOD_PUT, selectedTodo);
        }
        if (selectedTodo.isCompleted) {
          message = `${selectedTodo.label} is set as available !`;
        } else {
          message = `${selectedTodo.label} is marked as completed successfully !`;
        }
        context.commit("editTodo", todoId, selectedTodo);
        context.dispatch(
          "snackbar/showSnackbar",
          { message, state: SNACKBAR_SUCCESS },
          { root: true }
        );
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async editTodo(context, data) {
      const userId = context.rootGetters["auth/userId"];
      try {
        const { id, label } = data;
        const url = `https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${userId}/${id}.json`;
        if (userId) {
          await sendRequest(url, METHOD_PUT, data, "Failed to edit the todo");
        }
        context.commit("editTodo", {
          id,
          label,
        });
        context.dispatch(
          "snackbar/showSnackbar",
          { message: "Todo edited successfully", state: SNACKBAR_SUCCESS },
          { root: true }
        );
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async loadTodos(context) {
      const userId = context.rootGetters["auth/userId"];
      const url = `https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${userId}.json`;
      try {
        if (userId) {
          const responseData = await sendRequest(
            url,
            METHOD_GET,
            undefined,
            "Failed to load todo"
          );
          context.commit(
            "loadTodos",
            Object.entries(responseData).map((todo) => ({
              id: todo[0],
              label: todo[1].label,
              isCompleted: todo[1].isCompleted,
            }))
          );
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    clearTodos(context) {
      context.commit("loadTodos", []);
    },
  },
  getters: {
    todoItems(state) {
      return state.todos;
    },
  },
};

async function sendRequest(url, method, body, errorMessage) {
  const response = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
  });
  const responseData = await response.json();
  if (!response.ok) {
    const error = new Error(responseData.message || errorMessage);
    throw error;
  }
  return responseData;
}
