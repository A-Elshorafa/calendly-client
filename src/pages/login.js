import { Login } from "@/apis";
import pages from "@/constants/pages";
import React, { useState } from "react";
import { LoginLayout } from "../ui/Layouts";

export default ({axios, router}) => {
  const [errors, setErrors] = useState([]);
  const handleSubmit = (event, payload) => {
    event.preventDefault();

    Login(response => {
      if (response.success) {
        router.push(pages.EVENTS_DASHBORAD);
      }
    }, payload, axios, setErrors)
  };

  return (
    <LoginLayout
      errors={errors}
      handleSubmit={handleSubmit}
    />
  );
};