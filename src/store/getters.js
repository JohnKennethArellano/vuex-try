import { state } from "./states";

export const getters = {
  getUser: (state) => {
    return state.data.username;
  },
  getSidebarState: (state) => {
    return state.sidebar.collapsed;
  },
};
