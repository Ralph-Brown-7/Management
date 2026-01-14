import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Check, X, Circle } from 'lucide-react'
import axios from 'axios'
import '../Style/Feature.css'
import logo from '../assets/logo.png'

const Get_Started = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        want: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const passwordCriteria = useMemo(() => {
        const p = formData.password;
        return [
            { label: 'Minimum 8 characters', met: p.length >= 8 },
            { label: 'At least one uppercase letter', met: /[A-Z]/.test(p) },
            { label: 'At least one lowercase letter', met: /[a-z]/.test(p) },
            { label: 'At least one number', met: /[0-9]/.test(p) },
            { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(p) },
        ];
    }, [formData.password]);

    const isPasswordValid = passwordCriteria.every(c => c.met);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!isPasswordValid) {
            setError('Please meet all password criteria');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://127.0.0.1:8000/register', {
                email: formData.email,
                full_name: formData.name,
                password: formData.password,
                role: formData.want.toLowerCase()
            });
            // Registration successful, redirect to login
            navigate('/login', { state: { message: 'Registration successful! Please sign in.' } });
        } catch (err) {
            console.error('Registration error details:', {
                message: err.message,
                code: err.code,
                response: err.response?.data,
                status: err.response?.status
            });
            const errorMessage = err.response?.data?.detail || err.message || 'Registration failed. Please try again.';
            setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
        } finally {
            setLoading(false);
        }
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Custom Header with Logo and Back Button */}
      <div className="d-flex justify-content-between align-items-center px-5 pt-4" style={{position: 'relative'}}>
        <div style={{width: '120px', position: 'relative', zIndex: 10, marginTop: '50px'}}>
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
        <div className="d-flex justify-content-center" style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
          <img src={logo} alt="LearnFlow" style={{ height: '150px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))', fontWeight: 'bold', marginTop: '80px' }} />
        </div>
        <div style={{width: '120px'}}></div>
      </div>
      
      <section style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '0' }}>
        <section className='size mx-auto' style={{ maxWidth:"1000px", width: '100%' }}>
            <div className='bear text-center mb-3'>
                <h1 style={{fontSize: '32px', marginBottom: '1.5rem', whiteSpace: 'nowrap'}}>Create an account</h1>
                <p className='new' style={{fontSize: '14px', marginBottom: '1.5rem'}}>Or</p>
                <p className='new' style={{fontSize: '14px'}}><Link className='orm text-decoration-none pink' to={'/login'}>sign in to an existing account</Link></p>
            </div>
            
            {error && (
                <div className="text-center mb-3" style={{ color: '#ff4d4d', fontSize: '14px' }}>
                    {error}
                </div>
            )}

          <form onSubmit={handleSubmit} className='size d-flex justify-content-center py-3 rounded-3 px-0' style={{ maxWidth:"500px", background:'#060C19', border:"1px solid #1c376dff", margin: '0 auto' }}>
            <div>
              <div className='mb-2'>
                <label htmlFor="name" className='done mb-1' style={{fontSize: '12px'}}>Full name</label>
                <br />
                <input 
                    type="text" 
                    name='name' 
                    id='name' 
                    placeholder ='Enter your full name' 
                    value={formData.name}
                    onChange={handleChange}
                    className='rounded-3 size text-white px-3' 
                    style={{width:"370px", background:"#060C19", height:"35px", fontSize: '13px', border: '1px solid white'}}
                    required
                />
              </div>
              <div className='mb-2'>
                <label htmlFor="email" className='done mb-1' style={{fontSize: '12px'}}>Email address</label>
                <br />
                <input 
                    type="email" 
                    name='email' 
                    id='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleChange}
                    className='rounded-3 px-3 size text-white pump' 
                    style={{width:"370px", background:"#060C19", height:"35px", fontSize: '13px', border: '1px solid white'}}
                    required
                />
              </div>
              <div className='mb-2'>
                <label htmlFor="want" className='done mb-1' style={{fontSize: '12px'}}>I want to</label>
                <br />
                <select 
                    name="want" 
                    id="want" 
                    value={formData.want}
                    onChange={handleChange}
                    className='rounded-3 border-2 orm px-1' 
                    style={{width:"370px", background:"#060C19", height:"35px", fontSize: '13px', border: '1px solid white', color: '#B0B0B0'}}
                    required
                >
                 <option value="" disabled>Please Select an option</option>
                 <option value="student">Learn (student)</option>
                 <option value="instructor">Teach (instructor)</option>
                </select>
              </div>
              <div className='mb-2'>
                <label htmlFor="password" className='done mb-1' style={{fontSize: '12px'}}>Password</label>
                <br />
                <div style={{ position: 'relative', width: '370px' }}>
                    <input 
                        type={showPassword ? "text" : "password"}
                        name='password' 
                        id='password' 
                        placeholder='Enter your password'
                        value={formData.password}
                        onChange={handleChange}
                        className='rounded-3 size px-3 text-white' 
                        style={{width:"100%", background:"#060C19", height:"35px", fontSize: '13px', border: '1px solid white'}}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            color: '#B0B0B0',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                </div>
                
                {/* Password Criteria Checklist */}
                <div className="mt-2 p-2 rounded-3" style={{ background: '#0a1428', border: '1px solid #1c376dff', width: '370px' }}>
                    <div className="d-flex flex-wrap gap-x-3 gap-y-1">
                        {passwordCriteria.map((criterion, index) => (
                            <div key={index} className="d-flex align-items-center gap-1" style={{ transition: 'all 0.3s ease', width: index === 0 ? '100%' : '48%' }}>
                                {criterion.met ? (
                                    <Check size={12} color="#4BB543" strokeWidth={3} />
                                ) : (
                                    <Circle size={10} color="#505050" />
                                )}
                                <span style={{ 
                                    fontSize: '10px', 
                                    color: criterion.met ? '#4BB543' : '#707070',
                                    fontWeight: criterion.met ? '600' : '400'
                                }}>
                                    {criterion.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
              <div className='mb-2'>
                <label htmlFor="confirmPassword" title='confirmPassword' className='done mb-1' style={{fontSize: '12px'}}>Confirm password</label>
                <br />
                <div style={{ position: 'relative', width: '370px' }}>
                    <input 
                        type={showConfirmPassword ? "text" : "password"}
                        name='confirmPassword' 
                        placeholder='Confirm password' 
                        id='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className='rounded-3 size px-3 text-white' 
                        style={{width:"100%", background:"#060C19", height:"35px", fontSize: '13px', border: '1px solid white'}}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            color: '#B0B0B0',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <button 
                    disabled={loading || !isPasswordValid}
                    className='rounded-4 size' 
                    style={{
                        padding:'8px 120px', 
                        marginTop:'10px', 
                        fontWeight:"600", 
                        background:"#8662FF", 
                        fontSize: '14px', 
                        opacity: (loading || !isPasswordValid) ? 0.5 : 1,
                        cursor: (loading || !isPasswordValid) ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </div>
          </form>
        </section>
    </section>
    </motion.div>
  )
}

export default Get_Started
