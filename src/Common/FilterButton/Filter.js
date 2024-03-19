export const FilterFunction = (date, originalData,setFilteredData,door) => {
  const startDate = date.from ;
  
  const endDate = date.to;

 
  const filtered = originalData.filter(item => {
   return item.Date>=startDate && item.Date<=endDate
  });

  if(door=="false"){
    setFilteredData(filtered)
  }
  else if(door=="true"){
    setFilteredData(originalData)
  }

  if (filtered.length === 0) {
    const keys = Object.keys(originalData[0]); 
    const emptyData = keys.reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});
    if(door=="false"){
      setFilteredData([emptyData]);
    }
    else if(door=="true"){
      setFilteredData(originalData)
    }
  }


  
};