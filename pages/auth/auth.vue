<template>
  <v-row class="cirkle main">
    <v-snackbar v-model="snackbar" timeout="4000" color="red darken-2">
      {{ snackbarError }}</v-snackbar
    >
    <div
      :class="{ lightPurple: activeCard === 'signin' }"
      style="
        position: absolute;
        height: 300px;
        width: 300px;
        top: 41px;
        left: 129px;
        background: #add8e6;
        border-radius: 50%;
      "
    ></div>
    <div
      :class="{ lightPurple: activeCard === 'signin' }"
      style="
        position: absolute;
        height: 300px;
        width: 300px;
        bottom: 41px;
        right: 129px;
        background: #add8e6;

        border-radius: 50%;
      "
    ></div>

    <div
      class="container"
      id="container"
      :class="{ 'right-panel-active': activeCard === 'signup' }"
    >
      <div class="form-container sign-up-container">
        <v-form
          ref="signupform"
          v-model="valid"
          lazy-validation
          @submit.prevent="handleSignup"
        >
          <h1 class="font-bold" style="margin-bottom: 40px; color: #add8e6">
            Create Account
          </h1>
          <!-- 			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your email for registration</span> -->
          <div style="z-index: 10">
            <v-text-field
              label="User Name"
              outlined
              :rules="[rules.required]"
              type="text"
              v-model="username"
            />
            <v-text-field
              label="Email"
              outlined
              :rules="[rules.validEmail, rules.required]"
              type="email"
              v-model="email"
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

            <v-btn
              :loading="loading"
              :disabled="!valid"
              @click="handleSignup"
              style="
                color: white;
                font-size: 13px;
                background: #add8e6 !important;
                border-color: #add8e6 !important;
              "
            >
              Sign Up</v-btn
            >
          </div>
        </v-form>
      </div>
      <div class="form-container sign-in-container">
        <v-form
          ref="signinform"
          v-model="valid"
          lazy-validation
          @submit.prevent="handleSignin"
        >
          <h1 class="font-bold" style="margin-bottom: 40px; color: #e5a8e5">
            Sign in
          </h1>
          <!-- <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span> -->
          <v-text-field
            label="Email"
            outlined
            :rules="[rules.validEmail, rules.required]"
            type="email"
            v-model="email"
          />
          <v-text-field
            label="Password"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            outlined
            :rules="[rules.min, rules.required]"
            v-model="password"
          />
          <a href="#">Forgot your password?</a>
          <v-btn
            :disabled="!valid"
            :loading="loading"
            @click="handleSignin"
            style="
              color: white;
              font-size: 13px;
              background: #e5a8e5 !important;
              border-color: #e5a8e5 !important;
            "
          >
            Sign In
          </v-btn>
        </v-form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 class="font-bold">Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              class="ghost"
              @click="handleButtonClicks('signin')"
              id="signIn"
            >
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1 class="font-bold">Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button
              class="ghost"
              @click="handleButtonClicks('signup')"
              id="signUp"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </v-row>
</template>

<script>
import {getErrorMessage} from '@/utils'
export default {
  layout: "auth",
  data() {
    return {
      activeCard: "signin",
      loading: false,
      username: "",
      email: "",
      password: "",
      valid: true,
      show1: false,
      show2: false,
      snackbar: false,
      snackbarError: null,
      rules: {
        min: () => this.password.length >= 8 || "Min 8 characters",
        required: (v) => !!v || "Required*",
        validEmail: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
    };
  },
  mounted() {
    console.log(this.$route.query);
    if (this.$route.query.intent == "signup") this.activeCard = "signup";
  },
  methods: {
    async error(error) {
      this.snackbar = true;
      this.snackbarError = getErrorMessage(error)
    },
    handleButtonClicks(buttonType) {
      this.activeCard = buttonType;
      this.$refs.signinform.resetValidation();
      this.$refs.signupform.resetValidation();
      this.reset();
    },
    async handleSignin() {
      if (this.$refs.signinform.validate()) {
        try {
          this.loading = true;
          await this.$auth.loginWith("local", {
            data: { identifier: this.email, password: this.password },
          });
          this.loading = false;
          this.$router.push("/dashboard");
        } catch (error) {
          console.log(error);
          this.error(error);
          this.loading = false;
          console.log({ error });
        }
      }
      // if (!this.$refs.signinform.validate()) {
      //   console.log("not valid");
      // }
    },
    async handleSignup() {
      if (this.$refs.signupform.validate()) {
        try {
          this.loading = true;
          // this.$axios.setToken(false);
          const res = await this.$axios.post("auth/local/register", {
            username: this.username,
            email: this.email,
            password: this.password,
          });
          console.log(res);
          await this.$axios.put(
            `users/${res.data.user.id}`,
            {
              confirmed: false,
            },
            {
              headers: {
                Authorization: "Bearer " + res.data.jwt,
              },
            }
          );

          await this.$axios.post("auth/send-email-confirmation", {
            email: this.email,
          });
          // have to wait this request to complete(send email to legit user)
          this.loading = false;

          this.activeCard = "signin";
        } catch (error) {
          this.error(error);
          console.log({ error });
          this.loading = false;
        }
      } else {
        console.log("not valid");
      }
    },
    reset() {
      this.username = "";
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
  box-sizing: border-box;
}

.main {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  padding: 10% 20%;
  /* margin: -20px 0 50px; */
}

/* h1 {
  font-weight: bold;
  margin: 0;
} */

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #add8e6;
  background-color: #add8e6;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* padding: 0 50px; */
  height: 100%;
  text-align: center;
}

input {
  /* background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%; */
}

.container {
  font-family: "Montserrat", sans-serif !important;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 100%;

  max-width: 100%;
  height: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #e5a8e5;
  background: -webkit-linear-gradient(to right, #add8e6, #e5a8e5);
  background: linear-gradient(to right, #add8e6, #e5a8e5);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

/* ///////////////////////// */
.lightPurple {
  background: #e5a8e5 !important;
}

/* .cirkle::after {
  content: "";
  width: 100%;
  height: 124vh;
  border-radius: 100vh 100vh 0 0;
  border: 10px solid white;
  left: 0%;
  position: absolute;
  box-shadow: 0px -4px 8px 0px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
  background: #891173;
  bottom: -50%;
} */
.v-input {
  flex: 0 1 auto;
}
</style>
