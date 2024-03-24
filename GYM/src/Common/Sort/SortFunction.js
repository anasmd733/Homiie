export const SortFunction = (index, originalData, setFilteredData) => {
    let filteredData = [];
  
    if (index === 0) {
      filteredData = originalData.filter(item => item.gender === "Male");
      setFilteredData(filteredData);
    } 
    else if (index === 1) {
      filteredData = originalData.filter(item => item.gender === "Female");
      setFilteredData(filteredData);
    } 
    else {
      filteredData = originalData;
      setFilteredData(filteredData);
    }
//   console.log(filteredData);
    
  };