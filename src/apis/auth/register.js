import endpoints from "@/constants/endpoints";

export default (axios, body, router, setErrors) => {
  axios.post(endpoints.register, body).then(response => {
    if (response?.data?.success) {
      router.push("/login");
    }
  }).catch(e => {
    if (e?.response?.data?.errors) {
      setErrors(e.response.data.errors);
    }
  });
}