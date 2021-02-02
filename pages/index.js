import Link from "next/link";

import Layout from "../components/Layout";

import "../components/index.scss";

import Grid from "../components/Grid";
import cardTest from "../config/carddata";

import Search from "../components/Search";

// import readCSV from "../config/readCSV.js";

// import FetchCSV from "../components/FetchCSV";


const Index = () => (

  <Layout>
    <br />
    {/* <Link href="/about-us">
      <a>Center Hub, Will Hold Data!</a> 
    </Link> */}
    <Search/>
    {/* <Grid cards={cardTest} /> */}
  </Layout>

);

export default Index;