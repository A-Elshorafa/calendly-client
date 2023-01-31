import endpoints from "../../constants/endpoints";

export default (callback, event_id, axios) => {
  axios.delete(`${endpoints.deleteEvent}?event_id=${event_id}`).then(response => {
    if (response && response.data) {
      callback(response.data);
    }
  }).catch(e => { 
    if (e?.response?.data?.message) {
      callback({message: e.response.data.message});
    }
  })
}