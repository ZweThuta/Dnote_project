import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='bg-slate-200 py-4 px-10 flex justify-between'>
        <Link to={"/"} className='text-teal-600 font-bold text-4xl'>Dnote.io</Link>
        <div className='flex gap-20 mt-1'>
        <Link to={"/login"} className='text-teal-600 font-bold'>Login</Link>
        <Link to={"/register"} className='text-teal-600 font-bold'>Register</Link>
        </div>   
    </nav>
  )
}

export default Nav