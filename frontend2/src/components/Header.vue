<!--
Header dynamique entre utilisateur non connecté (s'inscrire, se connecter)et utilisateur connecté 
Si utilisateur connecté => menu dropdown photo-user avec liens profil, forum, se déconnecter
-->

<template>
  <header class="sticky-top">
    <nav class="navbar d-flex py-0">
      <div class="logo mx-auto">
        <nav class="nav-link py-0">
          <router-link to="/" class="btn">
            <button class="btn">
              <img
                src="../assets/icon-left-font.png"
                alt="logo"
                height="48"
                width="190"
              />
            </button>
          </router-link>
        </nav>
      </div>

      <!-- Si l'utilisateur n'est pas connecté -->
      <nav class="m-auto d-flex" v-if="id === null">
        <router-link to="/signup" aria-label="s'inscrire">
          <button class="btn mx-3">S'inscrire</button>
        </router-link>

        <router-link to="/login" aria-label="se connecter">
          <button class="btn mx-2">Se connecter</button>
        </router-link>
      </nav>

      <!-- Si l'utilisateur est connecté => menu photo-user -->
      <div class="dropdown dropstart m-auto" v-else aria-label="menu">
        <button
          class="dropdown-toggle btn"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <PhotoUser />
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <router-link to="/profil" class="dropdown-item" aria-label="profil">
            <button class="btn">Mon profil</button>
          </router-link>

          <router-link to="/forum" class="dropdown-item" aria-label="forum">
            <button class="btn">Forum</button>
          </router-link>

          <router-link to="/" class="dropdown-item" aria-label="se deconnecter">
            <button class="btn" @click="logout">Se déconnecter</button>
          </router-link>
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
      id: "",
      userId: "",
    };
  },
  mounted() {
    let userId = localStorage.getItem("id");
    this.id = userId;
  },

  // ---- LIEN SE DECONNECTER
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