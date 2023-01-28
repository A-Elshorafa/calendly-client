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
  pendingEvents: url.concat("/api/getPendingEvents"),
  getEventDetails: url.concat("/api/getEventDetails"),
  upcomingEvents: url.concat("/api/getUpComingEvents"),
  subscribeToEvent: url.concat("/api/subscribeToEvent")
}

export default endpoints;