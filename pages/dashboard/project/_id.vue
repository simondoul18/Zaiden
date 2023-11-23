<template>
  <div>
    <v-snackbar v-model="snackbar" timeout="4000" color="red darken-2">
      {{ snackbarError }}</v-snackbar
    >
    <span class="text-h4">{{ getName }} Details</span>
    <v-col>
      <v-text-field
        v-model="filter"
        label="Search Url to extract Contacts"
        outlined
        class="mt-3"
        append-icon="mdi-magnify"
      >
      </v-text-field>
    </v-col>
    <v-col class="d-flex justify-center">
      <v-btn
        :disabled="loading"
        :loading="loading"
        @click="searchSingleURL"
        class="primary mx-auto"
        >Search Url</v-btn
      >
    </v-col>
    <!-- <v-col class="d-flex justify-center">
      <v-card class="py-4 px-6 rounded-pill overflowScroll">
        <span class="mx-2">{{ url || "URL" }} </span>
        <v-divider vertical />

        <span class="mx-2">{{ emails || "Mails" }}</span>
        <v-divider vertical />
        <span class="mx-2">Links</span>
        <v-divider vertical />
        <span class="mx-2">Others</span>
      </v-card>
    </v-col> -->

    <!-- ******************** -->
    <v-dialog v-model="dialog" max-width="340">
      <v-card>
        <v-card-title class="text-h5"> Searched URL </v-card-title>

        <v-card-text>
          {{ url || "URL" }}
        </v-card-text>

        <v-card-title class="text-h5"> Emails </v-card-title>

        <v-card-text>
          <ol>
            <li v-for="(email, index) in emails" :key="index">{{ email }}</li>
          </ol>
        </v-card-text>

        <v-card-title class="text-h5"> Links </v-card-title>

        <v-card-text>
          <ol>
            <li v-for="(link, index) in links" :key="index">{{ link }}</li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ******************** -->

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
import { getErrorMessage } from "@/utils";
export default {
  layout: "dashboard",
  data() {
    return {
      loading: false,
      links: "",
      dialog: false,
      emails: null,
      url: null,
      filter: "",
      search: "",
      projectId: "",
      snackbar: false,
      snackbarError: null,
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
        { text: "EMail", value: "email" },
        { text: "Links", value: "links" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [],
      tempItems: [],
    };
  },
  mounted() {
    this.projectId = this.$route.params.id;
    this.initialize();
  },
  computed:{
      getName(){
        return this.$route?.query?.u || "Project"
      }
  },
  methods: {
    error(error) {
      this.snackbar = true;
      this.snackbarError = getErrorMessage(error);
    },
    async initialize() {
      try {
        await this.$store.dispatch("dynamicProject/fetchAllItems", {
          user: this.$auth.user.id,
          projectId: this.projectId,
        });
        this.items = this.$store.getters["dynamicProject/getItems"];
        this.tempItems = [...this.items];
      } catch (error) {
        this.error(error);
        console.log({ error });
      }
    },

    openProject(item) {
      this.url = item.url;
      this.emails = item.email;
      this.links = item.links;
      this.dialog = true;
      console.log(item);
    },

    async searchFilter() {
      try {
        if (!this.search) return;
        await this.$store.dispatch("dynamicProject/searchItems", {
          search: this.search,
          id: this.projectId,
        });
        this.items = this.$store.getters["dynamicProject/getSearchedItems"];
      } catch (error) {
        this.error(error);
        console.log(error);
      }
    },

    async searchSingleURL() {
      try {
        this.loading = true;
        const res = await this.$store.dispatch("url/searchSingleURL", {
          url: this.filter,
          id: this.projectId,
        });
        this.loading = false;

        this.initialize();
        this.openProject({
          url: res.url,
          email: res.emails,
          links: res?.socials,
        });
        this.url = res.url;
        this.emails = res.emails;
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.error(error);
      }
    },
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

.overflowScroll {
  overflow-y: scroll;
}
</style>
