import { createApp } from 'vue';
import { createPinia } from 'pinia';
import storeReset from './store/plugins/storeReset.js';

import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
const pinia = createPinia();

pinia.use(storeReset);
app.use(pinia);
app.use(router);
app.mount('#app');
