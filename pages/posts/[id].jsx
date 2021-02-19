import datasets from '../../data/datasets.json'
import Layout from '../../components/Layout'
import { MdFileDownload, MdFavorite } from 'react-icons/md'
import Link from 'next/link'
    
const Posts = ({ data, similar }) => {
    const getMLType = (type) => {
        if(type.includes(',')){
            const typeList = type.split(',')
            return typeList.map((item, index) => (
                <div key={`label-${index}`}>{item.trim()}</div>
            )) 
        }else{
            return <div>{type}</div>
        }
    }

    return (
        <Layout title={`${data.Name} - PHM Data Hub`}>
            <div className="page__post">
                <div className="page-left">
                    <div className="content__head">
                        <h1>{data.Name}</h1>
                        <img src="/images/laptop.jpg" alt="Laptop"/>
                    </div>
                    <div className="content__body">
                        <div className="content__left">
                            <div className="head">
                                <div>Dataset from: {data.Owner}</div>
                                <div>Donated: January 20, 2021</div>
                            </div>
                            <div className="info">
                                <span>{data.FileSize}</span>
                                <span>{data.Attributes ? data.Attributes : 'N/A'} Attributes</span>
                                <span>{data.Instances ? data.Instances : 'N/A'} Instances</span>
                            </div>
                            <div className="details">
                                <div><span className="icon__download"><MdFileDownload/></span>{data.Downloads} Downloads</div>
                                <div><span><MdFavorite/></span>{data.Likes} Likes</div>
                            </div>
                            <div className="tags">
                                { data.Sector && <div>{data.Sector}</div> }
                                { data.ML_Type &&  getMLType(data.ML_Type)}
                                { data.Labeled === 'Yes' && <div>Labeled</div> }
                                { data['Time Series (Yes/No)'] === 'Yes' && <div>Time Series</div> }
                                { data['Simulation (Yes/No)'] === 'Yes' && <div>Simulation</div> }
                            </div>
                            <div className="more">
                                <div>More info:</div>
                                <a href={data['Web Page (for reference, not metadata)']}>{data['Web Page (for reference, not metadata)']}</a>
                            </div>
                        </div>
                        <div className="content__right">
                            <h3>About this dataset</h3>
                            <p>{data['Short Summary']}</p>
                            <a href={data.DownloadLink}><button type="button">Download</button></a>
                        </div>
                    </div>
                </div>
                <div className="page-right">
                    {
                        similar?.map((item, index) => (
                            <div className="card" key={index}>
                                <div className="card__title">
                                    <h2>{item.Name}</h2>
                                    <div className="card__info">
                                        <span>{item.FileSize}</span>
                                        <span>{item.Attributes ? item.Attributes : 'N/A'} Attributes</span>
                                        <span>{item.Instances ? item.Instances : 'N/A'} Instances</span>
                                    </div>
                                </div>
                                <div className="card__details">
                                    <div><span className="icon__download"><MdFileDownload/></span>{item.Downloads} Downloads</div>
                                    <div><span><MdFavorite/></span>{item.Likes} Likes</div>
                                </div>
                                <div className="card__tags">
                                    { item.Sector && <div>{item.Sector}</div> }
                                    { item.ML_Type &&  getMLType(item.ML_Type)}
                                    { item.Labeled === 'Yes' && <div>Labeled</div> }
                                    { item['Time Series (Yes/No)'] === 'Yes' && <div>Time Series</div> }
                                    { item['Simulation (Yes/No)'] === 'Yes' && <div>Simulation</div> }
                                </div>
                                <div className="card__footer">
                                    <Link href={`/posts/${item.id}`}><span>SEE MORE &gt;</span></Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    );
}
    
export default Posts

Posts.getInitialProps = async ({ query: { id } }) => {
    const datas = datasets.filter(item => item.id === id)
    const data = datas[0]

    // Get similar datasets
    const filteredDatasets  = datasets.filter(item => item.id !== data.id)
    const similarSector = filteredDatasets.filter(item => item.Sector === data['Sector'])
    const similarType = filteredDatasets.filter(item => item.ML_Type === data['ML_Type'])
    const similarLabeled = filteredDatasets.filter(item => item.Labeled === data['Labeled'])
    const similarTimeSeries = filteredDatasets.filter(item => item['Time Series (Yes/No)'] === data['Time Series (Yes/No)'])

    const similarDatasets = [...similarSector, ...similarType, ...similarLabeled, ...similarTimeSeries]
    const finalData = similarDatasets.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)

    const mostSimilar = finalData.slice(0,2)

    return { data, similar: mostSimilar }
}