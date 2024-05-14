import MyNavbar from './navbar/Navbar'
import MyFooter from '../components/footer/Footer'

import UpdatedNavBar from './navbar/UpdatedNavBar'
 
export default function Layout({ children }) {
  return (
    <>
      {/* <MyNavbar /> */}
      <UpdatedNavBar/>
      <main onCopy={(e)=>{e.preventDefault(); alert('চুরি করা পাপ')}}>{children}</main>
      <MyFooter />
    </>
  )
}