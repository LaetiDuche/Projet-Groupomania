<template>
  <div class="forum">
    <!--En-tête pour créer un message-->
    <div class="formulaire mx-auto col-10 col-md-8 col-lg-6 mt-4 p-3 rounded-3 shadow">
      <div class="d-flex mx-auto">

        <!--Utilisateur-->
        <img
          src="../assets/user-profile.jpg" 
          class="rounded-circle me-3"
          height="40"
          alt="Avatar"
          loading="lazy"
        /><!-- :src="users.photo" -->

        <!--Créer un message-->
        <div
          class="p-1 border rounded-pill text-center flex-fill"
          role="button"
        >
          <div>
            <router-link to="/message" class="p-2"
              >Publier un message ...</router-link
            >
          </div>
        </div>
      </div>
    </div>

    <!--Affichage des messages du forum-->
    <!-- <div>{{gif}}</div> -->
   
    <!-- <div>{{users}}</div> -->
    <div
      class="
        forum-publication
        formulaire
        mx-auto
        col-10 col-md-8 col-lg-6
        my-4
        p-3
        rounded-3
        shadow
      "
     v-for="gifs in gif"
      :key="gifs.id"
      
    > <!--  -->
    
      <!--v-if="id"    -->
      <div class="d-flex" >
        <!--Utilisateur-->
        <div class="my-auto">
        <img
          src="../assets/user-profile.jpg"
          class="rounded-circle  text-center"
          height="40"
          alt="avatar"
          loading="lazy"
        /><!-- :src="users.photo" -->
        </div>

        <!--Username  et date de publication-->
        <div class="d-flex flex-column ">
        <span  class="d-flex flex-column ps-3 justify-content-start" id="username">

          {{ username }}
          <span class="date fw-light "> 
            Le {{ dateFormat(gifs.createdAt) }}
          </span>

        </span>
        </div>

       <!--  <span> {{ gifs.gifs }}</span> -->

        <!--Bouton supprimer le message-->
       
        <div class="p-1 ms-auto" style="cursor: pointer" role="button" @click="btnDelete(gifs.id)"> 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </div>
       
      </div>


      <!--Le message-->
      <div >
        <p class="p-1 my-2 ">{{ gifs.title }}</p>
       <!--  <div class="mx-auto text-center mt-2 p-1">
          mon gif ici {{ gifs.gif }}
        </div> -->
        <img class="w-100 d-flex justify-content-center mt-2 " :src="gifs.gifs" />
          
      </div>

      <!--bouton Like-->
      <div class="m-1" >
        <button          
          class="btn-like bg-transparent border-0 py-auto d-flex text-align"
          type="submit"
          @click="(btnClick += 1), (click = !click)" 
        ><!-- -->

          <!--Si liker-->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-hand-thumbs-up-fill"
            viewBox="0 0 16 16"
            v-if="click === true" 
          >
           <!---->

            <path
              d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
            />
          </svg>

          <!--Si pas liker-->
          <svg
           
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-hand-thumbs-up"
            viewBox="0 0 16 16"
            v-else
          > 
            <path
              d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
            />
          </svg>

          <span class="number-like px-1">{{ btnClick }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import 'moment/locale/fr'
/* import axios from "axios" */

export default {
  name: "Forum",
  
  data() {
    return {
      isAdmin: false,
       username: localStorage.getItem("username"),
     /* 
      photo: localStorage.getItem("photo"), */
      /* userId: '',
      title:'', */
      gifs:[],
      users: [],
      gif: '',
      user: '',
      id: "",
      gifsId:"" ,
      btnClick: 0,
      click: false,
      images:''
    };
  },
    created: function(){
    fetch("http://localhost:3000/api/forum", {
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => (this.gif = data))
      .then((data) => (this.user= data));
      
  },
 
  methods: {
    getGifs() {
      const id = localStorage.getItem("gifs");

      fetch("http://localhost:3000/api/forum/" + id, {
        headers: {
          /* "Content-Type": "application/json", */
          'Authorization': "Bearer" + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.gif = response.data.gif;
          this.user = response.data.user;
        })
        .catch((err) => {
          this.error(
            "Erreur get" + err.response.status + "" + err.response.statusText
          );
          window.location.reload();
        });
    },

    //Supprimer une publication
    btnDelete(id){
      
      fetch('http://localhost:3000/api/forum/' + id, {
        method: 'DELETE',
        headers: {
          /* 'Content-Type': 'application/json', */
          'Authorization': 'Bearer' + localStorage.getItem('token'),
        }
      })
      .then(() => {
        /* this.deleteGif(); */
      })
      .catch()
       console.error('Retour du serveur: ');
        confirm("Voulez-vous vraiment supprimer ce message ?");
          window.location.reload();
      
    },


    /* btnDelete(id) {
      const gifId =  this.gifId;
      async function gifForm(dataForm) {
        try {
          const response = await fetch("http://localhost:3000/api/forum/" + id , {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              'authorization': "bearer " + localStorage.getItem("token"),
            },
            body: dataForm,
          });
          if (response.ok) {
            let responseId = await response.json();
            console.log(responseId);
            confirm("Voulez-vous vraiment supprimer ce message ?");
            location.reload();
          } else {
            console.error("Retour du serveur : ", response.status);
          }
        } catch (e) {
          console.log(e); 
        }
      }
      gifForm(gifId);
    },  */


    // Formatte la date de publication
    dateFormat(dateValue){
    if (dateValue) {   
      return moment(String(dateValue)).format('Do MMMM YYYY à HH:mm');
    }
  },
  },
};
</script>

<style lang='scss'>
.bi-trash {
  margin-right: auto;
}
.date {
  font-size: 0.6rem;
}
.bi-hand-thumbs-up-fill,
.bi-hand-thumbs-up {
  color: #fd2d01;
  margin: auto;
}
</style>