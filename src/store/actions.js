export const actions = {
  async login({ commit }, user) {
    commit("setUser", user.username);
  },
  async checkuser() {
    alert("adajh");
  },
  async logout({ commit }) {
    commit("logout");
  },
  async sideBar({ commit }, value) {
    commit("sidebarToggle", value);
  },
};
