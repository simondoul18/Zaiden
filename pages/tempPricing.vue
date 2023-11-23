<template>
  <div>
    <v-container>
      <h2 class="text-5xl prime--text text--darken-4 semibold text-center">
        Ready to Get Started?
      </h2>
      <p class="text-lg regular prime--text text-center text--darken-2">
        Choose a Plan for Your Needs
      </p>
      <div class="justify-center d-flex align-center">
        <span class="mr-4">Monthly</span>
        <v-switch
          v-model="switch1"
          inset
          color="red"
          label="Yearly"
        ></v-switch>
      </div>
      <v-row class="mb-15">
        <v-col  v-for="(price,index) in pricing" :key="index"  :class="['pa-10','prime--text',price.color, index % 2 == 1 ? 'gradient-1': ($vuetify.theme.dark ? 'darkbg':'lightbg') ,index % 2 == 1 ? 'mx-5':'']" style="border-radius: 8px;" >
          <div style="height: 698px;" class="d-flex flex-column justify-space-between">
            <div>
              <h3 :class="['text-3xl medium', index % 2 == 0 ?'prime--text text--darken-3':'white--text']">{{price.title}}</h3>
              <h3 class="text-5xl semibold mb-4">{{price.price}}</h3>
              <p class="text-lg regular mb-7">Per Year</p>
              <button style="min-width: 100%;" :class="['mb-7 radius-8 d-flex justify-center py-4',index % 2 == 0 ? ($vuetify.theme.dark ? 'gradient-outline-dark1':'gradient-outline-gray') : 'white-border']"><span>Try 7 Days for Free</span></button>
              <p class="text-lg semibold">{{price.include}}</p>
              <div v-for="(feature,ind) in price.features" class="d-flex align-center mb-6">
                <v-img
                  max-height="20"
                  max-width="20"
                  :src="require(`~/assets/pricing/${price.tick}.png`)"
                />
                <p  class="ml-2 my-auto text-base medium">
                  {{feature}}
                </p>
              </div>
            </div>
            <div :class="['radius-8 white--text',index % 2 == 0 ? '' : 'white']">
              <button style="min-width: 100%;" :class="['radius-8 text-lg medium d-flex justify-center py-4',index % 2 == 0 ? 'gradient-1' : 'text-gradient-1']"><span>See All Features</span></button>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-slider
          readonly
          :value="value"
        >
        <template v-slot:prepend>
            

                <p class="semibold text-3xl prime--text text--darken-4">{{value}}</p>
               
           
              </template>
        <template v-slot:append>
            <div>

                <p class="semibold text-3xl prime--text text--darken-4">100</p>
                <p class="text-no-wrap regular text-lg prime--text text--darken-2">Active Tokens</p>
            </div>
              </template>
    </v-slider>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: "temp",
  data() {
    return {
      switch1: true,
      value:75,
      pricing:[
        {
            title:"Lite",
            price:"$ 45.00",
            include:"Lite Includes:",
            tick:"blue-bg-tick",
            features:[
                "5 Social Media Account",
                "Free Platform Access",
                "24/7 Customer Support"
            ],
            color:"text--darken-4",
            background: this.$vuetify.theme.dark ? 'darkbg':'lightbg'
        },
        {
            title:"Pro",
            price:"$ 56.00",
            include:"Pro Includes:",
            tick:"white-bg-tick",
            features:[
                "5 Social Media Account",
                "Free Platform Access",
                "24/7 Customer Support",
                "Sapien sagittis, tortor"
            ],
            color:"white--text",
            background:"gradient-1"
        },
        {
            title:"Ultimate",
            price:"$ 75.00",
            include:"Ultimate Includes:",
            tick:"blue-bg-tick",
            features:[
                "5 Social Media Account",
                "Free Platform Access",
                "24/7 Customer Support",
                "Sapien sagittis, tortor",
                "Nunc, lectus scelerisque"
            ],
            color:"text--darken-4",
            background: this.$vuetify.theme.dark ? 'darkbg':'lightbg'

        }
      ]
    };
  },
};
</script>
<style scoped>
.darkbg{
    background: #2a1934 !important;
}
.lightbg{
    background: #f5f5f6 !important;
}
.white-border{
    border:1px solid white ;
}

</style>
