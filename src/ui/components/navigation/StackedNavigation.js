import React, { useState } from "react";

export default ({tabs, onSelect, stackName}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handleOnSelect = (index) => {
    console.log('selected Index: ', index);
    setSelectedIndex(index);
    onSelect(index);
  }

  return (
    <nav className="flex flex-row items-center justify-between px-8 border-t-2">
      {tabs.map((element, index) => {
          return (
            <div className="w-full flex flex-col items-center p-8 mr-4 last-of-type:mr-0">
              <div className="align-center">
                <input 
                  className="hidden" 
                  type="radio" 
                  id={`element-${index}`}
                  name={stackName}
                  onClick={() => handleOnSelect(index)}
                />
                <label 
                  className={`text-xl font-bold hover:text-violet-500 ${
                    selectedIndex === index ? 'text-violet-900' : 'text-violet-300'
                  } `}
                  htmlFor={`element-${index}`}>{element}
                  </label>
              </div>
            </div>
          )
        })}
    </nav>   
  )
}