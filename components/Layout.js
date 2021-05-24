import Head from "next/head";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Helmet>
        <meta name="application-name" content="Machine Data Hub" />
        <meta name="author" content="Machine Data Hub" />
        <meta
          name="description"
          content="Open source data hub for locating prognostics and health management datasets"
        />
        <meta
          name="keywords"
          content="Machine learning, datasets, PHM, prognostics, health management, data hub, open source"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2178b3" />

        <meta property="og:url"   content="https://machinedatahub.ai" />
        <meta property="og:type"  content="website" />
        <meta property="og:title" content="Machine Data Hub" />
        <meta property="og:description" content="Open source data hub for prognostics and health management datasets"/>
      </Helmet>
      <Navbar />
      <div className="container">{children}</div>
      <div className="footer"></div>
    </>
  );
};

export default Layout;
