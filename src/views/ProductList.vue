<template>
  <main class="mt-3">
    <h1>ProductList</h1>
    <div class="container">
      <div class="row mb-2">
        <div class="col-12">
          <select class="form-select" @change="getInputValue">
            <option selected value="1">전체</option>
            <option v-for="(category, idx) in categoryList[0]" :key="idx" :value="category">{{ category }}</option>
          </select>
          <select v-if="categoryList[1]" class="form-select" @change="getInputValue2">
            <option selected value="2">전체</option>
            <option v-for="(category, idx) in categoryList[1]" :key="idx" :value="category">{{ category }}</option>
          </select>
          <select v-if="categoryList[2]" class="form-select" @change="getInputValue3">
            <option selected value="3">전체</option>
            <option v-for="(category, idx) in categoryList[2]" :key="idx" :value="category">{{ category }}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div
          v-bind:class="{
            dBlock: cateVal == 1 || (product.cate1 == cate1 && cateVal == 2) || (product.cate2 == cate2 && cateVal == 3) || product.cate3 == cate3,
            // 해결!!!!!!!!!!! thank to 예찬, 재훈형
          }"
          class="dNone col-xl-3 col-lg-4 col-md-6"
          :key="product.id"
          v-for="product in productList"
        >
          <div class="card" style="width: 18rem">
            <a style="cursor: pointer" @click="goToDetail(product.id)">
              <img
                :src="
                  product.path
                    ? product.path
                    : 'https://images.velog.io/images/manyyeon/post/55712cff-8d90-4066-b813-89eaf5f871f2/pngwing.com%20(1).png'
                "
                alt="이미지"
                class="card-img-top"
              />
            </a>
            <div class="card-body">
              <h5 class="card-title">{{ product.product_name }}</h5>
              <p class="card-text">
                <span class="badge bg-dark text-white mr-1">{{ product.cate1 }}</span>
                <span class="badge bg-dark text-white mr-1">{{ product.cate2 }}</span>
                <span class="badge bg-dark text-white">{{ product.cate3 }}</span>
              </p>
              <div class="d-flex justify-content-between aling-items-center">
                <div class="btn-group" role="group">
                  <button class="btn btn-sm btn-outline-secondary">장바구니 담기</button>
                  <button class="btn btn-sm btn-outline-secondary">주문하기</button>
                </div>
                <small class="text-dark">{{ product.product_price }}원</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      sampleData: '',
      productList: [],
      getCateList: '',
      categoryList: [],
      cateVal: 1,
      cate1: [],
      cate2: [],
      cate3: [],
    };
  },
  setup() {},
  created() {
    this.getProductList();
    this.getCategoryList();
  },
  mounted() {},
  unmounted() {},
  methods: {
    async getProductList() {
      const productList = await this.$get('/api/productList2', {});
      this.$store.commit('getProductList', productList);
      this.productList = this.$store.state.getProductList;
      console.log(this.$store.state.getProductList);
    },
    async getCategoryList() {
      const categoryList = await this.$get('/api/categoryList', {});
      this.getCateList = categoryList;
      // catogoryList(중복 많음) 전체를 getCateList에 넣어줌
      console.log(categoryList);
      categoryList.forEach((categoryList) => {
        this.cate1.push(categoryList.cate1);
        //cate1이라는 배열에 categoryList.cate1를 다 넣어줌 아직 중복된 값 있음
      });
      const set1 = new Set(this.cate1);
      const uniqueArr1 = [...set1];
      // 카테고리 중복값 제거하여 categoryList[0]에 담아둠
      this.categoryList[0] = uniqueArr1;
    },
    getInputValue(e) {
      // 첫번째 인풋을 선택했을 때 발생되는 change함수
      this.cate2 = [];
      // 첫번째 input 값을 변경했을 때 push가 계속 되기 때문에 초기화해줌
      if (e.target.value == 1) {
        this.categoryList[1] = '';
        this.categoryList[2] = '';
        this.cateVal = 1;
        // 첫번째 인풋을 전체로 눌렀을 때(값을 선택하지x) 전체상품이 다 보이고 나머지 인풋은 사라지게 함
        return;
      }
      this.cate1 = e.target.value;
      console.log(this.cate1);
      console.log(this.getCateList);
      this.getCateList.forEach((categoryList) => {
        if (categoryList.cate1 === this.cate1) {
          // 카테고리리스트에 cate1와 인풋의 value값 = cate1이랑 같으면 cate2에 푸쉬
          // ex. 전자제품 선택 -> 컴퓨터, 가전제품만 들어감
          this.cate2.push(categoryList.cate2);
        }
      });
      const set2 = new Set(this.cate2);
      const uniqueArr2 = [...set2];
      this.categoryList[1] = uniqueArr2;
      // 똑같이 중복값 제거하여 categoryList[1]에 넣어줌
      console.log(this.categoryList);
      this.cateVal = 2;
      // cateVal를 2로 바꿔줌으로서 cateVal가 1일 때와 차이를 줌
    },
    getInputValue2(e) {
      this.cate3 = [];
      this.cate2 = e.target.value;
      this.cateVal = e.target.value;
      if (e.target.value == 2) {
        this.categoryList[2] = '';
        return;
      }
      console.log(this.cate2);
      console.log(this.getCateList);
      this.getCateList.forEach((categoryList) => {
        if (categoryList.cate2 === this.cateVal) {
          this.cate3.push(categoryList.cate3);
        }
      });
      const set3 = new Set(this.cate3);
      const uniqueArr3 = [...set3];
      this.categoryList[2] = uniqueArr3;
      console.log(this.categoryList);
      this.cateVal = 3;
    },
    getInputValue3(e) {
      this.cate3 = e.target.value;
      console.log(this.cate3);
      this.cateVal = e.target.value;
    },
  },
};
</script>
