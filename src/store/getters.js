import { state } from "./states";

export const getters = {
  getUser: (state) => {
    return state.data.username;
  },
};
