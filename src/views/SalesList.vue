<template>
  <main class="mt-3">
    <h1>SalesList</h1>
    <div class="container">
      <div class="float-end mb-1">
        <router-link class="btn btn-dark" to="/create"> 제품등록 </router-link>
      </div>
      <table class="table table-bordered">
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
              <img src="`/download/${product.id}/${product.path}`" style="height: 50px; width: auto" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button type="button" class="btn btn-info me-1">사진등록</button>
              <button type="button" class="btn btn-warning me-1">수정</button>
              <button type="button" class="btn btn-danger">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
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
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {},
};
</script>
