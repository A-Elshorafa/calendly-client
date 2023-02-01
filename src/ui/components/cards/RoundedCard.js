import React from "react";

export default ({
  onClick,
  children,
  allowClick,
  className="",
  roundedSize = '',
  paddingValue = 4,
}) => {
  return (
    <div 
      onClick={allowClick? onClick : null} 
      className={`overflow-hidden p-${paddingValue
        } rounded${roundedSize? `-${roundedSize}` : ``
        } ${allowClick? 'cursor-pointer' : ''
        } ${className}`
      }
    >
      {children}
    </div>
  )
}