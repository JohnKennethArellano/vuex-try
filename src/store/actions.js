export const actions = {
  async login({ commit }, user) {
    commit("showLoading", true);
    setTimeout(() => {
      commit("setUser", user.username);
      commit("showLoading", false);
    }, 2000);
  },
  async checkuser() {
    alert("adajh");
  },
  async logout({ commit }) {
    commit("showLoading", true);
    setTimeout(() => {
      commit("logout");
      commit("showLoading", false);
    }, 2000);
  },
};
