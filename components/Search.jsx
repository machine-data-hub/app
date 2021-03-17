import { MdSearch } from "react-icons/md";
import { BiSort } from "react-icons/bi";
import { useState } from "react";
import {
  handleSectorFilter,
  handleTypeFilter,
  handleLabeledFilter,
} from "../utils/filter";
import { ASC, DATAADDED, DES, MOSTPOPULAR, DOWNLOAD } from "../utils/sort";

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
}) => {
  const [filterOpen, setFilterOpen] = useState(false); // State to toggle filter box

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
      <div className="input__wrapper">
        <span className="icon__search">
          <MdSearch />
        </span>
        <input
          type="text"
          placeholder="Enter dataset, ML Task, or other tags"
          onChange={(e) => setQuery(e.target.value)}
        />
        <span
          className={`icon__sort ${filterOpen ? "active" : ""}`}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <BiSort /> Filter
        </span>
        {filterOpen && (
          <div className="sort__wrapper">
            <div className="field">
              <h2>Sort By</h2>
              <div className="buttons">
                {/* activate a css class for clicked button */}
                <button
                  onClick={onClickSort("DATA_ADDED")}
                  className={sort === "DATA_ADDED" ? "active" : ""}
                >
                  Date Added
                </button>
                <button
                  onClick={onClickSort("MOST_POPULAR")}
                  className={sort === "MOST_POPULAR" ? "active" : ""}
                >
                  Most Likes
                </button>
                <button
                  onClick={onClickSort("DOWNLOAD")}
                  className={sort === "DOWNLOAD" ? "active" : ""}
                >
                  Most Downloads
                </button>
                <button
                  onClick={onClickSort("ASC")}
                  className={sort === "ASC" ? "active" : ""}
                >
                  A to Z
                </button>
                <button
                  onClick={onClickSort("DES")}
                  className={sort === "DES" ? "active" : ""}
                >
                  Z to A
                </button>
              </div>
            </div>
            <div className="field">
              <h2>Sector</h2>
              <div className="buttons">
                {sectors?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleSectorFilter(item, sectorList, setSecorList)
                    }
                    className={sectorList.includes(item) ? "active" : ""}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <h2>ML Type</h2>
              <div className="buttons">
                {mLTypes?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleTypeFilter(item, typeList, setTypeList)
                    }
                    className={typeList.includes(item) ? "active" : ""}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <h2>Labeled</h2>
              <div className="buttons">
                <button
                  onClick={() => {
                    labeled === "Yes"
                      ? handleLabeledFilter("", setLabeled)
                      : handleLabeledFilter("Yes", setLabeled);
                  }}
                  className={labeled === "Yes" ? "active" : ""}
                >
                  Labeled
                </button>
                <button
                  onClick={() => {
                    labeled === "No"
                      ? handleLabeledFilter("", setLabeled)
                      : handleLabeledFilter("No", setLabeled);
                  }}
                  className={labeled === "No" ? "active" : ""}
                >
                  Not Labeled
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
