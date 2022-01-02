<template>
  <div class="forum">
    <Header />

    <div class="formulaire  mx-auto col-10 mt-4 p-3 rounded-3 shadow">

        <div class="d-flex border-bottom pb-3 ">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
            class="rounded-circle me-1"
            height="40"
            alt="Avatar"
            loading="lazy"/>

          <div class=" col-10 p-1 border rounded-pill p-auto text-center" role="button">
            <div>
              <router-link to="/message" class="p-2">Publier un message ...</router-link>
            </div>
          </div> 
        </div>

    </div>

    <div class="forum-publication formulaire mx-auto col-10 mt-4 p-3 rounded-3 shadow">
      
    </div>

  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Forum",
  components: {
    Header,
  },
};
</script>

<style lang='scss'>
</style>