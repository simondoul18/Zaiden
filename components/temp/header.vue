<template>
    <v-app-bar
      height="90"
      flat
      app
      class="pt-0"
    >
    
    <v-container>
      <v-row align="center">
        <v-col>
          <img
            @click="toHomePage"
            height="45"
            :src=" $vuetify.theme.dark ? require(`~/assets/home/newlogo.png`) : require(`~/assets/home/newlogoblack.png`)"
            alt="John"
          />
        </v-col>
        <v-col  md="6"  class="d-flex align-start justify-center text-lg regular">
            <button :class="getClasses('temp')" @click="goTo('temp')">Home</button>
            <button :class="getClasses('pricing')" @click="goTo('pricing')">Pricing</button>
            <button :class="getClasses('aboutUs')" @click="goTo('aboutUs')">About Us</button>
            <button :class="getClasses('contactUs')" @click="goTo('contactUs')">Contact Us</button>
          <!-- <v-btn text nuxt to="/temp" class="mx-2">Home</v-btn>
          <v-btn text nuxt to="/pricing" class="mx-2">Pricing</v-btn>
          <v-btn nuxt to="/aboutUs" text class="mx-2">About US</v-btn>
          <v-btn text  nuxt to="contactUs" class="mx-2">Contact US</v-btn> -->
        </v-col>
        <v-col  v-if="!$store.getters.isAuthenticated" class="d-flex justify-end">
          <button text :class="getOutlineClass()" @click="goTo('auth/auth')"
            >Login</button
          >
          <button class="mx-2 px-9 py-3 radius-8 text-no-wrap text-lg white--text regular gradient-1" @click="goTo('auth/auth?intent=signup')"
            >Sign Up</button
          >
        </v-col>
        <v-col  v-if="$store.getters.isAuthenticated" class="d-flex justify-end">
            <button class="mx-2 px-9 py-3 radius-8 text-no-wrap text-lg white--text regular gradient-1" @click="goTo('dashboard')"
            >Sign Up</button
          >
        </v-col>
      </v-row>
    </v-container>
    </v-app-bar>
  </template>
  
  <script>
  export default {

    methods: {
      toHomePage() {
        this.$router.push("/");
      },
      goTo(route){
        this.$router.push(`/${route}`);
      },
      getClasses(route){
            if(this.$route.name==route){
                return ['text-lg','medium','prime--text','text--darken-4','mx-7','activeLinkClass']
            }
            else{
                return ['text-lg','regular','prime--text','text--darken-2','mx-7',]
            }
        },
        getOutlineClass(){
            if(this.$vuetify.theme.dark){
                return ['mx-2 px-9 py-3', 'prime--text', 'text--darken-4', 'text-lg', 'regular', 'gradient-outline-dark']
            }
            else{
                return ['mx-2 px-9 py-3', 'prime--text', 'text--darken-4', 'text-lg', 'regular', 'gradient-outline']
            }
        }

    },
    computed:{

    },
    mounted(){
        console.log(this.$route)
    }
  };
  </script>
  
  <style></style>
  