<template>
  <div class="message">
    <!--Formulaire création du message-->
    <div class="formulaire mx-auto col-10 mt-4 p-3 rounded-3 shadow">
      <h4 class="text-center mb-3">Créer un nouveau message !</h4>

      <form class="row g-2"  action="#" method="post">
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
          <div class="btn btn-sm mt-2 btn-danger shadow-sm" ><!--@click="btnUpload"  -->
            <label classe="label form-label mb-0 " for="gif"
              >Ajouter un gif</label
            >
            <input
              class="input form-control d-none"
              id="gif"
              @change="gifSelected"
              ref="image"
              name="gif"
              type="file"
              accept="image/*"
              required
            /> <!-- name="gif" -->
          </div>

          <!--Visualisation du fichier -->
          <div class="d-flex mx-auto text-center mt-2 p-1" id="gif-preview">
            <img
              v-if="gifPreview"
              :src="gifPreview"
              id="preview"
              alt="Responsive image"
              class="img-fluid mx-auto"
            />
          </div>
        </div>

        <!--Bouton publier-->
        <div class="text-center">
          <button
            class="btn btn-sm mt-2 btn-danger shadow-sm"
            type="submit"
            value="creer"
            @click.prevent="btnPublier"
          >
            Publier
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/* import axios from "axios";
import router from "../router"; */
export default {
  name: "Message",
  data() {
    return {
      isAdmin: false,
      gifPreview: null,
      imagePreview:'',
      gifs: [],
      title: '',
      userId:'',
      id: '',
      
    };
  },
  methods: {
   
    gifSelected(event) {
      this.file = event.target.files[0]
      this.gifPreview = URL.createObjectURL(this.file);
     
    },
      /* this.imagePost = event.target.files[0]; */
     /*  this.gifPreview = URL.createObjectURL(this.file);
    
    btnPublier() {

     if(this.title || this.file){ */

     /*  let gifData = {
        title: this.title
      } */

      /* const formData = new FormData()

      formData.append("image", this.file)
      formData.append("gif", this.gifData)
      formData.append("title", this.title)
      axios
        .post("http://localhost:3000/api/forum", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': "bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.userId = "";
          this.gifPreview = null;
          this.title = null;

          router.push({ path: "/forum" });
        })
        .catch((error) => {
          console.log(error);
        })
    }else{
      let gifData = {
        title: this.title,
      }
      axios.post('http://localhost:3000/api/forum', gifData, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "content-Type": "Application/json"
        }
      })
      .then((response) => {
        console.log(response);
        router.push({path : '/forum'});
      })
      .catch(error=>{
        console.log(error);
      })
    }

    }, */

    btnPublier() {

      const formData = new FormData();
      console.log(this.file);

      formData.append('image', this.file);
      formData.append('title', this.title);
    
      async function gifForm (formData){
 
        try{
          const response =  await fetch('http://localhost:3000/api/forum',  {
            method: 'POST',
            headers: {
              //'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'bearer ' + localStorage.getItem('token')
            },
            body: formData,
          })
          if (response.ok){
            const responseId = await response.json();
            /* window.location.href = 'http://localhost:3000/api/forum'; */
            console.log(responseId);
            
          }else{
            console.error('Retour du serveur: ', response.status);
          }
        }catch(e){
          /* console.log(e); */
              }
      }
      gifForm(formData);
    }
  },
};
</script>

<style lang="scss">
</style>