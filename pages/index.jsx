import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import List from "../components/List";
import Search from "../components/Search";

import datasets from "../data/newdatasets.json";
import { useSector } from "../context/SectorContext";
import { useType } from "../context/TypeContext";
import { useLabeled } from "../context/LabeledContext";
import { useTimeSeries } from "../context/TimeSeriesContext";
import { useSimulation } from "../context/SimulationContext";
import { usePage } from "../context/PageContext";
import { useSort } from "../context/SortContext";
import { ASC, DATAADDED, DES, MOSTPOPULAR, DOWNLOAD } from "../utils/sort";

//---------------------------
import { useCard } from "../context/CardContext";

// Change page limit here
const postPerPage = 20;

export default function Home({ datasets, sectors, isServer, mLTypes }) {
  const [list, setList] = useState([]); // state to store list of datasets
  const [query, setQuery] = useState(""); // state to store keyword from input
  const [sort, setSort] = useSort(); // state to store sort keyword

  const [sectorList, setSecorList] = useSector([]); // state to store array of sectors
  const [typeList, setTypeList] = useType([]); // state to store array of ml types
  const [labeled, setLabeled] = useLabeled(); // state to store labeled keyword
  const [timeSeries, setTimeSeries] = useTimeSeries(); // state to store array of sector
  const [simulation, setSimulation] = useSimulation(); // state to store simulation keyword

  // const [card, setCard] = useCard();

  // handle automatic sorting for initial load
  // default: by total downloads
  const handleSort = (list) => {
    const sorted = list.sort(
      sort === "DATA_ADDED"
        ? DATAADDED
        : sort === "ASC"
        ? ASC
        : sort === "DES"
        ? DES
        : sort === "DOWNLOAD"
        ? DOWNLOAD
        : sort === "MOST_POPULAR"
        ? MOSTPOPULAR
        : DOWNLOAD
    );
    return sorted;
  };

  // Function to handle filter datasets by keyword from search box
  const onChange = (datasets) => {
    // filter when query is not empty
    if (query !== "") {
      const map = datasets.filter((v, i) => {
        var matchedSearch = false;
        if (v.Owner.toLocaleLowerCase().includes(query.toLowerCase().trim())) {
          return true;
          // return v.Owner.toLocaleLowerCase().includes(query.toLowerCase().trim());
        }

        if (v.Name.toLocaleLowerCase().includes(query.toLowerCase().trim())) {
          return true;
        }
        if (v["Short Summary"].toLocaleLowerCase().includes(query.toLowerCase().trim())) {
          return true;
        }

        // ML tags
        // tags = boolean array
        v["ML Type"].map((entry) => {
          if (entry.toLocaleLowerCase().includes(query.toLowerCase().trim())) {
            return true;
            //return entry.toLocaleLowerCase().includes(query.toLowerCase().trim());
          }
        });

        // can't I use a switch statement? I couldn't figure it out :(
        // time series
        if (
          v["Time Series"] === "Yes" &&
          "time series".includes(query.toLowerCase().trim())
        ) {
          return true;
        }
        // labeled
        if (
          v["Labeled"] === "Yes" &&
          "labeled".includes(query.toLowerCase().trim())
        ) {
          return true;
        }
         // simulation
         if (
          v["Simulation (Yes/No)"] === "Yes" &&
          "simulation".includes(query.toLowerCase().trim())
        ) {
          return true;
        }


        return false; //v.Name.toLocaleLowerCase().includes(query.toLowerCase().trim()) || tags.includes(true); // filter datasets by string using includes()
      });
      setList(map);
    } else {
      setList(datasets);
    }
  };

  // when query & datasets are changing -> re-render component and run onChange function to filter dataset by query
  useEffect(() => {
    onChange(datasets);
  }, [query, datasets]);

  // when datasets are changing -> run setList function to set state
  useEffect(() => {
    setList(datasets);
  }, [datasets]);

  // Function to handle dataset filter by labeled
  const labeledFilter = (list) => {
    // list = list of dataset
    const filtered = list.filter((item) => item.Labeled === labeled);
    return filtered;
  };

  // Function to handle dataset filter by sector
  const sectorFilter = (array, filterList) => {
    // array = list of dataset
    // filterList = array of ml sector keyword
    const filtered = array.filter((item) => {
      return filterList.indexOf(item.Sector) >= 0;
    });
    return filtered;
  };

  const getUnique = (arr, comp) => {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
    return unique;
  };

  // Function to handle dataset filter by ml type
  const typeFilter = (array, filterList) => {
    // array = list of dataset
    // filterList = array of ml type keyword
    const filtered = [];
    array.map((item) => {
      item["ML Type"]?.map((tag) => {
        if (filterList?.some((x) => x === tag)) {
          filtered.push(item);
        }
      });
    });

    const final = getUnique(filtered, "id");
    return final;
  };

  // Function to handle filter by LABELED, ML TYPE, and SECTOR LIST
  const filterAll = (list) => {
    // No filter -> return all datasets
    if (!labeled && typeList.length === 0 && sectorList.length === 0) {
      return list;
    }

    // All Filter
    if (labeled && typeList.length !== 0 && sectorList.length !== 0) {
      const labeledResult = labeledFilter(list); // filter dataset by label
      const sectorFiltered = sectorFilter(labeledResult, sectorList); // filter dataset by sector

      return typeFilter(sectorFiltered, typeList); // filter dataset by ml type -> return the final list
    }

    // handle filter by LABELED only
    if (labeled && typeList.length === 0 && sectorList.length === 0) {
      return labeledFilter(list); // filter dataset by labeled
    }
    // handle filter by SECTOR only
    if (!labeled && typeList.length === 0 && sectorList.length !== 0) {
      return sectorFilter(list, sectorList); // filter dataset by sector
    }
    // handle filter by ML TYPE only
    if (!labeled && typeList.length !== 0 && sectorList.length == 0) {
      return typeFilter(list, typeList); // filter dataset by ml type
    }

    // handle filter by LABELED and SECTOR only
    if (labeled && typeList.length === 0 && sectorList.length !== 0) {
      const labeledResult = labeledFilter(list); // filter dataset by labeled

      return sectorFilter(labeledResult, sectorList); // filter dataset by sector -> return the final list
    }
    // handle filter by LABELED and ML TYPE only
    if (labeled && typeList.length !== 0 && sectorList.length === 0) {
      const labeledResult = labeledFilter(list); // filter dataset by labeled

      return typeFilter(labeledResult, typeList); // filter dataset by ml type -> return the final list
    }

    // handle filter by SECTOR and TYPE only
    if (!labeled && typeList.length !== 0 && sectorList.length !== 0) {
      const sectorResult = sectorFilter(list, sectorList); // filter dataset by sector

      return typeFilter(sectorResult, typeList); // filter dataset by ml type -> return the final list
    }
  };

  // Function to handle filter by SIMULATION and TIMESERIES
  const hanldeAllFilters = (list) => {
    // if there is no SIMULATION & TIMESERIES filter -> retrun fillterAll function (datasets filtered by LABELED, ML TYPE, and SECTOR LIST)
    if (!simulation && !timeSeries) {
      return filterAll(list); // run filterAll() --- line 72
    }

    // handle filter by SIMULATION and TIMESERIES
    if (simulation && timeSeries) {
      const datas = filterAll(list); // run filterAll() --- line 72
      const filteredSimulation = datas.filter(
        (item) => item["Simulation (Yes/No)"] === "Yes"
      ); // filter by simulation
      const filteredTimeSeries = filteredSimulation.filter(
        (item) => item["Time Series (Yes/No)"] === "Yes"
      ); // filter by timeseries

      return filteredTimeSeries;
    }

    // handle by SIMULATION filter only
    if (simulation && !timeSeries) {
      const datas = filterAll(list); // run filterAll() --- line 72
      const filteredSimulation = datas.filter(
        (item) => item["Simulation (Yes/No)"] === "Yes"
      ); // filter by simulation

      return filteredSimulation;
    }

    // handle filter by TIMESERIES only
    if (!simulation && timeSeries) {
      const datas = filterAll(list); // run filterAll() --- line 72
      const filteredTimeSeries = datas.filter(
        (item) => item["Time Series (Yes/No)"] === "Yes"
      ); // filter by timeseries

      return filteredTimeSeries;
    }
  };

  useEffect(() => {
    // Use effect to re-render component when sectorList, typeList, labeled, list, simulation, timeSeries are changing
  }, [sectorList, typeList, labeled, list, simulation, timeSeries]);

  const [page, setPage] = usePage();

  useEffect(() => {
    if (isServer === true) {
      setPage("");
      localStorage.removeItem("page");
    }
  }, [isServer]);

  // Function to handle pagination
  const changePage = (current) => {
    // current = pagination button value

    // if pagination button value not equal to current page
    if (current !== page) {
      window.scrollTo({ top: 0, left: 0 }); // auto scroll to tope when pagination button is clicked
      localStorage.setItem("page", current);
      return setPage(current); // set current page
    }
  };

  // Function to handle pagination
  function paginate(array, page_size, page_number) {
    // array = datasets list
    const startSlice = (page_number - 1) * page_size;
    const endSlice = page_number * page_size;

    return array.slice(startSlice, endSlice); // return the datasets after web slice the array
  }

  // Count how many pages available
  const totalPagination = Math.ceil(
    hanldeAllFilters(list).length / postPerPage
  );

  useEffect(() => {
    if (page > totalPagination) {
      setPage(1);
    }
  }, [totalPagination]);

  return (
    <Layout title={`Machine Data Hub`}>
      <Search
        sectors={sectors}
        mLTypes={mLTypes}
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
        simulation={simulation}
        setSimulation={setSimulation}
        timeSeries={timeSeries}
        setTimeSeries={setTimeSeries}
      />
      <List
        // paginate(array, post per page, current page)
        datasets={paginate(
          handleSort(hanldeAllFilters(list)),
          postPerPage,
          page
        )}
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
        currentPage={page}
        totalPage={totalPagination}
        //---------------------------
        // card={card}
        // setCard={setCard}
      />
      <div className="pagination">
        {/* mapping pagination button. index 0 = page 1 */}
        {[...Array(totalPagination)].map((x, index) => {
          return (
            <div
              className={`page ${
                parseInt(index + 1) === parseInt(page) ? "active" : ""
              }`}
              key={index}
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

Home.getInitialProps = async (context) => {
  // Get All Sector List
  const sectorWrapper = [];
  datasets.map((item) => {
    // mapping through datasest to get sector list only
    if (item.Sector) {
      sectorWrapper.push(item.Sector);
    }
  });

  const typeWrapper = [];
  datasets.map((item) => {
    // mapping through datasest to get sector list only
    if (item["ML Type"].length > 0) {
      typeWrapper.push(...item["ML Type"]);
    }
  });

  const finalSector = sectorWrapper.filter(function (item, pos) {
    return sectorWrapper.indexOf(item) == pos;
  });

  const finalMLType = typeWrapper.filter(function (item, pos) {
    return typeWrapper.indexOf(item) == pos;
  });

  // sort all datasest by total download
  const sortedDatasets = datasets.sort(DOWNLOAD);

  return {
    datasets: sortedDatasets,
    sectors: finalSector,
    mLTypes: finalMLType,
    isServer: context.res ? true : false,
  };
};
