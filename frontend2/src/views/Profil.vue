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
            <!--Visualiser la photo enregistrée-->
            <img
              v-if="photo"
              :src="photo"
              id="preview"
              alt="image profil"
              class="img-profil img-fluid mx-auto rounded-circle mt-3 shadow"
            />

            <!--Si l'utilisateur n'a jamais modifier sa photo-->
            <img
              v-else
              class="img-profil img-fluid mx-auto rounded-circle mt-3 shadow"
              alt="photo profil"
              src="../assets/user-profile.jpg"
              id="preview"
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
                <i class="bi bi-pen" title="Modifier mon nom"></i>
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
            <!-- <router-link to="/"></router-link> -->
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
      userId: "",
      imagePreview: null,
      user: [],
      id: "",
    };
  },

  methods: {
    //Affiche le profil de l'utilisateur connecté
    getProfil() {
      const id = localStorage.getItem("id");

      fetch("http://localhost:3000/api/users/" + id, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
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
      /* const postFormulaire = JSON.stringify({photo: this.photo, username: this.username}); */
      const formData = new FormData();
      console.log(this.file);
      formData.append("image", this.file);
      formData.append("username", this.username);

      /* const photo = JSON.parse({photo: this.photo}); */
      /* const photo = localStorage.getItem('photo'); */
      async function postProfil(formData) {
        const id = localStorage.getItem("id");
        try {
          const response = await fetch(
            "http://localhost:3000/api/users/" + id,

            {
              method: "PUT",
              headers: {
                /* 'Content-Type': 'multipart/form-data', */
                /* 'Content-Type': 'application/x-www-form-urlencoded', */
                Authorization: "bearer " + localStorage.getItem("token"),
              },
              body: formData,
            }
          );

          if (response.ok) {
            const responseId = await response.json();

            /* localStorage.remove('photo', responseId.photo);  */
            /* const photoProfil = localStorage.getItem('photo'); */

            /* localStorage.removeItem('photo');
            localStorage.setItem('photo'); */

            /*  localStorage.setItem('photo', responseId.photo);
            
            localStorage.setItem('username', responseId.username); */
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