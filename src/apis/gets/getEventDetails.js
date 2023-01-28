import endpoints from "@/constants/endpoints";

export default (callback, event_id, axios) => {
  axios.get(endpoints.getEventDetails.concat('?','event_id=', event_id)).then( response => {
    if (response && response.data && response.data.success) {
      callback(response.data.data);
    }
  }).catch(_=>{})
}