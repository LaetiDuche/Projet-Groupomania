<template>
  <div class="forum">
    <!--En-tête pour créer un message-->
    <div
      class="
        formulaire
        mx-auto
        col-11 col-md-8 col-lg-6
        p-3
        my-3 my-sm-4
        rounded-3
        shadow
      "
    >
      <div class="d-flex mx-auto">
        <!--Utilisateur-->
        <img
          v-if="userId === 'true' || photo"
          :src="photo"
          class="rounded-circle me-3 shadow"
          height="40"
          alt="Avatar"
          loading="lazy"
        />
        <img
          v-else
          src="../assets/user-profile.jpg"
          class="rounded-circle me-3 shadow"
          height="40"
          alt="avatar"
          loading="lazy"
        />

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
    <div
      class="
        forum-publication
        formulaire
        mx-auto
        col-11 col-md-8 col-lg-6
        my-3 my-sm-4
        rounded-3
        shadow
        pb-1
      "
      v-for="gifs in Gif"
      :key="gifs.id"
    >
      <div class="d-flex px-3 py-3">
        <!--Utilisateur-->
        <div class="my-auto">
          <img
            v-if="gifs.User.photo"
            :src="gifs.User.photo"
            class="rounded-circle text-center shadow"
            height="40"
            alt="avatar"
            loading="lazy"
          />
          <img
            v-else
            class="rounded-circle shadow"
            height="40"
            alt="photo profil"
            loading="lazy"
            src="../assets/user-profile.jpg"
            id="preview"
          />
        </div>

        <!--Username et date de publication-->
        <div class="d-flex flex-column px-3">
          <span
            class="d-flex flex-column justify-content-start fw-bold"
            id="username"
          >
            {{ gifs.User.username }}

            <span class="date fw-light">
              Le {{ dateFormat(gifs.createdAt) }}
            </span>
          </span>
        </div>

        <!-- Bouton supprimer le message pour l'admin et l'utilisateur-->
        <div
          class="p-1 ms-auto"
          style="cursor: pointer"
          role="button"
          v-if="userId == gifs.userId || isAdmin === 'true'"
          @click="btnDelete(gifs.id)"
        >
          <i class="bi bi-trash"></i>
        </div>
      </div>

      <!--Titre et gif du message-->
      <div>
        <p class="px-3">{{ gifs.title }}</p>
        <img class="w-100 d-flex justify-content-center" :src="gifs.gifs" />
      </div>

      <!--Boutons Like/dislike-->

      <div class="m-1 d-flex justify-content-end">

        <!--Like-->
        <button
          class="btn-like bg-transparent border-0 py-auto d-flex text-align"
          type="submit"
          @click="btnLike(gifs.id), (likeChange = !likeChange)"
        >
          <i class="bi bi-hand-thumbs-up-fill" v-if="likeChange === true"></i>
          <i class="bi bi-hand-thumbs-up" v-else></i>

          <span class="number-like px-1">{{ likes }}</span>
        </button>

        <!--Dislike-->
        <button
          class="btn-like bg-transparent border-0 py-auto d-flex text-align"
          type="submit"
          @click="btnDislike(gifs.id) , (dislikeChange = !dislikeChange)"
          
        >
          <i class="bi bi-hand-thumbs-down-fill" v-if="dislikeChange === true"></i>
          <i class="bi bi-hand-thumbs-down" v-else></i>

          <span class="number-like px-1" >{{ dislikes }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/fr";

export default {
  name: "Forum",

  data() {
    return {
      isAdmin: "",
      userId: "",
      gifId: "",
      photo: localStorage.getItem("photo"),
      gifs: "",
      Gif: [],
      users: "",
      User: [],
      /* like: [],
      likes: "", */
      /*  Comments: [],
      comments: "", */
      id: "",
      /* btnClick1: 0,
      btnClick2: 0, */
      likeChange: false,
      dislikeChange: false,
      clickDislike: false,
      likes: "",
      /* likes: [], */
      usersLiked: [],
      usersDisliked: [],
      dislikes: "",
      images: "",
      likesChange: 0,
      dislikesChange:0,
    };
  },
  created: function () {
    fetch("http://localhost:3000/api/forum", {
      headers: {
        "Content-Type": "application/json",
        'authorization': "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((gifs) => (this.Gif = gifs))
      /*  .then((comments) => (this.Comment = comments)) */
      .then((users) => (this.User = users))
      .then((likes) => (this.Like = likes))
      .then((dislikes) => (this.Like = dislikes));

    /* console.log("Front like");
    fetch("http://localhost:3000/api/forum/${id}/like" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      this.Like = response.likes
      this.Like = response.dislikes;
    }) */

     /* .then((response) => response.json())
      .then((likes) => (this.Like = likes))
      .then((dislikes) => (this.Like = dislikes)); */
      
  },

  mounted() {
    this.isAdmin = localStorage.getItem("isAdmin");
    console.log(this.isAdmin);
  },

  methods: {
    //Supprimer une publication
    btnDelete(id) {
      let gifId = JSON.stringify({ id: this.gifId });
      async function gifForm(dataForm) {
        confirm("Voulez-vous vraiment supprimer ce message ?");
        try {
          const response = await fetch(
            "http://localhost:3000/api/forum/" + id,
            {
              method: "DELETE",
              headers: {
                "content-type": "application/json",
                authorization: "bearer " + localStorage.getItem("token"),
              },
              body: dataForm,
            }
          );
          if (response.ok) {
            let responseId = await response.json();
            console.log(responseId);
            location.reload();
          } else {
            console.error("Retour du serveur : ", response.status);
          }
        } catch (e) {
          /* console.log(e);  */
        }
      }
      gifForm(gifId);
    },

    // Formatte la date de publication
    dateFormat(dateValue) {
      if (dateValue) {
        return moment(String(dateValue)).format("Do MMMM YYYY à HH:mm");
      }
    },

    // Bouton like/dislike
    btnLike(id){
      const postLike = JSON.stringify({like: this.like});
      async function like(postLike){
        try{
          const response =  await fetch("http://localhost:3000/api/forum/like/" + id , {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Authorization': "Bearer " + localStorage.getItem("token"),
            },
            body: postLike, 
          });
          if (response.ok){
            const responseId = await response.json();
            console.log(responseId);
            console.log("like ok");
          }else{
            console.error('Retour du serveur: ', response.status);
          }
        }catch(e){
          /* console.log(e); */
        }
      }
      like(postLike);
    },


     btnDislike(id){
      const postDislike = JSON.stringify({dislike: this.dislike});
      async function like(postDislike){
        try{
          const response =  await fetch("http://localhost:3000/api/forum/like/" + id , {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Authorization': "Bearer " + localStorage.getItem("token"),
            },
            body: postDislike, 
          });
          if (response.ok){
            const responseId = await response.json();
            console.log(responseId);
            console.log("dislike ok");
          }else{
            console.error('Retour du serveur: ', response.status);
          }
        }catch(e){
          /* console.log(e); */
        }
      }
      like(postDislike);
    }




    /*  getComments (){
      console.log("Front comment")
      fetch('http://localhost:3000/api/comment' , {
         headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + localStorage.getItem("token"),
      },
      })
      .then(response => {
                this.Comment = response.data;
                
            }
            
            )
            
      .then((response) => response.json())
      .then((comments) => (this.Comment = comments))
    }, */
    /*  getComments (id){
      fetch('http://localhost:3000/api/forum/' + id, {
         headers: {
        "Content-Type": "application/json",
        'authorization': "Bearer " + localStorage.getItem("token"),
      },
      })
      .then(response => {
                this.Comment = response.data;
                
            }
            
            )
            
      .then((response) => response.json())
      .then((comments) => (this.Comment = comments))
    }, */

    /* commentPost(event){
      this.comment = event.target.value
    }, */

    /* submitComment() {
      async function commentForm(comments) {
        try {
          const response = await fetch("http://localhost:3000/api/comment/", {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ comment: comments }),
          });
          if (response.ok) {
            const responseId = await response.json();
            alert("Votre commentaire a été publié !");
            console.log(responseId);
            window.location.href = "http://localhost:8080/#/forum";
          } else {
            console.error("Retour du serveur: ", response.status);
          }
        } catch (e) {
          console.log(e);
        }
      }
      commentForm(this.comments);
    }, */

    //Supprimer un commentaire (admin)
    /*  btnDeleteComment(id) {
      let commentId = JSON.stringify({ id: this.comments });
      async function commentForm(dataForm) {
        confirm("Voulez-vous vraiment supprimer ce commentaire ?");
        try {
          const response = await fetch(
            "http://localhost:3000/api/forum/" + id,
            {
              method: "DELETE",
              headers: {
                "content-type": "application/json",
                authorization: "bearer " + localStorage.getItem("token"),
              },
              body: dataForm,
            }
          );
          if (response.ok) {
            let responseId = await response.json();
            console.log(responseId);
            location.reload();
          } else {
            console.error("Retour du serveur : ", response.status);
          }
        } catch (e) {
          console.log(e); 
        }
      }
      commentForm(commentId);
    }, */
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
.bi {
  color: #fd2d01;
  margin: auto;
}
.comment-border {
  border-radius: 1rem;
}
</style>