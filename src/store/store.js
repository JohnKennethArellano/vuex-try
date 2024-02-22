import { createStore } from "vuex";
import { useRouter } from "vue-router";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { state } from "./states";
import createPersistedState from "vuex-persistedstate";
const router = useRouter();

const store = createStore({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState()],
});

export default store;
