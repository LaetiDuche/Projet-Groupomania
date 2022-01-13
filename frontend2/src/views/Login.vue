<!--
Page pour se connecter au forum
Formulaire de connection (email, mot de passe)
Création de la session utilisateur sécurisée et redirection sur le forum
-->

<template>
  <div class="login">

    <div class="formulaire shadow col-sm-8 col-md-6  mx-3 d-block  mx-sm-auto  mx-md-auto  mt-4  p-3 rounded">
      <h3 class="text-center mb-3">Se connecter</h3>

      <!--Formulaire de connexion-->
      <form class="row g-2">

        <!--Email-->
        <div class="form-group">
          <label classe='form-label mb-0' for="email">Email</label>
          <input class="form-control" id="email" v-model="email" type="email" required>
          <span class="d-block"></span>
        </div>

        <!--Password-->
        <div class="form-group">
          <label classe='form-label mb-0' for="password">Mot de passe</label>
          <input class="form-control" id="password" v-model="password" type="password" required>
          <span class="d-block"></span>
        </div>

        <!--Bouton connexion-->
        <div class="text-center">
          <button class="btn btn-sm mt-2 btn-danger shadow-sm" v-on:click="btnLogin" type="submit" value="connexion">Me connecter</button>
        </div>
      </form>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: ""
    }
  },
   methods: {
    btnLogin(){
      /*Vérification des données utilisateur */
      const postFormulaire = JSON.stringify({email: this.email, password: this.password});
      async function logIn(dataUserConnexion){
        try{
          const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: dataUserConnexion,
          });
          /*Ouverture de la session utilisateur sécurisée*/ 
          if (response.ok){
            const responseId = await response.json();
            localStorage.setItem('Id', responseId.userId);
            localStorage.setItem('token', responseId.token);
            localStorage.setItem('isAdmin', responseId.isAdmin);
            localStorage.setItem('email', responseId.email);
            localStorage.setItem('username', responseId.username);
            localStorage.setItem('photo', responseId.photo);

            /*Redirection sur le forum*/ 
            /* this.$router.push("forum"); */
            location.replace(location.origin + "#/forum");
          }else{
            console.error('Retour du serveur: ', response.status);
          }
        }catch(e){
          /* console.log(e); */
        }
      }
      logIn(postFormulaire);
    }
  }
}
</script>

<style lang='scss'>
.login {
  background-color: #eeeeee;
}
h3{
  font-weight: bold;
}
.formulaire {
  background-color: #ffffff;
}

</style>