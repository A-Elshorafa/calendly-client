import endpoints from "@/constants/endpoints";

export default async(callback, data, axios, setErrors) => {
  await axios.get(endpoints.csrf);
  axios.post(endpoints.login, data).then( response => {
    if (response && response.data) {
      callback(response.data)
    }
  }).catch(e => {
    if (e &&
      e.response &&
      e.response.data &&
      e.response.data.errors) {
        setErrors(e.response.data.errors);
      }
  })
}