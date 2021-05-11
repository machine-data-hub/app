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

}) => {

  return (
    <div className="search__feature">
      <div className="welcome__text">
        <div className="big__word">Explore</div>
        <div className="description">popular prognostics and health management data sets. <a href="/getting-started">Click here</a> to learn more about Machine Data Hub. </div>
      </div>
      <div className="input__wrapper">
        
        <Filter         
        sectors={sectors}
        mLTypes={mLTypes}

        sort={sort}
        setSort={setSort}

        list={list}
        setList={setList}
        
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
