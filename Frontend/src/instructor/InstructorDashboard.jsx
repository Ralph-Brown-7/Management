import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, ProgressBar } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import InstructorCourses from './InstructorCourses';
import InstructorStudents from './InstructorStudents';
import InstructorMessages from './InstructorMessages';
import InstructorSettings from './InstructorSettings';
import { 
  Grid, 
  Book, 
  People, 
  Envelope, 
  Gear, 
  BoxArrowRight, 
  PlusLg, 
  Calendar3,
  CurrencyDollar,
  StarFill,
  JournalBookmarkFill,
  Search,
  FunnelFill,
  ThreeDotsVertical
} from 'react-bootstrap-icons';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Analytics'); // Sidebar active state
    const [viewMode, setViewMode] = useState('Overview'); // Overview vs Schedule
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('access_token');
            if (!token) {
                toast.error("Please login first");
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/admin/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Dashboard fetch error:", error);
                toast.error("Failed to load dashboard data");
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100" style={{background: '#040b14', color: '#fff'}}>
            <Spinner animation="border" variant="primary" />
        </div>;
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
    };

    // --- Components ---

    const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
        <div 
            onClick={onClick}
            className={`d-flex align-items-center gap-3 px-3 py-2 rounded-3 mb-2 cursor-pointer position-relative overflow-hidden ${isActive ? 'bg-primary text-white' : 'text-white-50 hover-bg-dark'}`}
            style={{ 
                cursor: 'pointer', 
                transition: 'all 0.2s', 
                background: isActive ? 'linear-gradient(90deg, #0066FF 0%, rgba(0, 102, 255, 0.5) 100%)' : 'transparent',
                borderLeft: isActive ? '4px solid #fff' : '4px solid transparent'
            }}
        >
            <Icon size={18} />
            <span style={{ fontSize: '15px' }}>{label}</span>
        </div>
    );

    const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
        <div className="p-4 rounded-4 h-100 position-relative overflow-hidden" style={{ background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="d-flex justify-content-between mb-4">
                <div>
                    <p className="text-white-50 mb-1" style={{ fontSize: '13px' }}>{title}</p>
                    <h2 className="fw-bold mb-0 text-white">{value}</h2>
                </div>
                <div className="p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', background: `${color}15`, color: color }}>
                    <Icon size={24} />
                </div>
            </div>
            {subtext && (
                 <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1" style={{fontSize: '10px'}}>
                        <GraphUpArrow /> +12%
                    </span>
                    <span className="text-white-50" style={{fontSize: '11px'}}>vs last month</span>
                 </div>
            )}
        </div>
    );

    // Simple SVG Icon for stats vs badge
    const GraphUpArrow = () => <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/></svg>;


    return (
        <div className="d-flex w-100" style={{ background: '#040b14', minHeight: '100vh', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
            
            {/* --- Sidebar --- */}
            <div className="d-none d-lg-flex flex-column p-4 border-end border-dark position-sticky top-0" style={{ width: '280px', height: '100vh', borderColor: 'rgba(255,255,255,0.1)!important' }}>
                <div className="mb-5 px-2">
                     <img src="/learnflow_logo.png" alt="LearnFlow" style={{height: '35px', objectFit: 'contain'}} />
                </div>

                <div className="d-flex flex-column gap-1 mt-5">
                    <SidebarItem icon={Grid} label="Home" isActive={activeTab === 'Dashboard' || activeTab === 'Analytics'} onClick={() => setActiveTab('Dashboard')} />
                    <SidebarItem icon={Book} label="My Courses" isActive={activeTab === 'Courses'} onClick={() => setActiveTab('Courses')} />
                    <SidebarItem icon={People} label="Students" isActive={activeTab === 'Students'} onClick={() => setActiveTab('Students')} />
                    <SidebarItem icon={Envelope} label="Messages" isActive={activeTab === 'Messages'} onClick={() => setActiveTab('Messages')} />
                    <SidebarItem icon={Gear} label="Settings" isActive={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
                </div>

                <div className="mt-auto">
                    <button 
                        onClick={() => { sessionStorage.clear(); navigate('/login'); }} 
                        className="btn btn-link text-decoration-none text-danger d-flex align-items-center gap-3 px-3"
                    >
                        <BoxArrowRight size={18} /> Logout
                    </button>
                </div>
            </div>



            {/* --- Main Content --- */}
            <div className="flex-grow-1 p-4 p-md-5 overflow-auto">
                
                {activeTab === 'Courses' ? (
                    <InstructorCourses />
                ) : activeTab === 'Students' ? (
                    <InstructorStudents students={data?.students || []} totalXP={data?.total_xp || 0} />
                ) : activeTab === 'Messages' ? (
                    <InstructorMessages />
                ) : activeTab === 'Settings' ? (
                    <InstructorSettings />
                ) : (
                    <>
                {/* Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                    <div>
                        <h1 className="fw-bold mb-1">{viewMode === 'Overview' ? 'Overview' : 'Schedule'}</h1>
                        <p className="text-white-50 mb-0">Welcome back, Instructor. Here's what's happening with your courses.</p>
                    </div>
                    <div className="d-flex gap-3">
                        <button 
                            className={`btn d-flex align-items-center gap-2 rounded-3 ${viewMode === 'Schedule' ? 'bg-white text-black border-0' : 'btn-outline-light text-white-50 border-dark'}`}
                            onClick={() => setViewMode(viewMode === 'Overview' ? 'Schedule' : 'Overview')}
                        >
                            <Calendar3 /> {viewMode === 'Overview' ? 'Schedule' : 'Overview'}
                        </button>
                        <button 
                            className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-4" 
                            style={{background: '#0066FF', border: 'none'}}
                            onClick={() => setShowCreateModal(true)}
                        >
                            <PlusLg /> Create New Course
                        </button>
                    </div>
                </div>

                {viewMode === 'Schedule' ? (
                    <ScheduleCalendar />
                ) : (
                    <>
                        {/* KPI Cards */}
                        <Row className="g-4 mb-5">
                            <Col xl={3} md={6}>
                                <StatCard 
                                    title="Total Revenue" 
                                    value={formatCurrency(data?.revenue || 0)} 
                                    subtext={true} 
                                    icon={CurrencyDollar} 
                                    color="#10B981" 
                                />
                            </Col>
                            <Col xl={3} md={6}>
                                <StatCard 
                                    title="Total Students" 
                                    value={data?.total_students || 0} 
                                    subtext={true} 
                                    icon={People} 
                                    color="#0066FF" 
                                />
                            </Col>
                            <Col xl={3} md={6}>
                                <StatCard 
                                    title="Average Rating" 
                                    value={data?.average_rating || 4.8} 
                                    subtext={true} 
                                    icon={StarFill} 
                                    color="#F59E0B" 
                                />
                            </Col>
                            <Col xl={3} md={6}>
                                <StatCard 
                                    title="Active Courses" 
                                    value={data?.active_courses_count || 0} 
                                    subtext={true} 
                                    icon={JournalBookmarkFill} 
                                    color="#8B5CF6" 
                                />
                            </Col>
                        </Row>

                <Row className="g-4 mb-5">
                    {/* Revenue Analytics Chart */}
                    <Col xl={8}>

                        <div className="p-4 rounded-4 h-100" style={{ background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)' }}>
                             <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h5 className="fw-bold mb-1">Revenue Analytics</h5>
                                    <p className="text-white-50 small mb-0">Income over the last 12 months</p>
                                </div>
                                <select className="form-select w-auto bg-dark text-white border-dark form-select-sm">
                                    <option>This Year</option>
                                </select>
                             </div>
                             
                             <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart
                                        data={(data?.revenue_analytics || []).map((val, i) => ({
                                            month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
                                            revenue: val
                                        }))}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0066FF" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                        <XAxis 
                                            dataKey="month" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#6c757d', fontSize: 12 }} 
                                            dy={10}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#6c757d', fontSize: 12 }} 
                                        />
                                        <Tooltip 
                                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                            contentStyle={{ background: 'rgba(13, 18, 29, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
                                            itemStyle={{ color: '#fff' }}
                                            formatter={(value) => [`$${value}`, 'Revenue']}
                                        />
                                        <Bar 
                                            dataKey="revenue" 
                                            fill="url(#colorRevenue)" 
                                            radius={[4, 4, 0, 0]} 
                                            barSize={30}
                                            animationDuration={1500}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                             </div>
                        </div>
                    </Col>

                    {/* Upcoming Schedule */}
                    <Col xl={4}>
                        <div className="p-4 rounded-4 h-100" style={{ background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)' }}>
                             <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold mb-0">Upcoming Schedule</h5>
                                <button className="btn btn-sm btn-outline-light border-dark text-white-50">View All</button>
                             </div>
                             <div className="d-flex flex-column gap-3">
                                {[
                                    { date: '18', month: 'JAN', title: 'Python Live Session', time: '10:00 AM - 11:30 AM', color: '#0066FF' },
                                    { date: '20', month: 'JAN', title: 'Data Science Q&A', time: '02:00 PM - 03:00 PM', color: '#10B981' },
                                    { date: '22', month: 'JAN', title: 'Project Review', time: '04:00 PM - 05:00 PM', color: '#F59E0B' },
                                    { date: '25', month: 'JAN', title: 'Intro to AI Workshop', time: '09:00 AM - 12:00 PM', color: '#8B5CF6' }
                                ].map((item, i) => (
                                    <div key={i} className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                        <div className="text-center rounded-3 p-2" style={{ background: `${item.color}20`, minWidth: '50px' }}>
                                            <span className="d-block fw-bold" style={{ color: item.color, lineHeight: 1 }}>{item.date}</span>
                                            <span className="d-block small text-white-50" style={{ fontSize: '10px' }}>{item.month}</span>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-1 text-white" style={{ fontSize: '14px' }}>{item.title}</h6>
                                            <p className="text-white-50 mb-0 small">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </Col>
                </Row>

                <Row className="g-4 mb-5">
                    {/* My Courses */}
                    <Col xl={8}>
                        <div className="p-4 rounded-4 h-100" style={{ background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold mb-0">My Courses</h5>
                                <div className="d-flex gap-3">
                                     <button className="btn btn-outline-light d-flex align-items-center gap-2 rounded-3 border-dark text-white-50 btn-sm">
                                        <FunnelFill /> Filter
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                {data?.course_performance?.slice(0, 3).map((course, i) => (
                                    <div key={i} className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ background: '#1a1f29' }}>
                                        <div className="d-flex align-items-center gap-3">
                                            <img src={course.image} alt="Course" className="rounded-3" width="60" height="60" style={{objectFit: 'cover'}} />
                                            <div>
                                                <h6 className="fw-bold mb-1 text-white">{course.title}</h6>
                                                <div className="d-flex align-items-center gap-3">
                                                    <span className="text-white-50 small d-flex align-items-center gap-1"><span className="text-success">●</span> {course.status}</span>
                                                    <span className="text-white-50 small">• {course.students} Students</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-5">
                                            <div className="text-end d-none d-md-block">
                                                <div className="text-white-50 small">Earnings</div>
                                                <div className="fw-bold">{formatCurrency(course.earnings)}</div>
                                            </div>
                                            <button className="btn btn-link text-white-50"><ThreeDotsVertical /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                    
                    {/* Recent Student Queries */}
                    <Col xl={4}>
                         <div className="p-4 rounded-4 h-100" style={{ background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold mb-0">Student Inquiries</h5>
                                <span className="badge bg-danger rounded-pill">3 New</span>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                {[
                                    { name: 'Alice Johnson', msg: 'Question about module 3...', time: '10m ago', img: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=FF5733&color=fff' },
                                    { name: 'David Smith', msg: 'Is the certificate included?', time: '1h ago', img: 'https://ui-avatars.com/api/?name=David+Smith&background=33FF57&color=fff' },
                                    { name: 'Emma Wilson', msg: 'Submitted my assignment.', time: '2h ago', img: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=3357FF&color=fff' }
                                ].map((q, i) => (
                                    <div key={i} className="d-flex align-items-start gap-3 border-bottom border-secondary pb-3" style={{ borderColor: 'rgba(255,255,255,0.1)!important' }}>
                                        <img src={q.img} alt={q.name} className="rounded-circle" width="40" height="40" />
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <h6 className="fw-bold text-white mb-0" style={{ fontSize: '14px' }}>{q.name}</h6>
                                                <span className="text-white-50" style={{ fontSize: '11px' }}>{q.time}</span>
                                            </div>
                                            <p className="text-white-50 mb-2 small line-clamp-1">{q.msg}</p>
                                            <button className="btn btn-sm btn-link p-0 text-primary text-decoration-none" style={{ fontSize: '12px' }}>Reply</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Recent Sales & Top Students */}
                <Row className="g-4 mb-5">
                    {/* Top Performing Students */}
                    <Col xl={6}>
                         <div className="p-4 rounded-4 h-100" style={{ background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)' }}>
                             <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold mb-0">Top Performing Students</h5>
                                <button className="btn btn-sm btn-outline-light border-dark text-white-50">View Leaderboard</button>
                             </div>
                             <div className="table-responsive">
                                 <table className="table table-dark table-borderless mb-0">
                                     <thead>
                                         <tr className="text-white-50" style={{ fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                             <th className="pb-3 fw-normal">STUDENT</th>
                                             <th className="pb-3 fw-normal">COURSE</th>
                                             <th className="pb-3 fw-normal">PROGRESS</th>
                                             <th className="pb-3 fw-normal text-end">XP</th>
                                         </tr>
                                     </thead>
                                     <tbody>
                                         {[
                                             { name: 'Michael Brown', course: 'Python for Data Science', progress: 95, xp: 1250, img: 'https://ui-avatars.com/api/?name=Michael+Brown&background=random' },
                                             { name: 'Sarah Lee', course: 'React for Beginners', progress: 88, xp: 980, img: 'https://ui-avatars.com/api/?name=Sarah+Lee&background=random' },
                                             { name: 'James Wilson', course: 'Advanced Node.js', progress: 82, xp: 850, img: 'https://ui-avatars.com/api/?name=James+Wilson&background=random' },
                                             { name: 'Emily Davis', course: 'UI/UX Design Principles', progress: 75, xp: 720, img: 'https://ui-avatars.com/api/?name=Emily+Davis&background=random' }
                                         ].map((s, i) => (
                                             <tr key={i}>
                                                 <td className="py-3">
                                                     <div className="d-flex align-items-center gap-2">
                                                         <img src={s.img} alt={s.name} className="rounded-circle" width="30" height="30" />
                                                         <span className="fw-bold" style={{ fontSize: '14px' }}>{s.name}</span>
                                                     </div>
                                                 </td>
                                                 <td className="py-3 text-white-50" style={{ fontSize: '13px' }}>{s.course}</td>
                                                 <td className="py-3">
                                                     <div className="d-flex align-items-center gap-2">
                                                         <div className="progress flex-grow-1" style={{ height: '4px', width: '60px', background: 'rgba(255,255,255,0.1)' }}>
                                                             <div className="progress-bar bg-success" style={{ width: `${s.progress}%` }}></div>
                                                         </div>
                                                         <span className="small text-white-50">{s.progress}%</span>
                                                     </div>
                                                 </td>
                                                 <td className="py-3 text-end fw-bold text-warning">{s.xp}</td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 </table>
                             </div>
                         </div>
                    </Col>

                    {/* Recent Sales */}
                    <Col xl={6}>
                        <div className="p-4 rounded-4 h-100" style={{ background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h5 className="fw-bold mb-4">Recent Sales</h5>
                            <div className="d-flex flex-column gap-3">
                                {data?.recent_enrollments?.map((enr, i) => (
                                    <div key={i} className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                        <div className="d-flex gap-3 align-items-center">
                                            <div className="d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 text-success" style={{width: '40px', height: '40px'}}>
                                                <CurrencyDollar size={20} />
                                            </div>
                                            <div>
                                                <h6 className="fw-bold mb-0 text-white" style={{fontSize: '14px'}}>New Enrollment</h6>
                                                <p className="text-white-50 mb-0 small">{enr.course_title}</p>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <div className="fw-bold text-success">+${enr.price}</div>
                                            <div className="text-white-50 small">Just now</div>
                                        </div>
                                    </div>
                                ))}
                                {!data?.recent_enrollments?.length && <p className="text-white-50 text-center">No recent sales</p>}
                            </div>
                            <button className="btn btn-outline-secondary w-100 mt-4 rounded-3 border-dark text-white-50">View All Transactions</button>
                        </div>
                    </Col>
                </Row>

            </>
                )}
            </>
                )}
            </div>
        </div>
    );
};

// --- Sub-components for Polish ---

const ScheduleCalendar = () => {
    // Basic Grid Calendar
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Mock dates for Jan 2026
    const dates = Array.from({length: 31}, (_, i) => i + 1);
    
    return (
        <div className="p-4 rounded-4" style={{ background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                 <h4 className="mb-0 fw-bold">January 2026</h4>
                 <button className="btn btn-sm btn-outline-secondary border-dark text-white-50">Add Event</button>
            </div>
            
            {/* Days Header */}
            <div className="d-grid mb-2" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                {days.map(d => <div key={d} className="text-white-50 text-center small fw-bold">{d}</div>)}
            </div>

            {/* Dates Grid */}
             <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                {/* Empty slots for start of month (assuming starts Thursday) */}
                {[...Array(4)].map((_, i) => <div key={`empty-${i}`}></div>)}
                
                {dates.map(date => {
                    const isToday = date === 19; 
                    const hasEvent = [5, 12, 19, 24].includes(date);
                    return (
                        <div key={date} 
                             className={`rounded-3 p-2 d-flex flex-column align-items-center justify-content-center position-relative transition-all hover-scale`}
                             style={{ 
                                 height: '100px', 
                                 background: isToday ? 'rgba(0,102,255,0.2)' : 'rgba(255,255,255,0.02)',
                                 border: isToday ? '1px solid #0066FF' : '1px solid transparent',
                                 cursor: 'pointer'
                             }}
                        >
                            <span className={`fw-bold ${isToday ? 'text-primary' : 'text-white'}`}>{date}</span>
                            {hasEvent && (
                                <div className="mt-2 text-xs bg-success bg-opacity-25 text-success px-2 py-1 rounded-pill" style={{fontSize: '10px'}}>
                                    Live Class
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const CreateCourseModal = ({ show, onHide }) => (
    <React.Fragment>
        {show && (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{zIndex: 1050, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)'}}>
                <div className="bg-dark p-4 rounded-4 shadow-lg border border-secondary" style={{width: '600px', maxWidth: '90%'}}>
                    <h3 className="fw-bold mb-4 text-white">Create New Course</h3>
                    <div className="mb-3">
                        <label className="form-label text-white-50">Course Title</label>
                        <input type="text" className="form-control bg-black text-white border-secondary" placeholder="e.g. Advanced Python Patterns" autoFocus />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white-50">Category</label>
                        <select className="form-select bg-black text-white border-secondary">
                            <option>Development</option>
                            <option>Design</option>
                            <option>Business</option>
                        </select>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                             <label className="form-label text-white-50">Price ($)</label>
                             <input type="number" className="form-control bg-black text-white border-secondary" placeholder="49.99" />
                        </div>
                        <div className="col-6">
                             <label className="form-label text-white-50">Duration (hrs)</label>
                             <input type="number" className="form-control bg-black text-white border-secondary" placeholder="10" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-outline-light border-0" onClick={onHide}>Cancel</button>
                        <button className="btn btn-primary px-4" onClick={() => { 
                            toast.success("Course Created Successfully!"); 
                            onHide(); 
                        }}>Create Course</button>
                    </div>
                </div>
            </div>
        )}
    </React.Fragment>
);

export default InstructorDashboard;