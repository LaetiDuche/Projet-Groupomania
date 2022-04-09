<!-- 
FORUM , 
AFFICHAGE DES GIFS ET PUBLICATION DES COMMENTAIRES
 -->

<template>

  <div class="forum">
    
    <!-- Publier un message -->
    <div
      class="
        formulaire
        mx-auto
        col-11 col-md-10 col-lg-6
        p-3
        my-3 my-sm-4
        rounded-3
        shadow
      "
    >
      <div class="d-flex mx-auto">
        <!-- Photo user -->
        <PhotoUser />

        <!-- Bouton créer un message => redirection vers page message -->
        <router-link to="/message" class="flex-fill d-flex">
          <button
            class="btn p-1 border rounded-pill text-center flex-fill ms-2"
            aria-labelledby="créer message"
          >
            Publier un message ...
          </button>
        </router-link>
      </div>
    </div>

    <!----------------------------------- GIFS -------------------------------->

    <div
      class="
        forum-publication
        formulaire
        mx-auto
        col-11 col-md-10 col-lg-6
        my-3 my-sm-4
        rounded-3
        shadow
        pb-1
      "
      v-for="gifs in Gif"
      :key="gifs.gifId"
    >
      <div class="d-flex px-3 py-3">
        <!-- Photo user gifs-->
        <div class="my-auto">
          <img
            v-if="gifs.User.photo"
            :src="gifs.User.photo"
            class="rounded-circle text-center shadow"
            height="40"
            alt="photo"
            loading="lazy"
          />
          <img
            v-else
            class="rounded-circle shadow"
            height="40"
            alt="photo"
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
            aria-labelledby="username"
          >
            {{ gifs.User.username }}

            <span class="date fw-light" aria-labelledby="date">
              Le {{ dateFormat(gifs.createdAt) }}
            </span>
          </span>
        </div>

        <!-- Bouton supprimer le message pour l'admin et l'utilisateur -->
        <button
          class="btn p-1 ms-auto"
          style="cursor: pointer"
          role="button"
          aria-labelledby="supprimer message"
          v-if="userId == gifs.userId || isAdmin == 'true'"
          @click="btnDelete(gifs.id)"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>

      <!-- Titre et gif du message -->
      <div>
        <p class="px-3">{{ gifs.title }}</p>
        <img
          class="w-100 d-flex justify-content-center"
          :src="gifs.gifs"
          alt="gif"
        />
      </div>

      <!-------------------------- COMMENTAIRES ------------------------>

      <div class="d-flex px-4 py-3">
        <!-- Photo user -->
        <PhotoUser />

        <!-- Publier un commentaire   -->
        <form
          @submit.prevent="submitComment(gifs.id)"
          class="d-flex flex-fill ms-2"
          aria-label="formulaire commentaire"
        >
          <label class="form-label" for="comment"></label>
          <input
            v-model.lazy="comment"
            id="comment"
            name="comment"
            class="form-control p-1  rounded-pill text-center flex-fill"
            type="text"
            placeholder="Ecrire un commentaire ..."
            required
          />
          <button class="btn" type="submit" aria-labelledby="envoyer">
            <i class="bi bi-send"></i>
          </button>
        </form>
      </div>

      <!-- Commentaires des autres utilisateurs -->
      <div
        class="border comment-border mx-4 pt-2 mb-2"
        v-for="comment in gifs.Comments"
        :key="comment.id"
      >
        <div class="d-flex flex-column flex-fill">
          <div>
            <div class="px-3 py-1">
              <div class="d-flex">
                <!-- Photo user comments -->
                <div class="my-auto">
                  <img
                    v-if="comment.User.photo"
                    :src="comment.User.photo"
                    class="rounded-circle text-center shadow"
                    height="40"
                    alt="photo"
                    loading="lazy"
                  />
                  <img
                    v-else
                    class="rounded-circle shadow"
                    height="40"
                    alt="photo"
                    loading="lazy"
                    src="../assets/user-profile.jpg"
                    id="preview"
                  />
                </div>

                <!-- Username et date commentaire -->
                <div class="d-flex flex-column px-2">
                  <!-- Username -->
                  <span
                    class="
                      d-flex
                      flex-column
                      justify-content-start
                      user-comment
                      fw-bold
                    "
                    id="username"
                    aria-labelledby="username"
                  >
                    {{ comment.User.username }}
                  </span>

                  <!-- Date du commentaire -->
                  <span class="date fw-light" aria-labelledby="date">
                    Le {{ dateFormat(comment.createdAt) }}
                  </span>
                </div>

                <!-- Bouton supprimer le commentaire par l'admin -->
                <button
                  class="p-1 ms-auto btn"
                  role="button"
                  v-if="isAdmin === 'true'"
                  id="deleteComment"
                  aria-labelledby="supprimer commentaire"
                  @click="btnDeleteComment(comment.id)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>

              <!-- Commentaires -->
              <div class="ms-4 py-2">
                <p class="fs-6 fw-light mb-0">
                  {{ comment.comments }}
                </p>
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
import PhotoUser from "@/components/Photo-user.vue";

export default {
  name: "Forum",
  components: {
    PhotoUser,
  },

  data() {
    return {
      isAdmin: "",
      userId: localStorage.getItem("id"),
      gifId: "",
      id: "",
      images: "",
      gifs: "",
      Gif: [],
      User: [],
      users: "",
      Comment: [],
      comment: "",
    };
  },
  created: function () {
    //--- RÉCUPÉRATION DES DONNÉES

    fetch("http://localhost:3000/api/forum", {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((gifs) => {
        this.Gif = gifs;
      });
  },

  mounted() {
    this.isAdmin = localStorage.getItem("isAdmin");
  },

  methods: {
    // ---------------------------------------- GIFS --------------------------------------

    //--- SUPPRIMER UN GIF (ADMIN ET USER)

    btnDelete(id) {
      let gifId = JSON.stringify({ id: this.gifId });
      async function gifForm(dataForm) {
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
            alert("Ce gif est supprimé !");
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

    //-------------- FORMATTE LA DATE DE PUBLICATION DES GIFS ET COMMENTS

    dateFormat(dateValue) {
      if (dateValue) {
        return moment(String(dateValue)).format("Do MMMM YYYY à HH:mm");
      }
    },

    //--------------------------------- COMMENTAIRES ---------------------------------

    //--- BOUTON PUBLIER UN COMMENTAIRE

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

    // BOUTON (icon poubelle) SUPPRIMER UN COMMENTAIRE (ADMIN)

    btnDeleteComment(id) {
      async function commentForm(id) {
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
            alert("Ce commentaire est supprimé !");
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