import create from 'zustand'

const storedUser = localStorage.getItem('user')
const storedISLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

export const useUserStore = create((set) => ({
  // CREATE STATE = what is in the store (initial state):
  user: '',
  isLoggedIn: false,
  // streak,
  // todayQuestCompleted: false,
  // moodUrl: ''

  // SET STATE = change what is in the store
  // Log in a user
  login: (userName) => {
    localStorage.setItem('user', userName)
    localStorage.setItem('isLoggedIn', 'true')

    set({
      user: userName,
      isLoggedIn: true,
    })
  },

  // log out user
  logout: () => {
    // Clear localStorage
    localStorage.removeItem('user')
    localStorage.setItem('isLoggedIn', 'false')

    // Update Zustand store
    set({
      user: '',
      isLoggedIn: false,
    })
  },
}))

