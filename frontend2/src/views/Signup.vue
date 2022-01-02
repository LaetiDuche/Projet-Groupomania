<!--
Formulaire pour s'inscrire sur le forum (username, email, mot de passe)
Envoie des données au server
Redirection sur la page de connection
-->

<template>
  <div class="signup">
    <!-- <Header /> -->

     <!--Formulaire d'inscription-->
    <div class="formulaire shadow col-sm-8 col-md-6  mx-3 d-block  mx-sm-auto  mx-md-auto  mt-4  p-3 rounded">
      <h3 class="text-center mb-3">S'inscrire sur le forum</h3>

      <form class="row g-2">
        <!--Username-->
        <div class="form-group">
          <label classe='form-label mb-0' for="username">Nom utilisateur</label>
          <input class="form-control" id="username" v-model="username" type="text" required>
          <span class="d-block"></span>
        </div>

        <!--Email-->
        <div class="form-group">
          <label classe='form-label mb-0' for="email">Email</label>
          <input class="form-control" id="email" v-model="email" type="email" required>
          <span class="d-block"></span>
        </div>

        <!--Password-->
        <div class="form-group">
          <label classe='form-label mb-0' for="password">Mot de passe</label>
          <input class="form-control" autocomplete="on" id="password" v-model="password" type="password" required>
          <span class="d-block"></span>
        </div>

        <!--Bouton validation-->
        <div class="text-center">
          <button class="btn btn-sm mt-2 btn-danger shadow-sm" v-on:click="btnSignup" type="submit" value="inscription">M'inscrire</button>
        </div>
      </form>
    </div>
   
  </div>
</template>

<script>
/* import Header from "@/components/Header.vue"; */
export default {
  name: "Signup",
  /* components: {
    Header,
  }, */

  /*Envoie des données utilsateur au server*/ 
  data() {
    return {
      username: '',
      email:'',
      password: ''
    }
  },
  methods: {
    btnSignup(){
      const postFormulaire = JSON.stringify({username: this.username, email: this.email, password: this.password});
      async function signUp(postFormulaire){
 
        try{
          const response =  await fetch("http://localhost:8080/api/user/signup", {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: postFormulaire,
          });
          if (response.ok){
            const responseId = await response.json();
            console.log(responseId);
          }else{
            console.error('Retour du serveur: ', response.status);
          }
        }catch(e){
          console.log(e);
        }
      }
      signUp(postFormulaire);

      /*Renvoie l'utilisateur sur la page de connection*/ 
      window.location.href = "http://localhost:8080/signup#/login";
    }
  }
}
</script>

<style lang='scss'>
.signup {
  background-color: #eeeeee;
}
h3{
  font-weight: bold;
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