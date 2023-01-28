import axios from "axios";

class Axios {
  constructor(router) {
    this.router = router;

    this.instance = axios.create({
      // todo: fix get env values
      baseUrl: 'http://localhost:8000',
      // to send cookies auto matically with XmlHttpRequests
      // called cross-site access-control
      withCredentials: true
    })

    this.instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    
    this.instance.interceptors.response.use(
      response => response,
      error => {
        if (error) {
          const { status } = error.response
          // 401 unauthenicated user
          // 419 Handle Token Timeouts
          if ([401, 419].includes(status)) {
            const paths = window.location.href.split('/');
            const isInHome = ['', 'login', 'register'].includes(paths[paths.length-1])
            if(!isInHome) {
              this.router.push('/login')
            }
          }
      
          return Promise.reject(error)
        }
      }
    )
  }
}
export default Axios;