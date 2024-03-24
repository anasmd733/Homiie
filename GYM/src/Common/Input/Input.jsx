import React from "react";

export default function CommonInput({step,value, onChange, type, placeholder, className , name}) {
  return (
    <div>
      <input step={step} name={name} value={value} onChange={onChange} className={className} type={type} placeholder={placeholder} required  />
    </div>
  );
}
