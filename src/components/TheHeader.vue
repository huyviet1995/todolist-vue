<template>
  <header>
    <nav>
      <a href="/">YOUR TODO</a>
      <a href="/auth">Login</a>
      <a href="/auth">Logout</a>
    </nav>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  gap: 20px;
  height: 32px;
  margin-left: auto;
  width: fit-content;
}
nav a {
  color: white;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
