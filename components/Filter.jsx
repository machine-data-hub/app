import { BiSort } from "react-icons/bi";
import { ImSortAlphaAsc } from "react-icons/im";
import { MdSearch, MdSettingsInputComponent } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import {
    handleSectorFilter,
    handleTypeFilter,
    handleLabeledFilter,
} from "../utils/filter";
import { ASC, DATAADDED, DES, MOSTPOPULAR, DOWNLOAD } from "../utils/sort";

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

const Filter = ({
    sectors,
    mLTypes,

    sort,
    setSort,

    list, 
    setList,

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
        <div className="filter__bar" ref={clickRef}>
            <div className="filter__buttons">
                <span
                    className={`icon__sort ${filterOpen ? "active" : ""}`}
                    onClick={() => setFilterOpen(!filterOpen)}
                >
                    <BiSort /> Filter
                </span>

                {filterOpen && (
                    <div className="sort__wrapper">
                        <div className="field">
                            <h2>Filter By</h2>
                            <h3>Sector</h3>
                            <div className="buttonsSector">
                                {sectors?.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            handleSectorFilter(
                                                item,
                                                sectorList,
                                                setSecorList
                                            )
                                        }
                                        className={
                                            sectorList.includes(item)
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        {item}
                                    </button>
                                ))}
                                <button
                                    onClick={() =>
                                        handleSimulationFilter("Yes")
                                    }
                                    className={
                                        simulation === "" ? "" : "active"
                                    }
                                >
                                    Simulation
                                </button>
                            </div>
                        </div>
                        <div className="field">
                            <h3>Machine Learning Type</h3>
                            <div className="buttonsML">
                                {mLTypes?.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            handleTypeFilter(
                                                item,
                                                typeList,
                                                setTypeList
                                            )
                                        }
                                        className={
                                            typeList.includes(item)
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        {item}
                                    </button>
                                ))}
                                <button
                                    onClick={() =>
                                        handleTimeSeriesFilter("Yes")
                                    }
                                    className={
                                        timeSeries === "" ? "" : "active"
                                    }
                                >
                                    Time Series
                                </button>
                            </div>
                        </div>
                        <div className="field">
                            <h3>Labeled</h3>
                            <div className="buttonsLabeled">
                                <button
                                    onClick={() => {
                                        labeled === "Yes"
                                            ? handleLabeledFilter(
                                                  "",
                                                  setLabeled
                                              )
                                            : handleLabeledFilter(
                                                  "Yes",
                                                  setLabeled
                                              );
                                    }}
                                    className={
                                        labeled === "Yes" ? "active" : ""
                                    }
                                >
                                    Labeled
                                </button>
                                <button
                                    onClick={() => {
                                        labeled === "No"
                                            ? handleLabeledFilter(
                                                  "",
                                                  setLabeled
                                              )
                                            : handleLabeledFilter(
                                                  "No",
                                                  setLabeled
                                              );
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

            <div className="sort__bar">
                <span
                    className={`icon__sort ${sorterOpen ? "active" : ""}`}
                    onClick={() => setSorterOpen(!sorterOpen)}
                >
                    <ImSortAlphaAsc /> Sort
                </span>

                {sorterOpen && (
                    <div className="sort__wrapper">
                        <div className="field">
                            <h2>Sort By</h2>
                            <div className="buttonsSort">
                                {/* activate a css class for clicked button */}
                                <button
                                    onClick={onClickSort("DOWNLOAD")}
                                    className={
                                        sort === "DOWNLOAD"
                                            ? "active"
                                            : sort === ""
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Most Downloads
                                </button>
                                <button
                                    onClick={onClickSort("MOST_POPULAR")}
                                    className={
                                        sort === "MOST_POPULAR" ? "active" : ""
                                    }
                                >
                                    Most Likes
                                </button>
                                <button
                                    onClick={onClickSort("DATA_ADDED")}
                                    className={
                                        sort === "DATA_ADDED" ? "active" : ""
                                    }
                                >
                                    Date Added
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filter;
