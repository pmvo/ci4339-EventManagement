import { defineStore } from 'pinia'
import axios from 'axios'


const apiURL = import.meta.env.VITE_ROOT_API

//defining a store
export const useLoggedInUserStore = defineStore({

  id: 'loggedInUser',
  state: () => {
    return {
      name: "",
      role: 0,
      isLoggedIn: false
    }
  },
// Get username, password value from the form and send to the simulated login API
// If the username and password match, set isAllowed to true and direct user to the home page using router
// If the username and password match, set isAllowed to false and prompt an error message
  actions: {
    async login(username, password) {
      try {
        console.log(username, password)
        // send axios post to backend along with username and password
        const response = await axios.post(`${apiURL}/users/login`, {username, password});
        console.log(response)
        if(response)
        {
        this.$patch({
          isLoggedIn: 'true',
          role: response.data.role,
          name: response.data.username
        });
        console.log(response)
        this.$router.push("/");
        
      }
      } catch (error) {
        console.log(error)
        alert("Invalid credentials. Please try again.");
      }
    },
    logout() {
      //Reset value after user log out
      this.$patch({
        name: "",
        role: 0,
        isLoggedIn: false
      });
    }
  }
});