import React from "react";

export default ({
  children,
  className="",
  paddingValue = 4 
}) => {
  return (
    <div className={`p-${paddingValue} rounded ${className}`}>
      {children}
    </div>
  )
}