import datasets from "../../data/newdatasets.json";
import Layout from "../../components/Layout";
import { MdFileDownload, MdFavorite, MdImage } from "react-icons/md";
import { AiOutlineFile } from "react-icons/ai";
import Link from "next/link";

const Posts = ({ data, similar }) => {
  return (
    <Layout title={`${data.Name} - Machine Data Hub`}>
      <div className="page__post">
        <div className="page__top">
          <div className="content__head">
            <h1>{data.Name}</h1>
            {data.ImgLink ? <img src={data.ImgLink} alt="Laptop" /> : ""}
          </div>
          <div className="content__body">
            <div className="content__left">
              <div className="head">
                <div>Dataset from: {data.Owner}</div>
                <div>Acquired: {data.DateDonated}</div>
              </div>
              <div className="info">
                <div className="card__details">
                  <div>
                    <span className="icon__download">
                      <AiOutlineFile />
                    </span>
                    {data.FileType}
                  </div>
                </div>
                {/* <span>{data["File Size"]}</span> */}
                {data.Attributes && data.Attributes !== "N/A" ? (
                  <span>{data.Attributes} Attributes</span>
                ) : (
                  ""
                )}
                {data.Instances && data.Instances !== "N/A" ? (
                  <span>{data.Instances} Instances</span>
                ) : (
                  ""
                )}
              </div>
              <div className="details">
                <div>
                  <span className="icon__download">
                    <MdFileDownload />
                  </span>
                  {data.Downloads} Downloads
                </div>
                <div>
                  <span>
                    <MdFavorite />
                  </span>
                  {data.Likes} Likes
                </div>
              </div>
              <div className="tags">
                {data.Sector && <div className="sector">{data.Sector}</div>}
                {data.MLType &&
                  data.MLType?.map((x, i) => (
                    <div key={i} className="ML">
                      {x}
                    </div>
                  ))}
                {data.Labeled === "Yes" && (
                  <div className="labeled">Labeled</div>
                )}
                {data.TimeSeries === "Yes" && (
                  <div className="ML">Time Series</div>
                )}
                {data.Simulation === "Yes" && (
                  <div className="sector">Simulation</div>
                )}
              </div>
              <div className="more">
                <div>More info:</div>
                <a href={data.URL}>
                  {data.URL}
                </a>
              </div>
            </div>
            <div className="content__right">
              <h3>About this dataset</h3>
              <p>{data.ShortSummary}</p>
              {data.Datasets.map((set) => (
                <div className="more_datasets">
                  <div className="more_name">{set.Name}</div>
                  <div>
                    <span>
                      <MdFavorite />
                    </span>
                    {set.Likes} Likes
                  </div>
                  <div>
                    <span className="icon__download">
                      <MdFileDownload />
                    </span>
                    {set.Downloads} Downloads
                  </div>
                  <div>
                    <div className="file__size">{set.FileSize} </div>
                  </div>
                  <a href={set.URL}>
                    <button className="button" type="button">
                      Download
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="page__bottom">
          <h2 className="widget__title">Similar Datasets</h2>
          <div className="card__container">
            {similar?.map((item, index) => (
              <div className="card" key={index}>
                <div className="card__image">
                  {item.ImgLink ? (
                    <img src={item.ImgLink} alt="Dataset" />
                  ) : (
                    <span>
                      <MdImage />
                    </span>
                  )}
                </div>
                <div className="card__title">
                  <Link href={`/posts/${item.id}`}>
                    <h2>{item.Name}</h2>
                  </Link>
                  <div className="card__info">{item.OneLine}</div>
                </div>
                <div className="card__tags">
                  {item.Sector && (
                    <div className="buttonsSector">{item.Sector}</div>
                  )}
                  {item.MLType &&
                    data.MLType.map((x, i) => (
                      <div className="buttonsML" key={i}>
                        {x}
                      </div>
                    ))}
                  {item.Labeled === "Yes" && (
                    <div className="buttonsLabeled">Labeled</div>
                  )}
                  {item.TimeSeries === "Yes" && (
                    <div className="buttonsML">Time Series</div>
                  )}
                  {item.Simulation === "Yes" && (
                    <div buttons="buttonsSector">Simulation</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="wrapper">
        <Link href="/">
          <button className="button__back">Back</button>
        </Link>
      </div>
    </Layout>
  );
};

export default Posts;

Posts.getInitialProps = async ({ query: { id } }) => {
  const datas = datasets.filter((item) => item.id === id); // get data from dataset by id
  const data = datas[0];

  // Get similar datasets
  const filteredDatasets = datasets.filter((item) => item.id !== data.id); // remove current data from dataset
  const similarSector = filteredDatasets.filter(
    (item) => item.Sector === data.Sector
  ); // get similar dataset by ml sector
  const similarType = filteredDatasets.filter(
    (item) => item.ML_Type === data.MLType
  ); // get similar dataset by ml type
  const similarLabeled = filteredDatasets.filter(
    (item) => item.Labeled === data.Labeled
  ); // get similar dataset by labeled
  const similarTimeSeries = filteredDatasets.filter(
    (item) => item.TimeSeries === data.TimeSeries
  ); // get similar dataset by time series

  const similarDatasets = [
    ...similarSector,
    ...similarType,
    ...similarLabeled,
    ...similarTimeSeries,
  ]; // combining all similar data into single array
  const finalData = similarDatasets.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  ); // remove duplicate data

  const mostSimilar = finalData.slice(0, 2); // slice array to get 2 most similar dataset

  return { data, similar: mostSimilar };
};
