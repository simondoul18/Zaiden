import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - zaiden",
    title: "zaiden",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    // script: [{ src: 'https://js.stripe.com/v3/' }],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },

      {
        href: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;600;700&display=swap",
        rel: "stylesheet",
      },
      {
        href: "https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;700&display=swap",
        rel: "stylesheet",
      },
      {
        href: "https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css",
        rel: "stylesheet",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/particles.js", mode: "client" },

    { src: "~/plugins/vue-apexchart.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],
  axios: {
    baseURL: process.env.STRAPI_URL || "http://localhost:1337/api",
  },

  auth: {
    // Options
    strategies: {
      local: {
        token: {
          property: "jwt",
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: "auth/local",
            method: "post",
          },
          user: {
            url: "users/me",
            method: "get",
          },
          logout: false,
        },
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ["~/assets/variables.scss"],
    // defaultAssets: false,
    // icons: {Comfortaa
    //   iconfont: "mdi", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    // },

    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          prime:{
            lighten5: "#130019",
            lighten4: "#5A4D5E",
            lighten3: "#8B828E",
            lighten2: "#AEA7B0",
            lighten1: "#C6C1C8",
            darken1: "#D7D4D8",
            darken2: "#EBEAEC",
            darken3: "#F5F5F6",
            darken4: "#FFFFFF"
          },

          shades:{
            lighten1:"#1F0F24",
            lighten2:"#1F0F24",
            lighten3:"#1F0F24",
          }
        },
        light:{

          prime:{
            lighten5: "#FFFFFF",
            lighten4: "#F5F5F6",
            lighten3: "#EBEAEC",
            lighten2: "#D7D4D8",
            lighten1: "#C6C1C8",
            darken1: "#AEA7B0",
            darken2: "#8B828E",
            darken3: "#5A4D5E",
            darken4: "#130019"
          },

          shades:{
            lighten1:"#E2FFF3",
            lighten2:"#FEF6E6",
            lighten3:"#FFF1FE",
          }

        }
      },
    },
    breakpoint: {
      thresholds: {
        xs: 320,
        sm: 565,
        md: 768,
        lg: 992,
        xl: 1280,
        xxl: 1440,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
