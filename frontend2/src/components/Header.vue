<template>
  <div>
    <b-navbar class="d-flex p-2">
      <b-navbar-brand class="mx-auto">
        <router-link to="/"
          ><img
            src="../assets/icon-left-font.png"
            alt="logo"
            height="48"
            width="190"
        /></router-link>
      </b-navbar-brand>

      <!--Si l'utilisateur n'est pas connecté-->
      <b-navbar-nav class="m-auto ms-md-auto my-auto" v-if="id === null">
        <b-nav-item class="mx-3 justify-content-lg-end" href="#">
          <router-link to="/signup">S'inscrire</router-link>
        </b-nav-item>
        <b-nav-item class="mx-2 justify-content-lg-end" href="#">
          <router-link to="/login">Se connecter </router-link>
          <router-link to="/profil">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            </router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!--Si l'utilisateur est connecté-->
      <b-navbar-nav class="m-auto ms-md-auto my-auto" v-else>
        <b-nav-item class="mx-3 justify-content-lg-end" href="#">
          <router-link to="/forum">Forum</router-link>
        </b-nav-item>
        <b-nav-item class="mx-2 justify-content-lg-end" href="#">
          <router-link to="/profil">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      id: "",
    };
  },
  mounted() {
    let idUser = localStorage.getItem("Id");
    console.log(idUser);
    this.id = idUser;
  },
};
</script>

<style lang= "scss">
div {
  background-color: #ffffff;
}
a {
  text-decoration: none;
  color: black;
  font-weight: bold;
    &:hover{
      color: #fd2d01;
    }
}
/* a:hover {
  color: #fd2d01;
} */
b-navbar {
  box-shadow: 0px 4px 4px -3px rgb(53 53 53 / 20%);
}
.bi-person-circle{
  color: #fd2d01;
    &:hover{
      color: black;
    }
}
@media screen and (max-width: 440px) and (min-width: 320px) {
  b-navbar {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
  }
}
</style>