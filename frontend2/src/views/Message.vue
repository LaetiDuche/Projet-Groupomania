<!--
Page création d'un message titre + gif
Bouton Ajouter un gif
Bouton publier
-->

<template>
  <!-- Formulaire création du message -->
  <div class="message">
    <div
      class="
        formulaire
        mx-auto
        col-11 col-md-10 col-lg-6
        mt-5
        p-3
        shadow
      "
    >
      <h3 class="text-center my-3 fs-5">Publier un nouveau message !</h3>

      <form class="row g-2 mt-2" action="" method="post" aria-label="formulaire">
        <!-- Titre du message -->
        <div class="form-group">
          <label classe="form-label" for="title">Titre du message</label>
          <input
            class="form-control mt-2"
            id="title"
            v-model="title"
            type="text"
            name="title"
            minlength="2"
          />
        </div>

        <div class="mt-3 mx-auto justify-content-center">
          <!-- Bouton Ajouter un gif -->

          <div class="upload">
            <button class="btn bouton" aria-label="upload gif">
              <i class="fa fa-upload"></i>
              <label for="gif">Ajouter un gif</label>
              <input
                id="gif"
                @change="gifSelected"
                ref="image"
                name="gif"
                type="file"
                accept="image/*"
                required
              />
            </button>
            <div class="d-flex mx-auto text-center mt-2 p-1" id="gif-preview">
              <img
                v-if="gifPreview"
                :src="gifPreview"
                id="preview"
                alt="preview gif"
                class="img-fluid mx-auto"
              />
            </div>
          </div>

          <!-- Bouton Publier -->
          <div class="text-center">
            <button
              class="btn btn-sm mt-2 bouton "
              type="submit"
              value="creer"
              aria-label="publier"
              @click.prevent="btnPublier"
            >
              Publier
            </button>
          </div>

          <!-- Message d'erreur -->
          <span
            class="d-block small text-danger mt-2"
            aria-label="erreur"
            role="alert"
          ></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      isAdmin: false,
      gifPreview: null,
      imagePreview: "",
      gifs: [],
      Gif: "",
      title: "",
      userId: "",
      user: [],
      Users: [],
      User: "",
      id: "",
    };
  },
  methods: {
    //--- POUR UPLOADER LE GIF

    gifSelected(event) {
      this.file = event.target.files[0];
      this.gifPreview = URL.createObjectURL(this.file);
    },

    //--- BOUTON PUBLIER LE MESSAGE

    btnPublier() {
      const formData = new FormData();

      formData.append("image", this.file);
      formData.append("title", this.title);

      async function gifForm(formData) {
        try {
          const response = await fetch("http://localhost:3000/api/forum", {
            method: "POST",
            headers: {
              Authorization: "bearer " + localStorage.getItem("token"),
            },
            body: formData,
          });
          if (response.ok) {
            const responseId = await response.json();
            alert("Votre message a été publié !");
            window.location.href = "http://localhost:8080/#/forum";
            console.log(responseId);
          } else {
            console.error("Retour du serveur: ", response.status);

            let span = document.getElementsByTagName("span");
            span[0].innerText = "Veuillez ajouter un gif !";
          }
        } catch (e) {
          /* console.log(e); */
        }
      }
      gifForm(formData);
    },
  },
};
</script>

<style lang='scss'>
.message{
  border-radius: 15px;
}
.bouton {
  position: relative;
  font-size: 15px;
  line-height: 1.5;
  border-radius: 25px;
  color: #fff;
  background-color: #fd2d01;
  border: 0;
  transition: 0.2s;
  overflow: hidden;
}
.bouton input[type="file"] {
  cursor: pointer;
  position: absolute;
  left: 0%;
  top: 0%;
  transform: scale(3);
  opacity: 0;
}

.bouton:hover {
  outline-color: #fd2d01;
  border-style: solid;
  border-width: 1px;
}
</style>