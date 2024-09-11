import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
   <section>
    <Nav/>
    <Outlet/>
   </section>
  )
}

export default Main