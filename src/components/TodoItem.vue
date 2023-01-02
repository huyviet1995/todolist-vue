<template>
  <li :class="{ completed: isCompleted }">
    <input type="checkbox" class="mr-2" :checked="isCompleted" />
    {{ label }}
    <span class="icon-remove" @click="deleteTodo">X</span>
  </li>
</template>

<script>
export default {
  props: ["label", "isCompleted", "id"],
  methods: {
    deleteTodo() {
      this.$store.dispatch("deleteTodo", this.id);
    },
  },
};
</script>

<style scoped>
li {
  text-decoration: none;
  list-style-type: none;
  border-bottom: 1px solid black;
  color: green;
  position: relative;
}
input[type="checkbox"] {
  transform: scale(1.3);
}
.completed {
  text-decoration: line-through;
  color: red;
}

.icon-remove {
  opacity: 0.5;
  position: absolute;
  right: 10px;
  cursor: pointer;
}
</style>
