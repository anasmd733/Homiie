import React from 'react'
import { Path } from '../../Routes/Path'
import VehicleExpnsesCard from "../../Components/VehicleExpenses/VehicleExpnsesCard"
const VehicleExpensePage = () => {
  return (
    <>
    <VehicleExpnsesCard path={Path.vehicleExpensesGoTable}/>
    </>
  )
}

export default VehicleExpensePage