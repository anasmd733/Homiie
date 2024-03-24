import React from "react";

export default function CommonButton({ label, label2 , onClick, className , logo }) {
  return (
      <button type="submit" className={className} onClick={onClick}>
       <span className={logo}> {label}</span> &nbsp;{label2}
      </button>
  );
}
