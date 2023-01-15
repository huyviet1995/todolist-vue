<template>
  <header>
    <nav>
      <router-link to="/">{{ todoPageNavLabel }}</router-link>
      <router-link v-if="!isAuthenticated" to="/auth">Login</router-link>
      <router-link v-else to="/auth">Logout</router-link>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "email"]),
    todoPageNavLabel() {
      if (this.isAuthenticated) {
        return `${this.email}'s todos`;
      } else {
        return "Your todos";
      }
    },
  },
};
</script>

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
