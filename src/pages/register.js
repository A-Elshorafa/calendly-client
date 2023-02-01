import { Register } from '@/apis';
import React, { useState } from "react";
import { RegisterLayout } from "../ui/layouts";

export default ({axios, router}) => {
  const [errors, setErrors] = useState([]);
  const handleRegisteration = (event, payload) => {
    event.preventDefault();
    const {name, email, password, passwordConfirmation} = payload;
    const body = {
      name,
      email,
      password, 
      password_confirmation: passwordConfirmation
    };
    Register(axios, body, router, setErrors);
  }

  return (
    <RegisterLayout 
      errors={errors} 
      handleRegisteration={handleRegisteration}
    />
  )
}