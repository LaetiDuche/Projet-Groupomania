<!--
Page profil de l'utilisateur
Possibilité de modifier son username et sa photo profil
Possibilité de supprimer son compte
-->

<template>
  <div class="profil">
    <div
      class="
        profil-user
        mx-auto
        my-4
        col-10 col-sm-8 col-md-6
        p-3
        rounded-3
        shadow
      "
    >
      <div class="mx-auto d-flex flex-column">
        <div>
          <h3 class="fs-5">Mon profil</h3>
        </div>

        <!--Image user-->
        <form>
          <div class="d-flex">

            <!--Visualiser la photo sélectionnée-->
            <img
              v-if="photo"
              :src="photo"
              id="preview"
              alt="image profil"
              class="img-profil img-fluid mx-auto rounded-circle mt-3 shadow"             
            />

            <!--Si l'utilisateur ne click pas pour modifier-->
            <img
              v-else
              class="img-profil img-fluid mx-auto rounded-circle mt-3 shadow"
              alt="photo profil"
              src="../assets/user-profile.jpg"
              id="preview"
            />

            <!--Bouton modifier la photo -->
            <div  @click="btnUpload" width="16" height="16" class="mt-auto">
              <label classe="label form-label mb-0 " for="photo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square mt-auto"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </label>
              <input
                class="input form-control d-none"
                id="photo"
                @change="photoSelected"
                ref="image"
                name="photo"
                type="file"
                accept="image/*"
              />
            </div>

          </div>
        </form>

        <!--Username-->
        <div class="d-flex mx-auto mt-3 text-center">
          <div class="d-flex mx-auto">
            <label class="d-flex" for="username"></label>
            <input
              v-model="username"
              id="username"
              name="username"
              type="text"
              class="text-center border-0 w-100"
              placeholder="Username"
            />

            <!--Bouton modifier le username-->
            <div width="16" height="16" class="mt-auto ms-auto" type="submit">
              <label classe="label form-label" for="username">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </label>
              <input
                class="input form-control d-none"
                id="username"
                ref="usernameUpload"
                type="text"
                name="username"
              />
            </div>
          </div>
        </div>

        <!-- Boutons -->
        <div class="d-flex justify-content-around mt-3 text-center flex-wrap">

          <!--Bouton valider mon profil-->
          <button
            class="btn btn-danger btn-sm shadow-sm mt-3"
            @click.prevent="btnValid"
            type="submit"
          >
            Valider mon profil
            <router-link to="/"></router-link>
          </button>

          <!--Bouton supprimer mon compte-->
          <button
            class="btn btn-danger btn-sm shadow-sm mt-3"
            @click="btnDelete"
            type="submit"
          >
            Supprimer mon compte
            <router-link to="/"></router-link>
          </button>
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
      photo: localStorage.getItem("photo"),
      username: localStorage.getItem("username"),
      imagePreview: null,
      User: '',
      user: ""
    };
  },
  
  methods: {

    //Affiche le profil de l'utilisateur connecté
    getProfil() {
      const id = localStorage.getItem("Id");

      fetch("http://localhost:3000/api/users/" + id, {
        headers: {
          authorization: "Bearer" + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.user = response.data;
          
        })
        .catch((err) => {
          this.error(
            "Erreur get" + err.response.status + "" + err.response.statusText
          );
          window.location.reload();
        });
    },

    /*Pour modifier l'image profil*/
    btnUpload() {
      this.$refs.image.click();
    },
    photoSelected(event) {
      this.file = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.file);
    },

    /*Pour valider les modifications*/
    btnValid() {
      const formData = new FormData();
      console.log(this.file);
      formData.append("image", this.file);
      formData.append("username", this.username);

      async function postProfil(formData) {

         const id = localStorage.getItem("Id");
        try {
          const response = await fetch(
            "http://localhost:3000/api/users/" +id,
            
            {
              method: 'PUT',
              headers: {
                /* 'Content-Type': 'multipart/form-data', */
                /* 'Content-Type': 'application/x-www-form-urlencoded', */
                'Authorization': "bearer " + localStorage.getItem('token')
              },
              body: formData,
            })

          if (response.ok) {
            const responseId = await response.json();
            /* localStorage.removeItem('photo', responseId.photo); */
            /* localStorage.setItem('photo'); */
           
           /*  this.imagePreview = '../../../backend/images/${this.photo}'
            localStorage.push('photo', responseId.photo); */

            console.log(responseId);
          } else {
            console.error("Retour du serveur : ", response.status);
          }
        } catch (e) {
          /* console.log(e); */
        }
      }
      postProfil(formData);
    },

    /*Pour supprimer le compte*/
    btnDelete() {
      const userId = parseInt(localStorage.getItem("Id"));
      const dataProfil = JSON.stringify({ id: userId });
      async function postProfil(dataProfil) {
        try {
          const response = await fetch("http://localhost:3000/api/users/:id", {
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

            this.$router.push("http://localhost:8080/");
            /* window.location.href = "http://localhost:8080/signup#/home"; */
          } else {
            console.error("Retour du serveur : ", response.status);
          }
        } catch (e) {
          /* console.log(e); */
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
.img-profil {
  object-fit: cover;
  height: 240px;
  width: 240px;
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