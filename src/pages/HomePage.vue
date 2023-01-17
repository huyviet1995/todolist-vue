<template>
  <h1 class="text-white">TO-DO LIST</h1>
  <base-card>
    <section
      class="main-container m-auto d-flex align-items-center flex-column"
    >
      <div class="row w-100 m-3 d input-container">
        <div class="col-sm-10 px-0">
          <input
            class="px-2"
            type="text"
            placeholder="New Task"
            v-model.trim="inputValue"
          />
        </div>
        <div class="col-sm-2 px-0">
          <button @click="addTodo" class="btn btn-primary">ADD</button>
        </div>
      </div>
      <todo-list></todo-list>
    </section>
  </base-card>
</template>

<script>
import TodoList from "../components/TodoList.vue";
export default {
  components: { TodoList },
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
h1 {
  text-align: center;
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
