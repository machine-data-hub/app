import "../styles/globals.scss";
import { SectorProvider } from "../context/SectorContext";
import { TypeProvider } from "../context/TypeContext";
import { LabeledProvider } from "../context/LabeledContext";
import { TimeSeriesProvider } from "../context/TimeSeriesContext";
import { SimulationProvider } from "../context/SimulationContext";
import { PageProvider } from "../context/PageContext";
import { SortProvider } from "../context/SortContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{title}</title>
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
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="theme-color" content="#2178b3" />

          <meta property="og:url" content="https://machinedatahub.ai" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Machine Data Hub" />
          <meta
            property="og:description"
            content="Open source data hub for prognostics and health management datasets"
          />
        </Helmet>
      </Head>
      <SimulationProvider>
        <SectorProvider>
          <TypeProvider>
            <LabeledProvider>
              <TimeSeriesProvider>
                <PageProvider>
                  <SortProvider>
                    <Component {...pageProps} />
                  </SortProvider>
                </PageProvider>
              </TimeSeriesProvider>
            </LabeledProvider>
          </TypeProvider>
        </SectorProvider>
      </SimulationProvider>
    </>
  );
}

export default MyApp;
