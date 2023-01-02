<template>
  <li>
    {{ label }} <span>{{ isCompleted }}</span>
  </li>
</template>

<script>
export default {
  props: ["label", "isCompleted"],
};
</script>

<style></style>
