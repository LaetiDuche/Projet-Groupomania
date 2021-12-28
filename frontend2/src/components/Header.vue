<template>
  <div>
    <b-navbar class="d-flex p-2">
      <b-navbar-brand class="mx-auto">
        <img src="../assets/icon-left-font.png" alt="logo" height="48" width="190"/>
      </b-navbar-brand>

      <b-navbar-nav class="m-auto ms-md-auto my-auto ">

        <b-nav-item class="mx-3 justify-content-lg-end" href="#">
          <router-link to="/signup">S'inscrire</router-link>
        </b-nav-item>

        <b-nav-item class="mx-2 justify-content-lg-end" href="#">
          <router-link to="/login">Se connecter</router-link>
        </b-nav-item>

      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style lang= "scss">
div {
  background-color: #ffffff;
}
a {
  text-decoration: none;
  color: black;
}
a:hover{
  color:#fd2d01;
}
b-navbar {
  box-shadow: 0px 4px 4px -3px rgb(53 53 53 / 20%);
}
@media screen and (max-width:440px) and (min-width:320px) 
{  
    b-navbar {
        display: flex; 
        flex-wrap: wrap;
        margin: 0; 
    }
}
</style>