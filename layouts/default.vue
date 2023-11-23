<template>
  <v-app class="app-bg">
    <particles-comp />
    <layouts-default-header />
    <v-main>
      <v-container fluid style="height: 100%">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import particles from "../components/particles-comp.vue";
export default {
  components: { particles },
  name: "DefaultLayout",
  data() {
    return {
      title: "Vuetify.js",
    };
  },
};
</script>

<style scoped>
/* .app-bg {
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-image: url("~assets/bg.png") !important;
} */
</style>
