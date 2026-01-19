import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import '../Style/Feature.css'

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
  </svg>
);
const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
  </svg>
);

const Get_Started = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    want: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!formData.want) {
        toast.error("Please select an option (Student or Instructor)");
        return;
    }

    const loadingToast = toast.loading('Creating account...');

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: formData.email,
            full_name: formData.name,
            password: formData.password,
            role: formData.want.toLowerCase() // Ensure lowercase for backend consistency
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Account created! Please log in.', { id: loadingToast });
        setTimeout(() => {
           navigate('/login');
        }, 2000);
      } else {
        toast.error(data.detail || 'Registration failed', { id: loadingToast });
      }
    } catch (error) {
      toast.error('Network error. Please try again.', { id: loadingToast });
      console.error(error);
    }
  };

  return (
    <section>
        <section className='size mx-auto' style={{margin:"130px 0", maxWidth:"1000px"}}>
            <div className='bear text-center'>
                <h1 >Create an account</h1>
                <div className="my-3 d-flex align-items-center justify-content-center text-secondary">
                  <span className="mx-3 orm text-white">OR</span>
                </div>
                <Link className='orm text-decoration-none pink d-block mt-2' style={{fontSize: '17px'}} to={'/login'}>Sign up with existing account</Link>
            </div>
          <form onSubmit={handleSubmit} className='size d-flex flex-column align-items-center py-5 rounded-3 px-0' style={{margin:"50px auto 0", maxWidth:"500px", background:'#060C19', border:"1px solid #1c376dff"}}>
            <div style={{width: '100%', padding: '0 20px', maxWidth: '400px'}}>
              <div className='mb-4'>
                <label htmlFor="name" className='done mb-1'>Full name</label>
                <br />
                <input 
                    type="text" 
                    name='name' 
                    id='name' 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder ='Enter your full name' 
                    className='rounded-3 size text-white px-3' 
                    style={{width:"100%", background:"#060C19", height:"40px"}}
                    required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor="email" className='done mb-1'>Email address</label>
                <br />
                <input 
                    type="email" 
                    name='email' 
                    id='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter your email'
                    className='rounded-3 px-3 size text-white pump' 
                    style={{width:"100%", background:"#060C19", height:"40px"}}
                    required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor="want" className='done mb-1'>I want to</label>
                <br />
               <select 
                    name="want" 
                    id="want" 
                    value={formData.want}
                    onChange={handleChange}
                    className='rounded-3 border-2 orm px-1' 
                    style={{width:"100%", background:"#060C19", height:"40px"}}
                    required
                >
                <option value="" disabled>Please Select an option</option>
                <option value="Student">Learn (student)</option>
                <option value="instructor">Teach (instructor)</option>
               </select>
              </div>
              <div className='mb-4 position-relative'>
                <label htmlFor="password" className='done mb-1'>Password</label>
                <br />
                <div style={{ position: 'relative', width: '100%' }}>
                  <input 
                      type={showPassword ? "text" : "password"}
                      name='password' 
                      id='password' 
                      value={formData.password}
                      onChange={handleChange}
                      placeholder='Enter your password'
                      className='rounded-3 size px-3 text-white' 
                      style={{width:"100%", background:"#060C19", height:"40px"}}
                      required
                  />
                  <div 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: 'white'
                    }}
                  >
                    {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                  </div>
                </div>
              </div>
              <div className='mb-4 position-relative'>
                <label htmlFor="confirmPassword" className='done mb-1'>Confirm password</label>
                <br />
                <div style={{ position: 'relative', width: '100%' }}>
                  <input 
                      type={showConfirmPassword ? "text" : "password"}
                      name='confirmPassword' 
                      id='confirmPassword'
                      value={formData.confirmPassword}
                      onChange={handleChange} 
                      placeholder='Confirm password' 
                      className='rounded-3 size px-3 text-white' 
                      style={{width:"100%", background:"#060C19", height:"40px"}}
                      required
                  />
                   <div 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: 'white'
                    }}
                  >
                    {showConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
                  </div>
                </div>
              </div>
              <div>
                <button type="submit" className='rounded-4 size' style={{width: '100%', padding:'10px 0', marginTop:'35px', fontWeight:"600", background:"#8662FF"}}>Create Account</button>
              </div>
            </div>
          </form>
        </section>
    </section>
  )
}

export default Get_Started
