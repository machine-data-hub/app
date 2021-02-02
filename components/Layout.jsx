// Header Imports
import Head from "next/head";
import Header from "./Header";

// NavBar Imports
import NavBar from "./NavBar";
import navButtons from "../config/buttons";

// Grid Imports
import Grid from "../components/Grid";
import cardInfo from "../config/carddata";

// Style
import "./Layout.scss";
import "./index.scss";




const Layout = props => {
  const appTitle = `PHM Data Hub`;

  return (
    <div className="Layout">
      <Head>
        <title>PHM Data Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>

      <Header appTitle={appTitle} />
      
      <div className="Content">{props.children}</div>
      
      <NavBar navButtons={navButtons} />
    </div>
  );
};

export default Layout;