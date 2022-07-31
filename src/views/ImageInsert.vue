<template>
  <main class="mt-3">
    <div class="container">
      <h2 class="text-center">제품1 사진 등록</h2>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품ID</label>
        <div class="col-md-9">{{ ProductList[idx].id }}</div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품명</label>
        <div class="col-md-9">{{ ProductList[idx].product_name }}</div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">섬네일 이미지</label>
        <div class="col-md-9">
          <div class="row">
            <div v-if="preview1 !== ''" class="col-lg-3 col-md-4 col-sm-2">
              <div class="position-relative">
                <img :src="preview1" alt="" class="img-fluid" />
                <div class="position-absolute top-0 end-0" style="cursor: pointer" @click="preview1 = ''">X</div>
              </div>
            </div>
          </div>
          <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 1)" />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>이미지 사이즈 : 350 * 350</li>
              <li>파일 사이즈 : 1Mb 이하</li>
              <li>파일 확장자 : png, jpg만 가능</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품 이미지</label>
        <div class="col-md-9">
          <div class="row">
            <div v-if="preview2 !== ''" class="col-lg-3 col-md-4 col-sm-2">
              <div class="position-relative">
                <img :src="preview2" alt="" class="img-fluid" />
              </div>
            </div>
          </div>
          <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 2)" multiple />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>최대 5개 가능</li>
              <li>이미지 사이즈 : 700 * 700</li>
              <li>파일 사이즈 : 1Mb 이하</li>
              <li>파일 확장자 : png, jpg만 가능</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품설명 이미지</label>
        <div class="col-md-9">
          <div class="row">
            <div v-if="preview3 !== ''" class="col-lg-3 col-md-4 col-sm-2">
              <div class="position-relative">
                <img :src="preview3" alt="" class="img-fluid" />
              </div>
            </div>
          </div>
          <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 3)" />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>파일 사이즈 : 5Mb 이하</li>
              <li>파일 확장자 : png, jpg만 가능</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mb-3 row m-auto">
        <router-link class="nav-link" to="/sales">
          <button type="button" class="btn btn-lg btn-dark" @click="upload">확인</button>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      ProductList: {},
      idx: 0,
      imgData: ['', '', ''],
      //이미지 담는 배열
      imgList: [],
      //type 2번 이미지들 담는 객체
      preview1: '',
      preview2: '',
      preview3: '',
      type: [1, 2, 3],
    };
  },
  created() {
    this.ProductList = this.$store.state.getProductList;
    this.idx = this.$store.state.getIdx;
    console.log(this.idx);
    console.log(this.ProductList);
  },
  methods: {
    async uploadFile(files, type) {
      console.log(files);
      const image = await this.$base64(files[0]);
      const reader = new FileReader();

      switch (type) {
        case 1:
          console.log(1);
          this.imgList[0] = { image };
          this.imgData[type - 1] = this.imgList;
          console.log(reader.readAsDataURL(files[0]));
          reader.onload = () => {
            this.preview1 = reader.result;
          };
          this.imgList = [];
          break;

        case 2:
          for (let i = 0; i < files.length; i++) {
            const image = await this.$base64(files[i]);
            this.imgList[i] = { image };
            this.imgData[1] = this.imgList;
            console.log(reader.readAsDataURL(files[i]));
            reader.onload = () => {
              this.preview2 = reader.result;
            };
          }
          this.imgList = [];
          break;
        case 3:
          this.imgList[0] = { image };
          this.imgData[type - 1] = this.imgList;
          console.log(reader.readAsDataURL(files[0]));
          reader.onload = () => {
            this.preview3 = reader.result;
          };
          this.imgList = [];
          break;
      }
      console.log(this.imgData);
    },

    async upload() {
      await this.$get(`/api/ProductImgDel/${this.ProductList[this.idx].id}/3`, {});
      for (let i = 0; i < this.type.length; i++) {
        const { error } = await this.$post(`/api/upload/${this.ProductList[this.idx].id}/${i + 1}`, this.imgData[i]);
        console.log(error);
      }
      const productList = await this.$get('/api/productList2', {});
      this.$store.commit('getProductList', productList);
      console.log(productList);
    },
  },
};
</script>

<style></style>
