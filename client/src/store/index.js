import { createStore } from 'vuex'
const BASE_URL = import.meta.env.VITE_BASE_URL

export default createStore({
  state: {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    currentUser: null
  },
  mutations: {
    authenticateUser(state, token) {
      state.isAuthenticated = true
      state.token = token
      localStorage.setItem('token', token) // Save token to localStorage
    },
    logoutUser(state) {
      state.isAuthenticated = false
      state.token = null
      state.currentUser = null
      localStorage.removeItem('token') // Remove token from localStorage
    },
    setCurrentUser(state, user) {
      state.currentUser = user
    }
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      try {
        const response = await fetch(`${BASE_URL}/user/signIn`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userEmail: credentials.email,
            userPassword: credentials.password
          })
        })
        const data = await response.json()
        if (response.ok) {
          commit('authenticateUser', data.token)
          dispatch('fetchCurrentUser') // Fetch the current user's details after successful login
          return true
        } else {
          alert(data.message)
          return false
        }
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },
    async fetchCurrentUser({ commit, state }) {
      if (!state.token) {
        return
      }
      try {
        const response = await fetch(`${BASE_URL}/user/current`, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        })
        const userData = await response.json()
        if (response.ok) {
          commit('setCurrentUser', userData)
          console.log('curent', userData)
        } else {
          console.error('Failed to fetch current user:', userData.message)
        }
      } catch (error) {
        console.error('Error fetching current user:', error)
      }
    },

    async addLocation({ commit, state }, weatherData) {
      if (!state.token) {
        return
      }
      try {
        const response = await fetch(`${BASE_URL}/weather/addLocation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.token}`
          },
          body: JSON.stringify(weatherData)
        })
        const data = await response.json()
        if (response.ok) {
          console.log('Location data saved successfully', data)
        } else {
          console.error('Failed to save location data', data.message)
        }
      } catch (error) {
        console.error('Error in addLocation action:', error)
      }
    },
    
    async saveNotificationSettings({ state }, notificationSettings) {
      if (!state.token) {
        alert('You must be logged in to save notification settings.')
        return
      }
      try {
        const response = await fetch(`${BASE_URL}/weather/notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.token}` 
          },
          body: JSON.stringify(notificationSettings)
        })
        const data = await response.json()
        if (response.ok) {
          console.log('Notification settings saved successfully', data)
        } else {
          console.error('Failed to save notification settings', data.message)
          alert(data.message)
        }
      } catch (error) {
        console.error('Error in saveNotificationSettings action:', error)
        alert('Failed to save notification settings due to an error.')
      }
    },

    logout({ commit }) {
      commit('logoutUser')
    }
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    currentUser: (state) => state.currentUser
  }
})
