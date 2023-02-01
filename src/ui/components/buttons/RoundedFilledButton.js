import React from "react";

export default ({
  onClick,
  children,
  className,
  allowContinue=true
}) => {
  return (
    <button 
      className={`border border-spacing-0 rounded-full ${className}
        ${allowContinue? 
          ' bg-indigo-500 text-white hover:bg-indigo-700':
          ' bg-gray-500 cursor-default text-slate-300'
          }`
      }
      onClick={allowContinue? onClick : null}
    >
      {children}
    </button>
  )
}