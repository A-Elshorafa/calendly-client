import endpoints from "../../constants/endpoints";

export default (callback, errorCallback, subscriptionData, thirdPartyName, axios) => {
  axios.post(endpoints.subscribeToEvent(thirdPartyName), subscriptionData).then(response => {
    if (response?.data) {
      callback(response.data);
    }
  }).catch(e => {
    if (e?.response) {
      errorCallback()
    }
  })
}