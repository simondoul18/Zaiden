<template>
  <div>
        <v-snackbar
      v-model="snackbar"
      timeout="4000"
      color="red darken-2"
    >
      {{ snackbarError }}</v-snackbar>
    <span class="text-h4">Dashboard</span>
    <v-col>
      <v-text-field
        v-model="filter"
        label="Search Url to extract Contacts"
        outlined
        class="mt-3"
        append-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-center">
      <v-btn :disabled="loading" :loading="loading" class="primary mx-auto" @click="searchSingleURL">Search Url</v-btn>
    </v-col>
    <!-- <v-col class="d-flex justify-center ">
      <v-card class="py-4 px-6 rounded-pill overflowScroll" >
        <span class="mx-2">{{url || "URL"}} </span>
        <v-divider vertical />

        <span class="mx-2">{{emails || "Mails"}}</span>
        <v-divider vertical />
        <span class="mx-2">Links</span>
        <v-divider vertical />
        <span class="mx-2">Others</span>
      </v-card>
    </v-col> -->
    <!-- ********************* -->


<!--
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      Open Dialog
    </v-btn> -->

    <v-dialog
      v-model="dialog"
      max-width="340"
    >
      <v-card>
        <v-card-title class="text-h5">
          Searched URL
        </v-card-title>

        <v-card-text>
          {{url || "URL"}}
        </v-card-text>

        <v-card-title class="text-h5">
          Emails
        </v-card-title>

        <v-card-text>
          <ol>
            <template v-for="email in emails" >
              <li>{{email}}</li>
            </template>
          </ol>

        </v-card-text>

        <v-card-title class="text-h5">
          Links
        </v-card-title>

        <v-card-text>
          <ol>
            <template v-for="link in links" >
              <li>{{link}}</li>
            </template>
          </ol>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>



    <!-- ********************* -->
    <v-col class="d-flex justify-center flex-column">
      <v-data-table
        :headers="headers"
        :items="items"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-text-field
            class="mx-4 px-4"
            v-model="search"
            label="Search urls"
            append-icon="mdi-magnify"
            @click:append="searchFilter"
          ></v-text-field>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="openProject(item)">
              mdi-view-grid
            </v-icon>
          </template>
      </v-data-table>

      <v-col col="12" class="d-flex justify-end">
        <v-btn color="primary"> Export CSV </v-btn>
      </v-col>
    </v-col>
    <span class="text-h5">Analytics</span>
    <v-card tile>
      <apex-chart
        width="100%"
        height="400px"
        type="line"
        :options="options"
        :series="series"
      ></apex-chart>
    </v-card>
  </div>
</template>

<script>
  import {getErrorMessage} from '@/utils'
export default {
  layout: "dashboard",
  data() {
    return {
      dialog:false,
      loading:false,
      stripe:null,
      url:null,
      emails:null,
      filter:"",
      search: "",
      links:'',
      snackbar:false,
      snackbarError:null,
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
            2002, 2003,
          ],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 80, 77, 55, 76, 34],
        },
      ],
      headers: [
        { text: "URL", value: "url" },
        { text: "Email", value: "email" },
        { text: "Links", value: "links" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [],
      tempItems: [],
    };
  },
  async mounted() {
    this.initialize();
        // await this.$store.dispatch("plans/getAllPlans")

  },
  methods: {
    async initialize() {
      try {
        await this.$store.dispatch(
          "urlHistory/fetchAllItems",
          this.$auth.user.id
        );
        this.items = this.$store.getters["urlHistory/getItems"];
        this.tempItems = [...this.items];
      } catch (error) {

        this.error(error);
        console.log({ error });
      }
    },
    openProject(item){
      this.url = item.url;
      this.emails = item.email
      this.links = item.links
      this.dialog = true;
      console.log(item);
    },
   error(error){
    this.snackbar=true
    console.dir(error)
    this.snackbarError = getErrorMessage(error)
   },

    async searchFilter() {
      try {
        if (!this.search) return;
        await this.$store.dispatch("urlHistory/searchItems", {
          search: this.search,
          id: this.$auth.user.id,
        });
        this.items = this.$store.getters["urlHistory/getSearchedItems"];
      } catch (error) {
        console.log(error);
        this.error(error);

      }
    },




    async searchSingleURL(){
      try {
        this.loading = true;
        const res = await this.$store.dispatch("url/searchSingleURL",{ url: this.filter ,
            id:''
          });
        this.loading = false;
        this.initialize();
        this.openProject({url:res.url,email:res.emails,links:res?.socials})
        this.url = res.url;
        this.emails = res.emails;
      } catch (error) {
        this.loading = false;
        this.error(error);
        console.log(error)
        console.log({error})
      }
    }
  },
    watch: {
    search: {
      handler(value) {
        if (value.length === 0) {
          this.items = [...this.tempItems];
        }
      },
    },
  },
};
</script>

<style scoped>
table,
th,
td {
  border: 1px solid black;
}
th {
  min-width: 200px;
}
.overflowScroll{
  overflow-y: scroll;
}
</style>
