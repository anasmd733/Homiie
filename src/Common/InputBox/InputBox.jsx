import React from 'react'

const InputBox = ({type,defaultValue,className,onChange,id,disabled}) => {
  
  return (
    <div>
      <input 
      type={type} 
      defaultValue={defaultValue} 
      className={className}  
      onChange={onChange}
      id={id}
      disabled={disabled}
      />
    </div>
  )
}

InputBox.defaultProps = {
  type : 'text',
  defaultValue : '',
  className : '',
  id : '',
  disabled : false
}

export default InputBox
