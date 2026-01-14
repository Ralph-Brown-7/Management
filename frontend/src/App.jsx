import { Route, Routes, BrowserRouter as Router, BrowserRouter, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "./Components/Navbar"
import { motion } from 'framer-motion'
import Hero from './Paths/Hero'
import Courses from './Paths/Courses'
import CourseDetails from './Paths/CourseDetails'
import Feature from './Paths/Feature'
import Pricing from './Paths/Pricing'
import About from './Paths/About'

import Contact from "./Paths/contact"
import Get_Started from "./Paths/Get_Started"
import './Style/Hero.css'

import Login from "./pages/Login"
import Register from "./pages/Register"
import StudentDashboard from "./pages/StudentDashboard"
import InstructorDashboard from "./pages/InstructorDashboard"

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isRegisterPage = location.pathname === '/register';
  const isGetStartedPage = location.pathname === '/signup';
  const isLoginPage = location.pathname === '/login';
  const isDashboardPage = location.pathname === '/student-dashboard' || location.pathname === '/instructor-dashboard';
  const navigate = useNavigate();
  const [homeSearch, setHomeSearch] = useState('');

  const handleHomeSearch = () => {
    const element = document.getElementById('explore-courses');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const publicPaths = ['/login', '/register', '/signup'];
    
    if (token && publicPaths.includes(location.pathname)) {
      navigate('/student-dashboard');
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {!isDashboardPage && (
        <div className='container-fluid px-5'>
          <Navbar></Navbar>
        </div>
      )}
      {isHomePage && (
        <>
        {/* Project Description Section - Relocated to Top */}
        <section className='project-description-section py-5' style={{ background: 'linear-gradient(180deg, #020617 0%, #060C19 100%)', borderBottom: '1px solid #1c376dff' }}>
            <div className='container' style={{ maxWidth: '1200px' }}>
                <div className='row align-items-center g-5'>
                    <div className='col-lg-6'>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className='done mb-4' style={{ fontSize: '3.5rem', fontWeight: '800' }}>Empowering Your Learning Journey</h2>
                            <p className='orm mb-4' style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                                LearnFlow is a cutting-edge educational platform designed to bridge the gap between academic knowledge and industry-required skills. We provide a seamless, interactive environment where learners can access world-class content, track their progress in real-time, and earn industry-recognized certifications.
                            </p>
                            <div className='d-flex flex-wrap gap-3 mb-5'>
                                <div className='d-flex align-items-center gap-2 px-3 py-2 rounded-4' style={{ background: 'rgba(134, 98, 255, 0.1)', border: '1px solid rgba(134, 98, 255, 0.2)' }}>
                                    <span style={{ color: '#8662FF' }}>✓</span>
                                    <span className='orm' style={{ fontSize: '14px' }}>Expert Content</span>
                                </div>
                                <div className='d-flex align-items-center gap-2 px-3 py-2 rounded-4' style={{ background: 'rgba(134, 98, 255, 0.1)', border: '1px solid rgba(134, 98, 255, 0.2)' }}>
                                    <span style={{ color: '#8662FF' }}>✓</span>
                                    <span className='orm' style={{ fontSize: '14px' }}>AI Learning Paths</span>
                                </div>
                                <div className='d-flex align-items-center gap-2 px-3 py-2 rounded-4' style={{ background: 'rgba(134, 98, 255, 0.1)', border: '1px solid rgba(134, 98, 255, 0.2)' }}>
                                    <span style={{ color: '#8662FF' }}>✓</span>
                                    <span className='orm' style={{ fontSize: '14px' }}>Hands-on Projects</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className='col-lg-6'>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            style={{ position: 'relative', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            {/* Decorative Glow */}
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', background: 'rgba(134, 98, 255, 0.15)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }}></div>
                            
                            {/* Stacked Images */}
                            <motion.div
                                initial={{ opacity: 0, rotate: -15, x: -30 }}
                                whileInView={{ opacity: 1, rotate: -8, x: -50, y: -20 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                style={{ position: 'absolute', width: '320px', height: '220px', zIndex: 1 }}
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop" 
                                    className='img-fluid rounded-4 shadow-2xl shadow-blue-900/40' 
                                    style={{ border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover', width: '100%', height: '100%' }}
                                    alt="Education technology"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, rotate: 15, x: 30 }}
                                whileInView={{ opacity: 1, rotate: 12, x: 60, y: 30 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                style={{ position: 'absolute', width: '300px', height: '200px', zIndex: 2 }}
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop" 
                                    className='img-fluid rounded-4 shadow-2xl shadow-purple-900/40' 
                                    style={{ border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover', width: '100%', height: '100%' }}
                                    alt="Collaborative learning"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1.05, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                style={{ position: 'relative', width: '350px', height: '250px', zIndex: 3 }}
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop" 
                                    className='img-fluid rounded-4 shadow-2xl' 
                                    style={{ border: '1px solid rgba(255,255,255,0.2)', objectFit: 'cover', width: '100%', height: '100%' }}
                                    alt="Student team"
                                />
                                {/* Label overlay */}
                                <div className='position-absolute bottom-0 start-0 m-3 px-3 py-1 rounded-pill' style={{ background: 'rgba(5, 27, 72, 0.85)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', color: 'white' }}>
                                    Learn Together
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>

        <section className='d-flex align-items-center justify-content-center' style={{gap: '2rem', padding: '2rem 0'}}>
          <section className='text-white border border-0 rounded-4 ps-5 pt-5 pb-5' style={{minWidth: '600px', maxWidth: '1200px', width: '100%', flex: '1 1 auto'}}>
              <div>
                  <h1>Learn the skills employers actually want - at your pace.</h1>
                  <p className='mt-3 get'>Self-paced courses, instructor-led cohorts, assessments, certificates and analytics for organisations and individuals.</p>
              </div>
              <div>
               <div className="position-relative">
                  <input 
                    type="search" 
                    className='w-75 mt-5 hemp rounded-3 py-2 ps-1' 
                    placeholder='Search something e.g."Python for data '
                    value={homeSearch}
                    onChange={(e) => setHomeSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleHomeSearch()}
                  />
                  <button onClick={handleHomeSearch} className='ms-5 py-2 px-2 rounded-3 border-0 search'>Search</button>
                  <div className="mt-2 text-secondary" style={{fontSize: '0.9rem'}}>
                      Popular: <span className="text-white cursor-pointer hover-opacity-100" onClick={() => { setHomeSearch('AI'); navigate('/courses?search=AI'); }}>AI</span>, 
                      <span className="text-white ms-2 cursor-pointer hover-opacity-100" onClick={() => { setHomeSearch('Data'); navigate('/courses?search=Data'); }}>Data</span>, 
                      <span className="text-white ms-2 cursor-pointer hover-opacity-100" onClick={() => { setHomeSearch('Web'); navigate('/courses?search=Web'); }}>Web</span>
                  </div>
              </div>
              </div>
              <div className='d-flex '>
                  <div className='here border-0 rounded-3 me-4 px-3 py-0 pt-1 g-0'>
                      <p className='done m-0'>12,480</p>
                      <p className='orm'>Learners</p>
                  </div>
                  <div className='here border-0 rounded-3 me-4 px-3 py-0 pt-1'>
                      <p className='done m-0'>980</p>
                      <p className='orm'>Courses</p>
                  </div>
                  <div className='here border-0 rounded-3 px-3 py-0 pt-1'>
                      <p className='done m-0'>450</p>
                      <p className='orm'>Instructors</p>
                  </div>
              </div>
              <div className='d-flex mt-4'>
                  <div className='round'>
                      <p className='done'>Track progress</p>
                      <p className='name'>Quizzes, <br />assignments & <br />completion analytics</p>
                  </div>
                  <div className='round'>
                      <p className='done'>Certificates</p>
                      <p className='name'>Auto-issued on completion</p>
                  </div>
                  <div className='round'>
                      <p className='done'>Team & Reports</p>
                      <p className='name'>Admin dashboards & usage export</p>
                  </div>
              </div>
          </section>
          <section className='bomb rounded-4 px-4 py-5' style={{minWidth: '380px', maxWidth: '450px', flex: '0 1 auto'}}>
          <div>
              <p className='done new'>Continue Learning</p>
              <p className='orm'>Data Science Foundations — Module 3</p>
          </div>
          <span className='gradient'></span>
          <div className='d-flex align-items-center justify-content-between'>
              <p className='fear orm'>Next lesson</p>
              <p className='done new'>Linear Regression</p>
          </div>
          <div className='d-flex align-items-center'>
              <span className='deal text-black fw-bold'>DS</span>
              <div className='height ms-2 mt-3'>
                  <p className='done'>Professor  Ifreke</p>
                  <p className='orm'>Estimated 18 minutes</p>
              </div>
          </div>
          </section>
        </section>
        </>
      )}
      <Routes>
        <Route path='/' element={<Hero homeSearch={homeSearch} setHomeSearch={setHomeSearch} />}></Route>
        <Route path= '/courses' element={<Courses />}></Route>
        <Route path='/courses/:id' element={<CourseDetails />}></Route>
        <Route path='/feature' element={<Feature />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/pricing' element={<Pricing />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/signup' element={<Get_Started />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/student-dashboard' element={<StudentDashboard />}></Route>
        <Route path='/instructor-dashboard' element={<InstructorDashboard />}></Route>
      </Routes>
    </>
  );
}

function App() {
 
  return (  

   <BrowserRouter>
      <AppContent />
  </BrowserRouter>  
  
  )
}
export default App
