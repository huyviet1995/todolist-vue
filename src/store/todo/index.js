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
      try {
        const requestBody = {
          label: data.label,
          isCompleted: data.isCompleted,
        };
        const url =
          "https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json";
        const responseData = await sendRequest(
          url,
          METHOD_POST,
          requestBody,
          "Failed to add todo"
        );
        requestBody.id = responseData.name;
        context.commit("addTodo", requestBody);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async deleteTodo(context, todoId) {
      try {
        const url = `https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${todoId}.json`;
        await sendRequest(url, METHOD_DELETE);
        context.commit(
          "deleteTodo",
          todoId,
          undefined,
          "Failed to delete the todo please try again"
        );
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    toggleMarkAsCompleted(context, todoId) {
      context.commit("toggleMarkAsCompleted", todoId);
    },
    async editTodo(context, data) {
      try {
        const { id, label } = data;
        const url = `https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`;
        await sendRequest(url, METHOD_PUT, data, "Failed to edit the todo");
        context.commit("editTodo", {
          id,
          label,
        });
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async loadTodos(context) {
      const url = `https://vue-project-a031a-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json`;
      try {
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
      } catch (e) {
        console.error(e);
        throw e;
      }
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
