// Handle Sector Filter ============================================
export const handleSectorFilter = (sector, sectorList, setSecorList) => {
    // sector = ml sector - [string]
    // sectorList = list of ml sector (from state) - [array]
    // setSecorList = function to set and update list of ml sector in the state - [function]

    if(sectorList.includes(sector)){
        // if in the state has the clicked sector -> remove the sector from state (unselect the filter button)
        const filter = sectorList.filter(item => item !== sector)
        setSecorList(filter)
    }else{
        setSecorList([...sectorList, sector])
    }
}

// Handle ML Type Filter ============================================
export const handleTypeFilter = (type, typeList, setTypeList) => {
    // type = ml type - [string]
    // typeList = list of ml type (from state) - [array]
    // setTypeList = function to set and update list of ml type - [function]

    if(typeList.includes(type)){
        const filter = typeList.filter(item => item !== type)
        setTypeList(filter)
    }else{
        setTypeList([...typeList, type])
    }
}

// Handle Labeled Filter ============================================
export const handleLabeledFilter = (labeled, setLabeled) => {
    // labeled = labeled state ('Yes' or '') - string
    // setLabeled = function to set and update labeled state - [function]

    setLabeled(labeled)
}