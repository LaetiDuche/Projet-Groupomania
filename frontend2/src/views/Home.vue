<!--
Page d'accueil Home 
Inscription et connection utilisateur
Message de bienvenue sur le forum
-->

<template>
  <div class="home">
    <!--Message de bienvenue-->
    <div
      class="
        wellcome
        mx-auto
        col-11 col-md-10 col-lg-6
        p-3
        my-3 my-sm-4
      "
    >
      <p class="pt-5 text-center mx-2 fw-bold fs-2">Bienvenue sur le forum !</p>
      <img
        class="logo mx-auto d-block"
        src="../assets/icon-left-font-monochrome-black.png"
        alt="logo"
        height="150"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped lang='scss'>
.home {
  background-color: #eeeeee;
}
.wellcome {
  background-color: #ffff;
  box-shadow: 2px 2px 12px lightgrey;
  border-radius: 20px;
}
</style>
