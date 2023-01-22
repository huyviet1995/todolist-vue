<template>
  <v-app class="app">
    <v-card>
      <the-header></the-header>
      <v-main class="main">
        <router-view> </router-view>
        <transition>
          <div>
            <v-snackbar
              v-model="isSnackbarOpen"
              :content-class="{
                snackbar: true,
                'snackbar--failure': !isSnackbarSuccess,
              }"
              rounded="true"
              location="top"
            >
              {{ snackbarMessage }}
              <span
                class="text-white text-bold text-uppercase"
                color="pink"
                @click="closeSnackbar"
              >
                Close
              </span>
            </v-snackbar>
          </div>
        </transition>
      </v-main>
    </v-card>
    <v-footer class="footer"
      >A product created by Viet Dang, all rights reserved</v-footer
    >
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch("auth/tryLogin");
  },
  computed: {
    ...mapGetters("snackbar", [
      "snackbarMessage",
      "isSnackbarOpen",
      "isSnackbarSuccess",
    ]),
  },
};
</script>

<style scoped lang="scss">
/* Snackbar */
.app {
  background-color: #ef6c00;
  height: 100%;
}

.v-card {
  background-color: #ef6c00;
  height: 100%;
  z-index: 9999;
}

.main {
  margin-top: 24px;
}

.snackbar div[role="status"] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: green;
}

.footer {
  justify-content: center;
  background-color: #E65100;
  color: white;
}

.snackbar--failure div[role="status"] {
  background-color: red;
}

.snackbar span {
  cursor: pointer;
}
/* Transition */
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active {
  transition: opacity 2s ease-in;
}
.v-leave-active {
  transition: opacity 2s ease-out;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
