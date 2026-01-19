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
import StudentDashboard from "./student/StudentDashboard";
import SuperAdminDashboard from "./admin/pages/SuperAdminDashboard";
import InstructorDashboard from "./instructor/InstructorDashboard";

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbar = location.pathname.startsWith("/course/") || location.pathname.startsWith("/student-dashboard") || location.pathname.startsWith("/admin-dashboard") || location.pathname.startsWith("/instructor-dashboard");

  // --- Session Management ---

  // Auto-Redirect if logged in
  React.useEffect(() => {
      const token = sessionStorage.getItem('access_token');
      const role = sessionStorage.getItem('user_role');
      
      // List of public routes that should redirect to dashboard if user is logged in
      const publicRoutes = ['/', '/login', '/get-started', '/courses', '/about', '/contact', '/pricing', '/feature'];
      
      // If user is logged in and visits any public page, redirect to their dashboard
      if (token && role && publicRoutes.includes(location.pathname)) {
          if (role === 'student') {
             navigate('/student-dashboard', { replace: true });
          } else if (role === 'admin') {
             navigate('/admin-dashboard', { replace: true });
          } else if (role === 'instructor') {
             navigate('/instructor-dashboard', { replace: true });
          }
      }
  }, [location.pathname, navigate]);



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
        <Route path="/admin-dashboard" element={<SuperAdminDashboard />}></Route>
        <Route path="/instructor-dashboard" element={<InstructorDashboard />}></Route>
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
