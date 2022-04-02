<!-- FORUM , PUBLICATION ET AFFICHAGE DES GIFS ET DES COMMENTAIRES -->

<template>
  <div class="forum">

    <!-- PUBLIER UN MESSAGE -->
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

      <!-- Photo user -->
         <img
          v-if="photo == false"
          src="../assets/user-profile.jpg"
          class="rounded-circle me-3 shadow"
          height="40"
          alt="avatar"
          loading="lazy"
        />
        <img
          v-else
          :src="photo"
          class="rounded-circle me-3 shadow"
          height="40"
          alt="Avatar"
          loading="lazy"
        />
       
        <!-- Bouton créer un message -->
        <div
          class="p-1 border rounded-pill text-center flex-fill"
          role="button"
        >
          <div>
            <router-link to="/message">Publier un message ...</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- AFFICHAGE DES GIFS -->
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
      :key="gifs.gifId"
    >
      <div class="d-flex px-3 py-3">

        <!-- Photo user -->
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

        <!-- Username et date de publication -->
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

        <!-- Bouton supprimer le message pour l'admin et l'utilisateur -->
        <div
          class="p-1 ms-auto"
          style="cursor: pointer"
          role="button"
          v-if="userId == gifs.userId || isAdmin == 'true'"
          @click="btnDelete(gifs.id)"
        >
          <i class="bi bi-trash"></i>
        </div>
      </div>

      <!-- Titre et gif du message -->
      <div>
        <p class="px-3">{{ gifs.title }}</p>
        <img class="w-100 d-flex justify-content-center" :src="gifs.gifs" />
      </div>

    <!-- LIKES / DISLIKES -->
      <div class="m-1 d-flex justify-content-end">

        <!-- Likes -->
        <button
          class="btn-like bg-transparent border-0 py-auto d-flex text-align"
          type="submit"
          @click="count++"
        >
          <i class="bi bi-hand-thumbs-up-fill" v-if="likeChange === true"></i>
          <i class="bi bi-hand-thumbs-up" v-else></i>

          <span class="number-like px-1">{{ count }}</span>
        </button>

        <!-- Dislikes -->
        <button
          class="btn-like bg-transparent border-0 py-auto d-flex text-align"
          type="submit"
          @click="btnDislike(gifs.id), (dislikeChange = !dislikeChange)"
        >
          <i
            class="bi bi-hand-thumbs-down-fill"
            v-if="dislikeChange === true"
          ></i>
          <i class="bi bi-hand-thumbs-down" v-else></i>

          <span class="number-like px-1">{{ dislikes }}</span>
        </button>
      </div>

      <!-- COMMENTAIRES -->

      <!-- Ecrire un commentaire -->
      <div class="d-flex mb-3 px-4">

        <!-- Photo user -->
        <img
          v-if="photo == false"
          src="../assets/user-profile.jpg"
          class="rounded-circle me-2 shadow"
          height="35"
          alt="Avatar"
          loading="lazy"
        />
        <img
          v-else
          :src="photo"
          class="rounded-circle me-2 shadow"
          height="35"
          alt="Avatar"
          loading="lazy"
        />
        
         <!-- Formulaire créer un commentaire   -->
        <form
          @submit.prevent="submitComment(gifs.id)"
          class="d-flex flex-fill"
          
          >
          <label class="form-label" for="comment"></label>
          <input
            v-model="comment"
            id="comment"
            name="comment"
            class="form-control p-1 border rounded-pill text-center flex-fill"
            type="text"
            placeholder="Ecrire un commentaire ..."
            required
          />

          <button class="btn" type="submit">
            <i class="bi bi-send"></i>
          </button>
        </form>
      </div>

      <!-- COMMENTAIRES DES AUTRES UTILISATEURS -->
      <div
        class="border comment-border mx-4 pt-2 mb-2"
        v-for="comment in gifs.Comments"
        :key="comment.id"
        
      >
        <div class="d-flex flex-column flex-fill">
          <div>
            <div class="px-3 py-1">
              <div class="d-flex">

                <!-- Photo user -->
                <div class="my-auto">
                  <img
                    v-if="comment.User.photo"
                    :src="comment.User.photo"
                    class="rounded-circle text-center shadow"
                    height="30"
                    alt="avatar"
                    loading="lazy"
                  />
                  <img
                    v-else
                    class="rounded-circle shadow"
                    height="30"
                    alt="photo profil"
                    loading="lazy"
                    src="../assets/user-profile.jpg"
                    id="preview"
                  />
                </div>

              <!-- username et date commentaire -->
                <div class="d-flex flex-column px-2">

                  <!-- username -->
                  <span
                    class="
                      d-flex
                      flex-column
                      justify-content-start
                      user-comment
                      fw-bold
                    "
                    id="username"
                  >
                    {{ comment.User.username }}
                  </span>

                  <!-- date du commentaire -->
                  <span class="date fw-light">
                    Le {{ dateFormat(comment.createdAt) }}
              
                  </span>
                </div>

                <!-- Bouton supprimer le commentaire par l'admin -->
                <div
                  class="p-1 ms-auto"
                  role="button"
                  v-if="isAdmin === 'true'"
                  @click="btnDeleteComment(comment.id)"
                >
                  <i class="bi bi-trash"></i>
                </div>
              </div>

              <!-- Commentaires -->
              <div class="ms-4 py-2">
                <p class="fs-6 fw-light mb-0">{{ comment.comments }}</p>
              </div>
            </div>
          </div>
        </div>
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
      userId: localStorage.getItem("id"),
      gifId: "",
      photo: localStorage.getItem("photo"),
      gifs: "",
      Gif: [],
      User: [],
      users: "",

      /* like: [],
      likes: "", */
      Comment: [],
      
      comment: '',
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
      dislikesChange: 0,
      count: 0,
    };
  },
  created: function () {
    // Récupération des données des gifs avec user et comments
    fetch("http://localhost:3000/api/forum", {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((gifs) => {
        /* console.log(gifs); */
        this.Gif = gifs;
      });
  },

  mounted() {
    this.isAdmin = localStorage.getItem("isAdmin");
    console.log(this.isAdmin);
  },

  methods: {
    // ---------------------------------------- GIFS --------------------------------------

    // SUPPRIMER UN GIF (ADMIN ET USER)

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

    // FORMATTE LA DATE DE PUBLICATION DES GIFS

    dateFormat(dateValue) {
      if (dateValue) {
        return moment(String(dateValue)).format("Do MMMM YYYY à HH:mm");
      }
    },

    // ---------------------------------- LIKE / DISLIKE -----------------------------------

    // BOUTON LIKER UN GIF

    btnLike(id) {
      const postLike = JSON.stringify({ like: this.like });
      async function like(postLike) {
        try {
          const response = await fetch(
            "http://localhost:3000/api/forum/like/" + id,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: postLike,
            }
          );
          if (response.ok) {
            const responseId = await response.json();
            console.log(responseId);
            console.log("like ok");
          } else {
            console.error("Retour du serveur: ", response.status);
          }
        } catch (e) {
          /* console.log(e); */
        }
      }
      like(postLike);
    },

    // BOUTON DISLIKER UN GIF

    btnDislike(id) {
      const postDislike = JSON.stringify({ dislike: this.dislike });
      async function like(postDislike) {
        try {
          const response = await fetch(
            "http://localhost:3000/api/forum/like/" + id,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: postDislike,
            }
          );
          if (response.ok) {
            const responseId = await response.json();
            console.log(responseId);
            console.log("dislike ok");
          } else {
            console.error("Retour du serveur: ", response.status);
          }
        } catch (e) {
          /* console.log(e); */
        }
      }
      like(postDislike);
    },

    //--------------------------------- COMMENTAIRES ---------------------------------

    // POSTER UN COMMENTAIRE

    submitComment(id) {
      async function commentForm(comment, id) {
        try {
          const response = await fetch(
            "http://localhost:3000/api/forum/" + id,
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({ comments: comment }),
            }
          );
          if (response.ok) {
            const responseId = await response.json();
            alert("Votre commentaire a été publié !");
            document.location.reload();
            console.log(responseId);
          } else {
            console.error("Retour du serveur: ", response.status);
          }
        } catch (e) {
          console.log(e);
        }
      }
      commentForm(this.comment, id);
    },

    // SUPPRIMER UN COMMENTAIRE (ADMIN)

    btnDeleteComment(id) {
     
      async function commentForm( id) {
        confirm("Voulez-vous vraiment supprimer ce message ?");
        try {
          const response = await fetch(
            "http://localhost:3000/api/forum/" + id + "/comment",
            {
              method: "DELETE",
              headers: {
                "content-type": "application/json",
                authorization: "bearer " + localStorage.getItem("token"),
              },
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
      commentForm(id);
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
.bi {
  color: #fd2d01;
  margin: auto;
}
.comment-border {
  border-radius: 1rem;
}
.user-comment {
  font-size: 0.7rem;
}
::placeholder {
  font-size: 0.8rem;
}
</style>