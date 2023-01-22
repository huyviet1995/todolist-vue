<template>
  <section class="px-4 bg-white w-100 py-3">
    <p class="text-red" v-if="!isAuthenticated && todoItems.length > 0">
      Please sign up so your resolutions can be saved !
    </p>
    <ul v-if="todoItems.length > 0" class="pl-0">
      <todo-item
        v-for="item in todoItems"
        :label="item.label"
        :isCompleted="item.isCompleted"
        :id="item.id"
        :key="item.label"
      >
      </todo-item>
    </ul>
    <div v-else>No resolutions to show</div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import TodoItem from "./TodoItem.vue";
export default {
  components: {
    TodoItem,
  },
  mounted() {
    this.$store.dispatch("todos/loadTodos");
  },
  computed: {
    ...mapGetters("todos", ["todoItems"]),
    ...mapGetters("auth", ["isAuthenticated"]),
  },
};
</script>

<style>
ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: medium;
}
</style>
