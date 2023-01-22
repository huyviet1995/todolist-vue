<template>
  <base-card>
    <the-main-title></the-main-title>
    <section
      class="main-container m-auto d-flex align-items-center flex-column"
    >
      <div class="row w-100 m-3 d">
        <div class="col-sm-9 px-0 mb-3 mb-sm-0 pr-sm-1">
          <input
            class="px-2"
            type="text"
            placeholder="New resolution"
            v-model.trim="inputValue"
          />
        </div>
        <div class="col-sm-3 px-0">
          <button @click="addTodo" class="btn">ADD</button>
        </div>
      </div>
      <todo-list></todo-list>
    </section>
  </base-card>
</template>

<script>
import TodoList from "../components/TodoList.vue";
import TheMainTitle from "../components/TheMainTitle.vue";
export default {
  components: { TodoList, TheMainTitle },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    addTodo() {
      this.$store.dispatch("todos/addTodo", {
        label: this.inputValue,
        isCompleted: false,
      });
      // Reset the input value
      this.inputValue = "";
    },
    closeSnackbar() {
      this.$store.dispatch("snackbar/hideSnackbar");
    },
  },
};
</script>

<style scoped>
input {
  min-height: 38px;
  border: 1px solid coral;
}

button {
  background-color: red;
  color: white;
  font-weight: bold;
  width: 100%;
}

input {
  height: 100%;
  width: 100%;
}
.main-container {
  max-width: 340px;
}

.input-container {
  display: flex;
  gap: 5px;
  flex-wrap: nowrap;
}
</style>
