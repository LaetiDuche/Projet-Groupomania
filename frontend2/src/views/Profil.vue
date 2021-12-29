<template>
  <div class="profil">
     <Header />
     <div class="formulaire mx-auto col-10 col-sm-8 col-md-8 mt-4 p-3 rounded-3 bg-secondary">
       <div class=" w-50 mx-auto rounded-circle">
         <img class="img-fluid rounded-circle" src="../assets/icon-above-font.png" alt="" >
       </div>
       <div class=" mx-auto d-block mt-3">
         <p class="text-center ">Username</p>
       </div>
     </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "Profil",
  components: {
    Header,
}
}
</script>

<style lang="scss">
.profil {
  background-color: #eeeeee;
}
.formulaire {
  box-shadow: 2px 2px 12px lightgrey;
}


</style>