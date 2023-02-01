import React from "react";

export default ({message, className}) => {
  return (
    <div className={`text-3xl text-slate-600 font-semibold text-center ${className}`}>
      {message}
    </div>
  )
}