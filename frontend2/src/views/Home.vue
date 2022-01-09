<!--
Page d'accueil Home 
Inscription et connection utilisateur
Message de bienvenue sur le forum
-->

<template>
  <div class="home">

    <!--Message de bienvenue-->
    <div class="wellcome mx-md-5 mx-3 my-3 my-md-5 rounded">
      <p class="pt-5 text-center mx-2 fw-bold fs-2">Bienvenue sur le forum !</p>
      <img class="logo mx-auto d-block" src="../assets/icon-above-font.png" alt="logo" height="150"/>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

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
}
</style>
