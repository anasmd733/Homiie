import React from 'react'
import SearchBar from '../../../../Common/SearchBar/SearchBar'
import OptionButton from '../../../../Common/OptionButton/OptionButton'
import { CiCirclePlus } from 'react-icons/ci'
import { FiEdit } from 'react-icons/fi'
import { RiMenuFoldLine } from 'react-icons/ri'
import FilterButton from '../../../../Common/FilterButton/FilterButton'
import ProductDetailsIndex from '../../../../Common/ProductsDeteilsCard/ProductDetailsIndex'
import ReportsHeadSearchComp from '../../ReportsHeadSearchComp'

const ProductReportDetailsComponent = () => {
  return (
    <div style={{backgroundColor:"white",padding:"10px 0px",marginTop:'10px'}}>
    <ReportsHeadSearchComp
    addIcon={true}
    />
        {/* <div style={{display:"flex",justifyContent:"space-between",marginTop:"20px",padding:"0px 10px"}}>
            <div style={{display:"flex",width:"70%",justifyContent:"space-between"}}>
                <div style={{flex:"3"}}>
                    <SearchBar style={{borderRadius : "6px"}}/>
                </div>
                <div style={{flex:"1",display:"flex",alignItems:"center",justifyContent:"space-evenly"}}>
                    <OptionButton iscricrle={true} icon={<CiCirclePlus fontSize={"40px"}/>}/>
                    <OptionButton iscricrle={true} icon={<FiEdit fontSize={"15px"}/>}/>
                    <OptionButton iscricrle={true} icon={<RiMenuFoldLine/>} />
                </div>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
                <FilterButton/>
            </div>
        </div> */}
        <div style={{marginTop:"20px",display:"flex",justifyContent:"center"}}>
            <ProductDetailsIndex/>
        </div>
        </div>
  )
}

export default ProductReportDetailsComponent