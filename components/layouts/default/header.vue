<template>
  <v-app-bar
    height="90"
    flat
    color="white "
    app
    class="pt-0"
    style="box-shadow: 0px 0px 15px 0px #747ff2 !important"
  >
    <v-row align="center" class="px-5">
      <v-col>
        <img
          @click="toHomePage"
          height="60"
          :src="require('~/assets/logo.png')"
          alt="John"
        />
      </v-col>
      <v-col md="6" class="d-flex justify-center">
        <v-btn text nuxt to="/pricing" class="mx-2">Pricing</v-btn>
        <v-btn nuxt to="/aboutUs" text class="mx-2">About US</v-btn>
        <v-btn text  nuxt to="contactUs" class="mx-2">Contact US</v-btn>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn class="mx-2 white--text" nuxt color="blue" to="/auth/auth"
          >Login</v-btn
        >
        <v-btn class="mx-2" outlined nuxt to="/auth/auth?intent=signup"
          >Sign Up</v-btn
        >
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    toHomePage() {
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
