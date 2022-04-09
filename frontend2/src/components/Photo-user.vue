<!--
Photo de l'utilisateur connecté
-->

<template>
  <!-- Si pas de photo => photo par defaut -->
  <img
    v-if="photo == false"
    src="../assets/user-profile.jpg"
    class="rounded-circle shadow py-auto border border-2 border-light"
    height="40"
    alt="photo"
    loading="lazy"
  />
  <!-- Si photo => photo localstorage -->
  <img
    v-else
    :src="photo"
    class="rounded-circle shadow py-auto border border-2 border-light"
    height="40"
    alt="photo"
    loading="lazy"
  />
</template>

<script>
export default {
  name: "PhotoUser",

  data() {
    return {
      photo: localStorage.getItem("photo"),
      imagePreview: null,
    };
  },
};
</script>
