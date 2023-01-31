import endpoints from "../../constants/endpoints";

export default (callback, errorCallback, subscriptionData, axios) => {
  axios.post(endpoints.subscribeToEvent, subscriptionData).then(response => {
    if (response?.data) {
      callback(response.data);
    }
  }).catch(e => {
    if (e?.response) {
      errorCallback()
    }
  })
}