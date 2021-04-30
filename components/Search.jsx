import { MdSearch, MdSettingsInputComponent } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import {
  handleSectorFilter,
  handleTypeFilter,
  handleLabeledFilter,
} from "../utils/filter";
import { ASC, DATAADDED, DES, MOSTPOPULAR, DOWNLOAD } from "../utils/sort";
import Filter from "./Filter";

let useClickOutside = (handler) => {
  let ref = useRef();

  useEffect(() => {
    let clickHandler = (event) => {
      if (!ref.current.contains(event.target)) {
        handler();
      }
    };

    let keyHandler = (event) => {
      if (event.keyCode === 27) {
        handler();
      }
    };
    document.addEventListener("mousedown", clickHandler);

    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    };
  });
  return ref;
};

const Search = ({
  sectors,
  mLTypes,

  setQuery,
  list,
  setList,

  sort,
  setSort,

  sectorList,
  setSecorList,

  typeList,
  setTypeList,

  labeled,
  setLabeled,

  simulation,
  setSimulation,

  timeSeries,
  setTimeSeries,

  //--------
  // card,
  // setCard,
}) => {
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

  const [filterOpen, setFilterOpen] = useState(false); // State to toggle filter box
  const [sorterOpen, setSorterOpen] = useState(false);
  let clickRef = useClickOutside(() => {
    setFilterOpen(false);
    setSorterOpen(false);
  });

  //  Function to handle sorting (by Date added, ascending, descending, total dowwnload, and total likes)
  const onClickSort = (prop) => () => {
    // prop = sorting type
    // If sorting type is already clicked -> unclick the button and remove the sorting
    if (sort === prop) {
      setSort("");
      const sorted = list.sort(DOWNLOAD);
      setList(sorted);
    } else {
      // If sorting type is not clicked -> click the button and change sorting type
      setSort(prop);
      const sorted = list.sort(
        prop === "DATA_ADDED"
          ? DATAADDED
          : prop === "ASC"
          ? ASC
          : prop === "DES"
          ? DES
          : prop === "DOWNLOAD"
          ? DOWNLOAD
          : prop === "MOST_POPULAR"
          ? MOSTPOPULAR
          : DOWNLOAD
      );
      setList(sorted);
    }
  };

  return (
    <div className="search__feature">
      <div className="input__wrapper" ref={clickRef}>
        

        <Filter         
        sectors={sectors}
        mLTypes={mLTypes}

        sort={sort}
        setSort={setSort}
        
        sectorList={sectorList}
        setSecorList={setSecorList}
        
        typeList={typeList}
        setTypeList={setTypeList}
        
        labeled={labeled}
        setLabeled={setLabeled}
        
        simulation={simulation}
        setSimulation={setSimulation}
        
        timeSeries={timeSeries}
        setTimeSeries={setTimeSeries}/>
    
        <div className="search__bar">
          <span className="icon__search">
            <MdSearch />
          </span>
          <input
            type="text"
            placeholder="Enter dataset, ML Task, or other tags"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
