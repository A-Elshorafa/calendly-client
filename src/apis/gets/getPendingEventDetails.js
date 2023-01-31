import endpoints from "@/constants/endpoints";

export default (callback, errorCallBack, event_id, axios) => {
  axios.get(endpoints.getPendingEventDetails.concat('?','event_id=', event_id)).then( response => {
    if (response?.data?.success) {
      callback(response.data);
    }
  }).catch(_=>{
    errorCallBack()
  })
}