import endpoints from "@/constants/endpoints";

export default (axios) => {
  axios.get(endpoints.isAuthenticated).catch(_=>{});
}