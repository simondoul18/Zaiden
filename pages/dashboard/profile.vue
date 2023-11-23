<template>
  <div>
    <span class="text-h4">Profile</span>
    <v-col elevation="4" cols="4" class="mx-auto d-flex flex-column">
      <v-card style="padding: 10px 20px">
        <center>
          <v-avatar class="mx-auto my-2 primary">
            <v-icon dark> mdi-account-circle </v-icon>
          </v-avatar>
        </center>
      <v-form class="px-8 my-4" @submit.prevent="editProfile" ref="form" lazy-validation v-model="valid" >
        <v-text-field
          label="User Name"
          outlined
          :rules="[rules.required,rules.minThree]"
          type="text"
          v-model="username"
        />
        <v-text-field
          label="Password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
          outlined
          :rules="[rules.min, rules.required]"
          v-model="password"
        />
        <v-text-field
          label="Confirm Password"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          @click:append="show2 = !show2"
          outlined
          :rules="[rules.match, rules.required]"
          v-model="confirmPassword"
        />
        <button class="px-3 py-2 white--text rounded elevation-1 primary ml-8" >Submit</button>
        </v-form>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data(){
    return{
        username:"",
        password:"",
        confirmPassword:"",
        show1:false,
        show2:false,
        valid: true,
        rules:{
          minThree: v => v.length>=3 || 'Min 3 Characters required',
          required:v => !!v || 'Required*',
          min:() => this.password.length >= 8 || 'Min 8 characters',
          match: v=> v === this.password || 'Password does not match'
        }
    }
  },
      methods:{
      async editProfile(){
        if(this.$refs.form.validate()){
          try {
              await this.$store.dispatch("editUser", {
              userid:this.$auth.user.id,
              username: this.username,
              password: this.password,
            })
            alert('Updated Successfully')
            } catch (error) {
              console.log({error});
            }
        }
        if(!this.$refs.form.validate()){
          console.log("not valid")
        }
      }
    },
    mounted(){
      this.username = this.$auth.user.username;
    }
};
</script>

<style></style>
