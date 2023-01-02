<template>
  <section class="px-4 bg-white w-100 py-3">
    <ul class="pl-0">
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

<style>
ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: medium;
}
</style>
