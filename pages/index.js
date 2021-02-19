import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import List from '../components/List'
import Search from '../components/Search'
import datasets from '../data/datasets.json'
import { DOWNLOAD } from '../utils/sort'

export default function Home({ datasets, sectors }) {
    const [list, setList] = useState([])
    const [query, setQuery] = useState('')
    const [sort, setSort] = useState('');

    const [sectorList, setSecorList] = useState([])
    const [typeList, setTypeList] = useState([])
    const [labeled, setLabeled] = useState()
    const [timeSeries, setTimeSeries] = useState()
    const [simulation, setSimulation] = useState()

    const onChange = (datasets) => {
        if(query !== ''){
            const map = datasets.filter((v, i) => {
                return v.Name.toLocaleLowerCase().includes(query.toLowerCase());
            });
            setList(map);
        }
    };

    useEffect(() => {
        onChange(datasets)
    }, [query, datasets])

    useEffect(() => {
        setList(datasets)
    }, [datasets])

    const labeledFilter = (list) => {
        const filtered = list.filter(item => item.Labeled === labeled)
        return filtered
    }

    const sectorFilter = (array, filterList) => {
        const filtered = array.filter(item => {
            return filterList.indexOf(item.Sector) >= 0;
        })
        return filtered
    }

    const typeFilter = (array, filterList) => {
        const filtered = array.filter(item => {
            return filterList.indexOf(item.ML_Type) >= 0;
        })
        return filtered
    }

    const filterAll = (list) => {

        // No filter
        if(!labeled && typeList.length === 0 && sectorList.length === 0 ){
            return list
        }

        // All Filter
        if(labeled && typeList.length !== 0 && sectorList.length !== 0 ) {
            const labeledResult = labeledFilter(list)
            const sectorFiltered = sectorFilter(labeledResult, sectorList)
            
            return typeFilter(sectorFiltered, typeList)
        }
        
        // ==================================================================
        // Labeled filter
        if(labeled && typeList.length === 0 && sectorList.length === 0 ) {
            return labeledFilter(list)
        }
        // Sector Filter
        if(!labeled && typeList.length === 0 && sectorList.length !== 0 ) {
            return sectorFilter(list, sectorList)
        }
        // ML Type Filter
        if(!labeled && typeList.length !== 0 && sectorList.length == 0 ) {
            return typeFilter(list, typeList)
        }

        // ==================================================================
        // (Labeled) && Sector Filter
        if(labeled && typeList.length === 0 && sectorList.length !== 0 ) {
            const labeledResult = labeledFilter(list)
            
            return sectorFilter(labeledResult, sectorList)
        }
        // (Labeled) && Type Filter
        if(labeled && typeList.length !== 0 && sectorList.length === 0 ) {
            const labeledResult = labeledFilter(list)
            
            return typeFilter(labeledResult, typeList)
        }

        // ==================================================================
        // (Sector Filter) && Type Filter
        if(!labeled && typeList.length !== 0 && sectorList.length !== 0 ) {
            const sectorResult = sectorFilter(list, sectorList)
            
            return typeFilter(sectorResult, typeList)
        }
    }

    const filterSimulation = (list) => {
        if(simulation){
            const datas = filterAll(list)
            const filteredSimulation = datas.filter(item => item['Simulation (Yes/No)'] === 'Yes')

            return filteredSimulation
        }else{
            return filterAll(list)
        }
    }

    const hanldeAllFilters = (list) => {
        // If [No] Simulation and Timeseries filter
        if(!simulation && !timeSeries){
            return filterAll(list)
        }
        
        // If Simulation and Timeseries filter
        if(simulation && timeSeries){
            const datas = filterAll(list)
            const filteredSimulation = datas.filter(item => item['Simulation (Yes/No)'] === 'Yes')
            const filteredTimeSeries = filteredSimulation.filter(item => item['Time Series (Yes/No)'] === 'Yes')

            return filteredTimeSeries
        }

        // If Simulation filter only
        if(simulation && !timeSeries){
            const datas = filterAll(list)
            const filteredSimulation = datas.filter(item => item['Simulation (Yes/No)'] === 'Yes')

            return filteredSimulation
        }

        // If Timeseries filter only
        if(!simulation && timeSeries){
            const datas = filterAll(list)
            const filteredTimeSeries = datas.filter(item => item['Time Series (Yes/No)'] === 'Yes')

            return filteredTimeSeries
        }
    }

    useEffect(() => {
        
    }, [sectorList, typeList, labeled, list, simulation, timeSeries])

    return (
        <Layout title="PHM Data Hub">
            <Search
                sectors={sectors}

                setQuery={setQuery}

                list={list}
                setList={setList}

                sort={sort}
                setSort={setSort}

                sectorList={sectorList}
                setSecorList={setSecorList}

                typeList={typeList}
                setTypeList={setTypeList}

                labeled={labeled}
                setLabeled={setLabeled}
            />
            <List
                datasets={hanldeAllFilters(list)}

                sectorList={sectorList}
                setSecorList={setSecorList}

                typeList={typeList}
                setTypeList={setTypeList}

                labeled={labeled}
                setLabeled={setLabeled}

                simulation={simulation}
                setSimulation={setSimulation}

                timeSeries={timeSeries}
                setTimeSeries={setTimeSeries}
            />
        </Layout>
    )
}

export async function getStaticProps(context) {
    // Get All Sector List
    const sectorWrapper = []
    datasets.map(item => {
        if(item.Sector){
            sectorWrapper.push(item.Sector)
        }
    })

    const finalSector = sectorWrapper.filter(function(item, pos) {
        return sectorWrapper.indexOf(item) == pos;
    })

    const sortedDatasets = datasets.sort(DOWNLOAD)

    return {
        props: {
            datasets: sortedDatasets,
            sectors: finalSector
        },
    }
}