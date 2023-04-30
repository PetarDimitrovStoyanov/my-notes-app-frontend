import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import "../src/assets/styles/global.scss";
import userStore from './store/store';


const app = createApp(App);

app.use(router);
app.use(userStore);
app.mount('#app');
