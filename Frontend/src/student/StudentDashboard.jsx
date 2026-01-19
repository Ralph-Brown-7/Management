import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// --- Inline Icons ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/><path d="m8 3.293 6 6V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V9.293l6-6Z"/></svg>;
const CoursesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828Zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687ZM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783Z"/></svg>;
const ScheduleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 0h-8A1.5 1.5 0 0 0 0 1.5v9A1.5 1.5 0 0 0 1.5 12h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/><path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/></svg>;
const FireIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF6B6B" viewBox="0 0 16 16"><path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/></svg>;

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [greeting, setGreeting] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // --- Greeting Logic ---
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        // --- Fetch Data ---
        const fetchData = async () => {
             const token = sessionStorage.getItem('access_token');
             if (!token) {
                 toast.error("Please login first");
                 navigate('/login');
                 return;
             }

             // Set basic user name immediately from session if available
             setUserName(sessionStorage.getItem('user_name') || 'Scholar');

             try {
                 const [dashRes, coursesRes] = await Promise.all([
                     axios.get('http://localhost:8000/dashboard', { headers: { Authorization: `Bearer ${token}` } }),
                     axios.get('http://localhost:8000/courses?limit=4', { headers: { Authorization: `Bearer ${token}` } })
                 ]);

                 setDashboardData(dashRes.data);
                 setRecommendedCourses(coursesRes.data);
                 setLoading(false);

             } catch (error) {
                 console.error("Dashboard fetch error:", error);
                 if (error.response?.status === 401) {
                     toast.error("Session expired");
                     navigate('/login');
                 } else {
                     toast.error("Failed to load dashboard data");
                 }
                 setLoading(false);
             }
        };

        fetchData();
    }, [navigate]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const sidebarStyle = {
        width: '240px',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1050,
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1.5rem',
        backgroundColor: '#040b14',
        overflowY: 'auto',
        transition: 'transform 0.3s ease-in-out',
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
    };

    const desktopSidebarStyle = {
        ...sidebarStyle,
        position: 'sticky',
        transform: 'none',
        display: 'flex'
    };

    const mainContentStyle = {
        flex: 1,
        padding: 'clamp(1.5rem, 3vw, 3rem)',
        backgroundColor: '#040b14',
        color: '#fff',
        marginLeft: 0
    };
    
    // Fallbackavatar
    const user = { 
        level: dashboardData?.level || 1, 
        avatar: `https://ui-avatars.com/api/?name=${userName}&background=0D8ABC&color=fff&rounded=true` 
    };

    if (loading) {
         return <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">Loading your dashboard...</div>;
    }

    const enrolledList = dashboardData?.enrollments || [];
    // Currently active course (first one that is active, or just first one)
    const activeCourse = enrolledList.find(e => e.status === 'active');
    
    // Stats Array
    const stats = [
        { label: 'Courses in Progress', val: dashboardData?.courses_in_progress || 0, sub: 'Keep it up!', icon: '📖', color: '#8662FF' },
        { label: 'Total Hours', val: dashboardData?.total_hours || 0, sub: 'Lifetime learning', icon: '🕒', color: '#10B981' },
        { label: 'Certificates Earned', val: dashboardData?.certificates_earned || 0, sub: 'Achievements', icon: '🏆', color: '#F59E0B' },
        { label: 'Average Score', val: `${dashboardData?.average_score || 0}%`, sub: 'Performance', icon: '📈', color: '#EC4899' },
    ];

    return (
        <div className="d-flex w-100" style={{background: '#040b14', minHeight: '100vh'}}>
             {/* --- Mobile Sidebar Overlay --- */}
             {isSidebarOpen && (
                <div 
                    className="d-md-none position-fixed top-0 start-0 w-100 h-100" 
                    style={{background: 'rgba(0,0,0,0.5)', zIndex: 1040}}
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
             )}

             {/* --- Sidebar (Mobile) --- */}
             <div className="d-md-none" style={sidebarStyle}>
                <div className="mb-5 d-flex align-items-center justify-content-between">
                     <img src="/learnflow_logo.png" alt="LearnFlow" style={{height: '35px', objectFit: 'contain'}} />
                    <button className="btn btn-sm btn-outline-light border-0" onClick={toggleSidebar}>✕</button>
                </div>
                <ul className="list-unstyled d-flex flex-column gap-4 ps-3" style={{marginTop: '2rem'}}>
                    <li><Link to="#" className="text-decoration-none d-flex align-items-center gap-3 py-2 px-3 rounded-3 text-white" style={{background: '#1a1f29'}} onClick={() => setIsSidebarOpen(false)}><HomeIcon /> <span>Home</span></Link></li>
                    <li><Link to="#" className="text-decoration-none d-flex align-items-center gap-3 py-2 px-3 rounded-3 text-white-50 hover-bg-light" onClick={() => setIsSidebarOpen(false)}><CoursesIcon /> <span>My Courses</span></Link></li>
                    <li><Link to="#" className="text-decoration-none d-flex align-items-center gap-3 py-2 px-3 rounded-3 text-white-50" onClick={() => setIsSidebarOpen(false)}><ScheduleIcon /> <span>Schedule</span></Link></li>
                    <li><Link to="#" className="text-decoration-none d-flex align-items-center gap-3 py-2 px-3 rounded-3 text-white-50" onClick={() => setIsSidebarOpen(false)}><SettingsIcon /> <span>Settings</span></Link></li>
                </ul>
                <div className="mt-auto">
                    <button 
                        onClick={() => { sessionStorage.clear(); navigate('/'); }} 
                        className="btn btn-link text-decoration-none text-danger d-flex align-items-center gap-3 px-3 w-100 text-start"
                    >
                        <LogoutIcon /> Logout
                    </button>
                </div>
            </div>

            {/* Desktop Static Sidebar */}
            <div className="d-none d-md-flex" style={desktopSidebarStyle}>
                <div className="mb-5 d-flex align-items-center gap-2">
                     <img src="/learnflow_logo.png" alt="LearnFlow" style={{height: '40px', objectFit: 'contain'}} />
                </div>
                 <ul className="list-unstyled d-flex flex-column gap-4 ps-3" style={{marginTop: '2rem'}}>
                    <li><Link to="#" className="text-decoration-none d-flex align-items-center gap-3 py-2 px-3 rounded-3 text-white" style={{background: '#1a1f29'}}><HomeIcon /> <span>Home</span></Link></li>
                    <li><Link to="#" className="text-decoration-none d-flex align-items-center gap-3 py-2 px-3 rounded-3 text-white-50 hover-bg-light"><CoursesIcon /> <span>My Courses</span></Link></li>
                    <li><Link to="#" className="text-decoration-none d-flex align-items-center gap-3 py-2 px-3 rounded-3 text-white-50"><ScheduleIcon /> <span>Schedule</span></Link></li>
                    <li><Link to="#" className="text-decoration-none d-flex align-items-center gap-3 py-2 px-3 rounded-3 text-white-50"><SettingsIcon /> <span>Settings</span></Link></li>
                </ul>
                <div className="mt-auto">
                    <button 
                        onClick={() => { sessionStorage.clear(); navigate('/'); }} 
                        className="btn btn-link text-decoration-none text-danger d-flex align-items-center gap-3 px-3 w-100 text-start"
                    >
                        <LogoutIcon /> Logout
                    </button>
                </div>
            </div>

            {/* --- Main Area --- */}
            <div style={mainContentStyle}>
                
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                         {/* Mobile Hamburger */}
                        <button className="btn btn-outline-light d-md-none" onClick={toggleSidebar}>☰</button>
                        
                        <div>
                            <h1 className="fw-bold mb-1" style={{fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'}}>{greeting},</h1>
                            <h1 className="fw-bold mb-2" style={{fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'}}>{userName}! 👋</h1>
                            <p className="text-white-50 mb-0" style={{fontSize: '1.1rem'}}>Let's learn something new today.</p>
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-4">
                        {/* Streak Badge */}
                        <div className="d-flex align-items-center gap-3 px-4 py-2 rounded-pill" style={{background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)'}}>
                            <div className="p-2 rounded-circle bg-dark"><FireIcon /></div>
                            <div>
                                <span className="d-block text-white-50" style={{fontSize: '12px'}}>Streak count</span>
                                <span className="fw-bold" style={{fontSize: '16px'}}>{dashboardData?.streak || 0}</span>
                            </div>
                        </div>
                        
                        {/* Search */}
                        <div className="position-relative d-none d-xl-block">
                            <input type="text" placeholder="Search courses..." className="form-control bg-dark border-0 text-white rounded-pill pe-5 ps-4" style={{fontSize: '14px', minWidth: '250px'}} />
                            <div className="position-absolute top-50 translate-middle-y end-0 pe-3 text-white-50"><SearchIcon /></div>
                        </div>
                        
                        <div className="position-relative">
                            <BellIcon />
                            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-dark rounded-circle" style={{width: '6px', height: '6px'}}></span>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                             <img src={user.avatar} alt="Profile" width="40" height="40" className="rounded-circle" />
                             <div className="d-none d-sm-block">
                                 <p className="mb-0 fw-bold" style={{fontSize: '14px'}}>{userName}</p>
                                 <p className="mb-0 text-white-50" style={{fontSize: '11px'}}>PLAYER LVL {user.level}</p>
                             </div>
                        </div>
                    </div>
                </div>

                {/* --- Stats Grid --- */}
                <div className="row g-4 mb-5">
                    {stats.map((stat, i) => (
                        <div key={i} className="col-12 col-md-6 col-xl-3">
                            <div className="p-4 rounded-4 h-100" style={{background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)'}}>
                                <div className="mb-3 d-inline-flex justify-content-center align-items-center rounded-3" style={{width: '40px', height: '40px', background: `${stat.color}20`, color: stat.color}}>
                                    {stat.icon}
                                </div>
                                <h2 className="fw-bold mb-1">{stat.val}</h2>
                                <p className="text-white-50 mb-2" style={{fontSize: '13px'}}>{stat.label}</p>
                                <span style={{fontSize: '11px', color: stat.color}}>{stat.sub}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row g-4">
                    {/* Left Column (Courses/Progress) */}
                    <div className="col-12 col-xl-8">
                        {activeCourse ? (
                             <div className="mb-5">
                                <h4 className="fw-bold mb-4">Continue Learning</h4>
                                <div className="p-4 rounded-4 position-relative overflow-hidden" style={{background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)'}}>
                                     <div className="d-flex flex-column flex-md-row gap-4 align-items-center position-relative" style={{zIndex: 2}}>
                                        {/* Assuming course object is nested in enrollment. The API returns plain enrollment but default schema might not nest course details unless we updated dashboard.py to eager load or schema to include it. 
                                            Checking dashboard.py: response_model=schemas.DashboardData. 
                                            schemas.py: DashboardData.enrollments is List[Enrollment]. Enrollment has `course: Course`.
                                            So we have access to activeCourse.course.image, etc.
                                        */}
                                        <img src={activeCourse.course.image} alt={activeCourse.course.title} className="rounded-3" style={{width: '120px', height: '120px', objectFit: 'cover'}} />
                                        <div className="flex-grow-1 w-100">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="badge bg-primary">In Progress</span>
                                                <span className="text-white-50 small">Module {activeCourse.progress > 0 ? Math.ceil(activeCourse.progress/10) : 1}/10</span>
                                            </div>
                                            <h3 className="fw-bold mb-1">{activeCourse.course.title}</h3>
                                            <p className="text-white-50 mb-3">Last activity: <span className="text-white">{activeCourse.last_lesson || 'Started'}</span></p>
                                            
                                            <div className="progress mb-3" style={{height: '8px', background: 'rgba(255,255,255,0.1)'}}>
                                                <div className="progress-bar bg-success" style={{width: `${activeCourse.progress}%`}}></div>
                                            </div>
                                            
                                            <div className="d-flex gap-3">
                                                 <button className="btn btn-primary rounded-pill px-4" style={{background: '#0066FF', border: 'none'}}>Resume Learning</button>
                                            </div>
                                        </div>
                                     </div>
                                     {/* Background Glow Effect */}
                                     <div className="position-absolute top-0 end-0 w-50 h-100" style={{background: 'linear-gradient(90deg, transparent, rgba(0,102,255,0.05))', pointerEvents: 'none'}}></div>
                                </div>
                             </div>
                        ) : (
                            <div className="mb-5">
                                <h4 className="fw-bold mb-4">Recommended Starter Courses</h4>
                                <div className="row g-4 mb-5">
                                    {recommendedCourses.map((course) => (
                                        <div key={course.id} className="col-lg-6">
                                            <div className="rounded-4 overflow-hidden position-relative h-100" style={{background: '#0d121d', minHeight: '200px', border: '1px solid rgba(255,255,255,0.05)'}}>
                                                <div style={{height: '140px', background: `url(${course.image}) center/cover`}}>
                                                    <span className="badge bg-primary position-absolute top-0 start-0 m-3">{course.level}</span>
                                                </div>
                                                <div className="p-3">
                                                    <h6 className="fw-bold mb-1">{course.title}</h6>
                                                    <p className="text-white-50 mb-3" style={{fontSize: '12px'}}>{course.instructor} • {course.duration}</p>
                                                    <div className="d-flex gap-2">
                                                        <button className="btn btn-primary flex-grow-1 btn-sm rounded-pill" style={{background: '#0066FF', border: 'none'}}>View Details</button>
                                                        <span className="badge bg-light text-dark d-flex align-items-center">${course.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                         <div className="p-4 rounded-4" style={{background: '#1a1f1d', border: '1px solid rgba(255,255,255,0.05)'}}>
                             <div className="d-flex justify-content-between align-items-center mb-4">
                                 <h5 className="fw-bold mb-0">Focus session</h5>
                                 <span className="text-white-50">↗</span>
                             </div>
                             <div className="text-center py-4">
                                 <h3 className="fw-bold">Get ready to focus</h3>
                                 <p className="text-white-50 text-small mx-auto" style={{maxWidth: '400px'}}>We'll turn off notifications and app alerts during each session. For longer sessions, we'll add a short break.</p>
                             </div>
                         </div>
                    </div>

                    {/* Right Column (Widgets) */}
                    <div className="col-12 col-xl-4">
                        {/* Daily Goal */}
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center gap-2">
                                <h6 className="fw-bold mb-0">Daily Goal</h6>
                                <span style={{fontSize: '12px'}}>🎯</span>
                            </div>
                            <span className={`badge ${dashboardData?.daily_goal_completed ? 'bg-success' : 'bg-success bg-opacity-10 text-success'}`}>
                                {dashboardData?.daily_goal_completed ? 'Completed' : 'Pending'}
                            </span>
                        </div>
                        
                        <div className="p-3 rounded-4 mb-5 d-flex align-items-center gap-3" style={{background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)'}}>
                            <div className="flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle border border-secondary" style={{width: '24px', height: '24px'}}></div>
                            <div>
                                <h6 className="fw-bold mb-0" style={{fontSize: '14px'}}>15m Learning Session</h6>
                                <p className="mb-0 text-white-50" style={{fontSize: '12px'}}>Keep your streak alive!</p>
                            </div>
                        </div>

                        {/* Quest Board */}
                         <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center gap-2">
                                <h6 className="fw-bold mb-0">Quest Board</h6>
                                <span style={{fontSize: '12px'}}>⚔️</span>
                            </div>
                            <span className="text-white-50" style={{fontSize: '12px'}}>Active Challenges</span>
                        </div>

                        <div className="p-3 rounded-4 mb-3" style={{background: '#0d121d', border: '1px solid gold'}}>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="badge bg-warning text-dark" style={{fontSize: '10px'}}>Legendary</span>
                                <span className="fw-bold text-white small">50 XP</span>
                            </div>
                            <h6 className="fw-bold">Neural Networks Quiz</h6>
                            <p className="text-white-50 mb-3" style={{fontSize: '12px'}}>Advanced AI</p>
                            <div className="progress" style={{height: '6px', background: 'rgba(255,255,255,0.1)'}}>
                                <div className="progress-bar bg-warning" style={{width: '85%'}}></div>
                            </div>
                            <div className="d-flex justify-content-between mt-2" style={{fontSize: '10px'}}>
                                <span className="text-white-50">Progress: 85%</span>
                            </div>
                        </div>

                         <div className="p-3 rounded-4" style={{background: '#0d121d', border: '1px solid rgba(255,255,255,0.1)'}}>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="badge bg-secondary text-white" style={{fontSize: '10px'}}>Rare</span>
                                <span className="fw-bold text-white small">30 XP</span>
                            </div>
                            <h6 className="fw-bold">Project Submission</h6>
                            <p className="text-white-50 mb-3" style={{fontSize: '12px'}}>Web Development</p>
                            <div className="progress" style={{height: '6px', background: 'rgba(255,255,255,0.1)'}}>
                                <div className="progress-bar bg-purple" style={{width: '20%', backgroundColor: '#8662FF'}}></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard;
