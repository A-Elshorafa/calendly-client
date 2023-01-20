import axios from "../apis/axios";
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { RegisterLayout } from "../ui/layouts";
import endpoints from "../constants/endpoints";

const Register = _ => {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const handleRegisteration = (event, payload) => {
    event.preventDefault();
    const {name, email, password, passwordConfirmation} = payload;
    axios.post(endpoints.register, {
      name,
      email,
      password, 
      password_confirmation: passwordConfirmation
    }).then(response => {
      if (response && response.data && response.data.success) {
        router.push("/login");
      }
    }).catch(e => {
      if (e && e.response && e.response.data) {
        setErrors(e.response.data.errors);
      } else {
        console.log(e)
      }
    });
  }

  return (
    <RegisterLayout 
      errors={errors} 
      handleRegisteration={handleRegisteration}
    />
  )
}

export default Register;