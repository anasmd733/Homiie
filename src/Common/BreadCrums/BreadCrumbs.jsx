import React from 'react'
import "./BreadCrums.css"
const BreadCrumbs = ({BreadCrumbsvalue , className ,onClick}) => {
  return (
        <span className={"Notes-BreadCrumbs"} onClick={onClick}>{BreadCrumbsvalue}</span>
        
  )
}

export default BreadCrumbs
