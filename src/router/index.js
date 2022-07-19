import { createRouter, createWebHistory } from 'vue-router';
import ProductCreate from '../views/ProductCreate.vue';
import SalesList from '../views/SalesList.vue';
import ImageInsert from '../views/ImageInsert.vue';
import ProductList from '../views/ProductList.vue';
import ProductDetails from '../views/ProductDetails.vue';
import store from '@/store';
import swal from 'sweetalert2';

// 네비게이션 가드
// to : 이동할 url 정보가 담긴 라우터 객체
// from : 현재 url 정보가 담긴 라우터 객체
// next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
const requireAuth = () => (to, from, next) => {
  if (store.state.user.iuser === undefined) {
    swal.fire('로그인을 하세요.', '', 'warning');
    return;
  }

  return next();
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductList,
  },
  {
    path: '/create',
    name: 'ProductCreate',
    component: ProductCreate,
    beforeEnter: requireAuth(),
  },
  {
    path: '/sales',
    name: 'SalesList',
    component: SalesList,
  },
  {
    path: '/image_insert',
    name: 'ImageInsert',
    component: ImageInsert,
    beforeEnter: requireAuth(),
  },
  {
    path: '/detail',
    name: 'ProductDetails',
    component: ProductDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
