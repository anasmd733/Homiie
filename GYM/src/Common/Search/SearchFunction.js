export const SearchFuntion = (e, orginallArray, setFilteredArray) => {
    // console.log(e);
    if (orginallArray.length === 0) {
      setFilteredArray([]);
      return [];
    }
  
    const filteredTableData = orginallArray.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(e.target.value.toLowerCase().trim())
      )
    );
  
    if (filteredTableData.length <= 0) {
      let Keys = Object.keys(orginallArray[0]);
      const Filtered = Object.fromEntries(Keys.map((key) => [key, '']));
      setFilteredArray([Filtered]);
    } else {
      setFilteredArray(filteredTableData);
      // console.log("filtered",filteredTableData);
    }
    return filteredTableData;
  };
  