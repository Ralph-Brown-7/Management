import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, Mail } from 'lucide-react';
import axios from 'axios';
import logo from '../assets/logo.png';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/register', {
        full_name: fullName,
        email,
        password,
        role
      });
      // Auto login or redirect to login
      navigate('/');
    } catch (err) {
      setError('Registration failed. Email might be already in use.');
    }
  };

  return (
    <>
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
          <img src={logo} alt="LearnFlow" style={{ height: '80px' }} />
        </div>
        <div style={{width: '120px'}}></div>
      </div>
      
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 w-full max-w-md"
        >
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-indigo-400">
                Create Account
            </h1>
            <p className="text-gray-400 mt-2">Join us and start learning today</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
             <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-dark bg-opacity-50 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
            >
                <option value="student">I am a Student</option>
                <option value="instructor">I am an Instructor</option>
            </select>
          </div>

          <button type="submit" className="btn-primary mt-4">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default Register;
