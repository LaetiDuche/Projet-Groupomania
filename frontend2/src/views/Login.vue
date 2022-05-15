<!--
Page login
Formulaire login (email, mot de passe)
Création de la session utilisateur sécurisée et redirection sur le forum
-->

<template>
  <div class="login">
    <div
      class="
        formulaire
        shadow
        col-11 col-md-10 col-lg-6
        mx-auto
        my-3 my-sm-4
        p-3
      "
    >
      <h3 class="text-center mt-3 mb-4 fs-5">Se connecter</h3>

      <!-- Formulaire de connexion -->
      <form class="row g-2" @submit.prevent="btnLogin" aria-label="formulaire">
        <!-- Email -->
        <div class="form-group">
          <label classe="form-label mb-0" for="email">Email</label>
          <input
            class="form-control"
            id="email"
            v-model="email"
            type="email"
            name="email"
            required
          />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label classe="form-label mb-0" for="password">Mot de passe</label>
          <input
            class="form-control"
            id="password"
            v-model="password"
            type="password"
            name="password"
            required
          />
        </div>

        <!-- Message d'erreur -->
        <span
          class="d-block small text-danger"
          role="alert"
          aria-label="erreur"
        ></span>

        <!-- Bouton se connecter -->
        <div class="text-center">
          <button
            class="btn btn-sm my-2 bouton"
            type="submit"
            value="connexion"
            aria-label="se connecter"
          >
            Me connecter
          </button>
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
      password: "",
    };
  },
  methods: {
    //--- BOUTON SE CONNECTER

    btnLogin() {
      const dataUserConnexion = JSON.stringify({
        email: this.email,
        password: this.password,
      });
      async function logIn(dataUserConnexion) {
        try {
          const response = await fetch(
            "http://localhost:3000/api/users/login",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: dataUserConnexion,
            }
          );
          if (response.ok) {
            const responseId = await response.json();
            localStorage.setItem("id", responseId.userId);
            localStorage.setItem("token", responseId.token);
            localStorage.setItem("isAdmin", responseId.isAdmin);
            localStorage.setItem("email", responseId.email);
            localStorage.setItem("username", responseId.username);
            localStorage.setItem("photo", responseId.photo);

            window.location.href = "http://localhost:8080/#/forum";
            location.reload();
          } else {
            console.error("Retour du serveur: ", response.status);

            let span = document.getElementsByTagName("span");
            span[0].innerText = "Email ou mot de passe incorrecte !";
          }
        } catch (e) {
          console.log(e);
        }
      }
      logIn(dataUserConnexion);
    },
  },
};
</script>

<style lang='scss'>
.login {
  background-color: #eeeeee;
  border-radius: 20px;
}
h3 {
  font-weight: bold;
}
.formulaire {
  background-color: #ffffff;
}
/* :focus {
    outline: 2px solid red;   
} */
.form-control:focus {
  border-color: #fd2d01;
  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.5);
}
</style>