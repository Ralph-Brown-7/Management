import React from 'react';
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import Navbar from "./Components/Navbar";
import Hero from "./Paths/Hero";
import Courses from "./Paths/Courses";
import Feature from "./Paths/Feature";
import Pricing from "./Paths/Pricing";
import Contact from "./Paths/Contact";
import GetStarted from "./Paths/Get_Started";
import Login from "./Paths/Login";
import Order from "./Paths/Order";
import CourseDetail from "./Paths/CourseDetail";
import About from "./Paths/About";
import StudentDashboard from "./Paths/StudentDashboard";

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbar = location.pathname.startsWith("/course/") || location.pathname === "/student-dashboard";

  // --- Session Management ---

  // 1. Auto-Redirect if logged in
  React.useEffect(() => {
      const token = sessionStorage.getItem('access_token');
      const role = sessionStorage.getItem('user_role');
      // If user is logged in and visits public landing pages, redirect to dashboard
      // Add more public routes if necessary
      if (token && (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/get-started')) {
          if (role === 'student') {
             navigate('/student-dashboard');
          }
      }
  }, [location.pathname, navigate]);

  // 2. Idle Timeout (7 minutes)
  React.useEffect(() => {
      const EVENTS = ['mousemove', 'keydown', 'click', 'scroll'];
      let timer;

      const logoutUser = () => {
          sessionStorage.clear();
          navigate('/login');
          toast('Session expired due to inactivity', { icon: '⚠️' }); 
      };

      const resetTimer = () => {
          if (timer) clearTimeout(timer);
          // 7 minutes = 7 * 60 * 1000 = 420000ms
          timer = setTimeout(logoutUser, 7 * 60 * 1000); 
      };

      // Attach listeners
      EVENTS.forEach(event => window.addEventListener(event, resetTimer));

      // Start timer
      resetTimer();

      // Cleanup
      return () => {
          if (timer) clearTimeout(timer);
          EVENTS.forEach(event => window.removeEventListener(event, resetTimer));
      };
  }, [navigate]);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Hero />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/order/:id" element={<Order />}></Route>
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/feature" element={<Feature />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/contact" element={<Contact />}></Route>

        <Route path="/about" element={<About />}></Route>
        <Route path="/get-started" element={<GetStarted />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/student-dashboard" element={<StudentDashboard />}></Route>
        {/* Wildcard to redirect unknown routes to home -> then auto-redirect handles it */}
        <Route path="*" element={<Hero />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <AppContent />
    </Router>
  );
}

export default App;
