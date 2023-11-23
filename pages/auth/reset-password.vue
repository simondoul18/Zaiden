<template>
    <div>
  <v-col class="mx-auto" cols="12" sm="8" md="6">
    <v-card class="logo pb-4 mx-auto">
      <v-toolbar dense dark color="primary">
        <v-toolbar-title class="mx-auto">Reset Password</v-toolbar-title>
      </v-toolbar>
      <v-form class="px-8 my-4" @submit.prevent="resetPassword" ref="form" lazy-validation v-model="valid" >
          <v-text-field
            label="Password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            outlined :rules="[rules.min,rules.required]"   v-model="password"/>
          <v-text-field
            label="Confirm Password"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            outlined :rules="[rules.match,rules.required]"   v-model="confirmPassword"/>
        <button class="px-3 py-2 white--text rounded elevation-1 primary ml-8" >Submit</button>
        <v-spacer />
              </v-form>

    </v-card>
  </v-col>
    </div>
</template>

<script>
export default {
    layout:"auth",
    data() {
      return {
        password:"",
        confirmPassword:"",
        show1:false,
        show2:false,
        valid: true,
        rules:{
          required:v => !!v || 'Required*',
          min:() => this.password.length >= 8 || 'Min 8 characters',
          match: v=> v === this.password || 'Password does not match'
        }
      }
    },
    
    methods:{
      async resetPassword(){
        if(this.$refs.form.validate()){
          try {
              await this.$axios.post('auth/reset-password', {
              code: this.$route.query.code,
              password: this.password,
              passwordConfirmation: this.confirmPassword,
            })
            this.$router.push("/auth/auth");
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
