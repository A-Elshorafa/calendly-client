import axios from "axios";

const instance =  axios.create({
  baseUrl: 'http://localhost:8000',
  // to send cookies auto matically with XmlHttpRequests
  // called cross-site access-control
  withCredentials: true
});

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default instance;