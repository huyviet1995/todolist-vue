<template>
  <v-app-bar color="orange-darken-4" class="v-app-bar" mb-3>
    <i class="bi bi-list d-sm-none d-block" @click.stop="drawer = !drawer"></i>
    <nav class="d-sm-flex d-none">
      <router-link to="/">
        {{ todoPageNavLabel }}
      </router-link>
      <router-link v-if="!isAuthenticated" to="/auth">Login</router-link>
      <span v-else @click="onLogout">Logout</span>
    </nav>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    absolute
    position="left"
    color="#ef6c00"
    temporary
    top="0"
    width="100vw"
    theme="dark"
    class="navigation-drawer"
  >
    <v-list nav dense class="nav--mobile">
      <router-link @click="handleLinkClick" to="/">{{
        todoPageNavLabel
      }}</router-link>
      <router-link @click="handleLinkClick" v-if="!isAuthenticated" to="/auth"
        >Login</router-link
      >
      <span v-else @click="onLogout">Logout</span>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "email"]),
    todoPageNavLabel() {
      if (this.isAuthenticated) {
        return `${this.email}'s resolutions`;
      } else {
        return "Your resolutions";
      }
    },
  },
  methods: {
    onLogout() {
      this.drawer = false;
      this.$store.dispatch("auth/logout");
      this.$router.replace("/auth");
    },
    handleLinkClick(e) {
      this.drawer = false;
    },
  },
};
</script>

<style scoped lang="scss">
header {
  margin-bottom: 32px;
}

i {
  color: white;
  font-size: 40px;
  font-weight: bold;
  margin-left: 20px;
  cursor: pointer;
}

nav {
  display: flex;
  width: fit-content;
  margin-left: auto;
  margin-right: 40px;
  height: 100%;
  z-index: 9999;
}

.nav--mobile {
  display: flex;
  flex-direction: column;
  a,
  span {
    margin: 10px 0;
  }
}

nav a,
nav span {
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  color: white;
  margin: auto 40px;
  text-decoration: none;
  cursor: pointer !important;
  font-size: large;
}
</style>
