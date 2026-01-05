import { Link } from "react-router-dom"
import '../Style/Navbar.css'
const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg nav'>
        <div className='container'>
          <div className='d-flex align-items-center justify-content-center'>
             <Link to='/' className='text-black text-decoration-none text-white' >LearnFlow</Link>
          </div>
         <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbar'>
          <span className='navbar-toggler-icon'></span>
         </button>
         <div className='collapse navbar-collapse' id='navbar'>
          <ul className='navbar-nav ms-auto gap-5'>
            <li className='nav-item'>
              <Link className='nav-link text-white' to='/courses'>Course</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-white' to={'/feature'}>Feauture</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-white' to={'/pricing'}>Pricing</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-white'  href='#'>About</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-white'  to={'/contact'}>Contact Us</Link>
            </li>
            <li className='nav-item ben'>
              <Link className='nav-link  rounded-3 text-white white'  to={'/get_Started'}>Get Started</Link>
            </li>
          </ul>
         </div>
        </div>
    </nav>
  )
}

export default Navbar
