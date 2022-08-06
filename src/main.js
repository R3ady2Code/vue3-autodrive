import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './index.css';

import Maska from 'maska';

createApp(App).use(store).use(Maska).mount('#app');
