import { createApp } from 'vue'
import App from './App.vue'
import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';

const vue = createApp(App);
vue.use(VueLoaders);
vue.mount('#app');