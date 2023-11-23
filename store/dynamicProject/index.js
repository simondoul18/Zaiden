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
    searchItems(state, items) {
      state.searchedItems = items;
  },
};



export const actions = {
    async fetchAllItems({ commit }, {user, projectId}) {
      try {
        const response = await this.$axios.get(
            `projects/${projectId}?filters[user][id][$eq]=${user}&populate=url_histories.url&pagination[limit]=10`
        );
        const items = [];
        response.data.data.attributes.url_histories.data.forEach((urlHistory) => {
            items.push({
              url: urlHistory.attributes.url.data.attributes.url,
              email: urlHistory.attributes.url.data.attributes.emails,
              links: urlHistory.attributes.url.data.attributes.socials,
            });
          });
        
        commit("setItems", items);
      } catch (error) {
        throw new Error(error);
      }
    },

    async searchItems({ commit }, { search, id }) {
      try {
        const response = await this.$axios.get(
          `url-histories?populate=url&filters[project][id][$eq]=${id}&filters[url][url][$containsi]=${search}&pagination[limit]=10`
        );
        const searchedItems = [];
        response.data.data.forEach((urlHistory) => {
          searchedItems.push({
            url: urlHistory.attributes.url.data.attributes.url,
            email: urlHistory.attributes.url.data.attributes.emails,
            links: urlHistory.attributes.url.data.attributes.socials,
          });
        });
        commit("searchItems", searchedItems);
      } catch (error) {
        throw new Error(error);
      }
    },
};
