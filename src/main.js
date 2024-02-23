import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";
import "./AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.use(fas);

const app = createApp(App);

app.use(router);
app.use(store);
app.component("icon", FontAwesomeIcon);
app.mount("#app");
