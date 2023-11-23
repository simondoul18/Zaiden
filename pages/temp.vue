<template>
  <div >
    <v-container>
      <v-row class="my-16">
        <v-col>
          <v-img
            max-height="319"
            max-width="331"
            contain
            :src="require('~/assets/home/bro.png')"
          />
        </v-col>
        <v-col class="mt-auto">
          <h2 class="text-6xl semibold text-center prime--text text--darken-4">
            <p style="line-height: 133%;">
              Find Any Public Email Address in Seconds
            </p>
          </h2>
          <p class="text-no-wrap text-lg regular prime--text text--darken-2" style="font-size: 18px;">
            A Simle Solution That only Requires a URL Address
          </p>
        </v-col>
        <v-col>
          <v-img
            max-height="303"
            max-width="307"
            conatain
            :src="require('~/assets/home/pana.png')"
          />
        </v-col>
      </v-row>
      <v-row class="my-16">
        <v-col md="4" offset-md="4">
          <div class="search prime lighten-4">
            <input
              type="text"
              class="searchTerm text-lg regular prime--text text--darken-2"
              placeholder="Enter a URL......."
            />
            <button type="submit" class="searchButton text-lg medium gradient-1">Find Email</button>
          </div>
        </v-col>
      </v-row>
      <v-row class="my-16">
        <v-col
          class="d-flex align-center ma-auto py-0 px-10 mr-7 "
          :style="{
            borderRight: `4px solid ${$vuetify.theme.dark ? '#1F0F24':'#EBEAEC'}`
          }
          "
          v-for="(feature, index) in features"
          :key="index"
        >
          <div :class="['picture',`shades lighten-${index+1}`]">
            <v-img
              max-height="40"
              max-width="40"
              contain
              :src="require(`~/assets/home/${feature.image}.png`)"
            />
          </div>
          <p class="prime--text text--darken-4 text-xl medium ml-7 mt-auto">{{ feature.text }}</p>
        </v-col>
      </v-row>
      <v-row class="my-16"  v-for="(feature, index) in briefFeatures" :key="index">
        <v-col :order="index % 2 == 0 ? 0 : 2" class="prime--text text--darken-4">
          <h2 class="text-50 semibold" style=" line-height: 133%">
            {{ feature.heading }}
          </h2>
          <p class="prime--text text-lg regular text--darken-2" >
            {{ feature.text1 }}
          </p>
          <p class="prime--text text-lg regular  text--darken-2">
            {{ feature.text2 }}
          </p>
        </v-col>
        <v-col >
          <v-img
            max-height="403"
            max-width="543"
            class="pa-5"
            :src="require(`~/assets/home/${feature.image}.png`)"
            contain
          />
        </v-col>
      </v-row>
      <v-row class="my-16 gradient-1" style="height: 350px;border-radius:16px;position: relative;">
        <v-img
            style="height: 120px; width: 148px; position:absolute;top:30px;right: 30px;"
            :src="require(`~/assets/home/dots1.png`)"
            contain
          />
          <v-img
            max-height="120"
            max-width="148"
            style="; position:absolute;bottom:30px;left: 30px;"
            :src="require(`~/assets/home/dots2.png`)"
            contain
          />
          <div class="ma-auto"> 
            <h2 class="text-50 semibold ma-auto white--text text-center mb-7" style="line-height: 133%;">
            Join The Waitlist
            </h2>
          
            <div >
                <input class="pa-3 text-lg regular" style="color:#8B828E;border-radius: 8px;width:417px;background: #F5F5F6;" type="text" placeholder="Enter Your Email">
                <button type="submit" class="text-lg medium prime--text text-darken-4 py-3 px-7 gradient-2 xs" style="border-radius: 8px;">Join Now</button>
            </div>
        </div>
          
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  layout:"temp",
  data() {
    return {
      features: [
        {
          image: "feature1",
          text: "Lead Generation for B2B or B2C",
        },
        {
          image: "feature2",
          text: "Verify if The email Adress is Valid",
        },
        {
          image: "feature3",
          text: "Project Folders for Better Organisation",
        },
      ],
      briefFeatures: [
        {
          image: "brief-feature1",
          heading: "Nurture and convert more leads faster.",
          text1:
            "From emails, phone numbers, to socials, you get multiple touch-points to connect with the people who matter most to your business.",
          text2:
            "Identify shortcomings in your outreach strategy — and recalibrate in time when they fail to respond.",
        },
        {
          image: "brief-feature2",
          heading: "Contacts with real people behind them.",
          text1:
            "Skeptical? DiggUpp comes with a 100% accuracy guarantee that ensures you get the most up-to-date info from millions of websites.",
          text2:
            "Each contact comes with online public sources and a verification score + badge for added reliability.",
        },
        {
          image: "brief-feature3",
          heading: "Like the air you breathe, DiggUpp is absolutely free.",
          text1:
            "If you’re reading this, you may have won Lady Luck over. Because we are only letting a rare few in on the chance to get early access for free while in beta. ",
          text2:
            "Think of it as a head-start to get in front of your potential clients before your rivals can even bat an eye. *evil laugh*",
        },
      ],
    };
  },

};
</script>
<style scoped>
.search {
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #5a4d5e;
  display: flex;
  padding: 5px;
}

.searchTerm {
  width: 100%;
  border: 3px solid #fff;
  border-right: none;
  height: 20px;
  padding-right: 10px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 18px;
  align-items: center;
  color: #aea7b0;
}

.searchTerm:focus {
  color: #fff;
}

.searchButton {
  white-space: nowrap;
  border: none;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  padding: 9px 20px 9px 20px;

  cursor: pointer;
  font-size: 18px;
}

.picture {
  padding: 20px;
  border-radius: 8px;
}
</style>
