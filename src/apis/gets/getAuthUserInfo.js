import endpoints from "@/constants/endpoints";

export default (callback, axios) => {
  if (axios) {
    axios.get(endpoints.getAuthUserInfo).then(response => {
      if (response && response.data && response.data.success) {
        callback(response.data.data);
      }
    }).catch(_=>{})
  }
}