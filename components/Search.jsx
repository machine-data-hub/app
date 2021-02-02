import "./Search.scss";


import JSONDATA from "../public/datasets.json";
import {useState} from 'react';
import Grid from "./Grid";



const Search = props => {
    const [searchTerm, setSearchTerm] = useState("");



    return  (
        <div className="Search">
            <div className="search-bar">
                <input type="text" placeholder="Search..." onChange={(event) => {setSearchTerm(event.target.value); } }/>
            </div>
            
            <div className="search-grid">
                {JSONDATA.filter((val)=> {
                    if (searchTerm == "") {
                        return val
                    } else if (val.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((val, key) => {
                    return (
                    <Grid cardData={val}/>
                    )
                    // <div className="name" key={key} > <p>{val.Name}</p> </div>
                })}
            </div>
        </div>
    );
}

export default Search;