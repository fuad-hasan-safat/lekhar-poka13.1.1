import '../styles/globals.css'
import '../public/assets/fonts/customfont.css'
import '../public/assets/css/image-slider.css'
import '../components/userprofile/FileUpload.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from '../components/layout'
import LayoutNoSidebar from '../components/layoutnosidebar'
import { useRouter } from 'next/router'
import SearchContextProvider from '../components/lekharpokaStore/search-context';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;
  console.log("pathname : ", pathname);

  // /account/login
  // /account/signup
  // /account/recoverpassword
  let result = <Layout><Component {...pageProps} /></Layout>
  if (pathname == "/account/login") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  } else if (pathname == "/account/signup") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  } else if (pathname == "/account/recoverpassword") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  } else if (pathname == "/admin/allposttable") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  } else if (pathname == "/admin/slider") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  } else if (pathname == "/admin/allslidertable") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  } else if (pathname == "/admin/writerlist") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else if (pathname == "/admin/allcategory") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else if (pathname == "/admin/admin") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else if (pathname == "/account/otp") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else if (pathname == "/post/readermood/[slug]") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else if (pathname == "/admin/alldesignation"){
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else if (pathname == "/admin/allWriterBio"){
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else {
    result = <Layout><Component {...pageProps} /></Layout>
  }
  return (
    // <Layout>
    //   <Component {...pageProps} />
    // </Layout>
    <>

      <script async defer
        src="https://connect.facebook.net/en_US/sdk.js/xfbml.js?appId=1103079424285739&version=v16.0"
        crossOrigin="anonymous"
      />
      <GoogleOAuthProvider clientId="854926132475-sm4btto49sresu4g5o9qpuk9lgtqor9f.apps.googleusercontent.com">
        <SearchContextProvider>
        <>
          {result}
        </>
        </SearchContextProvider>
      </GoogleOAuthProvider>
    </>


  )
}