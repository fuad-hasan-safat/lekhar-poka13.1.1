import '../styles/globals.css'
import '../public/assets/css/image-slider.css'
import '../components/userprofile/FileUpload.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }


import Layout from '../components/layout'
 
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}