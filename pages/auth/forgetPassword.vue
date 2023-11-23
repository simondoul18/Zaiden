<template>
    <div>
  <v-col class="mx-auto" cols="12" sm="8" md="6">
    <v-card class="logo pb-4 mx-auto">
      <v-toolbar dense dark color="primary">
        <v-toolbar-title class="mx-auto">Forget Password</v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent="forgetPassword" ref="form" lazy-validation v-model="valid" class="my-4">
        <v-text-field :rules="[rules.required,rules.validEmail]" class="mx-8" label="Email" v-model="email" solo />

        <button class="px-3 py-2 white--text rounded elevation-1 primary ml-8" >Submit</button>
        <v-spacer />
              </v-form>
              <v-btn plain class="ml-8 my-2" nuxt to="/auth/auth">Login</v-btn>
        <v-btn plain class="my-2" nuxt to="/auth/auth?intent=signup">Signup</v-btn>

    </v-card>
  </v-col>
    </div>
</template>

<script>
export default {
    layout:"auth",
    data() {
      return {
        email:"",
        valid: true,
        rules:{
          required:v => !!v || 'Required*',
          validEmail:v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        }
      }
    },
    
    methods:{
      async forgetPassword(){
        if(this.$refs.form.validate()){
          try {
              await this.$axios.post('auth/forgot-password', {
                email: this.email,
              })
            } catch (error) {
              console.log({error});
            }
        }
        if(!this.$refs.form.validate()){
          console.log("not valid")
        }
      }
    }
};
</script>

<style></style>
