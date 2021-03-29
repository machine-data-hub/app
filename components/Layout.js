import Head from "next/head";
import Navbar from "./Navbar";
import Footer from './Footer';

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className="container">{children}</div>
      <div className="footer"></div>
      <Footer />
    </>
  );
};

export default Layout;
