<template>
  <header>
    <nav>
      <router-link to="/">{{ todoPageNavLabel }}</router-link>
      <router-link v-if="!isAuthenticated" to="/auth">Login</router-link>
      <span v-else @click="onLogout">Logout</span>
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
  methods: {
    onLogout() {
      this.$store.dispatch("auth/logout");
      this.$router.replace("/auth");
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
nav a,
nav span {
  color: white;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
