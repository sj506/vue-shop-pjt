<template>
  <main class="mt-3">
    <div class="container">
      <h2 class="text-center">제품 수정</h2>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품명</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="ProductList[idx].product_name" />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품가격</label>
        <div class="col-md-9">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="ProductList[idx].product_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">배송비</label>
        <div class="col-md-9">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="ProductList[idx].delivery_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">추가배송비(도서산간)</label>
        <div class="col-md-9">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="ProductList[idx].add_delivery_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품카테고리</label>
        <div class="col-md-9">
          <div class="row">
            <div class="col-auto">
              <select class="form-select" @change="getInputValue" v-model="ProductList[idx].cate1">
                <option selected value="1">전체</option>
                <option v-for="(category, idx) in categoryList[0]" :key="idx" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
            <div class="col-auto">
              <select class="form-select" @change="getInputValue2" v-model="ProductList[idx].cate2">
                <option selected value="2">전체</option>
                <option v-for="(category, idx) in categoryList[1]" :key="idx" :value="category">{{ category }}</option>
              </select>
            </div>
            <div class="col-auto">
              <select class="form-select" v-model="ProductList[idx].cate3">
                <option selected value="3">전체</option>
                <option v-for="(category, idx) in categoryList[2]" :key="idx" :value="category">{{ category }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="col-md-3 col-form-label">태그</label>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="ProductList[idx].tags" />
      </div>
    </div>
    <div class="mb-3 row">
      <label class="col-md-3 col-form-label">출고일</label>
      <div class="col-md-9">
        <div class="input-group mb-3">
          <input type="number" class="form-control" v-model="ProductList[idx].outbound_days" />
          <span class="input-group-text">일 이내 출고</span>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <div class="col-6 d-grid p-1">
        <button type="button" class="btn btn-lg btn-dark" @click="goToList">취소하기</button>
      </div>
      <div class="col-6 d-grid p-1">
        <button type="button" class="btn btn-lg btn-danger" @click="productUpdate">저장하기</button>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      idx: 0,
      ProductList: {},
      getCateList: '',
      categoryList: [],
      cateVal: 1,
      cate1: [],
      cate2: [],
      cate3: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    if (this.user.email == undefined) {
      alert('로그인을 해야 이용할 수 있습니다.');
      this.$router.push({ path: '/' });
    }
  },
  created() {
    this.ProductList = this.$store.state.getProductList;
    this.idx = this.$store.state.getIdx;
    console.log(this.ProductList);
    this.getCategoryList();
  },
  methods: {
    goToList() {
      this.$router.push({ path: '/sales' });
    },
    productUpdate() {
      this.$swal
        .fire({
          title: '정말 수정 하시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '등록',
          cancelButtonText: '취소',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const res = this.$post('/api/productUpdate', this.productDetail);
            console.log(res);
            this.$swal.fire('수정되었습니다.', '', 'success');
            this.$router.push({ path: '/sales' });
          }
        });
    },
    async getCategoryList() {
      const categoryList = await this.$get('/api/categoryList', {});
      this.getCateList = categoryList;
      console.log(categoryList);
      categoryList.forEach((categoryList) => {
        this.cate1.push(categoryList.cate1);
      });
      const set1 = new Set(this.cate1);
      const uniqueArr1 = [...set1];
      this.categoryList[0] = uniqueArr1;
    },
    getInputValue(e) {
      this.cate2 = [];
      if (e.target.value == 1) {
        this.categoryList[1] = '';
        this.categoryList[2] = '';
        return;
      }
      this.cate1 = e.target.value;
      this.getCateList.forEach((categoryList) => {
        if (categoryList.cate1 === this.cate1) {
          this.cate2.push(categoryList.cate2);
        }
      });
      const set2 = new Set(this.cate2);
      const uniqueArr2 = [...set2];
      this.categoryList[1] = uniqueArr2;
      this.categoryList[2] = '';
    },
    getInputValue2(e) {
      this.cate3 = [];
      this.cate2 = e.target.value;
      if (e.target.value == 2) {
        this.categoryList[2] = '';
        return;
      }
      this.getCateList.forEach((categoryList) => {
        if (categoryList.cate2 === this.cate2) {
          this.cate3.push(categoryList.cate3);
        }
      });
      const set3 = new Set(this.cate3);
      const uniqueArr3 = [...set3];
      this.categoryList[2] = uniqueArr3;
    },
  },
};
</script>
