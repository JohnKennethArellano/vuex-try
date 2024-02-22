<template>
  <div>
    <form @submit.prevent="submitForm" class="flex flex-col h-auto w-auto">
      <div class="flex flex-col w-auto h-auto mb-2">
        <label for="username" class="w-full h-auto">Username</label>
        <input type="text" v-model="formdata.username"
          class="w-[20vw] py-2 px-4 outline-none focus:ring rounded text-md border border-gray-400">
        <p v-for="error in $v.username.$errors" :key="error.$uid" class="text-red-500 text-xs w-full ">{{
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
      <button type="submit">Submit</button>
    </form>
  </div>
</template>


<script setup>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router';

import db from '../firebase/init'
import { collection, addDoc } from 'firebase/firestore'



const router = useRouter()
const store = useStore()
const formdata = reactive({
  username: '',
  password: '',
})

const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage('Username required', required),
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

const registerUser = async (e) => {
  e.preventDefault
  // const colRef = collection(db, 'user')
  // const docRef = await addDoc(colRef, formdata)
  // console.log(docRef)
  store.dispatch("login", formdata)
    .then(
      router.push({ name: 'about' })
    )
}
</script>