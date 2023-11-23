<template>
  <div>
    <v-col>
      <h4 class="text-h4">Dashboard</h4>
      <v-text-field
        v-model="search"
        label="Lorem ipsum dolor sit amet"
        outlined
        clearable
        class="mt-3"
        append-icon="mdi-magnify"
        clear-icon="mdi-close-circle"
        @click:append="searchFilter"
        @click:clear="clearFilter"
      ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-end pt-0">
      <v-btn
        class="mr-0 primary white--text"
        @click="showAddDialog = !showAddDialog"
        >Create New project</v-btn
      >
    </v-col>
    <!-- <div class="d-flex flex-wrap gutters-sm justify-center mb-2">
      <h5 class="text-h5 col-12">Quick Access</h5>
      <v-card
        class="mx-1 white flex-column pt-1 ma-1 rounded-xl"
        height="220"
        width="220"
        v-for="(item, index) in 10"
        :key="index"
      >
        <div class="ma-5">
          <div class="my-2 primary--text subtitle-2 font-weight-bold">
            App Development
          </div>
          <div class="font-weight-bold caption">Core UI Team</div>
          <div class="mb-3 font-weight-bold caption">2 Weeks Left</div>
          <v-divider class="mb-3"></v-divider>
          <div class="d-flex">
            <div class="flex-column">
              <div class="caption font-weight-bold text-center">Team</div>
              <div style="display: flex">
                <v-avatar size="25" class="mr-1">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
                <v-avatar size="25" class="mr-1">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
                <v-avatar size="25">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
              </div>
            </div>
            <v-spacer />
            <div class="flex-column caption font-weight-bold">
              <div>Progress</div>
              <div>87 %</div>
            </div>
          </div>
        </div>
      </v-card>
    </div> -->

    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="projects"
          sort-by="name"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Projects</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="openProject(item.id,item.name)">
              mdi-view-grid
            </v-icon>
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog
      v-model="showAddDialog"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="pa-12">
        <h3>{{ formTitle }}</h3>
        <v-form @submit.prevent="handleNewProjectSubmit">
          <v-text-field
            name="name"
            label="Name"
            v-model="project.name"
            id="id"
          ></v-text-field>
          <v-btn :loading="loading" color="success" type="submit">{{
            formTitle
          }}</v-btn>
          <v-btn text @click="close">Cancel</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      search: "",
      showAddDialog: false,
      dialogDelete: false,
      editedIndex: -1,
      loading: false,
      project: {
        name: null,
      },
      defaultProject: {
        name: null,
      },
      headers: [
        {
          text: "Project Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      projects: [],
      tempArrayofProjects: [],
    };
  },

  methods: {
    async initialize() {
      try {
        await this.$store.dispatch(
          "projects/fetchAllItems",
          this.$auth.user.id
        );
        this.projects = this.$store.getters["projects/getItems"];
        this.tempArrayofProjects = [...this.projects];
      } catch (error) {
        console.log({ error });
      }
    },
    async handleNewProjectSubmit() {
      this.loading = true;
      try {
        if (this.editedIndex > -1) {
          await this.$store.dispatch("projects/editItem", {
            id: this.project.id,
            item: {
              ...this.project,
              user: this.$auth.user.id,
            },
            index: this.editedIndex,
          });
          Object.assign(this.projects[this.editedIndex], { ...this.project });
        } else {
          const data = await this.$store.dispatch("projects/addItem", {
            item: {
              ...this.project,
              user: this.$auth.user.id,
            },
          });
          console.log({data})
          const newProject = Object.assign({},this.project)
          console.log({newProject})
        console.log([...this.projects]);

          // this.projects.push({ ...newProject, id: data.data.data.id });
        }
        this.tempArrayofProjects = [...this.projects];
        console.log(this.projects);

        this.close();
      } catch (error) {
        console.log(error);
      }

      this.loading = false;
    },
    editItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.project = Object.assign({}, item);
      console.log(this.project);
      this.showAddDialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.project = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        await this.$store.dispatch("projects/deleteItem", {
          id: this.$auth.user.id,
          index: editedIndex,
        });
        this.projects.splice(this.editedIndex, 1);
      } catch (error) {
        console.log(error);
      }

      this.closeDelete();
    },

    close() {
      this.showAddDialog = false;
      console.log("inside close")
      this.$nextTick(() => {
        this.project = Object.assign({}, this.defaultProject);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.project = Object.assign({}, this.defaultProject);
        this.editedIndex = -1;
      });
    },

    openProject(id,name) {
      this.$router.push({path :`project/${id}` , query:{
        u:name
      }});
    },

    async searchFilter() {
      try {
        if (!this.search) return;
        await this.$store.dispatch("projects/searchItems", {
          search: this.search,
          id: this.$auth.user.id,
        });
        this.projects = this.$store.getters["projects/getSearchedItems"];
      } catch (error) {
        console.log(error);
      }
    },

    clearFilter() {
      this.search = "";
      this.projects = [...this.tempArrayofProjects];
    },
  },
  created() {
    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Project" : "Edit Project";
    },
  },
  watch: {
    search: {
      handler(value) {
        if (value.length === 0) {
          this.projects = [...this.tempArrayofProjects];
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
  border: 1px solid lightblue;
}
th {
  min-width: 200px;
}
</style>
