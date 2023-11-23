<template>
  <div
    class="d-flex flex-column bg"
    justify="center"
    align="stretch"
    style="height: 100%"
  >
    <v-row justify="center" align="center">
      <v-col
        cols="12"
        md="6"
        lg="4"
        xl="4"
        class="d-flex flex-column justify-center mb-12 pb-12"
      >
        <div class="black--text text-center c-font">
          <div class="text-h3 font-bold">
            Find Public Email , Social Profiles and More !
          </div>
          <div>
            Zaiden does it for you ! , find professional email addresses and
            social profiles in seconds and get more leads for your business.
          </div>
        </div>
        <pages-index-search class="mt-12" />
      </v-col>
    </v-row>

    <div>
      <v-row cols="8" class="d-flex justify-center black--text">
        <div class="text-h6">Lorem ipsum dolor sit amet</div>
        <v-divider class="mx-4" style="border: 1px solid !important" vertical />
        <div class="text-h6">Lorem ipsum dolor sit amet</div>
        <v-divider class="mx-4" style="border: 1px solid !important" vertical />
        <div class="text-h6">Lorem ipsum dolor sit amet</div>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      link: null,
    };
  },
};
</script>
<style>
.bg {
  background-image: url("~/assets/bg-r.png"), url("~/assets/bg-l.png");

  background-size: contain, contain;
  background-position: right, left;
}
</style>
