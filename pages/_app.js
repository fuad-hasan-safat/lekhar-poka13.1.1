import '../styles/globals.css';
import '../styles/audiobook.css';
import '../styles/dashboard.css';
import '../public/assets/fonts/customfont.css';
import '../public/assets/css/image-slider.css';
import '../components/userprofile/FileUpload.css';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from '../components/layout'
import LayoutNoSidebar from '../components/layoutnosidebar'
import { useRouter } from 'next/router'
import AudioPlaylistContextProvider from '../components/store/audioPlayer-context';
import SeeAllSliderContextProvider from '../components/store/seeall-slider-context';
import AudioPlayer from '../components/AudioBook/AudioPlayer/AudioPlayer';
import SearchContextProvider from '../components/lekharpokaStore/search-context';
import SearchResult from '../components/common/SearchResult'
import AdminContextProvider, { AdminContext } from '../components/store/adminpanel-context';
import useRouteChange from '../utils/useRouteChange';
import { useContext, useEffect } from 'react';
import AudioDetailsTabContextProvider from '../components/store/audiodetailstab-context';
import UserContextProvider, { UserContext } from '../components/lekharpokaStore/user-context';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../components/redux/store';
import Toast from '../components/toast/Toast';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;
  console.log("pathname : ", pathname);

  const { setCurrentComponentIndex } = useContext(AdminContext);

  useRouteChange((url) => {
    console.log('Route changed to:', url);
    setCurrentComponentIndex(0, 'Dashboard');
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'a') {
        event.preventDefault();
      }
      if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);



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
  } else if (pathname == '/dashboard/dashboard') {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else if (pathname == "/account/otp") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else if (pathname == "/post/readermood/[slug]") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else if (pathname == "/admin/alldesignation") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else if (pathname == "/admin/allWriterBio") {
    result = <LayoutNoSidebar><Component {...pageProps} /></LayoutNoSidebar>
  }
  else {
    result = <Layout><Component {...pageProps} />  <SearchResult /> </Layout>
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AdminContextProvider>
            <UserContextProvider>
              <AudioPlaylistContextProvider>
                <SeeAllSliderContextProvider>
                  <SearchContextProvider>
                    <AudioDetailsTabContextProvider>
                      <GoogleOAuthProvider clientId="854926132475-sm4btto49sresu4g5o9qpuk9lgtqor9f.apps.googleusercontent.com">
                        <>
                          <Toast />
                          {result}
                          <AudioPlayer />
                        </>
                      </GoogleOAuthProvider>
                    </AudioDetailsTabContextProvider>
                  </SearchContextProvider>
                </SeeAllSliderContextProvider>
              </AudioPlaylistContextProvider>
            </UserContextProvider>
          </AdminContextProvider>
        </PersistGate>
      </Provider>

    </>


  )
}