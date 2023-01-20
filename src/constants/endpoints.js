//todo fix import from .env.local
const url = "http://localhost:8000";

const endpoints = {
  login: url.concat("/login"),
  register: url.concat("/register")
}

export default endpoints;