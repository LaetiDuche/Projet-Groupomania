<!--
Photo de l'utilisateur connecté
-->

<template>
  <!-- Si pas de photo => photo par defaut -->
  <img
    v-if="photo == false"
    src="../assets/user-profile.jpg"
    class="rounded-circle me-3 shadow py-auto"
    height="40"
    alt="avatar"
    loading="lazy"
  />
  <!-- Si photo => photo localstorage -->
  <img
    v-else
    :src="photo"
    class="rounded-circle me-3 shadow py-auto"
    height="40"
    alt="Avatar"
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
