<template>
  <div class="forum">

    <!--En-tête pour créer un message-->
    <div class="formulaire  mx-auto col-10 mt-4 p-3 rounded-3 shadow">

        <div class="d-flex mx-auto">

          <!--Utilisateur-->
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
            class="rounded-circle me-3"
            height="40"
            alt="Avatar"
            loading="lazy"/>

          <!--Créer un message-->
          <div class="  p-1 border rounded-pill  text-center flex-fill" role="button">
            <div>
              <router-link to="/message" class="p-2">Publier un message ...</router-link>
            </div>
          </div> 
        </div>

    </div>

    <!--Affichage des messages du forum-->
    <div class="forum-publication formulaire mx-auto col-10 mt-4 p-3 rounded-3 shadow" v-for="(gif, id) in gifs" v-bind:key="id"><!--v-if="id"-->
      <div class="d-flex" >

        <!--Utilisateur-->
        <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
            class="rounded-circle me-1"
            height="40"
            alt="Avatar"
            loading="lazy"/>

        <p class=" p-1 text-center">username</p>

        <!--Bouton supprimer le message-->
        <div class="p-1 ms-auto" role="button" v-on:click="btnDelete">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </div>
       
      </div>

      <!--Date de publication du message-->
      <div>
        <p class="date fw-light" >Publié le : {{gif.updatedAt}}</p>
      </div>

      <!--Le message-->
      <div class="border rounded">
        <p class="p-1 mb-0">Mon premier titre{{gif.title}}</p>
        <div class="mx-auto text-center mt-2 p-1">Mon premier gif{{gif.gif}}</div>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  name: "Forum",
  data(){
    return {
      gifs: [],
      
    }
  },
  mounted(){
    fetch("http://localhost:3000/api/forum",  {
      headers: {
        'authorization': 'bearer ' + localStorage.getItem('token')
    }})
      .then (response => response.json())
      .then(data=>this.gifs = data)
  },
  btnDelete(){
    const gifId = JSON.stringify({id: this.gifId});
    async function gifForm(dataForm){
      try{
        const response = await fetch("http://localhost:3000/api/forum",{
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + localStorage.getItem('token')
          },
           body: dataForm
         });
         if (response.ok){
            let responseId = await response.json();
            console.log(responseId)
            location.reload();
         }else{
           console.error('Retour du serveur : ', response.status);
         }
       }catch (e){
         /* console.log(e); */
       }
     }
     gifForm(gifId);
  }
};

</script>

<style lang='scss'>
.bi-trash{
  margin-right: auto;
}
.date{
  font-size: 0.8rem;
}

</style>