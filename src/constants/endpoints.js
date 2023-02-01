//todo: fix import from .env.local
const url = "http://localhost:8000";

const endpoints = {
  login: url.concat("/login"),
  logout: url.concat("/logout"),
  register: url.concat("/register"),
  csrf: url.concat("/sanctum/csrf-cookie"),
  isAuthenticated: url.concat("/isAuthenticated"),
  //user\\
  getAuthUserInfo: url.concat("/api/getAuthUserInfo"),
  //events\\
  storeEvent: url.concat("/api/storeEvent"),
  deleteEvent: url.concat("/api/deleteEvent"),
  pendingEvents: url.concat("/api/getPendingEvents"),
  upcomingEvents: url.concat("/api/getUpComingEvents"),
  updateEventNotes: url.concat("/api/updateEventNotes"),
  subscribeToEvent: url.concat("/api/subscribeToEvent"),
  getPendingEventDetails: url.concat("/api/getPendingEventDetails"),
  getUpcomingEventDetails: url.concat("/api/getUpcomingEventDetails"),
}

export default endpoints;