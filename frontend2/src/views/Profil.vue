<!--
Page profil de l'utilisateur
Possibilité de modifier son username et sa photo profil
Possibilité de supprimer son compte
Affichage de toutes ses publications
-->

<template>
  <div class="profil">
    <div
      class="profil-user mx-auto col-10 col-sm-8 col-md-8 mt-4 p-3 rounded-3 shadow">
      <div class="mx-auto d-flex flex-column">

        <div>
          <h3 class="fs-5">Mon profil</h3>
        </div>

        <!--Image user-->
        <div class="d-flex">

          <!--Si l'utilisateur click pour modifier-->
          <img class="img-fluid mx-auto rounded-circle w-50 mt-3 shadow" id="preview" alt="image profil" v-if="imagePreview" :src="imagePreview"/>

          <!--Si l'utilisateur ne click pas pour modifier-->
          <img v-else class="img-fluid mx-auto rounded-circle w-50 mt-3 shadow" alt="image profil" src="../assets/user-profile.jpg"/>

          <!--Bouton icon modifier-->
          <div @click="btnUpload" width="16" height="16" class="mt-auto">
            <label classe="label form-label mb-0 " for="gif">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square mt-auto" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </label>
            <input class="input form-control d-none" id="gif" @change="gifSelected" ref="gifUpload" type="file" name="gif" accept="image/*"/>
          </div>

        </div>

        <!--Username-->
        <div class="d-flex mx-auto d-block mt-3 text-center">
          <div class="d-flex">

            <label class="" for="username"></label>
            <input v-model="username" id="username" name="username" type="text" class="d-flex text-center border-0" placeholder="Username"/>

            <!--Bouton icon modifier-->
            <div @click="btnUsername" width="16" height="16" class="mt-auto">
              <label classe="label form-label" for="username">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </label>
              <input class="input form-control d-none" id="username" ref="usernameUpload" type="text" name="username"/>
            </div>

          </div>
        </div>

        <!--Bouton supprimer mon compte-->
        <div class="d-flex justify-content-around mt-3 text-center flex-wrap">

          <!-- <button class="btn btn-danger btn-sm shadow-sm mt-3" v-on:click="btnDelete" type="submit" value="supprimer">
            Supprimer mon compte
          </button> -->

          <router-link to="/" class="btn btn-danger btn-sm shadow-sm mt-3" v-on:click="btnDelete">Supprimer mon compte</router-link>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profil",
  
  /*Modification du username*/
  data() {
    return {
      username: "",
      imagePreview: null,
    };
  },
  methods: {
    /*Pour modifier l'image profil*/
    btnUpload() {
      this.$refs.gifUpload.click();
    },
    gifSelected(event) {
      this.imagePost = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.imagePost);
    },

    /*Pour modifier l'username*/
    btnUsername() {
      const userId = parseInt(localStorage.getItem("Id"));
      const dataProfil = JSON.stringify({
        id: userId,
        username: this.username,
      });
      async function postProfil(dataProfil) {
        try {
          const response = await fetch("http://localhost:8080/api/user/:id", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: "bearer" + localStorage.getItem("token"),
            },
            body: dataProfil,
          });
          if (response.ok) {
            const responseId = await response.json();
            console.log(responseId);
          } else {
            console.error("Retour du serveur : ", response.status);
          }
        } catch (e) {
          console.log(e);
        }
      }
      postProfil(dataProfil);
    },

    /*Pour supprimer le compte*/
    btnDelete() {
      const userId = parseInt(localStorage.getItem("Id"));
      const dataProfil = JSON.stringify({ id: userId });
      async function postProfil(dataProfil) {
        try {
          const response = await fetch("http://localhost:8080/api/user/:id", {
            method: "DELETE",
            headers: {
              "content-type": "Application/json",
              authorization: "bearer" + localStorage.getItem("token"),
            },
            body: dataProfil,
          });
          if (response.ok) {
            const responseId = await response.json();
            console.log(responseId);
            localStorage.removeItem("Id");
            localStorage.removeItem("token");
            localStorage.removeItem("isAdmin");
            this.$router.push('http://localhost:8080/');
            /* window.location.href = "http://localhost:8080/signup#/home"; */
          } else {
            console.error("Retour du serveur : ", response.status);
          }
        } catch (e) {
          console.log(e);
          confirm(
            "Voulez-vous vraiment supprimer votre compte ? </br> Votre profil et toutes vos publications seront supprimés du forum !"
          );
        }
      }
      postProfil(dataProfil);
    },
  },
};
</script>

<style lang="scss">
.profil {
  background-color: #eeeeee;
}
.profil-user,
.rounded-circle {
  box-shadow: 1px 1px 15px #eeeeee;
}
.profil-user {
  background-color: #ffff;
}
p {
  font-weight: bold;
}
</style>