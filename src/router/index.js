import { createRouter, createWebHistory } from 'vue-router';
import KakaoLogin from '../views/KakaoLogin.vue';
import ProductCreate from '../views/ProductCreate.vue';
import SalesList from '../views/SalesList.vue';
import ImageInsert from '../views/ImageInsert.vue';
import ProductList from '../views/ProductList.vue';
import ProductDetails from '../views/ProductDetails.vue';

const routes = [
  {
    path: '/kakaologin',
    name: 'kakaologin',
    component: KakaoLogin,
  },
  {
    path: '/',
    name: 'Home',
    component: ProductList,
  },
  {
    path: '/create',
    name: 'ProductCreate',
    component: ProductCreate,
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
