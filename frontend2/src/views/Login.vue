<template>
  <div class="login">
    <Header />

    <div class="formulaire col-sm-8 col-md-6  mx-3 d-block  mx-sm-auto  mx-md-auto  mt-4  p-3 rounded">
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
          <button class="btn btn-danger shadow-sm" v-on:click="btnLogin" type="submit" value="connexion">Me connecter</button>
        </div>
      </form>
    </div>
   
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Login",
  components: {
    Header,
  },
  data() {
    return {
      email: "",
      password: ""
    }
  },
   methods: {
    btnLogin(){
      const postFormulaire = JSON.stringify({email: this.email, password: this.password});
      async function logIn(dataUserConnexion){
        try{
          const response = await fetch('http://localhost:8080/api/user/login', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: dataUserConnexion,
          });
          if (response.ok){
            const responseId = await response.json();
            localStorage.setItem('Id', responseId.userId);
            localStorage.setItem('token', responseId.token);
            localStorage.setItem('isAdmin', responseId.isAdmin);
            localStorage.setItem('email', responseId.email);
            location.replace(location.origin + "/signup#/forum");
          }else{
            console.error('Retour du serveur: ', response.status);
          }
        }catch(e){
          console.log(e);
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