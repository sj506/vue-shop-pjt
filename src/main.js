import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mixins from './mixins';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App).mixin(mixins).use(store).use(router).use(VueSweetalert2).mount('#app');

window.Kakao.init('03e7f27c977abda364ebc79b908f3a56'); // 다운로드한 kakao.js에서 내가 원하는 값을 할당해 넣어주겠다. init메소드가 있는데 여기에 할당해서 넣어줄것이다.
// init('kakao의 js 키값.')
