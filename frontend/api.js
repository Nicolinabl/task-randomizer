export const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
export const socketUrl = "http://localhost:8080"; 

// FIXME right now all quests are added to questlist? use socket rooms to make sure user only see its own quests