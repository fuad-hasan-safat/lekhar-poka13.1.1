import '../styles/globals.css'
import '../public/assets/fonts/customfont.css'
import '../public/assets/css/image-slider.css'
import '../components/userprofile/FileUpload.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }


import Layout from '../components/layout'
import LayoutNoSidebar from '../components/layoutnosidebar'
import { useRouter } from 'next/router'
 
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;
  console.log("pathname : ", pathname);

  // /account/login
  // /account/signup
  // /account/recoverpassword
  let result = <Layout><Component {...pageProps} /></Layout>
  if (pathname == "/account/login"){
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  } else if(pathname == "/account/signup"){
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  } else if(pathname == "/account/recoverpassword"){
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  } else if(pathname == "/admin/allposttable"){
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  } else if(pathname == "/admin/slider"){
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else{
    result = <Layout><Component {...pageProps} /></Layout>
  } 
  return (
    // <Layout>
    //   <Component {...pageProps} />
    // </Layout>
    <>
      {result}
    </>
  )
}