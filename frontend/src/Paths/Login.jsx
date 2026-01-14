import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../Style/Feature.css'
import logo from '../assets/logo.png'

const Login = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Custom Header with Logo and Back Button */}
      <div className="d-flex justify-content-between align-items-center px-5 pt-4" style={{position: 'relative'}}>
        <div style={{width: '120px'}}>
          <button 
            onClick={() => navigate(-1)} 
            className="btn text-white" 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              fontWeight: '600', 
              fontSize: '1.2rem',
              padding: 0
            }}
          >
            Back
          </button>
        </div>
        <div className="d-flex justify-content-center" style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '100%'}}>
          <img src={logo} alt="LearnFlow" style={{ height: '180px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))', fontWeight: 'bold', marginTop: '70px' }} />
        </div>
        <div style={{width: '120px'}}></div>
      </div>
      
      <section style={{ height: 'calc(100vh - 85px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '0' }}>
        <section className='size mx-auto' style={{ maxWidth:"1000px", width: '100%' }}>
            <div className='bear text-center mb-4'>
                <h1 style={{fontSize: '36px', marginBottom: '1.5rem'}}>Sign in to your account</h1>
                <p className='new' style={{fontSize: '16px'}}>Or <br /><br /> <Link className='orm text-decoration-none pink' to={'/signup'}>register here</Link></p>
            </div>
          <form action="" className='size d-flex justify-content-center py-4 rounded-3 px-0' style={{ maxWidth:"500px", background:'#060C19', border:"1px solid #1c376dff", margin: '0 auto' }}>
            <div>
              <div className='mb-3'>
                <label htmlFor="email" className='done mb-1' style={{fontSize: '13px'}}>Email address</label>
                <br />
                <input type="email" name='email' id='email' placeholder='Enter your email' className='rounded-3 px-3 size text-white pump' style={{width:"370px", background:"#060C19", height:"40px", fontSize: '14px'}}/>
              </div>
              <div className='mb-3'>
                <label htmlFor="password" className='done mb-1' style={{fontSize: '13px'}}>Password</label>
                <br />
                <input type="password" name='password' id='password' placeholder='Enter your password' className='rounded-3 size px-3 text-white' style={{width:"370px", background:"#060C19", height:"40px", fontSize: '14px'}}/>
              </div>
              <div>
                <button className='rounded-4 size' style={{padding:'10px 120px', marginTop:'20px', fontWeight:"600", background:"#8662FF", fontSize: '14px'}}>Sign In</button>
              </div>
            </div>
          </form>
        </section>
    </section>
    </motion.div>
  )
}

export default Login
