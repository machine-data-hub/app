import Layout from "../components/Layout";
import teams from "../data/team.json";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

const GettingStarted = () => {
  return (
    <Layout title="Getting Started | Machine Data Hub">
      <div className="page__about">
        <h1>About Machine Data Hub</h1>
        <div className="body">
          <p>
            Welcome to the Machine Data Hub! The goal of this open source
            website is to provide meaningful and useful datasets for machine
            learning applications in prognostics health management. The datasets
            have been compiled from various companies and institutions such as
            NASA, University of California Irvine, and University of Wisconsin.
          </p>
          <a href="https://github.com/PHM-Data-Hub" className="gitURL">
            You can view our code here!{" "}
            <span className="icon__download">
              <AiFillGithub />
            </span>
          </a>
          <p>
            If you are interested in using our Python package, you can install
            it the PyPI package in the near future using{" "}
            <a href="https://machine-data-hub.readthedocs.io/en/latest/?badge=latest" className="gitURL">
              ‘pip install machine-data-hub’!
            </a>{" "}
            It will allow you to view available datasets, see information about
            a specific dataset, download a dataset, and even suggest a dataset
            to download.
          </p>
        </div>

        <h1>Blogs</h1> 
        <div className="body">
            Three blogs were developed to help navigate the possibilities of Machine Data Hub.
            <div className="examples">
                <li>
            <a href="/blog/MLProj"> Remaining Useful Life Example</a>
            </li><li>
            <a href="/blog/MLExample"> Power Plant Output Example</a>
            </li><li>
            <a href="/blog/ApplianceEnergy"> Appliance Energy Consumption</a>
            </li>
            </div>
        </div>

        <h1>GitHub</h1>
        <div className="body">
            Pull requests welcomed. {`\n`}
            File issues <a href="https://github.com/PHM-Data-Hub/app/issues">here</a>.
        </div>
      </div>
    </Layout>
  );
};

export default GettingStarted;
