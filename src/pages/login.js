import axios from "../apis/axios";
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { LoginLayout } from "../ui/Layouts";
import endpoints from "../constants/endpoints";

const Login = _ => {
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const handleSubmit = (event, payload) => {
    event.preventDefault();
    
    const {email, password} = payload;
    axios.get(endpoints.csrf);
    axios.post(endpoints.login, {email, password}).then( response => {
      if (response && response.data && response.data.success) {
        router.push('/');
      }
    }).catch(e => {
      console.log(e)
      if (e &&
        e.response &&
        e.response.data &&
        e.response.data.errors) {
          setErrors(e.response.data.errors);
        }
    })
  };

  return (
    <LoginLayout
      errors={errors}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;