import endpoints from "../../constants/endpoints";

export default (callback, subscriptionData, axios) => {
  axios.post(endpoints.subscribeToEvent, subscriptionData).then(response => {
    if (response && response.data) {
      callback(response.data);
    }
  }).catch(_ => {})
}