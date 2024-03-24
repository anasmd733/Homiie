import React from 'react'

const CommonImage = ({Image,height,width,onClick}) => (
    <img onClick={onClick} src={Image} alt="Image" width={width} height={height} />
)

export default CommonImage