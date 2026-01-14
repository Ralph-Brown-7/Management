import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import '../Style/Feature.css';
import logo from '../assets/logo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
        }
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [location.state]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/login', {
                email,
                password
            });
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('userName', response.data.user_name);
            localStorage.setItem('role', response.data.role); // Save role to local storage
            
            const role = response.data.role;

            const pendingEnrollment = localStorage.getItem('pendingEnrollment');
            if (pendingEnrollment) {
                try {
                    await axios.post(`http://127.0.0.1:8000/enroll/${pendingEnrollment}`, {}, {
                        headers: { Authorization: `Bearer ${response.data.access_token}` }
                    });
                    localStorage.removeItem('pendingEnrollment');
                    navigate('/student-dashboard', { state: { openCourse: parseInt(pendingEnrollment) } });
                } catch (enrollError) {
                    console.error("Pending enrollment failed", enrollError);
                    // Navigate anyway
                    const userRole = (role || 'student').toLowerCase();
                    console.log("Login Role:", userRole);
                    if (userRole === 'instructor') {
                         navigate('/instructor-dashboard');
                    } else {
                         navigate('/student-dashboard');
                    }
                }
            } else {
                const userRole = (role || 'student').toLowerCase();
                console.log("Login Role:", userRole);
                if (userRole === 'instructor') {
                    navigate('/instructor-dashboard');
                } else {
                    navigate('/student-dashboard');
                }
            } 
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                switch (err.response.status) {
                    case 401:
                        setError('Incorrect email or password. Please double-check your credentials.');
                        break;
                    case 422:
                        setError('Please provide a valid email and password format.');
                        break;
                    case 500:
                        setError('Our server is acting up. Please try again in a few minutes.');
                        break;
                    default:
                        setError(err.response.data?.detail || 'An unexpected error occurred. Please try again later.');
                }
            } else if (err.request) {
                // The request was made but no response was received
                if (err.code === 'ERR_NETWORK') {
                    setError('Cannot connect to the server. Please check your internet connection.');
                } else {
                    setError('The request took too long. Please try again.');
                }
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('An error occurred. Please try again later.');
            }
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
            <div className="d-flex justify-content-between align-items-center px-5 pt-4" style={{ position: 'relative' }}>
                <div style={{ width: '120px', position: 'relative', zIndex: 10 }}>
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
                <div className="d-flex justify-content-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <img src={logo} alt="LearnFlow" style={{ height: '180px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))', fontWeight: 'bold', marginTop: '70px' }} />
                </div>
                <div style={{ width: '120px' }}></div>
            </div>

            <section style={{ height: 'calc(100vh - 85px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '0' }}>
                <section className='size mx-auto' style={{ maxWidth: "1000px", width: '100%' }}>
                    <div className='bear text-center mb-4'>
                        <h1 style={{ fontSize: '54px', marginBottom: '0.5rem', marginTop: '-1.5rem', fontWeight: '700' }}>Welcome Back!</h1>
                        <p className='orm' style={{ fontSize: '16px', marginBottom: '1.5rem', color: '#B0B0B0' }}>Sign in to continue your learning journey</p>
                        <p className='new' style={{ fontSize: '16px' }}>Or <br /><br /> <Link className='orm text-decoration-none pink' to={'/signup'}>register here</Link></p>
                    </div>
                    
                    {error && (
                        <div className="text-center mb-3" style={{ color: '#ff4d4d', fontSize: '14px' }}>
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="text-center mb-3" style={{ color: '#4BB543', fontSize: '14px' }}>
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className='size d-flex justify-content-center py-4 rounded-3 px-0' style={{ maxWidth: "500px", background: '#060C19', border: "1px solid #1c376dff", margin: '0 auto' }}>
                        <div>
                            <div className='mb-3'>
                                <label htmlFor="email" className='done mb-1' style={{ fontSize: '13px' }}>Email address</label>
                                <br />
                                <input
                                    type="email"
                                    name='email'
                                    id='email'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='rounded-3 px-3 size text-white'
                                    style={{ width: "370px", background: "#060C19", height: "40px", fontSize: '14px', border: '1px solid white' }}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password" className='done mb-1' style={{ fontSize: '13px' }}>Password</label>
                                <br />
                                <div style={{ position: 'relative', width: '370px' }}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        id='password'
                                        placeholder='Enter your password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='rounded-3 size px-3 text-white'
                                        style={{ width: "100%", background: "#060C19", height: "40px", fontSize: '14px', border: '1px solid white' }}
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
                                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className='rounded-4 size' 
                                    style={{ padding: '10px 120px', marginTop: '20px', fontWeight: "600", background: "#8662FF", fontSize: '14px', opacity: loading ? 0.7 : 1 }}
                                >
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </section>
        </motion.div>
    );
};

export default Login;
