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
        <form action="" method="post">
          <div class="d-flex">
            <!--Visualiser la photo lors de l'upload-->
            <img
              v-if="imagePreview"
              :src="imagePreview"
              id="preview"
              alt="image profil"
              class="img-profil img-fluid mx-auto rounded-circle mt-3 shadow"
            />

            <!-- S'il n'y a pas de photo -> photo par défaut -->
            <img
              v-else-if="photo == false"
              class="img-profil img-fluid mx-auto rounded-circle mt-3 shadow"
              alt="photo profil"
              src="../assets/user-profile.jpg"
              id="preview"
            />

            <!-- Si photo dans le localstorage-->
            <img
              v-else
              :src="photo"
              id="preview"
              alt="image profil"
              class="img-profil img-fluid mx-auto rounded-circle mt-3 shadow"
            />

            <!--Bouton modifier la photo -->
            <div @click="btnUpload" width="16" height="16" class="mt-auto">
              <label classe="label form-label mb-0 " for="photo">
                <i
                  class="bi bi-box-arrow-in-down mt-auto"
                  title="Modifier ma photo"
                ></i>
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
                  <i class="bi bi-pen" title="Modifier mon nom"></i>
                </label>
                <input
                  class="input form-control d-none"
                  id="username"
                  ref="username"
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
              id="btnsubmit"
            >
              Valider mon profil</button
            ><!---->

            <!--Bouton supprimer mon compte-->
            <button
              class="btn btn-danger btn-sm shadow-sm mt-3"
              @click.prevent="btnDelete"
              type="submit"
            >
              Supprimer mon compte
              <router-link to="/"></router-link>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profil",

  data() {
    return {
      photo: localStorage.getItem("photo"),
      username: localStorage.getItem("username"),
      userId: "",
      imagePreview: null,
      id: "",
      /* User: [], */
      user: "",
    };
  },

  methods: {
    /* Pour modifier l'image profil */
    btnUpload() {
      this.$refs.image.click();
    },
    photoSelected(event) {
      this.file = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.file);
    },

    /* VALIDER LES MODIFICATIONS */

    btnValid() {
      const formData = new FormData();
      console.log(this.file);
      console.log(this.username);

      formData.append("image", this.file);
      formData.append("username", this.username);

      const newUsername = this.username;
      const newPhoto =  URL.createObjectURL(this.file);

      async function postProfil(formData) {
        const id = localStorage.getItem("id");
        
        
        try {
          const response = await fetch(
            "http://localhost:3000/api/users/" + id + "/profil",
            {
              method: "PUT",
              headers: {
                 /* 'content-type': 'application/json', */
                Authorization: "bearer " + localStorage.getItem("token"),
              },
              body: formData,
            }
          );
          
         /*  var existingPhoto = localStorage.getItem("photo");
          var data = existingPhoto ? existingPhoto + "photo" : "newphoto";
          localStorage.setItem("photo", data); */

          /* const photo = JSON.parse(localStorage.getItem("photo")); */
           /*  localStorage.setItem("photo", `photo`); */
            /* const username = JSON.parse(localStorage.getItem("username")); */
            /* localStorage.setItem("username", `username`); */


          if (response.ok) {
            const responseId = await response.json();
           
            localStorage.setItem('username', newUsername)
            
            localStorage.setItem('photo', newPhoto)
            
            console.log(responseId);
            /* location.reload(); */
          } else {
            console.error("Retour du serveur : ", response.status);
          }
        } catch (e) {
          /* console.log(e); */
        }
      }
      postProfil(formData);
    },

    /* SUPPRIMER LE COMPTE */

    btnDelete() {
      alert("Votre compte est supprimé !");
      const id = localStorage.getItem("id");
      fetch("http://localhost:3000/api/users/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(() => {
          localStorage.clear();
          location.replace(location.origin + "/");
        })
        .catch((err) => {
          console.error(
            "Erreur Delete " +
              err.response.status +
              " " +
              err.response.statusText
          );
        });
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