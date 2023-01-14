<template>
  <base-card>
    <section
      class="main-container m-auto bg-red d-flex align-items-center flex-column"
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
  <v-snackbar
    v-model="isSnackbarOpen"
    content-class="snackbar"
    rounded="true"
    :timeout="timeout"
  >
    {{ snackbarMessage }}
    <button class="btn btn-danger" color="pink" @click="closeSnackbar">
      Close
    </button>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters("snackbar", ["snackbarMessage", "isSnackbarOpen", "timeout"]),
  },
};
</script>

<style scoped>
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
