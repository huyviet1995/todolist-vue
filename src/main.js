import { createApp } from "vue";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import BaseCard from "./components/BaseCard.vue";
import router from "./router";
import store from "./store";
import "./assets/main.css";
// Vuetify
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import 'vuetify/styles';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(vuetify);

app.use(router);

app.use(store);

app.component("base-card", BaseCard);

app.mount("#app");
