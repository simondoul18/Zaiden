export const actions = {
  async setPlan({ dispatch }, { id, item }) {
    try {
      await this.$axios.put("users/" + id, {
        plan: item.id,
        isOnboardingDone: true,
      });
      await dispatch("addTransaction", {
        id: id,
        item: item.attributes,
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getAllPlans({ commit }) {
    try {
      const response = await this.$axios.get("/plans");
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  async addTransaction({ commit }, { id, item }) {
      try {
        await this.$axios.post("transactions", {
          data: {
            tokensPurchased: item.tokens,
            amount: item.amount,
            currency: item.currency,
            user: id,
          },
        });
        
    } catch (error) {
        throw error
    }
  },
};
