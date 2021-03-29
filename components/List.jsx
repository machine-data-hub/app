import { MdFileDownload, MdFavorite, MdClose, MdImage } from "react-icons/md";
import Link from "next/link";
import {
  handleSectorFilter,
  handleTypeFilter,
  handleLabeledFilter,
} from "../utils/filter"; //import filter handler

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
  setTimeSeries,

  currentPage,
  totalPage,
}) => {
  // function to handle simulation state
  const handleSimulationFilter = () => {
    if (simulation === "Yes") {
      // if user has clicked the button -> empty the state
      setSimulation("");
    } else {
      setSimulation("Yes"); // if user has not clicked the button -> set the state to Yes (filter by simulation is active)
    }
  };

  // function to handle timeseries state
  const handleTimeSeriesFilter = () => {
    if (timeSeries === "Yes") {
      // if user has clicked the button (timeseries filter is active) -> empty the state
      setTimeSeries("");
    } else {
      setTimeSeries("Yes"); // if user has not clicked the button -> set the state to Yes (filter by timeseries is active)
    }
  };

  return (
    <div className="dataset__list">
      <div className="buttons">
        <div className="buttonsSort">
          {
            // only show the button if filter by sector is active (array is not empty)
            sectorList.length > 0 ? (
              <>
                {sectorList.map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleSectorFilter(item, sectorList, setSecorList)
                    }
                  >
                    {item}{" "}
                    <span>
                      <MdClose />
                    </span>
                  </button>
                ))}
              </>
            ) : (
              ""
            )
          }
          {
          // only show the button if filter by simulation is active (state is not empty)
          simulation && (
            <button onClick={() => setSimulation("")}>
              Simulation{" "}
              <span>
                <MdClose />
              </span>
            </button>
          )
        }
        </div>
        <div className="buttonsML">
          {
            // only show the button if filter by ml type is active (array is not empty)
            typeList.length > 0 ? (
              <>
                {typeList.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleTypeFilter(item, typeList, setTypeList)}
                    className="buttonsML"
                  >
                    {item}{" "}
                    <span>
                      <MdClose />
                    </span>
                  </button>
                ))}
              </>
            ) : (
              ""
            )
          }
          {
          // only show the button if filter by timeseries is active (state is not empty)
          timeSeries && (
            <button onClick={() => setTimeSeries("")}>
              Time Series{" "}
              <span>
                <MdClose />
              </span>
            </button>
          )
        }
        </div>
        <div className="buttonsLabeled">
          {
            // only show the button if filter by labeled is active (state is not empty)
            labeled && (
              <button onClick={() => setLabeled("")} className="buttonsLabeled">
                {labeled === "Yes" ? "Labeled" : "Not Labeled"}{" "}
                <span>
                  <MdClose />
                </span>
              </button>
            )
          }
        </div>
        {/* <div className="page-number">Page {currentPage} of {totalPage > 0 ? totalPage : 1}</div> */}
      </div>
      <ul className="list__wrapper">
        {
          // mapping through datasets and returns jsx
          datasets?.map((item, index) => (
            <li key={index}>
              <div className="card__image">
                {item.img_link ? (
                  <img src={item.img_link} alt="Dataset" />
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
                <div className="card__info">
                  <span>{item.FileSize}</span>
                  {item["One Line"]}
                  {/* {item.Attributes && item.Attributes !== "N/A" ? (
                    <span>{item.Attributes} Attributes</span>
                  ) : (
                    ""
                  )}
                  {item.Instances && item.Instances !== "N/A" ? (
                    <span>{item.Instances} Instances</span>
                  ) : (
                    ""
                  )} */}
                </div>
              </div>
              <div className="card__details">
                <div>
                  <span className="icon__download">
                    <MdFileDownload />
                  </span>
                  {item.Downloads ? item.Downloads : 0} Downloads
                </div>
                <div>
                  <span>
                    <MdFavorite />
                  </span>
                  {item.Likes} Likes
                </div>
              </div>
              <div className="card__tags">
                {item.Sector && (
                  <div
                    className="buttonsSector"
                    onClick={() =>
                      handleSectorFilter(item.Sector, sectorList, setSecorList)
                    }
                  >
                    {item.Sector}
                  </div>
                )}

                {item.ML_Type?.length > 0 &&
                  item.ML_Type.map((tag, index) => (
                    <div
                    className="buttonsML"
                      key={index}
                      onClick={() =>
                        handleTypeFilter(tag, typeList, setTypeList)
                      }
                    >
                      {tag}
                    </div>
                  ))}

                {item.Labeled === "Yes" && (
                  <div
                  className="buttonsLabeled"
                    onClick={() => {
                      labeled === "Yes"
                        ? handleLabeledFilter("", setLabeled)
                        : handleLabeledFilter("Yes", setLabeled);
                    }}
                  >
                    Labeled
                  </div>
                )}

                {item["Time Series (Yes/No)"] === "Yes" && (
                  <div 
                    onClick={() => handleTimeSeriesFilter("Yes")}
                    className="buttonsML"
                  >
                    Time Series
                  </div>
                )}
                {item["Simulation (Yes/No)"] === "Yes" && (
                  <div 
                    onClick={() => handleSimulationFilter("Yes")}
                    className="buttonsSector"  
                  >
                    Simulation
                  </div>
                )}
              </div>
              <div className="card__footer">
                <Link href={`/posts/${item.id}`}>
                  <span>SEE MORE!</span>
                </Link>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default List;
