import React from 'react'
import { belowButtonArr } from './BelowButtonsArr'
import BelowTableButton from './BelowTableButton'
import { Path } from '../../Routes/Path'

const BelowTableButtonIndex = ({className}) => {
  return (
    <div className='below-table-btn-parent'>
        {
          belowButtonArr && belowButtonArr.length > 0 ? belowButtonArr.map((buttons,i)=><BelowTableButton key={i} value={buttons} className={className} location={buttons == "Locate" && Path.salesDetailsLocate}/>)
           : 'No Buttons to Display'
        }
    </div>
  )
}

export default BelowTableButtonIndex