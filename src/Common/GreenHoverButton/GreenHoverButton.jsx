import React from 'react';
import "./GreenHoverButton.css";

const GreenHoverButton = React.forwardRef(({ className, value, style, onClick }, ref) => {
  return (
    <button ref={ref} style={style} className={`GreenHoverButton-default ${className}`} onClick={onClick}>
      {value}
    </button>
  );
});

GreenHoverButton.defaultProps = {
  className: '',
  value: "---"
};

export default GreenHoverButton;
