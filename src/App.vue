<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './layout/Header.vue';
import Footer from './layout/Footer.vue';

export default {
  components: { Header, Footer },
  computed: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  width: 100%;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.contanier-center {
  display: flex;
  align-content: center;
  justify-content: center;
}

.dNone {
  display: none;
}

.dBlock {
  display: block;
}
</style>
