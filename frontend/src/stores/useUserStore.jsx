import { create } from 'zustand'

export const useUserStore = create((set) => ({
  // CREATE STATE (what is in the store (initial state))
  user: null,
  isLoggedIn: false,
 
  // SET STATE (change what is in the store)

  // Call getUser when app mounts to access user from local storage
  getUser: () => {
    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')
    const email = localStorage.getItem('userEmail')
    // FIXME Look into name. Name data not accessed. How to get username when user logs in
    const name = localStorage.getItem('userName')

    // If both accessToken and useId exist in localStorage -> update store state. Keeps user logged in after page refresh
    if (accessToken && userId) {
      set({ user: {accessToken, userId, email, name}, isLoggedIn: true })
    }
  },

  login: (userData) => {
    localStorage.setItem('accessToken', userData.accessToken)
    localStorage.setItem('userId', userData.userId)
    localStorage.setItem('userEmail', userData.email)
    localStorage.setItem('userName', userData.userName)
    set ({ user: userData, isLoggedIn: true })
  },

  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    set ({ user: null, isLoggedIn: false })
  },
}))


