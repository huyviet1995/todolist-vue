<template>
  <v-card class="mx-auto overflow-hidden" width="344">
    <v-app-bar color="orange-darken-4" class="v-app-bar" mb-3 prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>My files</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-filter</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: false,
    };
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

nav {
  display: flex;
  gap: 20px;
  width: fit-content;
}
nav a,
nav span {
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
