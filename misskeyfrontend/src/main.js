import { createApp } from 'vue'
import App from './App.vue'
import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const vue = createApp(App);
/*const options = {
    confirmButtonColor: 'lightseagreen',
  };
   */
vue.use(VueSweetalert2);
vue.use(VueLoaders);
vue.mount('#app');