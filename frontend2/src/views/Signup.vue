<template>
  <div class="signup">
    <Header />

    <div class="formulaire col-sm-8 col-md-6  mx-3 d-block  mx-sm-auto  mx-md-auto  mt-4  p-3 rounded">
      <h3 class="text-center mb-3">S'inscrire sur le forum</h3>

      <!--Formulaire d'inscription-->
      <form class="row g-2" action="">
        <!--Username-->
        <div>
          <label classe='form-label mb-0' for="username">Nom utilisateur</label>
          <input class="form-control" v-model="username" type="text" required>
          <span class="d-block"></span>
        </div>

        <!--Email-->
        <div>
          <label classe='form-label mb-0' for="email">Email</label>
          <input class="form-control" v-model="email" type="email" required>
          <span class="d-block"></span>
        </div>

        <!--Password-->
        <div>
          <label classe='form-label mb-0' for="password">Mot de passe</label>
          <input class="form-control" v-model="password" type="password" required>
          <span class="d-block"></span>
        </div>

        <!--Bouton validation-->
        <div class="text-center">
          <button class="btn btn-danger shadow-sm" type="submit" value="inscription">M'inscrire</button>
        </div>
      </form>
    </div>
   
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "Signup",
  components: {
    Header,
  },
  computed: {
    state() {
      return this.username.length >= 4;
    },
    invalidFeedback() {
      if (this.username.length > 0) {
        return "Enter at least 4 characters.";
      }
      return "Please enter something.";
    },
  },
  data() {
    return {
      username: "",
    };
  },
};
</script>

<style lang='scss'>
.signup {
  background-color: #fdf7f7;
}
h3{
  font-weight: bold;
}
.formulaire {
  box-shadow: 2px 2px 12px lightgrey;
}
.btn-danger{
  border-color: #fd2d01;
  background-color: #fd2d01;
  color: #ffffff;
  font-weight: bold;
    &:hover{
      background-color: #ffffff;
      color: #fd2d01;
      border-color: #fd2d01;
    }
      
}
</style>