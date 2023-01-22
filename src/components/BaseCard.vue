<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  padding: 1rem;
  margin: 2rem 5px;
}
@media screen and (min-width: 768px) {
  .card {
    border-radius: 12px;
    margin: 2rem auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    max-width: 450px;
  }
}
</style>
