import endpoints from "@/constants/endpoints";

export default (userId, callback, axios) => {
  axios.get(endpoints.pendingEvents.concat(`?user_id=${userId}`)).then( response => {
    if (response && response.data && response.data.success) {
      callback(response.data.data);
    }
  }).catch(_=>{})
}