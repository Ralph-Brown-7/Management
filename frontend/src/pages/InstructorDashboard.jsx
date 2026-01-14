import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  Star,
  Clock,
  Plus,
  Search,
  Bell,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  FileText,
  Upload,
  BarChart2,
  Calendar as CalendarIcon,
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';
import '../Style/StudentDashboard.css'; // Reusing the glassmorphism styles

// --- Mock Data ---
const instructorStats = {
  totalStudents: 1245,
  totalRevenue: 24500,
  averageRating: 4.8,
  activeCourses: 8
};

const recentSales = [
  { id: 1, course: "Advanced React Patterns", amount: 49.99, user: "Alex Johnson", time: "2 mins ago" },
  { id: 2, course: "Python for Data Science", amount: 89.99, user: "Maria Garcia", time: "15 mins ago" },
  { id: 3, course: "UI/UX Masterclass", amount: 129.00, user: "David Smith", time: "1 hour ago" },
];

const engagementData = [
    { day: 'Mon', hours: 45 },
    { day: 'Tue', hours: 60 },
    { day: 'Wed', hours: 30 },
    { day: 'Thu', hours: 75 },
    { day: 'Fri', hours: 50 },
    { day: 'Sat', hours: 25 },
    { day: 'Sun', hours: 10 },
];

const courseList = [
    { id: 101, title: "Advanced React Patterns", status: "Published", students: 450, rating: 4.9, revenue: 12500, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800" },
    { id: 102, title: "Python for Data Science", status: "Published", students: 320, rating: 4.7, revenue: 8900, image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800" },
    { id: 103, title: "UI/UX Masterclass", status: "Review", students: 0, rating: 0, revenue: 0, image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=800" },
    { id: 104, title: "Docker for Beginners", status: "Draft", students: 0, rating: 0, revenue: 0, image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=800" },
];

const InstructorSidebar = ({ active, setActive }) => {
    const navigate = useNavigate();
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'courses', icon: BookOpen, label: 'My Courses' },
        { id: 'analytics', icon: BarChart2, label: 'Analytics' },
        { id: 'students', icon: Users, label: 'Students' },
        { id: 'messages', icon: MessageSquare, label: 'Messages' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="dashboard-sidebar">
            <div className="sidebar-logo mb-5">
                <BookOpen size={28} color="var(--primary-color)" />
                <span className="fs-4 fw-bold text-white">LearnFlow <span className="text-primary text-xs opacity-50">Instructor</span></span>
            </div>

            <nav className="sidebar-nav d-flex flex-column gap-2 flex-grow-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item border-0 w-100 text-start d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition ${active === item.id ? 'bg-primary text-white shadow-lg' : 'bg-transparent text-secondary hover-bg-dark'}`}
                        onClick={() => setActive(item.id)}
                    >
                        <item.icon size={20} />
                        <span className="fw-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            <button className="nav-item border-0 w-100 text-start d-flex align-items-center gap-3 px-3 py-2 text-danger mt-auto hover-bg-danger-soft rounded-3" onClick={() => navigate('/')}>
                <LogOut size={20} />
                <span className="fw-medium">Log Out</span>
            </button>
        </div>
    );
};

// --- Components ---
const StatCard = ({ title, value, subtext, icon: Icon, color, trend }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card p-4 d-flex flex-column justify-content-between position-relative overflow-hidden h-100"
    >
        <div className={`position-absolute top-0 end-0 p-4 opacity-10 text-${color}`}>
            <Icon size={64} />
        </div>
        <div>
            <p className="text-secondary text-sm fw-medium mb-1">{title}</p>
            <h3 className="text-white fw-bold mb-0">{value}</h3>
        </div>
        <div className="d-flex align-items-center gap-2 mt-3">
            <span className={`badge bg-${trend === 'up' ? 'success' : 'danger'} bg-opacity-20 text-${trend === 'up' ? 'success' : 'danger'} d-flex align-items-center gap-1`}>
                {trend === 'up' ? <TrendingUp size={12} /> : <TrendingUp size={12} style={{transform: 'rotate(180deg)'}} />} 
                {subtext}
            </span>
            <span className="text-secondary text-xs">vs last month</span>
        </div>
    </motion.div>
);

const RevenueChart = () => (
    <div className="w-100 h-100 d-flex align-items-end justify-content-between gap-2 pt-4 px-2">
        {[35, 45, 30, 60, 75, 50, 65, 80, 70, 90, 85, 95].map((h, i) => (
            <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.05 }}
                className="rounded-top w-100 bg-primary bg-opacity-50 position-relative group"
                style={{minWidth: '8px'}}
            >
                <div className="position-absolute bottom-0 w-100 bg-primary" style={{height: '30%', opacity: 0.5}}></div>
            </motion.div>
        ))}
    </div>
);

const InstructorDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [user] = useState({ name: "Professor X", role: "Instructor" });

    return (
        <div className="dashboard-container">
            <InstructorSidebar active={activeTab} setActive={setActiveTab} />
            
            <main className="dashboard-main p-0">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-end mb-5 px-4 pt-4">
                    <div>
                        <h1 className="display-5 fw-bold text-white mb-1">Overview</h1>
                        <p className="text-secondary">Welcome back, {user.name}. Here's what's happening with your courses.</p>
                    </div>
                    <div className="d-flex gap-3">
                         <button className="btn glass-card d-flex align-items-center gap-2 text-white px-3 py-2 hover-scale">
                            <CalendarIcon size={18} /> Schedule
                         </button>
                         <button className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 hover-scale glow-effect">
                            <Plus size={18} /> Create New Course
                         </button>
                    </div>
                </div>

                <div className="container-fluid px-4 pb-5">
                    {/* Stats Grid */}
                    <div className="row g-4 mb-4">
                        <div className="col-12 col-md-6 col-xl-3">
                            <StatCard title="Total Revenue" value="$24,500" subtext="+12.5%" icon={DollarSign} color="success" trend="up" />
                        </div>
                        <div className="col-12 col-md-6 col-xl-3">
                            <StatCard title="Total Students" value="1,245" subtext="+8.2%" icon={Users} color="primary" trend="up" />
                        </div>
                        <div className="col-12 col-md-6 col-xl-3">
                            <StatCard title="Average Rating" value="4.8" subtext="+0.1" icon={Star} color="warning" trend="up" />
                        </div>
                        <div className="col-12 col-md-6 col-xl-3">
                            <StatCard title="Active Courses" value="8" subtext="2 pending" icon={BookOpen} color="info" trend="up" />
                        </div>
                    </div>

                    <div className="row g-4">
                        {/* Main Content Column */}
                        <div className="col-lg-8">
                            
                            {/* Revenue Analytics */}
                            <div className="glass-card p-4 mb-4 position-relative overflow-hidden">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div>
                                        <h4 className="fw-bold text-white m-0">Revenue Analytics</h4>
                                        <p className="text-secondary text-sm m-0">Income over the last 12 months</p>
                                    </div>
                                    <select className="bg-dark border-secondary text-secondary rounded p-1 text-sm">
                                        <option>This Year</option>
                                        <option>Last Year</option>
                                    </select>
                                </div>
                                <div style={{height: '300px'}}>
                                    <RevenueChart />
                                </div>
                            </div>

                            {/* Course Management */}
                            <div className="glass-card p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="fw-bold text-white m-0">My Courses</h4>
                                    <div className="d-flex gap-2">
                                        <div className="position-relative">
                                            <Search size={16} className="text-secondary position-absolute top-50 start-0 translate-middle-y ms-2" />
                                            <input type="text" placeholder="Search..." className="bg-dark border-secondary text-white rounded-pill ps-4 py-1 text-sm" style={{width: '200px'}} />
                                        </div>
                                        <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"><Filter size={14}/> Filter</button>
                                    </div>
                                </div>

                                <div className="d-flex flex-column gap-3">
                                    {courseList.map((course) => (
                                        <motion.div 
                                            key={course.id}
                                            whileHover={{ scale: 1.01 }}
                                            className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-white bg-opacity-5 hover-bg-dark transition"
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <img src={course.image} alt="" className="rounded-3 object-fit-cover" style={{width: '60px', height: '60px'}} />
                                                <div>
                                                    <h6 className="fw-bold text-white m-0">{course.title}</h6>
                                                    <div className="d-flex align-items-center gap-2 mt-1">
                                                        <span className={`badge bg-${course.status === 'Published' ? 'success' : course.status === 'Review' ? 'warning' : 'secondary'} bg-opacity-20 text-${course.status === 'Published' ? 'success' : course.status === 'Review' ? 'warning' : 'secondary'} text-xs`}>
                                                            {course.status}
                                                        </span>
                                                        <span className="text-secondary text-xs">• {course.students} Students</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-4">
                                                <div className="text-end d-none d-md-block">
                                                    <p className="text-white fw-bold m-0">${course.revenue.toLocaleString()}</p>
                                                    <p className="text-secondary text-xs m-0">Earnings</p>
                                                </div>
                                                <button className="btn btn-icon text-secondary hover-text-white"><MoreVertical size={18} /></button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Side Column */}
                        <div className="col-lg-4">
                            
                            {/* Announcements Widget */}
                            <div className="glass-card p-4 mb-4">
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <Bell size={20} className="text-warning" />
                                    <h5 className="fw-bold text-white m-0">Recent Sales</h5>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    {recentSales.map((sale) => (
                                        <div key={sale.id} className="d-flex align-items-center gap-3 pb-2 border-bottom border-secondary border-opacity-10 last-border-0">
                                            <div className="rounded-circle bg-success bg-opacity-10 p-2 text-success">
                                                <DollarSign size={16} />
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="text-white text-sm fw-medium m-0">New enrollment</p>
                                                <p className="text-secondary text-xs m-0">{sale.course}</p>
                                            </div>
                                            <div className="text-end">
                                                <p className="text-white text-sm fw-bold m-0">+${sale.amount}</p>
                                                <p className="text-secondary text-xs m-0">{sale.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-outline-secondary w-100 mt-3 text-sm">View All Transactions</button>
                            </div>

                            {/* Engagement Heatmap Mini */}
                            <div className="glass-card p-4 mb-4">
                                <h5 className="fw-bold text-white mb-3">Student Activity</h5>
                                <div className="d-flex align-items-end justify-content-between h-100 gap-1" style={{height: '100px'}}>
                                    {engagementData.map((d, i) => (
                                        <div key={i} className="d-flex flex-column align-items-center w-100 gap-1">
                                            <div className="w-100 bg-primary rounded-1" style={{height: `${d.hours}%`, opacity: 0.6 + (d.hours/200)}}></div>
                                            <span className="text-secondary" style={{fontSize: '9px'}}>{d.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upload Resource */}
                            <div className="glass-card p-4 text-center border-dashed border-2 border-secondary border-opacity-25 hover-border-primary transition cursor-pointer">
                                <div className="mb-3 d-inline-block p-3 rounded-circle bg-dark">
                                    <Upload size={24} className="text-primary" />
                                </div>
                                <h6 className="fw-bold text-white">Upload New Support Material</h6>
                                <p className="text-secondary text-sm px-2">Drag and drop video, PDF, or resources here.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InstructorDashboard;
