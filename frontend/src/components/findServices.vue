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
      searchBy: '',
      serviceSearchValue: '',
      status: 'Active'
    }
  },
  setup() {
    const user = useLoggedInUserStore();
    return { user };
  },
  created() {
    this.getServices()
  },
  methods: {
    // search event based on service name, description and status
    handleSubmitForm() {
      let endpoint = ''
      if (this.searchBy) {
        endpoint = `services/searchservices/?serviceSearchValue=${this.serviceSearchValue}&searchBy=${this.searchBy}`
      }
      else{
        alert("invalid searchBy")
      }
      axios.get(`${apiURL}/${endpoint}`).then((res) => {
        this.services = res.data
      })
    },
    // abstracted method to get top 20 services
    getServices() {
      axios.get(`${apiURL}/services`).then((res) => {
        this.services = res.data
      })
      window.scrollTo(0, 0)
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.serviceName = ''
      this.status = 'Active'
      this.getServices()
      
    },
    editService(serviceID) {
    //route to edit service page when clicking on a certain service
      this.$router.push({ name: 'editservice', params: { id: serviceID } })
    },
    // soft delete service by turning service 'Active' status to 'Inactive' status
    deactivateService(id)
    {
      axios.put(`${apiURL}/services/updatestatus/${id}`)
      .then((res) =>
      {
        if (res)
        {
          alert("Service is deactivated")
          this.$router.push({ name: 'findservices' })
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
        List of Services
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Search Service By</h2>
        <!-- Displays Service Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="status">Service Status</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="serviceSearchValue"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter service name"
            />
          </label>
        </div>
        <!-- Displays Service Description search field -->
        <div class="flex flex-col" v-if="searchBy === 'description'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            v-model="serviceSearchValue"
            v-on:keyup.enter="handleSubmitForm"
            placeholder="Enter service description"
          />
        </div>
        <div class="flex flex-col col-sm" v-if="searchBy === 'status'">
          <label class="block">
            <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="serviceSearchValue"
            v-on:keyup.enter="handleSubmitForm"
          >
            <option value="Active" selected>Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
          </label>
        </div>
        <div></div>
        <div></div>
      </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div></div>
          <div></div>
          <div class="mt-5 grid-cols-2">
            <button
              class="mr-10 border border-red-700 bg-white text-red-700 rounded"
              @click="clearSearch"
              type="submit"
            >
              Clear Search
            </button>
            <button
              class="bg-red-700 text-white rounded"
              @click="handleSubmitForm"
              type="submit"
            >
              Search Service
            </button>
          </div>
        </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
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
              <td class="p-2 text-left"><p :style="{ color: service.status === 'Inactive' ? 'red' : 'green', fontWeight: service.status === 'Inactive' ? 'bold' : 'normal' }">{{ service.status}}</p></td>
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
