<template>
  <div>
    <!-- Main modal -->
    <div
      v-if="showModal"
      tabindex="-1"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-4 w-full max-w-md h-full overflow-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Create Notification</h3>
            <button
              @click="closeModal"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <form class="p-4 md:p-5" @submit.prevent="submitForm">
            <div class="mb-6">
              <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Time</label
              >
              <input
                type="time"
                id="time"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <!-- Email Input & List -->
            <div class="mb-4">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email IDs</label
              >
              <div class="flex">
                <input
                  type="email"
                  v-model="newEmail"
                  @keyup.enter="addEmail"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="example@example.com"
                />
                <button
                  @click="addEmail"
                  type="button"
                  class="ml-2 text-white bg-green-500 hover:bg-green-600 rounded-lg text-sm px-2 py-1"
                >
                  Add
                </button>
              </div>
              <ul class="email-list mt-4">
                <li
                  v-for="(email, index) in emails"
                  :key="index"
                  class="flex justify-between items-center bg-gray-100 rounded-md p-2 mb-2 hover:bg-gray-200"
                >
                  <span class="text-sm font-medium text-gray-900">{{ email }}</span>
                  <button
                    @click="removeEmail(index)"
                    type="button"
                    class="ml-2 text-white bg-red-500 hover:bg-red-600 rounded-lg text-xs px-2 py-1"
                  >
                    Remove
                  </button>
                </li>
              </ul>
            </div>

            <div class="mb-4">
              <label
                for="subject"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Subject</label
              >
              <input
                type="text"
                id="subject"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Your subject"
              />
            </div>

            <button
              type="submit"
              class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const emails = ref([])
const newEmail = ref('')
const showModal = ref(true)
const time = ref('')
const subject = ref('')

function addEmail() {
  if (newEmail.value && !emails.value.includes(newEmail.value)) {
    emails.value.push(newEmail.value)
    newEmail.value = ''
  }
}

function removeEmail(index) {
  emails.value.splice(index, 1)
}

async function submitForm() {
  const notificationSettings = {
    time: time.value,
    emails: emails.value,
    subject: subject.value
  }

  // Use Vuex action or direct API call to send data to backend
  await store.dispatch('saveNotificationSettings', notificationSettings)

  alert('Notification settings saved!')
  closeModal()
}

function closeModal() {
  showModal.value = false // This will hide the modal
}
</script>
<style scoped>
/* Your additional styling if needed */
</style>
