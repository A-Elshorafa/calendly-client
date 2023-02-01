import React from 'react';

export default ({
  id,
  name,
  type,
  value,
  disabled,
  className,
  placeholder,
  autoComplete,
  onChangeText
}) => {
  const handleChangeText = event => {
    if (event?.target && typeof onChangeText === 'function') {
      onChangeText(event.target.value);
    }
  }

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      disabled={disabled}
      className={className}
      placeholder={placeholder}
      onChange={handleChangeText}
      autoComplete={autoComplete}
    />
  );
}