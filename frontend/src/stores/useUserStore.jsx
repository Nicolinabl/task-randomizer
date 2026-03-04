import { create } from "zustand";
import { apiUrl } from "../../api";

export const useUserStore = create((set, get) => ({
  // CREATE STATE (what is in the store (initial state))
  user: null,
  isLoggedIn: false,
  streak: 0,
  isStreakLoading: false,
  streakError: null,

  // SET STATE (change what is in the store)

  // Call getUser when app mounts to access user from local storage
  getUser: () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("userEmail");
    // FIXME Look into name. Name data not accessed. How to get username when user logs in
    const name = localStorage.getItem("userName");

    // If both accessToken and useId exist in localStorage -> update store state. Keeps user logged in after page refresh
    if (accessToken && userId) {
      set({ user: { accessToken, userId, email, name }, isLoggedIn: true });

      get().fetchStreak();
    }
  },

  login: (userData) => {
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("userId", userData.userId);
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("userName", userData.userName);
    set({ user: userData, isLoggedIn: true });

    //streak is fetched after login
    get().fetchStreak();
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    set({ user: null, isLoggedIn: false, streak: 0 });
  },

  //Fetching streak:

  fetchStreak: async () => {
    const accessToken = get().user?.accessToken;
    if (!accessToken) return 0;

    set({ isStreakLoading: true, streakError: null });

    try {
      const response = await fetch(apiUrl + "/streaks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        set({ streakError: data.message, isStreakLoading: false });
        return 0;
      }

      set({ streak: data.response, isStreakLoading: false });

      return data.response;
    } catch (err) {
      set({ streakError: "Something went wrong", isStreakLoading: false });
      return 0;
    }
  },
}));
