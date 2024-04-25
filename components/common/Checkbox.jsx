import React, { useState } from 'react';

const Checkbox = ({ label, name, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);

    // Optional: Call the provided onChange handler if available
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        height={50}
        width={50}
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Checkbox;
