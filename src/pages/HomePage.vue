<template>
  <the-main-title></the-main-title>
  <base-card>
    <section class="container-fluid d-flex align-items-center flex-column">
      <div class="row w-100 m-3 d">
        <div class="col-sm-10 px-0 pr-sm-1">
          <v-text-field
            hide-details
            class="px-2 text-field"
            type="text"
            placeholder="New resolution"
            v-model.trim="inputValue"
            label="New Resolution"
            variant="outlined"
          />
        </div>
        <div
          class="col-sm-2 px-1 mt-2 mt-sm-0 px-sm-0 d-flex align-items-center"
        >
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

<style scoped lang="scss">
section {
  padding: 0px;
}
.text-field {
  width: 100%;
}

button {
  background-color: red;
  color: white;
  width: 100%;
  height: 100%;
  font-weight: bold;
}

button:hover {
  color: white;
}

input {
  height: 100%;
  width: 100%;
}
.input-container {
  display: flex;
  gap: 5px;
  flex-wrap: nowrap;
}
</style>
