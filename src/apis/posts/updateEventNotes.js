import endpoints from "../../constants/endpoints";

export default (callback, payload, axios) => {
  axios.post(endpoints.updateEventNotes, payload).then(response => {
    if (response?.data) {
      callback(response.data);
    }
  }).catch(_ => {})
}