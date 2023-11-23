<template>
    <v-app :style="{'background': $vuetify.theme.dark ?  '#180523': '#fff'}">
      <v-btn
                color="pink"
                dark
                fixed
                bottom
                right
                fab
                @click="toggleThemeMode"
              >
                <v-icon>{{$vuetify.theme.dark ? darkIcon:lightIcon}}</v-icon>
              </v-btn>
      
      <temp-header  :style="{'background': $vuetify.theme.dark ?  'rgba(0, 0, 0, 0)': 'rgba(0, 0, 0, 0)'}"/>
      <v-main>
        <v-container fluid style="height: 100%">
          <Nuxt />
        </v-container>
      </v-main>
    </v-app>
  </template>
  <script>
    export default{
      data(){
        return{
          isDark:false,
          darkIcon:"mdi-brightness-4",
      lightIcon:"mdi-white-balance-sunny",
        }
      },
      methods:{
       toggleThemeMode(){
        this.isDark = !this.isDark;
        this.$vuetify.theme.dark = this.isDark;
      }
    }
    }
  </script>
