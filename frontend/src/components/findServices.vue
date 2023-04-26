<script>
import { DateTime } from 'luxon'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { useLoggedInUserStore } from "@/store/loggedInUser";
export default {
  data() {
    return {
      services: [],
      // Parameter for search to occur
      searchBy: 'Service Name',
      serviceName: '',
      status: 'Active'
    }
  },
  setup() {
    const user = useLoggedInUserStore();
    return { user };
  },
  mounted() {
    this.getServices()
  },
  methods: {    
    handleSubmitForm() {
      // search event based on service name and status
       let endpoint = ''
       if (this.searchBy === 'Service Name') {
         endpoint = `services/search/?name=${this.serviceName}&searchBy=name`
       }
       else if (this.searchBy === 'Status'){
        endpoint = `services/search/?status=${this.status}&searchBy=status`
       }
       axios.get(`${apiURL}/${endpoint}`).then((res) => {
         this.services = res.data
       })
     },
    // abstracted method to get events
    getServices() {
       axios.get(`${apiURL}/services`).then((res) => {
         this.services = res.data
       })
      window.scrollTo(0, 0)
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = 'Service Name'
      this.serviceName = ''
      this.status = 'Active'
      this.getServices()
    },
    // go to edit service page with the service id
    editService(serviceID) {
      this.$router.push({ name: 'editservice', params: { id: serviceID } })
    },
    // soft delete service by turning service 'Active' status to 'Inactive'
    deactivateService(id)
    {
      axios.put(`${apiURL}/services/updatestatus/${id}`)
      .then((res) =>
      {
        if (res)
        {
          alert("Service is deactivated")
          this.$router.back()
        }
        
        else{console.log("Fail")}
      })
      .catch((err) => {
        console.error(err);
      });
          }
    
  }
}
</script>

<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Search Services
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Service Name</h2>
        <!-- Displays Service Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Service Name">Service Name</option>
            <option value="Status">Service Status</option>
          </select>
        </div>
        
        <div class="flex flex-col col-sm" v-if="searchBy === 'Service Name'">
          <label class="block">
            <input
              type="text"
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="serviceName"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter service name"
            />
          </label>
        </div>
        <div class="flex flex-col col-sm" v-if="searchBy === 'Status'">
          <label class="block">
            <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="status"
          >
            <option value="Active" selected>Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
          </label>
        </div>
        <div></div>
        <div></div>
        <div class="flex flex-col">
            <button class=" mr-10 bg-red-700 text-white rounded" @click="handleSubmitForm" type="submit">
              Search Service
            </button>
            <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >
            Clear Search
          </button>
          </div>
      </div>
      <div></div>
      <div></div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">Search Result</h2>
       <!-- <h3 class="italic">Click table row to edit/display an entry</h3>-->
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Service Status</th>
              <th class="p-4 text-left">Service Description</th>
              <th v-if="user && user.role === '1'" class="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="user.role === '1' && editService(service._id)"
              v-for="service in services"
              :key="service._id"
            >
              <td class="p-2 text-left">{{ service.name }}</td>
              <td class="p-2 text-left">{{ service.status }}</td>
              <td class="p-2 text-left">{{ service.description }}</td>
              <td class="p-2 text-left">
                <button v-if="user && user.role === '1' && service.status === 'Active'" class="bg-red-700 text-white rounded" @click="deactivateService(service._id)">Deactivate</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
