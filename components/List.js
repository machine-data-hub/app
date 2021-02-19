import { MdFileDownload, MdFavorite, MdClose } from 'react-icons/md'
import Link from 'next/link'
import { handleSectorFilter, handleTypeFilter, handleLabeledFilter } from '../utils/filter'
    
const List = ({
    datasets,

    sectorList,
    setSecorList,
    
    setLabeled,
    labeled,
    
    typeList,
    setTypeList,

    simulation,
    setSimulation,

    timeSeries,
    setTimeSeries
}) => {
    const getMLType = (type) => {
        if(type.includes(',')){
            const typeList = type.split(',')
            return typeList.map((item, index) => (
                <div key={`label-${index}`}>{item.trim()}</div>
            )) 
        }else{
            return <div onClick={() => handleTypeFilter(type, typeList, setTypeList)}>{type}</div>
        }
    }

    const handleSimulationFilter = () => {
        if(simulation === 'Yes'){
            setSimulation('')
        }else{
            setSimulation('Yes')
        }
    }

    const handleTimeSeriesFilter = () => {
        if(timeSeries === 'Yes'){
            setTimeSeries('')
        }else{
            setTimeSeries('Yes')
        }
    }

    return (
        <div className="dataset__list">
            <div className="buttons">
                {
                    sectorList.length > 0 ? (
                        <>
                        {
                            sectorList.map((item, index) => (
                                <button onClick={() => handleSectorFilter(item, sectorList, setSecorList)}>{item} <span><MdClose/></span></button>
                            ))
                        }
                        </>
                    ) : ''
                }
                {
                    typeList.length > 0 ? (
                        <>
                        {
                            typeList.map((item, index) => (
                                <button onClick={() => handleSectorFilter(item, typeList, setTypeList)}>{item} <span><MdClose/></span></button>
                            ))
                        }
                        </>
                    ) : ''
                }
                { labeled && <button onClick={() => setLabeled('')}>{labeled === 'Yes' ? 'Labeled' : 'Not Labeled'} <span><MdClose/></span></button> }
                { timeSeries && <button onClick={() => setTimeSeries('')}>Time Series <span><MdClose/></span></button> }
                { simulation && <button onClick={() => setSimulation('')}>Simulation <span><MdClose/></span></button> }
            </div>
            <ul className="list__wrapper">
                {
                    datasets?.map((item, index) => (
                        <li key={index}>
                            <div className="card__image">
                                <img src="images/laptop.jpg" alt="Laptop"/>
                            </div>
                            <div className="card__title">
                                <h2>{item.Name}</h2>
                                <div className="card__info">
                                    <span>{item.FileSize}</span>
                                    <span>{item.Attributes ? item.Attributes : 'N/A'} Attributes</span>
                                    <span>{item.Instances ? item.Instances : 'N/A'} Instances</span>
                                </div>
                            </div>
                            <div className="card__details">
                                <div><span className="icon__download"><MdFileDownload/></span>{item.Downloads ? item.Downloads : 0} Downloads</div>
                                <div><span><MdFavorite/></span>{item.Likes} Likes</div>
                            </div>
                            <div className="card__tags">
                                { item.Sector && <div onClick={() => handleSectorFilter(item.Sector, sectorList, setSecorList)}>{item.Sector}</div> }
                                { item.ML_Type &&  getMLType(item.ML_Type)}
                                { item.Labeled === 'Yes' && <div onClick={() => {labeled === 'Yes' ? handleLabeledFilter('', setLabeled) : handleLabeledFilter('Yes', setLabeled) }}>Labeled</div> }
                                { item['Time Series (Yes/No)'] === 'Yes' && <div onClick={() => handleTimeSeriesFilter('Yes')}>Time Series</div> }
                                { item['Simulation (Yes/No)'] === 'Yes' && <div onClick={() => handleSimulationFilter('Yes')}>Simulation</div> }
                            </div>
                            <div className="card__footer">
                                <Link href={`/posts/${item.id}`}><span>SEE MORE!</span></Link>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default List