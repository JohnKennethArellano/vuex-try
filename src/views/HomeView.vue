<template>
  <div class="shadow-lg p-8 rounded-md">
    <form @submit.prevent="submitForm" class="flex flex-col h-auto w-auto">
      <span class="w-full flex justify-center">
        <h1 class="font-bold text-3xl text-gray-700">Login</h1>
      </span>
      <div class="flex flex-col w-auto h-auto mb-2">
        <label for="email" class="w-full h-auto">Email</label>
        <input type="text" v-model="formdata.email"
          class="w-[20vw] py-2 px-4 outline-none focus:ring rounded text-md border border-gray-400">
        <p v-for="error in $v.email.$errors" :key="error.$uid" class="text-red-500 text-xs w-full ">{{
          error.$message }}
        </p>
      </div>
      <div class="flex flex-col w-auto h-auto mb-2">
        <label for="password" class="w-full h-auto">Password</label>
        <input type="text" v-model="formdata.password"
          class="w-[20vw] py-2 px-4 outline-none focus:ring rounded text-md border border-gray-400">
        <p v-for="error in $v.password.$errors" :key="error.$uid" class="text-red-500 text-xs w-full ">{{
          error.$message }}
        </p>
      </div>
      <button type="submit" class="border rounded-lg relative h-[3vw] flex items-center justify-center">
        <Loader v-if="loading"></Loader>
        <span v-else>Log in</span>
      </button>
      <span class="w-full flex justify-center mt-3 text-sm">
        <router-link to="/register">Register here</router-link>
      </span>
    </form>
  </div>
</template>


<script setup>
import { reactive, computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import db from '../firebase/init'
import { collection, addDoc } from 'firebase/firestore'

const Loader = defineAsyncComponent(() => import('../components/LoadingButton.vue'))

const router = useRouter()
const store = useStore()
const formdata = reactive({
  email: '',
  password: '',
})
const numberCheck = (value) => /\d/.test(value);
const loading = computed(() => store.state.loading.showLoading)
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('email required', required),
    },
    password: {
      required: helpers.withMessage('Password required', required),
    },
  }
})
const $v = useVuelidate(rules, formdata)
const submitForm = async (ev) => {
  ev.preventDefault();
  const result = await $v.value.$validate();
  if (result) {
    registerUser(ev)
  }
}

function registerUser(ev) {
  ev.preventDefault()
  store.dispatch("login", formdata)
    .then((data) => {
      console.log(data)
      if (data.message == "wrong credentials") {
        console.log(data.message)
        Swal.fire({
          text: data.message,
          icon: 'error',
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          formdata.email = '',
            formdata.password = '',
            $v.value.$reset()
        })
      }
      else {
        router.push({
          path: '/about',
        })
      }

    })
    .catch((error) => {
      console.log(error)
    })
}

</script>