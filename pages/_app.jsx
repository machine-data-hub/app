import '../styles/globals.scss'
import { SectorProvider } from '../context/SectorContext'
import { TypeProvider } from '../context/TypeContext'
import { LabeledProvider } from '../context/LabeledContext'
import { TimeSeriesProvider } from '../context/TimeSeriesContext'
import { SimulationProvider } from '../context/SimulationContext'
import { PageProvider } from '../context/PageContext'
import { SortProvider } from '../context/SortContext'

function MyApp({ Component, pageProps }) {
    return (
        <>
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
    )
}

export default MyApp
