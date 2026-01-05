import React from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
   <section className=''>
        <section className='size mx-auto' style={{margin:"130px 0", maxWidth:"1000px"}}>
            <div className='bear text-center'>
                <h1 >welcome back</h1>
                <p className='orm' style={{fontSize:"17px"}}>Sign in to continue learning</p>
            </div>
          <form action="" className='size d-flex justify-content-center py-5 rounded-3' style={{margin:"100px auto 0", maxWidth:"500px", background:'#060C19', border:"1px solid #1c376dff"}}>
            <div>
              <div className='mb-4'>
                <label htmlFor="email" className='done mb-1'>Email dddress</label>
                <br />
                <input type="email" name='email' id='email'placeholder='Enter your email'className='rounded-3 px-3 size text-white pump' style={{width:"370px", background:"#060C19", height:"40px"}}/>
              </div>
              <div className='mb-4'>
                <label htmlFor="password" className='done mb-1'>Password</label>
                <br />
                <input type="password" name='password' id='password' placeholder='Enter your password'className='rounded-3 size px-3 text-white' style={{width:"370px", background:"#060C19", height:"40px"}}/>
              </div> 
              <div>
                <button className='rounded-4 size' style={{padding:'10px 120px', marginTop:'35px', fontWeight:"600", background:"#8662FF"}}>Create Account</button>
              </div>
            <div className='mt-5 text-center'>
                <p className='orm'>Don't have an account? <Link to={'/get_Started'} className='text-decoration-none pink' style={{fontSize:'17px'}}>Sign Up</Link></p>
            </div>
            </div>
          </form>
        </section>
    </section>

  )
}

export default Login
