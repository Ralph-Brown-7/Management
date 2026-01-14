import { Link, useLocation, useNavigate } from "react-router-dom"
import '../Style/Navbar.css'
import logo from '../assets/logo.png'

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isGetStarted = location.pathname === '/signup';
  const isAuthPage = ['/login', '/register', '/signup'].includes(location.pathname);

  return (
    <nav className='navbar navbar-expand-lg nav' style={{ padding: 0, background: isGetStarted ? '#091429' : undefined, backdropFilter: isGetStarted ? 'none' : undefined }}>
        <div className='container-fluid px-5'>
          <Link to='/' className='navbar-brand'>
             <img src={logo} alt="LearnFlow" style={{ height: '80px' }} />
          </Link>
          
          {isAuthPage ? (
            <div className="ms-auto">
                <button onClick={() => navigate(-1)} className="nav-link text-white btn" style={{ background: 'transparent', border: 'none', fontWeight: '600', fontSize: '1.2rem' }}>Back</button>
            </div>
          ) : (
            <>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbar'>
                <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbar'>
                <ul className='navbar-nav ms-auto gap-4 align-items-center'>
                    <li className='nav-item'>
                    <Link className='nav-link text-white' to='/courses'>Courses</Link>
                    </li>
                    <li className='nav-item'>
                    <Link className='nav-link text-white' to={'/feature'}>Feautures</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to={'/about'}>About</Link>
                    </li>
                    <li className='nav-item'>
                    <Link className='nav-link text-white' to={'/pricing'}>Pricing</Link>
                    </li>
                    <li className='nav-item'>
                    <Link className='nav-link text-white'  to={'/contact'}>Contact Us</Link>
                    </li>
                    <li className='nav-item ben'>
                    {localStorage.getItem('token') ? (
                       <Link className='nav-link rounded-3 text-white white' to={'/student-dashboard'}>Dashboard</Link>
                    ) : (
                       <Link className='nav-link rounded-3 text-white white' to={'/signup'}>Get Started</Link>
                    )}
                    </li>
                </ul>
                </div>
            </>
          )}
        </div>
    </nav>
  )
}

export default Navbar
