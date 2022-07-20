<template>
  <main class="mt-3">
    <h1>SalesList</h1>
    <div class="container">
      <div class="float-end mb-1">
        <router-link class="nav-link" to="/create"> <button class="btn btn-dark" type="button">제품등록</button> </router-link>
      </div>
      <table class="table table-bordered" v-for="(product, idx) in productList" :key="product.id">
        <thead>
          <tr>
            <th></th>
            <th>제품명</th>
            <th>제품가격</th>
            <th>배송비</th>
            <th>추가 배송비</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                :src="
                  product.path
                    ? product.path
                    : 'https://images.velog.io/images/manyyeon/post/55712cff-8d90-4066-b813-89eaf5f871f2/pngwing.com%20(1).png'
                "
                style="height: 50px; width: auto"
              />
            </td>
            <td>{{ product.product_name }}</td>
            <td>{{ product.product_price }}</td>
            <td>{{ product.delivery_price }}</td>
            <td>{{ product.add_delivery_price }}</td>
            <td class="contanier-center">
              <!-- <router-link class="nav-link" :to="{ path: '/image_insert', query: { product_id: product.id, product_name: product.product_name } }"> -->
              <button type="button" class="btn btn-info me-1" @click="goToImageInsert(idx)">사진등록</button>
              <!-- </router-link> -->
              <button type="button" class="btn btn-warning me-1" @click="ProductIns(product.id)">수정</button>
              <button type="button" class="btn btn-danger me-1" @click="ProductDel(product.id)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 로딩div -->
      <div v-if="dNone" class="spinner-grow" role="status">
        <span class="sr-only"></span>
      </div>
      <!-- 로딩div -->
    </div>
  </main>
</template>
<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      productList: {},
      dNone: true,
    };
  },
  setup() {},
  created() {
    // if (this.getProductList() !== this.$store.state.getProductList) {
    //   this.productList = this.$store.state.getProductList;
    //   this.dNone = false;
    // }
    this.$store.state.getProductList !== this.productList ? this.firstGet() : this.getProductList();
  },
  mounted() {},
  unmounted() {},
  updated() {},
  methods: {
    async firstGet() {
      const productList = await this.$get('/api/productList2', {});
      this.$store.commit('getProductList', productList);
      console.log(productList);
      this.getProductList();
    },
    getProductList() {
      this.productList = this.$store.state.getProductList;
      this.dNone = false;
    },
    async ProductDel(id) {
      this.dNone = true;
      const res = this.$post('/api/ProductDel', id);
      console.log(res);
      const productList = await this.$get('/api/productList2', {});
      this.$store.commit('getProductList', productList);
      this.getProductList();
    },
    goToImageInsert(idx) {
      this.$store.commit('getIdx', idx);
      this.$router.push({ path: '/image_insert' });
    },

    ProductIns(id) {
      this.productList.forEach((item) => {
        if (item.id === id) {
          this.dNone = false;
          console.log(item.product_name);
        }
      });
    },
  },
};
</script>

<style scoped>
td {
  min-width: 120px;
}
.btn {
  width: 100px;
}
</style>
