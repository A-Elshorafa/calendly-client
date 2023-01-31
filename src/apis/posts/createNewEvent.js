import endpoints from "../../constants/endpoints";

export default (callback, errorCallback, eventData, axios) => {
  axios.post(endpoints.storeEvent, eventData).then(response => {
    if (response?.data?.success) {
      callback(response.data.calendly_link);
    }
  }).catch(e=>{
    let errors = null;
    if (e?.response?.data?.errors) {
        errors = e.response.data.errors;
      }
    errorCallback(errors)
  })
}