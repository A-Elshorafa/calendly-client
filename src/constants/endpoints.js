//todo: fix import from .env.local
const url = "http://localhost:8000";

const endpoints = {
  login: url.concat("/login"),
  register: url.concat("/register"),
  csrf: url.concat("/sanctum/csrf-cookie")
}

export default endpoints;