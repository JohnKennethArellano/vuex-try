export const actions = {
  async login({ commit }, user) {
    commit("showLoading", true);
    return new Promise((resolve, reject) => { // Return a Promise
      setTimeout(() => {
        commit("setUser", user.username);
        commit("showLoading", false);
        resolve(); // Resolve the Promise upon successful login
      }, 2000);
    });
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
