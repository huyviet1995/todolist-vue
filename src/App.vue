<script setup></script>

<template>
  <main class="d-flex flex-column align-items-center justify-content-center">
    <header class="text-center mb-4">
      <h1 class="text-white">TO-DO LIST</h1>
    </header>
    <section
      class="container-fluid m-auto bg-red w-100 d-flex align-items-center justify-content-center"
    >
      <div class="row m-auto">
        <input
          class="py-2 px-2 h-100 w-40"
          type="text"
          placeholder="New Task"
        />
        <button class="btn btn-primary ml-1 py-2 h-100">ADD</button>
      </div>
    </section>
  </main>
</template>
