import Navbar from '../components/Navbar'
import '../styles/globals.css'
import {AppWrapper} from './auth'

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
        <Navbar />
        <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp
