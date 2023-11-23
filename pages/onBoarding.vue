<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-img :src="require('~/assets/logo.png')" height="40" contain />
        <v-stepper elevation="0" class="rounded-xl" alt-labels v-model="step">
          <v-stepper-header elevation="0">
            <v-stepper-step step="1" :complete="step > 1">
              Verification
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="2" :complete="step > 2">
              Plans
            </v-stepper-step>

            <v-divider></v-divider>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <p class="text-md-h4">Welcome! first things first...</p>
              <p>You need to verify</p>
              <p>Verification email has been sent to your mail</p>
              <v-btn color="success" @click="refresh">Confirmed</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div class="d-flex flex-row mb-4 justify-space-between">

                <v-card
                  class="grey lighten-5 rounded-lg mr-2"
                  elevation="2"
                  v-for="(item, index) in plans"
                  :key="index"
                >
                  <v-card-title> {{ item.attributes.name }}</v-card-title>
                  <v-card-text>
                    <v-timeline align-top dense>
                      <v-timeline-item
                        v-for="(feature, idx) in item.attributes.features"
                        :key="idx"
                        :color="
                          idx % 2 == 0 ? 'deep-purple lighten-1' : 'green'
                        "
                        small
                      >
                        <div>
                          <div>{{ feature }}</div>
                        </div>
                      </v-timeline-item>
                    </v-timeline>
                    <div>
                      {{ item.attributes.amount }}
                      {{ item.attributes.currency }}
                    </div>
                    <div>{{ item.attributes.tokens }} Tokens</div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="success" @click="handlePlanSelect(item)"
                      >Select</v-btn
                    >
                  </v-card-actions>
                </v-card>

              </div>
                    <!-- <v-btn @click="check">check</v-btn> -->

            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </div>
</template>
<script>
// import {loadStripe} from '@stripe/stripe-js';
export default {
  layout: "auth",
  // middleware: 'authenticated',
  data() {
    return {
      stripe: "",
      step: -1,
      plans: [],
      overlay:false
    };
  },
  async created() {
    // if (!this.$auth.user) {
    //   return this.$router.push("/auth/auth");
    // }
    this.step = this.$auth.user?.confirmed ? 2 : 1;


       if(this.$store.getters.loggedInUser?.isOnboardingDone){
          console.log(this.$store.getters.loggedInUser?.isOnboardingDone);
          console.log("before redirecting");
          // this.$router.push("dashboard")
          window.location.replace("http://localhost:3000/dashboard")
          return;
        }
        if(this.$route.query.session_id){
        this.overlay = true;

         setTimeout(async () => {
        const response = await this.$store.dispatch("checkSubscription");
        location.reload();
        this.overlay = false;
         }, 10000);
        }
        const  response = await this.$store.dispatch("checkSubscription");
        console.log("response")
        console.log(response)
        if(response.data){
          window.location.replace("http://localhost:3000/dashboard")
          return;
        }
        else{
          let { loadStripe } = await import('@stripe/stripe-js');
         this.stripe  =await loadStripe("pk_test_51LOKhWDXBmTIcNT48X8AmeenbViRBSVovhZTynpMGksdw5KtyE65nwHbbaRXeDx8g8Gzui3pink6jZ1cY2ZmaBFH00MwHUToex");
         console.log(this.stripe)
        }

  },
  async mounted() {
    /**
     * if onboarding is done redirect to dashboard
     *
     * call subscriptions route
     * refresh if it returns true
    */




    // console.log(this.$auth.user)
    // console.log(this.$route.query.session_id)
    await this.loadPlans();

    //     this.stripe =Stripe(
    //   "pk_test_51LOKhWDXBmTIcNT48X8AmeenbViRBSVovhZTynpMGksdw5KtyE65nwHbbaRXeDx8g8Gzui3pink6jZ1cY2ZmaBFH00MwHUToex"
    // );
    // console.log(this.stripe);
    // window.location.replace("http://localhost:3000/dashboard")

  },
  methods: {
    async loadPlans() {
      try {
        const res = await this.$store.dispatch("plans/getAllPlans");
        console.log(res);
        this.plans = res;
      } catch (error) {
        console.log(error);
      }
    },
    async handlePlanSelect(item) {
      // reditect to stripe checkiout page
      // TODO : Link the plan to the user
      try {
 /*       const res = await this.$store.dispatch("plans/setPlan", {
          id: this.$auth.user.id,
          item: item,
        });
        if(res){
          console.log({res})
          // await this.$router.push({ name: 'dashboard' })
          window.location.replace("http://localhost:3000/dashboard")
        }
*/
        await this.redirectToCheckout(item.id);
      } catch (error) {
        console.log(error);
      }
    },
    async redirectToCheckout(id) {
      try {
        const sessionId = await this.$store.dispatch("createSession",id)
       this.stripe.redirectToCheckout({
          sessionId
        });
      } catch (error) {
        console.log(error)
      }
    },
    refresh(){
      window.location.reload();
    }
  },
};
</script>
<style>
.v-stepper__header {
  box-shadow: none !important;
}
.primaryColor {
  background: rgb(104 136 219) !important;
  border-color: rgb(104 136 219) !important;
  color: white !important;
}
.v-stepper__step--active .v-stepper__step__step.primary {
  background: rgb(104 136 219) !important;
  border-color: rgb(104 136 219) !important;
}
.v-stepper__step--complete .v-stepper__step__step.primary {
  background: rgb(104 136 219) !important;
  border-color: rgb(104 136 219) !important;
}
.v-card__title {
  justify-content: center;
}
</style>
