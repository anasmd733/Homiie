import React from 'react'

export default function CommonPara({label,label2,className,onClick,classnamelabel2}) {
  return (
    <div>
        <p onClick={onClick} className={className}>{label} <span className={classnamelabel2}>{label2}</span> </p>
    </div>
  )
}
