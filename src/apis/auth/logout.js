import endpoints from "@/constants/endpoints";

export default (callback, axios) => {
  axios.post(endpoints.logout).then(_ => {
    callback()
  }).catch(_ => {})
}