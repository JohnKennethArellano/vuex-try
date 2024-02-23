<template>
    <nav class="relative h-full bg-gray-50 p-5" :class="{ 'collapsed': sidebarState }">
        <ul>
            <div class="w-full flex justify-center">
                <button @click="toggleSideBarSize">toggle</button>
            </div>
            <div class="flex justify-center w-full p-5">
                <span>Welcome, {{ userLogin }}</span>
            </div>
            <li v-for="(item, index) in links" :key="index">
                <div>
                    <div v-if="item.route">
                        <router-link :to="item.route">
                            <div class="inactiveRoute"
                                :class="{ 'activeRoute': $route.path === item.route, 'text-sm': sidebarState }">
                                <span>{{ item.label }}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </li>
            <div class="w-full flex justify-center absolute bottom-0">
                <button type="button" @click="logout"
                    class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Logout</button>
            </div>
        </ul>
    </nav>
</template>


<script setup>
import { useStore } from 'vuex';
import { computed, ref, } from 'vue';

const store = useStore();
const userLogin = computed(() => store.getters.getUser);
const sidebarState = computed(() => store.getters.getSidebarState);
const isCollapsed = ref(false)

const toggleSideBarSize = () => {
    isCollapsed.value = !isCollapsed.value
    store.dispatch('sideBar', isCollapsed)
}

const links = ref([
    { label: "Dashboard", route: "/about" },
    { label: "Dito Lang", route: "/features" },
    { label: "Dyang Lang", route: "/contact" },
])
const logout = () => {
    store.dispatch('logout')
        .then(router.push({ name: 'home' }))
}
</script>