<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full p-8 bg-white shadow-md rounded-md">
      <h2 class="text-3xl font-bold mb-4 text-center">CHECK THE WEATHER</h2>
      <p class="text-center mb-4">
        {{ isRegister ? 'Already a user? ' : 'Are you a new user? ' }}
        <span class="text-blue-500 cursor-pointer" @click="toggleRegisterMode">
          {{ isRegister ? 'Login' : 'Register' }}
        </span>
      </p>
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full border border-gray-300 rounded-md px-3 py-2 mb-1 focus:outline-none focus:border-blue-400"
        />
        <!-- Email error message -->
        <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>

        <div class="relative">
          <input
            v-model="password"
            :type="isPasswordShown ? 'text' : 'password'"
            placeholder="Password"
            class="w-full border border-gray-300 rounded-md px-3 py-2 mb-1 focus:outline-none focus:border-blue-400"
          />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
            <button @click="togglePasswordVisibility">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <template v-if="isPasswordShown">
                  <!-- Eye Off Icon for hiding password -->
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </template>
                <template v-else>
                  <!-- Eye Icon for showing password -->
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z"
                  />
                </template>
              </svg>
            </button>
          </div>
          <!-- Password error message -->
        </div>
        <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
      </div>
      <div class="flex justify-center">
        <button
          @click="isRegister ? handleRegister() : handleLogin()"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          {{ isRegister ? 'Register' : 'Login' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRegister: false,
      email: '',
      password: '',
      isPasswordShown: false
    }
  },
  methods: {
    validateEmail(email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    togglePasswordVisibility() {
      this.isPasswordShown = !this.isPasswordShown
    },

    async handleLogin() {
      this.emailError = ''
      this.passwordError = ''

      // Basic validation
      if (!this.email) this.emailError = 'Email field is required'
      if (!this.password) this.passwordError = 'Password is required'
      if (this.emailError || this.passwordError) return

      const isSuccess = await this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      if (isSuccess) {
        this.$router.push({ name: 'home' })
      } else {
        this.passwordError = 'Password not match or user not found'
      }
    },

    async handleRegister() {
      this.emailError = ''
      this.passwordError = ''

      // Validate email and password
      if (!this.validateEmail(this.email)) this.emailError = "Check if it's a valid email"
      if (this.password.length < 5) this.passwordError = 'Password minimum 5 characters required'
      if (this.emailError || this.passwordError) return

      const isSuccess = await this.$store.dispatch('register', {
        email: this.email,
        password: this.password
      })
      if (isSuccess) {
        console.log('Registration successful')
        this.email = ''
        this.password = ''
        this.isRegister = false
      } else {
        console.log('Registration failed')
      }
    },

    toggleRegisterMode() {
      this.isRegister = !this.isRegister
    }
  }
}
</script>

<style scoped></style>
