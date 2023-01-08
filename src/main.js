import { createApp } from "vue";
import App from "./App.vue";
import BaseCard from "./components/BaseCard.vue";
import router from "./router";
import store from "./store";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.use(store);

app.component("base-card", BaseCard);

app.mount("#app");
