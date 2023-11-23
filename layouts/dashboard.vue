<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="true"
      app
      style="background: #f5f5f5; border: none"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider class="pb-4"></v-divider>
      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          exact-active-class="activeClass primary--text"
          class="curvedClass"
          style="
            border-radius: 20px;
            border-bottom-right-radius: 0px !important;
            border-top-right-radius: 0px !important;
          "
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-btn block @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
        </v-btn>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
      <v-btn text @click="userLogout">Logout<v-icon right>
        mdi-logout
      </v-icon></v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="pl-5">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  middleware: 'authenticated',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-file",
          title: "Projects",
          to: "/dashboard/projects",
        },
        {
          icon: "mdi-account-cog",
          title: "Profile",
          to: "/dashboard/profile",
        },
      ],
      miniVariant: false,

      title: "Vuetify.js",
    };
  },
  methods:{
        async userLogout() {
      await this.$auth.logout();
    },
  }
};
</script>
<style scoped>
.activeClass {
  border-bottom-right-radius: 0px !important;
  border-top-right-radius: 0px !important;
  background: white;
}
.activeClass:before,
.activeClass:after {
  content: "";
  position: absolute;
  max-height: 20px;
  max-width: 20px;
  min-width: 20px;
  min-height: 20px;
}
.activeClass:after {
  right: 0;
  top: 100%;
  background: radial-gradient(circle at bottom left, #fff0 70%, #fff 75%);
}

.activeClass:before {
  background: radial-gradient(circle at top left, #fff0 72%, #fff 75%);

  bottom: 100%;
  right: 0;
}
.theme--light.v-list-item--active:hover::before,
.theme--light.v-list-item--active::before {
  opacity: 1;
}
.v-list-item--link:before {
  left: revert;
  top: revert;
  transition: none;
}
</style>
