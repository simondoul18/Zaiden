<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <v-btn v-if="isAuthenticated" color="primary" @click="userLogout">logout</v-btn>
      <blockquote class="blockquote">
        {{ isAuthenticated }}
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "InspirePage",
  mounted() {
    // console.log(this.$auth.user);
    // console.log(this.$auth.user);
    // this.userLogin();
  },
  data() {
    return {
      err: null,
      email: "test@test.com",
      password: "aaaaaaaa",
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    async userLogout() {
      await this.$auth.logout();
    },
    async userLogin() {
      try {
        await this.$auth.loginWith("local", {
          data: { identifier: this.email, password: this.password },
        });
      } catch (e) {
        if (e.response) this.err = e.response.data.error.message;
      }
    },
  },
};
</script>
