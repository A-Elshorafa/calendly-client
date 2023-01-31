import endpoints from "@/constants/endpoints";

export default (callback, errorCallback, event_id, axios) => {
  axios.get(endpoints.getUpcomingEventDetails.concat('?','event_id=', event_id)).then( response => {
    if (response?.data?.success) {
      callback(response.data.data);
    }
  }).catch(_=>{
    errorCallback()
  })
}