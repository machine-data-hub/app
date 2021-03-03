import datasets from '../../data/newdatasets.json'
import Layout from '../../components/Layout'
import { MdFileDownload, MdFavorite } from 'react-icons/md'
import Link from 'next/link'
    
const Posts = ({ data, similar }) => {
    return (
        <Layout title={`${data.Name} - PHM Data Hub`}>
            <div className="page__post">
                <div className="page-left">
                    <div className="content__head">
                        <h1>{data.Name}</h1>
                        { data.img_link ? <img src={data.img_link} alt="Laptop"/> : '' }
                        
                    </div>
                    <div className="content__body">
                        <div className="content__left">
                            <div className="head">
                                <div>Dataset from: {data.Owner}</div>
                                <div>Donated: January 20, 2021</div>
                            </div>
                            <div className="info">
                                <span>{data.FileSize}</span>
                                { data.Attributes && data.Attributes !== 'N/A' ? <span>{data.Attributes} Attributes</span> : ''}
                                { data.Instances && data.Instances !== 'N/A' ? <span>{data.Instances} Instances</span> : ''}
                            </div>
                            <div className="details">
                                <div><span className="icon__download"><MdFileDownload/></span>{data.Downloads} Downloads</div>
                                <div><span><MdFavorite/></span>{data.Likes} Likes</div>
                            </div>
                            <div className="tags">
                                { data.Sector && <div>{data.Sector}</div> }
                                { data.ML_Type && (
                                    data.ML_Type?.map((x, i) => (
                                        <div key={i}>{x}</div>
                                    ))
                                )}
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
                    <h2 className="widget__title">Similar Datasets</h2>
                    {
                        similar?.map((item, index) => (
                            <div className="card" key={index}>
                                <div className="card__title">
                                    <Link href={`/posts/${item.id}`}><h2>{item.Name}</h2></Link>
                                    <div className="card__info">
                                        <span>{item.FileSize}</span>
                                        { item.Attributes && item.Attributes !== 'N/A' ? <span>{item.Attributes} Attributes</span> : ''}
                                        { item.Instances && item.Instances !== 'N/A' ? <span>{item.Instances} Instances</span> : ''}
                                    </div>
                                </div>
                                <div className="card__details">
                                    <div><span className="icon__download"><MdFileDownload/></span>{item.Downloads} Downloads</div>
                                    <div><span><MdFavorite/></span>{item.Likes} Likes</div>
                                </div>
                                <div className="card__tags">
                                    { item.Sector && <div>{item.Sector}</div> }
                                    { item.ML_Type && (
                                        data.ML_Type?.map((x, i) => (
                                            <div key={i}>{x}</div>
                                        ))
                                    )}
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
            <div className="wrapper">
                <Link href="/"><button className="button__back">Back</button></Link>
            </div>
        </Layout>
    );
}
    
export default Posts

Posts.getInitialProps = async ({ query: { id } }) => {
    const datas = datasets.filter(item => item.id === id) // get data from dataset by id
    const data = datas[0]

    // Get similar datasets
    const filteredDatasets  = datasets.filter(item => item.id !== data.id) // remove current data from dataset
    const similarSector = filteredDatasets.filter(item => item.Sector === data['Sector']) // get similar dataset by ml sector
    const similarType = filteredDatasets.filter(item => item.ML_Type === data['ML_Type'])  // get similar dataset by ml type
    const similarLabeled = filteredDatasets.filter(item => item.Labeled === data['Labeled']) // get similar dataset by labeled
    const similarTimeSeries = filteredDatasets.filter(item => item['Time Series (Yes/No)'] === data['Time Series (Yes/No)']) // get similar dataset by time series

    const similarDatasets = [...similarSector, ...similarType, ...similarLabeled, ...similarTimeSeries] // combining all similar data into single array
    const finalData = similarDatasets.filter((v,i,a) => a.findIndex(t => (t.id === v.id))===i) // remove duplicate data

    const mostSimilar = finalData.slice(0,2) // slice array to get 2 most similar dataset

    return { data, similar: mostSimilar }
}