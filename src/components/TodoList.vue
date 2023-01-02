<template>
  <section class="px-2 bg-white w-100">
    <ul>
      <todo-item
        v-for="item in todoItems"
        :label="item.label"
        :isCompleted="item.isCompleted"
        :key="item.label"
      >
      </todo-item>
    </ul>
  </section>
</template>

<script>
import TodoItem from "./TodoItem.vue";
export default {
  data() {
    return {
      todoItems: [
        { label: "Add Item 1", isCompleted: false },
        { label: "Add item 2", isCompleted: false },
      ],
    };
  },
  components: {
    TodoItem,
  },
};
</script>

<style></style>
