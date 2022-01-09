<!--
Header dynamique entre utilisateur non connecté (s'inscrire, se connecter) 
et utilisateur connecté (menu dropdown: profil, forum, se déconnecter)
-->

<template>
  <header>
    <nav class="navbar d-flex p-2">
      <div class="mx-auto">
        <router-link to="/">
          <img  src="../assets/icon-left-font.png" alt="logo" height="48" width="190"/>
        </router-link>
      </div>

      <!--Si l'utilisateur n'est pas connecté-->
      <div class="m-auto d-flex my-auto" v-if="id === null">
        <nav class="mx-3 " href="#">
          <router-link to="/signup">S'inscrire</router-link>
        </nav>

        <nav class="mx-2 " href="#">
          <router-link to="/login">Se connecter </router-link>
        </nav>
      </div>

      <!--Si l'utilisateur est connecté-->
      <div class="dropdown  dropstart m-auto" v-else>  
        <a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          <img id="preview" v-if="imagePreview" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp" class="rounded-circle" height="40" alt="Avatar" loading="lazy"/><!--  :src="imagePreview"--> 
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <router-link to="/profil" class="dropdown-item">Mon profil</router-link>            
          </li>
          <li>
            <router-link to="/forum" class="dropdown-item">Forum</router-link>
          </li>
          <li>
            <a href="" role="button" class="dropdown-item" v-on:click="logout">Se déconnecter</a>
          </li>
        </ul>
      </div>

    </nav>
  </header>
</template>

<script>

export default {
  name: "Header",

  /*Changement de header si utilisateur connecté*/ 
  data() {
    return {
      id: "",
      imagePreview: true,
    };
  },
  mounted() {
    let idUser = localStorage.getItem("Id");
    console.log(idUser);
    this.id = idUser;
  },

  /*Se déconnecter*/ 
  methods: {
    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('Id');
      localStorage.removeItem('username');
      localStorage.removeItem('isAdmin');

      /*Retour à la page Home*/ 
      location.replace(location.origin + "/");
    }
  }
};
</script>

<style lang= "scss">
header {
  background-color: #ffffff;
}
a {
  text-decoration: none;
  color: black;
  font-weight: bold;
  &:hover {
    color: #fd2d01;
  }
}
.navbar {
  box-shadow: 0px 4px 4px -3px rgb(53 53 53 / 20%);
}
.bi-person-circle {
  color: #fd2d01;
  &:hover {
    color: black;
  }
}
@media screen and (max-width: 440px) and (min-width: 320px) {
  .navbar {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
  }
}
</style>