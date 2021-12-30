<!--
Page profil de l'utilisateur
Possibilité de modifier son username et sa photo profil
Possibilité de supprimer son compte
Affichage de toutes ses publications
-->

<template>
  <div class="profil">

    <Header />
    <div class=" profil-user mx-auto col-10 col-sm-8 col-md-8 mt-4 p-3 rounded-3 shadow">

      
      <div class="mx-auto d-flex flex-column">

         <!--Modifier-->
        <div class="col-12">
          <button class="btn btn-sm" type="submit" v-on:click="modify" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </button>
        </div>

        <!--Image user-->
        <img class="img-fluid mx-auto rounded-circle w-50" src="../assets/icon-above-font.png" alt=""/><!--Ajouter multer-->

        <!--Username-->
        <div class="mx-auto d-block mt-3 text-center">
          <span class="fw-bold">Prénom{{ username.username }}</span>
        </div>

      </div>

     <!--  <div class="mb-3">
        <label for="modif">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        </label>
        <input  id="modif" type="file">
      </div> -->

    
    
      
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "Profil",
  components: {
    Header,
  },
  /*Modification du username*/ 
  data() {
    return {
      username: "",
      photoProfil: "",
    }
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
.profil-user{
  background-color: #ffff;
}
p {
  font-weight: bold;
}

</style>