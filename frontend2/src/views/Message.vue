<template>
  <div class="message">
    <!-- <Header /> -->

    <div class="formulaire mx-auto col-10 mt-4 p-3 rounded-3 shadow">
      <h3 class="text-center mb-3">Créer un nouveau message !</h3>

      <!--Utilisateur-->
      <div class="d-flex pb-2">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
          class="rounded-circle me-1"
          height="40"
          alt="Avatar"
          loading="lazy"
        />
        <p class="p-1">steph</p>
      </div>

      <!--Formulaire création du message-->
      <form class="row g-2" action="">
        <!--Titre du message-->
        <div class="form-group">
          <label classe="form-label mb-0 " for="titre">Titre du message</label>
          <input
            class="form-control"
            id="titre"
            v-model="titre"
            type="text"
            required
          />
        </div>

        <!--Upload du gif-->
        <div class="form-group mx-auto">
          <button class="btn btn-sm mt-2 btn-danger shadow-sm"  @click="btnUpload">
            <label classe="label form-label mb-0 " for="gif">Ajouter un gif</label>
            <input
              class="input form-control d-none"
              id="gif"
              @change="gifSelected"
              ref="gifUpload"
              type="file"
              name="gif"
              accept="image/*"
              required
            />
          </button>

          <div  class="mx-auto text-center mt-2 border border-1 p-1"  id="gif-preview">
            <img
              v-if="imagePreview"
              :src="imagePreview"
              id="preview"
              alt="image"
              width="200"
            />
          </div>
        </div>

        <!--Bouton validation-->
        <div class="text-center">
          <button
            class="btn btn-sm mt-2 btn-danger shadow-sm"
            type="submit"
            value="creer"
          >
            Publier
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/* import Header from "@/components/Header.vue"; */
export default {
  name: "Message",
  /* components: {
    Header,
  }, */
  data() {
    return {
      imagePreview: null,
    };
  },
  methods: {
    btnUpload() {
      this.$refs.gifUpload.click();
    },
    gifSelected(event) {
      this.imagePost = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.imagePost);
    },
  },
};
</script>

<style lang="scss">
/* .label {
    cursor: pointer;
    
    font-weight: bold;
      :hover {
        color: #fd2d01;
      }
} */
</style>