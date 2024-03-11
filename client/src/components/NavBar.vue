<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SettingsModal from './SettingModal.vue' // Adjust the path as necessary

const router = useRouter()

const store = useStore()

// Now `ref` is correctly imported and can be used to define `isDropdownOpen`
const isDropdownOpen = ref(false)
const isSettingsModalOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const toggleSettingsModal = () => {
  isSettingsModalOpen.value = !isSettingsModalOpen.value
}

const emit = defineEmits(['place-data'])

const searchTerm = reactive({
  query: '',
  timeout: null,
  results: null
})

const logout = async () => {
  await store.dispatch('logout')
  router.push({ name: 'auth' })
}

const handleSearch = () => {
  clearTimeout(searchTerm.timeout)
  searchTerm.timeout = setTimeout(async () => {
    if (searchTerm.query !== '') {
      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=268a382396414e2683593425240903&q=${searchTerm.query}`
      )
      const data = await res.json()
      searchTerm.results = data
    } else {
      searchTerm.results = null
    }
  }, 500)
}

const getWeather = async (id) => {
  const token = store.state.token
  const res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=268a382396414e2683593425240903&q=id:${id}&days=3&aqi=no&alerts=no`
  )
  const data = await res.json()

  const weatherData = {
    locationName: data.location.name,
    temperature: Math.round(data.current.temp_c),
    localTimeHr:
      new Date(data.location.localtime).getHours() +
      ':' +
      new Date(data.location.localtime).getMinutes(),
    currentTemp: data.current.temp_c,
    ConditionText: data.current.condition.text,
    currentWind: data.current.wind_kph,
    currentHumidity: data.current.humidity,
    currentPrecip: data.current.precip_mm,
    currentDirection: data.current.wind_dir,
    currentFeels: data.current.feelslike_c,
    currentUV: data.current.uv
  }
  console.log(weatherData)

  // Dispatch action to save the location
  await store.dispatch('addLocation', { locationData: weatherData, token: token })

  emit('place-data', data)

  searchTerm.query = ''
  searchTerm.results = null
}
</script>

<template>
  <div>
    <nav
      class="relative flex w-full flex-wrap items-center justify-between bg-neutral-100 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-4"
      data-twe-navbar-ref
    >
      <div class="flex w-full flex-wrap items-center justify-between px-3 lg:justify-start">
        <!-- Search field within nav -->
        <div class="lg:flex-grow">
          <form class="flex w-full max-w-xs">
            <div
              class="bg-white border border-indigo-600/30 rounded-lg shadow-lg flex items-center"
            >
              <i class="fa-solid fa-magnifying-glass p-2 text-indigo-600"></i>
              <input
                type="text"
                placeholder="Search for a place"
                class="rounded-r-lg p-2 border-0 outline-0 focus:ring-2 focus:ring-indigo-600 ring-inset w-full"
                v-model="searchTerm.query"
                @input="handleSearch"
              />
            </div>
          </form>
        </div>

        <!-- Date -->

        <!-- <div class="text-center flex-1">
        {{
          new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }}
      </div> -->

        <!-- Avatar and dropdown -->
        <div class="relative" data-twe-dropdown-ref>
          <a
            class="flex items-center whitespace-nowrap text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            @click="toggleDropdown"
            aria-expanded="false"
          >
            <img
              src="https://tecdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
              class="rounded-full"
              style="height: 22px; width: 22px"
              alt="Avatar"
              loading="lazy"
            />
            <span class="ps-1 [&>svg]:w-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </a>
          <ul
            :class="{ hidden: !isDropdownOpen, block: isDropdownOpen }"
            class="dark:bg-surface absolute left-auto right-0 z-[1000] m-0 min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-surface-dark"
            aria-labelledby="dropdownMenuButton2"
            data-twe-dropdown-menu-ref
          >
            <li>
              <button
                @click="toggleSettingsModal"
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-black dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
              >
                Settings
              </button>
            </li>

            <li>
              <button
                @click="logout"
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-black dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                href="#"
                data-twe-dropdown-item-ref
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
            <SettingsModal v-if="isSettingsModalOpen" @close="isSettingsModalOpen = false"/>

      </div>
    </nav>

    <!-- search suggestions -->
    <div class="bg-white my-2 rounded-lg shadow-lg">
      <div v-if="searchTerm.results !== null">
        <div v-for="place in searchTerm.results" :key="place.id">
          <button
            @click="getWeather(place.name)"
            class="px-3 my-2 hover:text-indigo-600 hover:font-bold w-full text-left"
          >
            {{ place.name }}, {{ place.region }}, {{ place.country }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  /* Add your existing navbar styles here */
}
</style>
