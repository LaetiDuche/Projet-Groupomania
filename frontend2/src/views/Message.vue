<template>
  <div class="message">

    <!--Formulaire création du message-->
    <div class="formulaire mx-auto col-10 mt-4 p-3 rounded-3 shadow">
      <h3 class="text-center mb-3">Créer un nouveau message !</h3>

      <form class="row g-2" enctype='multipart/form-data'>

        <!--Titre du message-->
        <div class="form-group">
          <label classe="form-label mb-0 " for="title">Titre du message</label>
          <input
            class="form-control"
            id="title"
            v-model="title"
            type="text"
            name="title"
            required
          />
        </div>

        <!--Téléchargement du fichier-->
        <div class="form-group mx-auto">

          <!--Bouton télécharger un fichier-->
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

          <!--Visualisation du fichier -->
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

        <!--Bouton publier-->
        <div class="text-center">
          <button
            class="btn btn-sm mt-2 btn-danger shadow-sm"
            type="submit"
            value="creer"
            v-on:click="btnPublier"
          >
            Publier
          </button>
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
      imagePreview: null,
      userId: '',
      title: '',
      gif: ''
      
    };
  },
  methods: {
    btnUpload() {
      this.$refs.gifUpload.click()
    },
    gifSelected(event) {
      this.imagePost = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.imagePost);


    },
    btnPublier() {
      /* const userId = parseInt(localStorage.getItem("Id"));*/
      const dataMessage = JSON.stringify({title: this.title, gif: this.imagePreview}); 
      async function gifForm (dataMessage){
 
        try{
          const response =  await fetch("http://localhost:3000/api/forum" , {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'authorization': 'bearer ' + localStorage.getItem('token')
            },
            body: dataMessage,
          });
          if (response.ok){
            const responseId = await response.json();
            window.location.href = " http://localhost:8080/signup/forum#";
            console.log(responseId);
          }else{
            console.error('Retour du serveur: ', response.status);
          }
        }catch(e){
          /* console.log(e); */
        }
      }
      gifForm(dataMessage);

      /*Renvoie l'utilisateur sur la page de connection*/ 
      /* window.location.href = "http://localhost:8080/signup#/login"; */
    }

  },
};
</script>

<style lang="scss">

</style>