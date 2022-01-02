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

</style>