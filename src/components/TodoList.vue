<template>
  <section class="px-4 bg-white w-100 py-3">
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
    <div v-else>No todos to show</div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import TodoItem from "./TodoItem.vue";
export default {
  components: {
    TodoItem,
  },
  computed: {
    ...mapGetters(["todoItems"]),
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
