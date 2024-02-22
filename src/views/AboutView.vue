<template>
  <Loader v-if="loading"></Loader>
  <h1>{{ userLogin }}</h1>
  <button type="button" @click="logout"
    class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Logout</button>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const userLogin = computed(() => store.state.data.username);
const Loader = defineAsyncComponent(() => import('@/components/Loader.vue'))
const loading = computed(() => store.state.loading.showLoading)
const checkUser = () => {
  !userLogin.value ? router.push({ name: 'home' }) : router.push({ name: 'about' });
};
onMounted(() => {
  checkUser();
});
const logout = () => {
  store.dispatch('logout')
    .then(router.push({ name: 'home' }))
}
</script>
