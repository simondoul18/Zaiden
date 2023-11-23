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
    async fetchAllItems({ commit }, user) {
      try {
        const response = await this.$axios.get(
          `/url-histories?populate[0]=url&filters[user][id][$in][0]=${user}&pagination[limit]=10`
        );
        const items = [];
        response.data.data.forEach((urlHistory) => {
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
          `/url-histories?populate=url&filters[user][id][$eq]=${id}&filters[url][url][$containsi]=${search}&pagination[limit]=10`
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
