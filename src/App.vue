<script setup></script>

<template>
  <main>
    <header class="fixed-top text-center mt-2">
      <h1 class="text-white">TO-DO LIST</h1>
    </header>
    <section class="container-fluid m-auto bg-red">
      <div class="row">
        <div class="col-sm-8">
          <input class="py-2 px-2 h-100" type="text" placeholder="New Task" />
        </div>
        <div class="col-sm-4">
          <button class="btn btn-primary ml-1 py-2 h-100">ADD</button>
        </div>
      </div>
    </section>
  </main>
</template>
