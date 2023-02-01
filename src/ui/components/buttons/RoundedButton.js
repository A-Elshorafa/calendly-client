import React from "react";

export default ({onClick, className, children, allowContinue=true}) => {
  return (
    <button 
      className={`border border-spacing-0 border-slate-500 text-slate-500 rounded-full ${className}
        ${allowContinue? 
          ' bg-white hover:bg-gray-300':
          ' bg-gray-300 cursor-default'
          }`
      }
      onClick={allowContinue? onClick : null}
    >
      {children}
    </button>
  )
}