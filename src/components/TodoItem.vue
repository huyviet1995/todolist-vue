<template>
  <li>
    <input type="checkbox" class="mr-2" :checked="isCompleted" />
    {{ label }}
  </li>
</template>

<script>
export default {
  props: ["label", "isCompleted"],
};
</script>

<style scoped>
li {
  text-decoration: none;
  list-style-type: none;
  border-bottom: 1px solid black;
}
input[type="checkbox"] {
  transform: scale(1.3);
}
</style>
