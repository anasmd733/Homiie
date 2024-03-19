import React from 'react'
import SearchBar from '../../Common/SearchBar/SearchBar'
import OptionButton from '../../Common/OptionButton/OptionButton'
import { CiCirclePlus } from 'react-icons/ci'
import { FiEdit } from 'react-icons/fi'
import { RiMenuFoldLine } from 'react-icons/ri'
import FilterButton from '../../Common/FilterButton/FilterButton'
import BlueButton from '../../Common/Submit/BlueButton'
import { FaPrint } from 'react-icons/fa'
import { AddCircleOutline } from '@mui/icons-material'
import { PrintFunction } from '../../Common/PrintFunction.js/PrintFunction'
import Sort from '../../Common/SortButton/Sort'

const ReportsHeadSearchComp = ({addIcon , onChange ,originalData ,setFilteredData ,AddDetail , updateDateState}) => {

  return (
    <div
          style={{
            display: "flex",
            flexWrap:"wrap",
            justifyContent: "space-between",
            margin: "15px",
            minWidth:"350px",
            rowGap:"10px"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "60%",
              gap: "20px",
              rowGap:"10px"
            }}
          >
            <SearchBar onChangeHandler={onChange} style={{ flex: 1,borderRadius : "5px " }} />

            {
              addIcon && 
              <OptionButton iscricrle={true} icon={<AddCircleOutline/>} onClick={AddDetail}/>
            }
            {/* <Sort/> */}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <BlueButton
              value={"Export to Excel"}
              className="ExpenseTableHead-BlueButton"
            />
            <OptionButton
              iscricrle={false}
              icon={<FaPrint fontSize={"20px"} />}
              onClick={()=>{ PrintFunction("tableComponents") }}
            />
               <FilterButton originalData={originalData} setFilteredData={setFilteredData} updateDateState={updateDateState} />
          </div>
        </div>
  )
}

export default ReportsHeadSearchComp