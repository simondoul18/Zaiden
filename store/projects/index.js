export const state = () => ({
  items: [],
  searchedItems: [],
});

export const getters = {
  getItems(state) {
    return state.items;
  },
  getSearchedItems(state) {
    return state.searchedItems;
  },
};

export const mutations = {
  setItems(state, items) {
    state.items = items;
  },
  addItem(state, item) {
    state.items.push({...item});
  },
  editItem(state, { item, index }) {
    Object.assign(state.items[index], item);
  },
  deleteIte(state, index) {
    state.items.splice(index, 1);
  },
  searchItems(state, items) {
    state.searchedItems = items;
  },
};

export const actions = {
  async fetchAllItems({ commit }, user) {
    try {
      const response = await this.$axios.get(
        `/projects?filters[user][id][$eq]=${user}&pagination[limit]=10`
      );
      const items = response.data.data.map((project) => {
        return {
          id: project.id,
          ...project.attributes,
        };
      });
      commit("setItems", items);
    } catch (error) {
      throw new Error(error);
    }
  },

  async addItem({ commit }, { item }) {
    try {
      const response = await this.$axios.post("/projects/", {
        data: {
          ...item,
        },
      });
      delete item.user;
      const data = {
        id: response.data.data.id,
        ...item,
      };
      commit("addItem", data);
      console.log(response)
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },

  async editItem({ commit }, { id, item, index }) {
    try {
      await this.$axios.put("/projects/" + `${id}`, {
        data: {
          ...item,
        },
      });
      delete item.user;
      commit("editItem", { item, index });
    } catch (error) {
      throw new Error(error);
    }
  },

  async deleteItem({ commit }, { id, index }) {
    try {
      await this.$axios.delete("/projects/" + `${id}`);
      commit("deleteItem", index);
    } catch (error) {
      throw new Error(error);
    }
  },

  async searchItems({ commit }, { search, id }) {
    try {
      const response = await this.$axios.get(
        `/projects?fields=name&sort=name:desc&filters[name][$containsi]=${search}&filters[user][id][$eq]=${id}&pagination[limit]=10`
      );
      const searchedItems = response.data.data.map((project) => {
        return {
          id: project.id,
          ...project.attributes,
        };
      });
      commit("searchItems", searchedItems);
    } catch (error) {
      throw new Error(error);
    }
  },
};
