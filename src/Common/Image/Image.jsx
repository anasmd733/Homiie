import React from 'react'

const Image = ({src,alt,className}) => {
  return (
    <div>
      <img src={src} alt={alt} className={className}/>
    </div>
  )
}

Image.defaultProps = {
  alt : 'No Locations Added',
  className : ""
}

export default Image