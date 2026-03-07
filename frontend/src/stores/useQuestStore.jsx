import { create } from "zustand";
import { apiUrl } from "../../api";
import { useUserStore } from "./useUserStore";
import toast from "react-hot-toast";

export const useQuestStore = create((set) => ({
  // Initial state
  quests: [],
  libraryQuests: [],
  error: null,
  isLoading: false,

  // fetch all quests for the logged in user
  fetchQuests: async (token) => {
    const accessToken = token || useUserStore.getState().user?.accessToken;

    if (!accessToken) return [];

    set({ isLoading: true, error: null });

    try {
      const response = await fetch(apiUrl + "/quests/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        set({ error: data.message, isLoading: false });
        return [];
      }

      set({ quests: data.response, isLoading: false });
      return data.response;
    } catch (error) {
      set({ error: "Something went wrong", isLoading: false });
      return [];
    }
  },

  // create new quest
  createQuest: async (message, timeNeeded, category) => {
    // get the accessToken and users id from the userStore
    const { user } = useUserStore.getState();

    if (!user?.accessToken) return { success: false, error: "Not logged in" };

    try {
      const response = await fetch(apiUrl + "/quests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
        body: JSON.stringify({
          message,
          timeNeeded: Number(timeNeeded),
          category: category,
        }),
      });

      const data = await response.json();

      if (!response.ok) return { success: false, error: data.message };

      set((state) => ({ quests: [...state.quests, data.response || data] }));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Something went wrong" };
    }
  },

  // Delete quest
  deleteQuest: async (questId) => {
    const accessToken = useUserStore.getState().user?.accessToken;
    try {
      const response = await fetch(apiUrl + `/quests/${questId}`, {
        method: "DELETE",
        headers: { Authorization: accessToken },
      });
      if (!response.ok) throw new Error("Failed to delete quest");

      // Remove from store
      set((state) => ({
        quests: state.quests.filter((q) => q._id !== questId),
      }));

      toast.success("Ok, quest was deleted");
    } catch (error) {
      console.error("Error deleting quest:", error);
      toast.error("Couldn't delete quest");
    }
  },

  // Check quest as complete
  completeQuest: async (questId, done) => {
    const { user, fetchStreak } = useUserStore.getState();

    const accessToken = user?.accessToken;
    if (!user?.accessToken) return;

    try {
      const response = await fetch(apiUrl + `/quests/${questId}/complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ done }),
      });
      if (!response.ok) throw new Error("Failed to check quest as done");

      // Update the quest in the store
      set((state) => ({
        quests: state.quests.map((quest) =>
          quest._id === questId ? { ...quest, done } : quest,
        ),
      }));

      await fetchStreak();

      if (done) {
        toast.success("Wow, you did it again!");
      } else {
        toast("Ok, changed to undone");
      }
    } catch (err) {
      console.error("Error completing quest:", err);
      toast.error("Couldn't change quest status");
    }
  },

  // Fetch quests from questLibrary
  fetchLibraryQuests: async () => {
    try {
      const response = await fetch(apiUrl + "/quests/library");
      const data = await response.json();

      if (!response.ok) throw new Error("Couldn't fetch library quests");

      set({ libraryQuests: data.response });
    } catch (error) {
      console.error(error);
    }
  },

  // Duplicate quests from library to personal questlist
  duplicateQuest: async (id) => {
    const accessToken = useUserStore.getState().user?.accessToken;
    if (!accessToken) return;

    try {
      const response = await fetch(apiUrl + `/quests/library/${id}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      const data = await response.json();
      if (!response.ok || !data.success)
        return { success: false, error: data.message };

      // Add the new quest to the user's quest list in the store
      set((state) => ({ quests: [data.response, ...state.quests] }));
      return { success: true };
    } catch (err) {
      return { succes: false, error: "Error adding quest from library" };
    }
  },
}));
