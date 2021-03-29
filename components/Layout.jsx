import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className="container">{children}</div>
      <div className="footer"></div>
    </>
  );
};

export default Layout;
