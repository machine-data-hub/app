// Handle Sector Filter ============================================
export const handleSectorFilter = (sector, sectorList, setSecorList) => {
    if(sectorList.includes(sector)){
        const filter = sectorList.filter(item => item !== sector)
        setSecorList(filter)
    }else{
        setSecorList([...sectorList, sector])
    }
}

// Handle ML Type Filter ============================================
export const handleTypeFilter = (type, typeList, setTypeList) => {
    if(typeList.includes(type)){
        const filter = typeList.filter(item => item !== type)
        setTypeList(filter)
    }else{
        setTypeList([...typeList, type])
    }
}

// Handle Labeled Filter ============================================
export const handleLabeledFilter = (labeled, setLabeled) => {
    setLabeled(labeled)
}