<!--
Page profil de l'utilisateur
Possibilité de modifier son username et sa photo profil
Possibilité de supprimer son compte par l'utilisateur seulement
-->

<template>
  <div class="profil">
    <div
      class="
        profil-user
        mx-auto
        my-3 my-sm-4
        col-11 col-md-10 col-lg-6
        p-3
        shadow
      "
    >
      <div class="mx-auto d-flex flex-column">
        <div>
          <h3 class="fs-5 my-2 text-center">Mon profil</h3>
        </div>

        <!-- Image user -->
        <form action="" method="post">
          <div class="d-flex mx-auto justify-content-center">
            <!-- Visualiser la photo lors de l'upload -->
            <img
              v-if="imagePreview"
              :src="imagePreview"
              id="preview"
              alt="photo"
              class="img-profil img-fluid rounded-circle mt-3 shadow"
            />

            <!-- S'il n'y a pas de photo => photo par défaut -->
            <img
              v-else-if="photo == false"
              class="img-profil img-fluid rounded-circle mt-3 shadow"
              alt="photo"
              src="../assets/user-profile.jpg"
              id="localPhoto"
            />

            <!-- Si photo dans le localstorage-->
            <img
              v-else
              :src="photo"
              id="preview"
              alt="photo"
              class="img-profil img-fluid rounded-circle mt-3 shadow"
            />

            <!-- Bouton uploader la photo -->
            <div @click="btnUpload" class="upload mt-auto">
              <button
                type="button"
                class="btn btn-light btn-danger p-0"
                aria-label="upload photo"
              >
                <i class="bi bi-camera-fill"></i>
                <label for="photo"></label>
                <input
                  id="photo"
                  @change="photoSelected"
                  ref="image"
                  name="photo"
                  type="file"
                  accept="image/*"
                  class="form-control"
                  aria-label="upload photo"
                />
              </button>
            </div>
          </div>

          <!-- Username -->
          <div class="d-flex mx-auto text-center">
            <div class="d-flex mx-auto mt-3 text-center">
              <label class="d-flex" for="username1"></label>
              <input
                v-model="username"
                id="username1"
                name="username1"
                type="text"
                class="form-control text-center border-0 w-100 rounded-1 input"
                placeholder="Username"
                aria-label="username"
              />

              <!-- Bouton modifier le username -->

              <div
                width="16"
                height="16"
                class="my-auto ms-auto"
                type="submit"
                aria-label="modifier username"
              >
                <label classe="label form-label" for="username2">
                  <i
                    class="bi bi-pen-fill new-username"
                    title="Modifier mon nom"
                  ></i>
                </label>
                <input
                  class="form-control d-none"
                  id="username2"
                  ref="username"
                  type="text"
                  name="username2"
                  aria-label="modifier username"
                />
              </div>
            </div>
          </div>

          <!-- Boutons -->
          <div class="col-12 d-flex my-3 justify-content-center flex-wrap">
            <!-- Bouton valider mon profil -->
            <button
              class="btn bouton btn-sm  mt-3 me-2"
              @click.prevent="btnValid"
              type="submit"
              id="btnsubmit"
              aria-label="valider profil"
            >
              Valider mon profil
            </button>

            <!-- Bouton supprimer mon compte -->
            <router-link to="/" name="retour accueil">
              <button
                class="btn bouton btn-sm mt-3"
                @click.prevent="btnDelete"
                type="submit"
                aria-label="supprimer compte"
              >
                Supprimer mon compte
              </button>
            </router-link>
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
      user: "",
      User: [],
    };
  },

  methods: {
    //------ AFFICHE LE PROFIL USER CONNECTÉ

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

    //---- MODIFIER L'IMAGE PROFIL

    btnUpload() {
      this.$refs.image.click();
    },
    photoSelected(event) {
      this.file = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.file);
    },

    //---- BOUTON VALIDER LE PROFIL

    btnValid() {
      const formData = new FormData();

      formData.append("image", this.file);
      formData.append("username", this.username);

      async function postProfil(formData) {
        const id = localStorage.getItem("id");

        try {
          const response = await fetch(
            "http://localhost:3000/api/users/" + id + "/profil",
            {
              method: "PUT",
              headers: {
                Authorization: "bearer " + localStorage.getItem("token"),
              },
              body: formData,
            }
          );
          if (response.ok) {
            const responseId = await response.json();

            localStorage.setItem("username", responseId.username);
            localStorage.setItem("photo", responseId.photo);

            alert("Votre profil a été modifié !");
            location.reload();
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

    //--- BOUTON SUPPRIMER LE COMPTE USER => SUPPRIME LE PROFIL, TOUS LES GIFS ET LES COMMENTAIRES DU USER

    btnDelete() {
      const id = localStorage.getItem("id");

      if (confirm("Voulez-vous supprimer ce compte ?")) {
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
      }
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
  height: 230px;
  width: 230px;
}
.profil-user,
.rounded-circle {
  box-shadow: 1px 1px 15px #eeeeee;
}
.profil-user {
  background-color: #ffff;
  border-radius: 20px;
}
p {
  font-weight: bold;
}

// bouton upload photo
.btn-light {
  position: relative;
  font-size: 20px;
  color: #fff;
  background-color: transparent;
  border: 0;
  &:focus {
    border-style: solid;
    border-width: 1px;
    border-color: #fd2d01;
  }
  transition: 0.2s;
  overflow: hidden;
}
.btn-light input[type="file"] {
  cursor: pointer;
  position: absolute;
  left: 0%;
  top: 0%;
  transform: scale(3);
  opacity: 0;
}
.new-username {
  cursor: pointer;
}
</style>