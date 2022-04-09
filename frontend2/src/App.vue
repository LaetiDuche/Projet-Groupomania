<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>

</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "app",
  components: {
    Header,
  },
}
</script>

<style lang="scss">

body{
  background-color: #eeeeee;
  font-family:'Quicksand';
}
.btn:focus, a:focus, .form-control:focus, .input:focus{
  border-color: #fd2d01;
  box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.5);
}

</style>