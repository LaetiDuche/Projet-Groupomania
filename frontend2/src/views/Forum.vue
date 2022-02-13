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
          v-if="userId === 'true' || photo "
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
        pb-3
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
        <!--Liker-->
        <button
          class="btn-like bg-transparent border-0 py-auto d-flex text-align"
          type="submit"
          @click="(btnClick1 = 1), (click1 = !click1)"
        >
          <i class="bi bi-hand-thumbs-up-fill" v-if="click1 === true"></i>
          <i class="bi bi-hand-thumbs-up" v-else></i>

          <span class="number-like px-1">{{ btnClick1 }}</span>
        </button>

        <!--Disliker-->
        <button
          class="btn-like bg-transparent border-0 py-auto d-flex text-align"
          type="submit"
          @click="(btnClick2 = 1), (click2 = !click2)"
        >
          <i class="bi bi-hand-thumbs-down-fill" v-if="click2 === true"></i>
          <i class="bi bi-hand-thumbs-down" v-else></i>

          <span class="number-like px-1">{{ btnClick2 }}</span>
        </button>
      </div>

      <!--Commentaires-->

      <!--Ecrire un commentaire-->
      <div class="d-flex mb-3 border-bottom pb-3 px-3">
        <img
          v-if="photo"
          :src="photo"
          class="rounded-circle me-3 shadow"
          height="35"
          alt="Avatar"
          loading="lazy"
        />
        <img
          v-else
          src="../assets/user-profile.jpg"
          class="rounded-circle me-3 shadow"
          height="35"
          alt="avatar"
          loading="lazy"
        />

        <form
         @submit.prevent="submitComment()"
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
            
          /> <!--  v-on:keyup.enter.prevent="submitComment()"  v-on:keyup.enter="submitComment(gifs.id)"-->
          <button @click="submitComment()"><i class="bi bi-send ms-2"></i></button>
          
        </form>
      </div>

      <!--Commentaires des autres utilisateurs-->
      <div class="border comment-border mx-3 pt-2">
        <div
          class="d-flex flex-column flex-fill"
          v-for="comments in Comment"
          :key="comments.id"
        >
          <!-- === 'true'-->

          <div>
            <div class="d-flex px-3 py-1">
              <img
                v-if="comments.User.photo"
                :src="comments.User.photo"
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
              <div class="d-flex flex-column flex-fill ms-3">
                <span class="d-flex flex-column fw-bold" id="username">
                  {{ comments.User.username }}
                </span>
                <p class="fs-6 fw-light mb-0">{{ comments.comment }}</p>

                <span class="date fw-light ms-auto">
                  Le {{ dateFormat(comments.createdAt) }}
                </span>
                <hr class="dashed col-12 mx-auto" />
              </div>

              <!-- Bouton supprimer les commentaires par l'admin -->
              <div
                class="p-1 ms-auto"
                style="cursor: pointer"
                role="button"
                v-if="isAdmin === 'true'"
                @click="btnDeleteComment(comments.id)"
              >
                <i class="bi bi-trash"></i>
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
      /* isAdmin: localStorage.getItem("isAdmin"), */
      isAdmin: "",
      userId:'',
      photo: localStorage.getItem("photo"),
      /* userId: localStorage.getItem("Id"), */
      /* gifs: [], */
      gifs:'',
      Gif: "",
      user: [],
      User: "",
      like: [],
      likes: "",
      Comment: "",
      comment: "",
      comments: [],
      id: "",
      gifsId: '',
      btnClick1: 0,
      btnClick2: 0,
      click1: false,
      click2: false,
      /* clickDislike: false, */
      images: "",
      
      
    };
  },
  created: function () {
    fetch("http://localhost:3000/api/forum", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((gifs) => (this.Gif = gifs))
      .then((users) => (this.User = users))
      .then((likes) => (this.Like = likes))
      .then((comments) => (this.Comment = comments));
  },

  mounted() {
    this.isAdmin = localStorage.getItem("isAdmin");
    console.log(this.isAdmin);
  },

  methods: {
    //Supprimer une publication
    btnDelete(id) {
      let gifsId = JSON.stringify({ id: this.gifsId });
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
      gifForm(gifsId);
    },

    /* commentPost(event){
      this.comment = event.target.value
    }, */    
    
    submitComment() {
      const formData = new FormData();
      console.log(this.comment);
      formData.append("comment", this.comment);

      async function commentForm(formData) {
        try {
          const response = await fetch("http://localhost:3000/api/comment/" , {
            method: "POST",
            
            headers: {
              //'Content-Type': 'application/json',
              'Authorization': "bearer " + localStorage.getItem("token"),
            },
            body: formData,
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
          /* console.log(e); */
        }
      }
      commentForm(formData);
    },

    //Supprimer un commentaire (admin)
    btnDeleteComment(id) {
      let commentId = JSON.stringify({ id: this.commentId });
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
          /* console.log(e);  */
        }
      }
      commentForm(commentId);
    },

    // Formatte la date de publication
    dateFormat(dateValue) {
      if (dateValue) {
        return moment(String(dateValue)).format("Do MMMM YYYY à HH:mm");
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
.bi {
  color: #fd2d01;
  margin: auto;
}
.comment-border {
  border-radius: 1rem;
}
</style>