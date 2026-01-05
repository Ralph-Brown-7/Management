import React from 'react'
import { Link } from 'react-router-dom'
import '../Style/Feature.css'

const Get_Started = () => {
  return (
    <section>
        <section className='size mx-auto' style={{margin:"130px 0", maxWidth:"1000px"}}>
            <div className='bear text-center'>
                <h1 >Create an account</h1>
                <p className='new'>Or <Link className='orm text-decoration-none pink' to={'/login'}>sign in to an existing account</Link></p>
            </div>
          <form action="" className='size d-flex justify-content-center py-5 rounded-3 px-0' style={{margin:"100px auto 0", maxWidth:"500px", background:'#060C19', border:"1px solid #1c376dff"}}>
            <div>
              <div className='mb-4'>
                <label htmlFor="name" className='done mb-1'>Full name</label>
                <br />
                <input type="text" name='name' id='name' placeholder ='Enter your full name' className='rounded-3 size text-white px-3' style={{width:"370px", background:"#060C19", height:"40px"}}/>
              </div>
              <div className='mb-4'>
                <label htmlFor="email" className='done mb-1'>Email dddress</label>
                <br />
                <input type="email" name='email' id='email'placeholder='Enter your email'className='rounded-3 px-3 size text-white pump' style={{width:"370px", background:"#060C19", height:"40px"}}/>
              </div>
              <div className='mb-4'>
                <label htmlFor="want" className='done mb-1'>I want to</label>
                <br />
               <select name="want" id="want" className='rounded-3 border-2 orm px-1' style={{width:"370px", background:"#060C19", height:"40px"}}>
                <option value=""disabled select>Please Select an option</option>
                <option value="Student">Learn (student)</option>
                <option value="instructor">Teach (instructor)</option>
               </select>
              </div>
              <div className='mb-4'>
                <label htmlFor="password" className='done mb-1'>Password</label>
                <br />
                <input type="password" name='password' id='password' placeholder='Enter your password'className='rounded-3 size px-3 text-white' style={{width:"370px", background:"#060C19", height:"40px"}}/>
              </div>
              <div className='mb-4'>
                <label htmlFor="password" className='done mb-1'>Confirm password</label>
                <br />
                <input type="password" name='password' placeholder='Confirm password' id='password'className='rounded-3 size px-3 text-white' style={{width:"370px", background:"#060C19", height:"40px"}}/>
              </div>
              <div>
                <button className='rounded-4 size' style={{padding:'10px 120px', marginTop:'35px', fontWeight:"600", background:"#8662FF"}}>Create Account</button>
              </div>
            </div>
          </form>
        </section>
    </section>
  )
}

export default Get_Started
