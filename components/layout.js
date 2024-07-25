import MyNavbar from './navbar/Navbar'
import MyFooter from '../components/footer/Footer'

import UpdatedNavBar from './navbar/UpdatedNavBar'
 
export default function Layout({ children }) {
  return (
    <>
    

      {/* <MyNavbar /> */}
      <UpdatedNavBar/>
      <main   onCopy={(e)=>{e.preventDefault(); alert('এই ওয়েবসাইটের যেকোনো লেখা আমাদের অনুমতি ছাড়া কপি করলে আইনগত ব্যবস্থা গ্রহণ করা হবে।')}}>{children}</main>
      <MyFooter />
    </>
  )
}