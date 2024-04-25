import MyNavbar from '../components/navbar/Navbar'
import MyFooter from '../components/footer/Footer'


 
export default function Layout({ children }) {
  return (
    <>
      <MyNavbar />
      <main>{children}</main>
      <MyFooter />
    </>
  )
}