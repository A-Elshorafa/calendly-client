import endpoints from "../../constants/endpoints";

export default (eventData, callback, axios) => {
  axios.post(endpoints.storeEvent, eventData).then(response => {
    if (response && response.data && response.data.success) {
      callback(response.data.calendly_link);
    }
  }).catch(_=>{})
}