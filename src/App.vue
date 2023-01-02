<script setup></script>

<template>
  <main class="d-flex flex-column align-items-center justify-content-center">
    <header class="text-center mb-4">
      <h1 class="text-white">TO-DO LIST</h1>
    </header>
    <section class="m-auto bg-red d-flex align-items-center flex-column">
      <div class="row w-100 m-3">
        <div class="col-sm-10 px-0">
          <input
            class="py-2 px-2 h-100 w-100"
            type="text"
            placeholder="New Task"
            v-model.trim="inputValue"
          />
        </div>
        <div class="col-sm-2 px-0">
          <button
            @click="addTodo"
            class="btn btn-primary ml-1 py-2 h-100 w-100"
          >
            ADD
          </button>
        </div>
      </div>
      <todo-list></todo-list>
    </section>
  </main>
</template>

<script>
import TodoList from "./components/TodoList.vue";
export default {
  components: { TodoList },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    addTodo() {
      this.$store.dispatch("addTodo", {
        label: this.inputValue,
        isCompleted: false,
      });
      // Reset the input value
      this.inputValue = "";
    },
  },
};
</script>
