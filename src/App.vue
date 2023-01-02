<script setup></script>

<template>
  <main>
    <header>
      <h1>To do app</h1>
    </header>
    <section>
      <div class="inputWrapper">
        <input type="text" placeholder="New Task" />
        <button>ADD</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}
header {
  line-height: 1.5;
  width: 100%;
}
</style>
