import Layout from "../components/Layout";
import teams from "../data/team.json";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

const GettingStarted = () => {
  return (
    <Layout title="Getting Started | Machine Data Hub">
      <div className="page__about">
        <h1>How to Use Machine Data Hub</h1>
        <div className="body">
          <p>
            The advancement of computer vision over the past decade to better
            than human performance on many tasks has largely been due to the
            curation of benchmark datasets such as ImageNet. However, existing
            datasets related to machinery and other engineering applications of
            AI/ML are still hard to find, not centralized and not in a modern
            format. The goal of this project is to make applying state of the
            art Machine Learning and Artificial Intelligence techniques to
            engineering domains more accessible to any interested researcher.
          </p>
          <a href="https://github.com/machine-data-hub" className="gitURL">
            You can view our code here!{" "}
            <span className="icon__download">
              <AiFillGithub />
            </span>
          </a>
        </div>

        <h1>Download CLI</h1>
        <div className="body">
          The machinedatahub Python package allows users to maneuver Machine
          Data Hub from a local Python environment. The package can be installed
          in the near future using{" "}
          <a
            href="https://machine-data-hub.readthedocs.io/en/latest/?badge=latest"
            className="gitURL"
          >
            ‘pip install machine-data-hub’!
          </a>{" "}
          It allows you to view available datasets, see information about a
          specific dataset, download a dataset, and suggests related datasets.
          <p> </p>
          Examples of the Python package can be seen in the example{" "}
          <a href="#blogs" className="gitURL">
            blogs below!
          </a>
        </div>

        <h1>Finding a Dataset</h1>
        <div className="body">
          The Machine Data Hub has two methods to locate datasets.
          <h2>Website</h2>
          <p>
            The Machine Data Hub website opens up to a large grid of datasets.{" "}
          </p>
          <div className="started__image-box">
            <img
              src="/images/MainPage.jpg"
              class="started__image"
              title="Main Page"
              alt="Main Page"
            />
          </div>
          <p>
            The 'Filter' and 'Sort' buttons release drop down menus to filter
            the datasets. These filters are multi-select.
          </p>
          <div className="started__image-box">
            <img
              src="/images/Sorter.jpg"
              class="started__image"
              title="Sorter Page"
              alt="Sorter Page"
            />
          </div>
          Each card is click-able. Upon clicking the card, a more detailed view
          will display. The files associated with each dataset can be downloaded
          individaully. Additionally, similar datasets will appears undernear
          the main card. These cards are suggested using similar tags.
          <div className="started__image-box">
            <img
              src="/images/FocusedDataset.jpg"
              class="started__image"
              title="Sorter Page"
              alt="Sorter Page"
            />
          </div>
        </div>

        <h1>ETL Process</h1>
        <div clasName="body">
          Machine Data Hub has its own Extract, Transform, Load (ETL) processes
          using the Python package. You can view our package{" "}
          <a
            href="https://pypi.org/project/machine-data-hub/"
            className="gitURL"
          >
            here!
          </a>
          {"\n"}
          Documentation for the package can be found{" "}
          <a
            href="https://machine-data-hub.readthedocs.io/en/latest/?badge=latest"
            className="gitURL"
          >
            here.
          </a>
        </div>

        <h1 id="blogs">Blogs</h1>
        <div className="body">
          Three blogs were developed to help navigate the possibilities of
          Machine Data Hub.
          <div className="examples">
            <li>
              <a href="/blog/MLProj"> Remaining Useful Life Example</a>
            </li>
            <li>
              <a href="/blog/CombinedPowerPlant"> Power Plant Output Example</a>
            </li>
            <li>
              <a href="/blog/ApplianceEnergy"> Appliance Energy Consumption</a>
            </li>
          </div>
        </div>

        <h1>GitHub</h1>
        <div className="body">
          Pull requests welcomed. {`\n`}
          File issues{" "}
          <a href="https://github.com/PHM-Data-Hub/app/issues">here</a>.
        </div>
      </div>
    </Layout>
  );
};

export default GettingStarted;
