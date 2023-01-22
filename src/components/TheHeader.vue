<template>
  <v-app-bar color="orange-darken-4" class="v-app-bar" mb-3>
    <i class="bi bi-list d-sm-none d-block"></i>
    <nav class="d-sm-flex d-none">
      <router-link to="/">
        {{ todoPageNavLabel }}
      </router-link>
      <router-link v-if="!isAuthenticated" to="/auth">Login</router-link>
      <span v-else @click="onLogout">Logout</span>
    </nav>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" absolute left temporary top="0">
    <v-list nav dense>
      <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <v-list-item>
          <router-link to="/">{{ todoPageNavLabel }}</router-link>
        </v-list-item>
        <v-list-item v-if="!isAuthenticated">
          <router-link to="/auth">Login</router-link>
        </v-list-item>
        <v-list-item v-else>
          <span @click="onLogout">Logout</span>
        </v-list-item>
      </v-list-item-group>
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
header {
  margin-bottom: 32px;
}

i {
  color: white;
  font-size: 40px;
  font-weight: bold;
  margin-left: 20px;
}

header >>> .v-navigation-drawer {
  height: 100vh;
  width: 100vw;
  top: 0 !important;
  position: absolute;
  z-index: 9999;
}

nav {
  display: flex;
  width: fit-content;
  margin-left: auto;
  margin-right: 40px;
  height: 100%;
  z-index: 9999;
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
