export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user;
  },
};

export const actions = {
  async editUser({ commit }, { userid, username, password }) {
    try {
      const response = await this.$axios.put(`users/${userid}`, {
        username: username,
        password: password,
      });
      console.log(response);
    } catch (error) {
      throw error;
    }
  },
  async checkSubscription({commit}){
    try {
      const response = await this.$axios.get('subscriptions')
      return response
    } catch (error) {
      throw new Error(error)
    }
  },
  async createSession({commit},id){
    try {
      const response =await this.$axios.get(`session?id=${id}`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

};



export const strict = false
