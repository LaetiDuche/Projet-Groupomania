<!--
Formulaire pour s'inscrire sur le forum (username, email, mot de passe)
Envoie des données au server
Redirection sur la page login
-->

<template>
  <div class="signup">
    <!--Formulaire d'inscription-->
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
      <h3 class="text-center mt-3 mb-4 fs-5">S'inscrire sur le forum</h3>

      <form class="row g-2" @submit.prevent="SignUp" aria-label="formulaire">
        <!-- Username -->
        <div class="form-group">
          <label classe="form-label mb-0" for="username">Nom utilisateur</label>
          <input
            class="form-control"
            id="username"
            v-model="username"
            type="text"
            minlength="3"
            maxlength="20"
            name="username"
            required
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label classe="form-label mb-0" for="email">Email</label>
          <input
            class="form-control"
            id="email"
            v-model="email"
            type="email"
            minlength="10"
            maxlength="40"
            name="email"
            required
          />
        </div>

        <!-- Message d'erreur (email unique) -->
        <span
          class="d-block small text-danger"
          role="alert"
          aria-label="erreur email"
        ></span>

        <!-- Password -->
        <div class="form-group">
          <label classe="form-label mb-0" for="password">Mot de passe</label>
          <input
            class="form-control"
            autocomplete="on"
            id="password"
            v-model="password"
            type="password"
            minlength="5"
            maxlength="13"
            name="password"
            required
          />
        </div>

        <!-- Bouton validation , redirection vers page login -->
        <div class="text-center">
          <button
            class="btn bouton btn-sm mt-3 mb-2"
            type="submit"
            value="inscription"
            aria-label="s'inscrire"
          >
            M'inscrire
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",

  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    //---- BOUTON S'INSCRIRE

    SignUp() {
      const postFormulaire = JSON.stringify({
        username: this.username,
        email: this.email,
        password: this.password,
        isAdmin: this.isAdmin,
      });
      async function signUp(postFormulaire) {
        try {
          const response = await fetch(
            "http://localhost:3000/api/users/signup",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: postFormulaire,
            }
          );
          if (response.ok) {
            const responseId = await response.json();
            console.log(responseId);

            window.location.href = "http://localhost:8080/#/login";
          } else {
            console.error("Retour du serveur: ", response.status);

            let span = document.getElementsByTagName("span");
            span[0].innerText = "Cet email existe déjà !";
          }
        } catch (e) {
          /* console.log(e); */
        }
      }
      signUp(postFormulaire);
    },
  },
};
</script>

<style lang='scss'>
.signup {
  background-color: #eeeeee;
}
.formulaire, .form-control{
  border-radius: 20px;
}
h3 {
  font-weight: bold;
}
.bouton {
  border-color: #fd2d01;
  background-color: #fd2d01;
  color: #ffffff;
  font-weight: bold;
  border-radius: 2.1rem;
  padding: 0.5rem 1rem;
  box-shadow: 0px 7px 7px 0px rgba(51, 47, 23, 0.15);
  &:hover {
    background-color: #ffffff;
    color: #fd2d01;
    border-color: #fd2d01;
  }
}
</style>