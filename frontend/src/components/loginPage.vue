
<template>
    <div class="login">
        <h1
      class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >
      Login Page
    </h1>
      <br>
      <form id="login" @submit.prevent="store.login(username, password)" novalidate="true">
        <div class="flex flex-col">
            <label class="username">
              <span class="text-gray-700">Username</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder ="Username" required
                v-model="username"
              />
            </label>
          </div>
        <div class="flex flex-col">
            <label class="password">
              <span class="text-gray-700">Password</span>
              <input
                type="password"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder ="Password" required
                v-model="password"
              />
            </label>
        </div>
        <div class="flex justify-between mt-10 mr-20">
        <button class="bg-red-700 text-white rounded" >
          Login
        </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { useLoggedInUserStore } from "@/store/loggedInUser";
  // Include the useLoggedInUserStore from the loggedInUser child component
  // Get the prop data including username and password
  export default {
    data: () => {
      return {
        username: "",
        password: "",
      };
    },
    setup() {
      const store = useLoggedInUserStore()
      return {
        store,
      }
    }
  };
  </script>
  
  <style>
  .login {
    max-width: 400px;
    margin: 0 auto;
  }
  label, input, button {
    display: block;
    margin-bottom: 10px;
  }
  .error {
    color: red;
    margin-top: 100px;
  }
  </style>