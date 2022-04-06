<!--
Header dynamique entre utilisateur non connecté (s'inscrire, se connecter) 
et utilisateur connecté (menu dropdown: profil, forum, se déconnecter)
-->

<template>
  <header class="sticky-top">
    <nav class="navbar d-flex p-2">
      <div class="mx-auto">
        <router-link to="/">
          <img
            src="../assets/icon-left-font.png"
            alt="logo"
            height="48"
            width="190"
          />
        </router-link>
      </div>

      <!--Si l'utilisateur n'est pas connecté-->
      <div class="m-auto d-flex my-auto" v-if="id === null">
        <nav class="mx-3" aria-label="s'inscrire">
          <router-link to="/signup">S'inscrire</router-link>
        </nav>

        <nav class="mx-2" aria-label="se connecter">
          <router-link to="/login">Se connecter </router-link>
        </nav>
      </div>

      <!--Si l'utilisateur est connecté-->
      <div class="dropdown dropstart m-auto" v-else aria-label="menu">
        <a
          class="btn dropdown-toggle"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >

        <PhotoUser />
          
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <router-link to="/profil" class="dropdown-item"
            aria-label="mon profil"
              >Mon profil</router-link
            >
          </li>
          <li>
            <router-link to="/forum" class="dropdown-item" aria-label="forum">Forum</router-link>
          </li>
          <li>
            <a role="button" class="dropdown-item" @click="logout" aria-label="se deconnecter">
              Se déconnecter
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import PhotoUser from "@/components/Photo-user.vue";
export default {
  name: "Header",
  components: {
    PhotoUser,
  },

  /*Changement de header si utilisateur connecté*/
  data() {
    return {
      id: '',
      userId: '',
    };
  },
  mounted() {
    let userId = localStorage.getItem("id");
    console.log(userId);
    this.id = userId;
    
  },

  /*Se déconnecter*/
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("email");
      localStorage.removeItem("photo");
      localStorage.removeItem("password");

      /*Retour à la page Home*/
      location.replace(location.origin + "/");
    },
  },
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