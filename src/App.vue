<template>
  <v-app class="app">
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
  ::v-deep .v-application__wrap {
    background-color: #ef6c00;
  }
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
