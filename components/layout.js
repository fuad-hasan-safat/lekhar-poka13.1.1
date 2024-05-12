import MyNavbar from './navbar/Navbar'
import MyFooter from '../components/footer/Footer'

import UpdatedNavBar from './navbar/UpdatedNavBar'
 
export default function Layout({ children }) {
  return (
    <>
      {/* <MyNavbar /> */}
      <UpdatedNavBar/>
      <main>{children}</main>
      <MyFooter />
    </>
  )
}