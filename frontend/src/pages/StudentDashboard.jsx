import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  BookOpen, 
  Home, 
  Calendar, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Award, 
  Clock, 
  TrendingUp,
  ChevronRight,
  MoreVertical,
  Play,
  Flame,
  Trophy,
  Medal,
  Star,
  Zap,
  MessageCircle,
  X,
  Send,
  PenTool,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle,
  Circle,
  Info,
  Users,
  MessageSquare,
  Timer,
  Coins,
  Plus
} from 'lucide-react';
import '../Style/StudentDashboard.css';
import { courses } from '../data/courses';
import '../Style/Hero.css';

// Sidebar Component extracted to prevent re-renders
const Sidebar = ({ activeTab, setActiveTab, handleLogout }) => (
  <div className="dashboard-sidebar">
    <div className="sidebar-logo">
      <BookOpen size={28} color="var(--primary-color)" />
      <span>LearnFlow</span>
    </div>
    
    <div className="flex-grow mt-4">
      <div className={`nav-item mb-2 ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
        <Home size={20} />
        <span>Home</span>
      </div>
      <div className={`nav-item mb-2 ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>
        <BookOpen size={20} />
        <span>My Courses</span>
      </div>
      <div className={`nav-item mb-2 ${activeTab === 'schedule' ? 'active' : ''}`} onClick={() => setActiveTab('schedule')}>
        <Calendar size={20} />
        <span>Schedule</span>
      </div>
      <div className={`nav-item mb-2 ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
        <Settings size={20} />
        <span>Settings</span>
      </div>
    </div>
    
    <div className="nav-item text-danger mt-auto" onClick={handleLogout}>
      <LogOut size={20} />
      <span>Logout</span>
    </div>
  </div>
);

const PieChart = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let cumulative = 0;

  return (
    <div className="d-flex align-items-center justify-content-center gap-4 py-3">
      <div style={{ position: 'relative', width: '160px', height: '160px' }}>
          <svg viewBox="0 0 40 40" className="w-100 h-100" style={{ transform: 'rotate(-90deg)' }}>
          {data.map((item, index) => {
            const dashArray = (item.value / total) * 100;
            const dashOffset = cumulative;
            cumulative += dashArray;
            
            return (
              <motion.circle
                key={index}
                cx="20"
                cy="20"
                r="15.9155"
                fill="transparent"
                stroke={item.color}
                strokeWidth="5"
                strokeDasharray={`${dashArray} ${100 - dashArray}`}
                strokeDashoffset={-dashOffset}
                initial={{ strokeDasharray: `0 100` }}
                animate={{ strokeDasharray: `${dashArray} ${100 - dashArray}` }}
                transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: "easeOut" }}
              />
            );
          })}
          <text x="50%" y="50%" dy="0.3em" textAnchor="middle" fill="white" style={{ transform: 'rotate(90deg)', fontSize: '0.4rem', fontWeight: 'bold' }}>
              Activity
          </text>
        </svg>
      </div>

      <div className="d-flex flex-column gap-2">
          {data.map((item, index) => (
              <div key={index} className="d-flex align-items-center gap-2">
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.color }}></div>
                  <span className="text-secondary" style={{ fontSize: '0.85rem' }}>{item.label}</span>
                  <span className="fw-bold text-white ms-auto" style={{ fontSize: '0.85rem' }}>{item.value}%</span>
              </div>
          ))}
      </div>
    </div>
  );
};

const LearningHeatmap = () => {
  // Generate 52 weeks * 7 days
  const weeks = 52;
  const daysPerWeek = 7;
  
  // Mock data generation
  const data = Array.from({ length: weeks * daysPerWeek }, (_, i) => {
    const hours = Math.random() > 0.7 ? (Math.random() * 6).toFixed(1) : 0;
    const date = new Date();
    date.setDate(date.getDate() - (weeks * daysPerWeek - i));
    return { date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), hours: parseFloat(hours) };
  });

  const getColor = (hours) => {
    if (hours === 0) return '#0f172a';
    if (hours < 1) return '#003b44';
    if (hours < 2) return '#006d7e';
    if (hours < 3) return '#00a1b8';
    if (hours < 5) return '#00d0eb';
    return '#00f2ff'; // 5+ hours
  };

  return (
    <div className="glass-card p-4 mt-4 overflow-hidden">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold m-0">Learning Consistency</h4>
        <div className="d-flex gap-2 align-items-center">
          <span className="text-secondary text-xs">Less</span>
          {[0, 1, 2, 3, 5].map(h => (
            <div key={h} style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: getColor(h) }} />
          ))}
          <span className="text-secondary text-xs">More</span>
        </div>
      </div>
      
      <div className="d-flex gap-1 overflow-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {Array.from({ length: weeks }).map((_, weekIdx) => (
          <div key={weekIdx} className="d-flex flex-column gap-1">
            {Array.from({ length: daysPerWeek }).map((_, dayIdx) => {
              const item = data[weekIdx * daysPerWeek + dayIdx];
              return (
                <div key={dayIdx} className="position-relative group">
                  <motion.div
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '2px',
                      backgroundColor: getColor(item.hours),
                      cursor: 'pointer',
                      border: item.hours > 0 ? '1px solid rgba(0, 242, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                    className="heatmap-cell"
                  />
                  {/* Tooltip implementation with Framer Motion would usually use AnimatePresence, 
                      but for many items, a simple CSS-triggered motion div or state-based one is better. 
                      Using a simple peer-based tooltip for performance in grid. */}
                  <div className="tooltip-container position-absolute bg-dark text-white p-2 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none" 
                       style={{ bottom: '20px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', zIndex: 100, border: '1px solid rgba(0,242,255,0.3)', backdropFilter: 'blur(10px)' }}>
                    {item.date}: <span className="text-cyan">{item.hours}h</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between mt-2 text-secondary text-xs">
        <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [streakProtection, setStreakProtection] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userName = localStorage.getItem('userName') || 'Student';
  
  // Course browsing state
  const [courseSearch, setCourseSearch] = useState('');
  const [courseCategory, setCourseCategory] = useState('All');
  const [courseLevel, setCourseLevel] = useState('All');
  const [showCourseBrowser, setShowCourseBrowser] = useState(false);
  
  // Course details modal state
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(localStorage.getItem('quickNotes') || '');

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filtered courses for browsing in dashboard
  const browseFilteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(courseSearch.toLowerCase()) || 
                         course.category.toLowerCase().includes(courseSearch.toLowerCase()) ||
                         course.description.toLowerCase().includes(courseSearch.toLowerCase());
    const matchesCategory = courseCategory === "All" || course.category === courseCategory;
    const matchesLevel = courseLevel === "All" || course.level === courseLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Gamification State (Now initialized from dummy values, updated via API)
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);

  // Note: We no longer sync to localStorage for persistence as backend handles it.
  // We can still use it for optimistic UI updates if needed, but primary source is backend.

  const [quests, setQuests] = useState([
    { id: 1, title: "Neural Networks Quiz", course: "Advanced AI", due: "Today", date: "10", month: "JAN", rarity: 'Legendary', progress: 85, xpReward: 50, claimed: false },
    { id: 2, title: "Project Submission", course: "Web Development", due: "Tomorrow", date: "11", month: "JAN", rarity: 'Rare', progress: 40, xpReward: 30, claimed: false },
    { id: 3, title: "Peer Review", course: "Data Science", due: "Jan 12", date: "12", month: "JAN", rarity: 'Common', progress: 100, xpReward: 20, claimed: false }
  ]);

  const handleClaimXP = async (questId) => {
    // Find quest
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.claimed) return;

    try {
        const token = localStorage.getItem('token');
        // Call backend to update XP
        const response = await axios.post('http://127.0.0.1:8000/gamification/update', 
            { xp_gained: quest.xpReward },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Update local state with trusted backend data
        setLevel(response.data.level);
        setXp(response.data.xp);

        // Update local quest state
        setQuests(prev => prev.map(q => q.id === questId ? { ...q, claimed: true } : q));

        // Trigger confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: quest.rarity === 'Legendary' ? ['#eab308', '#ffffff', '#fbbf24'] : 
                    quest.rarity === 'Rare' ? ['#a855f7', '#ffffff', '#d8b4fe'] : 
                    ['#6366f1', '#ffffff', '#818cf8']
        });

    } catch (error) {
        console.error("Failed to update gamification data", error);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDashboardData(response.data);
        setDailyGoalDone(response.data.daily_goal_completed);
        
        // Init Gamification from backend
        if (response.data.level !== undefined) setLevel(response.data.level);
        if (response.data.xp !== undefined) setXp(response.data.xp);

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleNoteChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem('quickNotes', newNotes);
  };

  const [dailyGoalDone, setDailyGoalDone] = useState(localStorage.getItem('dailyGoal') === 'true');
  const [isStreakInfoOpen, setIsStreakInfoOpen] = useState(false);
  
  const notificationRef = useRef(null);
  const streakInfoRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (streakInfoRef.current && !streakInfoRef.current.contains(event.target)) {
        setIsStreakInfoOpen(false);
      }
      if (streakTooltipRef.current && !streakTooltipRef.current.contains(event.target)) {
        setIsStreakTooltipOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDailyGoal = async () => {
    // Condition: Must be enrolled in a course to streak
    const hasEnrollments = dashboardData?.enrollments?.length > 0;
    
    if (!hasEnrollments && !dailyGoalDone) {
        alert("Please enroll in a course first to start your learning streak! 📚");
        return;
    }

    if (dailyGoalDone) return; // Already done today

    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://127.0.0.1:8000/daily-goal/complete', {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        setDailyGoalDone(true);
        if (dashboardData) {
            setDashboardData(prev => ({
                ...prev,
                streak: response.data.streak,
                daily_goal_completed: true
            }));
        }
    } catch (error) {
        console.error("Failed to complete daily goal", error);
    }
  };

  /* Focus Timer Logic */
  const [focusDuration, setFocusDuration] = useState(25); // in minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      // Optional: Play a sound or show notification here
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const toggleTimer = () => setIsTimerActive(!isTimerActive);
  
  const incrementDuration = () => {
    if (!isTimerActive) {
        const newDuration = Math.min(240, focusDuration + 5); // Max 4 hours
        setFocusDuration(newDuration);
        setTimeLeft(newDuration * 60);
    }
  };

  const decrementDuration = () => {
    if (!isTimerActive) {
        const newDuration = Math.max(5, focusDuration - 5); // Min 5 mins
        setFocusDuration(newDuration);
        setTimeLeft(newDuration * 60);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Dynamic Greeting
  // Live Greeting
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };
    
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Mock Data
  // Data processing
  const stats = [
    { label: "Courses in Progress", value: dashboardData?.courses_in_progress || 0, icon: BookOpen, color: "#6366f1", bg: "rgba(99, 102, 241, 0.1)", trend: "+2 this month" },
    { label: "Completed Hours", value: `${dashboardData?.total_hours || 0}h`, icon: Clock, color: "#10b981", bg: "rgba(16, 185, 129, 0.1)", trend: "+5h this week" },
    { label: "Certificates Earned", value: dashboardData?.certificates_earned || 0, icon: Award, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)", trend: "Top 5%" },
    { label: "Average Score", value: `${dashboardData?.average_score || 0}%`, icon: TrendingUp, color: "#ec4899", bg: "rgba(236, 72, 153, 0.1)", trend: "+1.2% rise" }
  ];

  // Helper to determine if user has any courses
  const hasCourses = dashboardData?.enrollments?.length > 0;

  const achievements = [
    { title: "Fast Learner", icon: Zap, color: "#f59e0b", desc: "Completed 5 lessons in 1 hour" },
    { title: "Quiz Master", icon: Trophy, color: "#6366f1", desc: "Scored 100% on 3 quizzes" },
    { title: "Night Owl", icon: Star, color: "#ec4899", desc: "Studied after midnight" }
  ];

  const nextAchievements = [
    { title: "First Lesson", icon: Play, desc: "Complete your first lesson" },
    { title: "Perfect Score", icon: Trophy, desc: "Score 100% on a quiz" },
    { title: "7-Day Streak", icon: Flame, desc: "Study for 7 days in a row" }
  ];

  const recommendedCourses = [
    { title: "Python for Beginners", level: "Novice", image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800", duration: "10h", instructor: "Guido V." },
    { title: "Web Design Fundamentals", level: "Beginner", image: "https://images.unsplash.com/photo-1509395062549-31cd4bf24054?q=80&w=800", duration: "8h", instructor: "Alice Lee" },
    { title: "Intro to Data Science", level: "Easy", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800", duration: "12h", instructor: "Dr. Smith" }
  ];

  /* Removed mock myCourses */
  /* Removed mock upcomingTasks - Moved to quests state */

  // Pie Chart Data
  const pieData = [
    { label: "Video Lessons", value: 45, color: "#6366f1" },
    { label: "Practice Quiz", value: 25, color: "#ec4899" },
    { label: "Assignments", value: 20, color: "#10b981" },
    { label: "Reading", value: 10, color: "#f59e0b" }
  ];



  // Streak Tooltip State
  const [isStreakTooltipOpen, setIsStreakTooltipOpen] = useState(false);
  const streakTooltipRef = useRef(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'instructor', text: 'Hello! How can I help you with the Advanced AI course today?' },
  ]);

  const handleSendMessage = (e) => {
      e.preventDefault();
      if (!message.trim()) return;
      
      setChatHistory([...chatHistory, { sender: 'student', text: message }]);
      setMessage('');
      
      // Simulate instructor reply
      setTimeout(() => {
          setChatHistory(prev => [...prev, { sender: 'instructor', text: "That's a great question! Let me pull up the resources for you." }]);
      }, 1500);
  };

  // Notifications State
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notifications = [
    { id: 1, type: 'course', text: "New course available: Advanced Python", time: "2 hours ago", unread: true },
    { id: 2, type: 'assignment', text: "Assignment due: Neural Networks", time: "5 hours ago", unread: true },
    { id: 3, type: 'message', text: "Instructor Sarah replied to you", time: "1 day ago", unread: false },
    { id: 4, type: 'system', text: "Welcome to LearnFlow!", time: "2 days ago", unread: false },
  ];



  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
      
      <main className="dashboard-main">
        {/* Unified Header & Rewards Pane */}
        <div className="d-flex align-items-end justify-content-between w-100 mb-5 gap-4" style={{marginTop: '-40px'}}>
            
            {/* Greeting Section (Left) */}
            <div className="flex-shrink-0">
                <h2 className="m-0 fw-bold text-secondary display-6">{greeting},</h2>
                <h2 className="m-0 fw-bold fs-3">{userName}! 👋</h2>
                <p className="text-secondary m-0 mt-2 fs-6">Let's learn something new today.</p>
            </div>

            {/* Unified Glass Pane (Right) - Rewards + Controls */}
            <div className="flex-grow-1 py-2 pe-2 ps-5 mb-4 rounded-4 glass-card border border-primary border-opacity-10 position-relative d-flex align-items-center justify-content-between gap-3" style={{background: 'linear-gradient(90deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.6) 100%)', minHeight: '80px', marginLeft: '25rem'}}>
                {/* Decorative background glow */}
                <div className="position-absolute" style={{top: '-50%', left: '10%', width: '200px', height: '200px', background: '#eab308', filter: 'blur(100px)', opacity: 0.05}}></div>
                <div className="position-absolute" style={{bottom: '-50%', right: '10%', width: '200px', height: '200px', background: '#ef4444', filter: 'blur(100px)', opacity: 0.05}}></div>

                <div className="d-flex align-items-center w-100 divide-x divide-white divide-opacity-10">
                    


                    {/* Streak Section */}
                    <div className="d-flex flex-column pe-3 border-end border-secondary border-opacity-25" style={{minWidth: '180px'}}>
                        <div className="d-flex align-items-center gap-3 mb-1">
                            <div className="p-1 rounded-circle bg-danger bg-opacity-10">
                                <Flame size={18} className="text-danger fill-danger animate-pulse" />
                            </div>
                            <div className="flex-grow-1">
                                <div className="d-flex align-items-center gap-2 position-relative" ref={streakTooltipRef}>
                                    <span className="text-secondary" style={{fontSize: '0.8rem'}}>Streak count</span>
                                    <Info 
                                        size={12} 
                                        className="text-secondary opacity-50 cursor-pointer hover-opacity-100" 
                                        onClick={() => setIsStreakTooltipOpen(!isStreakTooltipOpen)}
                                    />
                                    
                                    <AnimatePresence>
                                        {isStreakTooltipOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: 5 }}
                                                className="position-absolute bg-white text-dark p-3 rounded-1 shadow-lg"
                                                style={{
                                                    top: '100%',
                                                    left: '0',
                                                    width: '240px',
                                                    zIndex: 1000,
                                                    marginTop: '10px',
                                                    border: '1px solid #ddd',
                                                    fontSize: '12px',
                                                    lineHeight: '1.4'
                                                }}
                                            >
                                                {/* Tooltip arrow */}
                                                <div className="position-absolute" style={{
                                                    top: '-6px',
                                                    left: '42px',
                                                    width: '10px',
                                                    height: '10px',
                                                    background: 'white',
                                                    transform: 'rotate(45deg)',
                                                    borderLeft: '1px solid #ddd',
                                                    borderTop: '1px solid #ddd'
                                                }}></div>
                                                The number of days in a row you've completed the daily set. Keep the streak going to earn bonus points.
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <h2 className="m-0 fw-bold lh-1" style={{fontSize: '1.2rem', color: '#fff'}}>{dashboardData?.streak || 0}</h2>
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 ps-4 ms-2">
                            <div className="form-check form-switch cursor-pointer" style={{minHeight: 'auto'}}>
                                <input 
                                    className="form-check-input bg-secondary border-0 cursor-pointer" 
                                    type="checkbox" 
                                    role="switch" 
                                    id="streakProtection" 
                                    style={{width: '2em', height: '1em', marginTop: '0.15em'}}
                                    checked={streakProtection}
                                    onChange={(e) => setStreakProtection(e.target.checked)}
                                />
                                <label className="form-check-label text-secondary cursor-pointer" htmlFor="streakProtection" style={{fontSize: '0.75rem'}}>Streak protection</label>
                            </div>
                            <span className={`badge ${streakProtection ? 'bg-success text-white' : 'bg-secondary bg-opacity-25 text-secondary'}`} style={{fontSize: '8px', padding: '0.25em 0.4em'}}>
                                {streakProtection ? 'ON' : 'OFF'}
                            </span>
                        </div>
                    </div>

                    {/* Controls Section (Search, Notification, Profile) - Integrated */}
                    <div className="d-flex align-items-center gap-3 px-3 flex-grow-1 justify-content-end">
                         
                         {/* Search Bar */}
                         <div className="search-bar d-none d-md-flex py-1 px-2 position-relative" style={{background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
                            <Search size={14} color="var(--text-secondary)" />
                            <input 
                                type="text" 
                                placeholder="Search courses..." 
                                className="text-white" 
                                style={{fontSize: '0.8rem'}} 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery === '' && (
                                <div className="position-absolute start-0 w-100 text-secondary" style={{top: '100%', fontSize: '10px', paddingTop: '4px', whiteSpace: 'nowrap'}}>
                                    Hints: <span className="text-primary cursor-pointer hover-opacity-100" onClick={() => setSearchQuery('Python')}>Python</span>, 
                                    <span className="text-primary ms-1 cursor-pointer hover-opacity-100" onClick={() => setSearchQuery('AI')}>AI</span>, 
                                    <span className="text-primary ms-1 cursor-pointer hover-opacity-100" onClick={() => setSearchQuery('Web')}>Web</span>
                                </div>
                            )}
                        </div>
                        
                        {/* Notifications */}
                        <div className="position-relative" ref={notificationRef}>
                            <button 
                                className="notification-btn p-1 rounded-circle hover-bg"
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            >
                                <Bell size={20} />
                                <div className="notification-badge" style={{top: '2px', right: '2px', width: '6px', height: '6px'}}></div>
                            </button>

                            <AnimatePresence>
                                {isNotificationsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="notification-dropdown glass-card p-0"
                                    style={{right: 0, left: 'auto'}} // Align right since it's on the right side now
                                >
                                    <div className="p-3 border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                                    <h6 className="m-0 fw-bold text-white">Notifications</h6>
                                    <span className="text-primary text-xs cursor-pointer">Mark all as read</span>
                                    </div>
                                    <div className="notification-list" style={{maxHeight: '300px', overflowY: 'auto'}}>
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className={`p-3 border-bottom border-secondary border-opacity-10 hover-bg transition ${notif.unread ? 'bg-primary bg-opacity-10' : ''}`}>
                                        <div className="d-flex gap-3">
                                            <div className="rounded-circle bg-secondary bg-opacity-20 p-2 d-flex align-items-center justify-content-center" style={{width: '36px', height: '36px'}}>
                                            {notif.type === 'message' ? <MessageCircle size={16} /> : 
                                            notif.type === 'assignment' ? <Clock size={16} /> : 
                                            notif.type === 'course' ? <BookOpen size={16} /> : <Bell size={16} />}
                                            </div>
                                            <div>
                                            <p className="m-0 text-white lh-sm mb-1" style={{fontSize: '12px'}}>{notif.text}</p>
                                            <p className="m-0 text-secondary" style={{fontSize: '10px'}}>{notif.time}</p>
                                            </div>
                                            {notif.unread && <div className="ms-auto bg-primary rounded-circle" style={{width: '8px', height: '8px', marginTop: '6px'}}></div>}
                                        </div>
                                        </div>
                                    ))}
                                    </div>
                                    <div className="p-2 text-center border-top border-secondary border-opacity-25">
                                    <button className="btn btn-link text-decoration-none text-sm text-secondary p-0">View Previous Notifications</button>
                                    </div>
                                </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        {/* Profile */}
                        <div className="user-profile d-flex align-items-center gap-2">
                            <div className="d-none d-md-block text-end">
                                <p className="m-0 fw-bold text-xs">{userName}</p>
                                <div className="d-flex align-items-center justify-content-end gap-1 mt-0">
                                    <span className="text-secondary fw-bold" style={{fontSize: '8px', letterSpacing: '0.5px'}}>PLAYER LVL {level}</span>
                                    <div className="bg-secondary bg-opacity-25 rounded-pill" style={{width: '50px', height: '3px'}}>
                                        <div className="bg-success rounded-pill" style={{width: `${xp}%`, height: '100%', transition: 'width 0.3s ease'}}></div>
                                    </div>
                                </div>
                            </div>
                            <img 
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" 
                                alt="Profile" 
                                className="user-avatar rounded-circle"
                                style={{width: '32px', height: '32px', objectFit: 'cover'}} 
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <motion.div
          className="container-fluid p-0"
        >
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card position-relative overflow-hidden">
                <div className="stat-icon" style={{ color: stat.color }}>
                  <stat.icon size={20} />
                </div>
                
                <div>
                  <h3 className="stat-value mb-1">{stat.value}</h3>
                  <p className="stat-label mb-2">{stat.label}</p>
                  <div className="d-flex align-items-center gap-1 text-xs" style={{color: stat.color, fontSize: '0.75rem'}}>
                     <ArrowUpRight size={12} />
                     <span className="fw-medium">{stat.trend}</span>
                  </div>
                </div>

                {/* Decorative background blur */}
                <div 
                  className="position-absolute" 
                  style={{
                    top: '-20%', 
                    right: '-20%', 
                    width: '120px', 
                    height: '120px', 
                    background: stat.color, 
                    filter: 'blur(60px)', 
                    opacity: 0.1,
                    pointerEvents: 'none'
                  }}
                ></div>
              </div>
            ))}
          </div>

          <div className="row g-4">
            {/* Left Column: Continue Learning & Courses */}
            <div className="col-lg-8">
              {/* Continue Learning Hero - Conditional */}
              {hasCourses ? (
                (() => {
                  // Get the most active course (or just the first one for now)
                  const location = useLocation();
                  const openCourseId = location.state?.openCourse;
                  
                  let activeCourse = dashboardData.enrollments[0];
                  if (openCourseId) {
                      const found = dashboardData.enrollments.find(e => e.course_id === Number(openCourseId));
                      if (found) activeCourse = found;
                  }
                  // Mock a "last lesson" based on progress - in real app this comes from backend
                  const lastLesson = "Chapter 3: Core Concepts"; 
                  
                  return (
                    <div className="glass-card continue-learning">
                      <div className="continue-content">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <span className="badge bg-warning text-dark">Welcome Back</span>
                            <span className="text-secondary text-xs">Pick up where you left off</span>
                        </div>
                        <h2 className="mb-2 text-truncate" style={{maxWidth: '90%'}}>Continue from exactly where you stopped</h2>
                        <p className="text-secondary mb-4">{activeCourse.course.title} • {activeCourse.last_lesson || "Chapter 3: Core Concepts"}</p>
                        
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <span className="text-2xl font-bold">{activeCourse.progress}%</span>
                          <span className="text-secondary text-sm">Completed</span>
                        </div>
                        
                        <div className="progress-bar-container">
                          <div className="progress-bar-fill" style={{width: `${activeCourse.progress}%`}}></div>
                        </div>

                        <button className="btn btn-primary mt-4 d-flex align-items-center gap-2">
                          <Play size={18} fill="white" /> Resume Lesson
                        </button>
                      </div>
                      <img 
                        src={activeCourse.course.image} 
                        onError={(e) => e.target.src = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800"}
                        alt={activeCourse.course.title} 
                        className="continue-image" 
                      />
                    </div>
                  );
                })()
              ) : (
                <div className="mb-5 mt-5">
                    <h3 className="fw-bold mb-4">Recommended Starter Courses</h3>
                     
                     <div className="row g-4">
                        {recommendedCourses.map((course, idx) => (
                          <div key={idx} className="col-12 col-md-4">
                            <div className="glass-card h-100 p-0 overflow-hidden d-flex flex-column">
                              <div style={{height: '140px', overflow: 'hidden'}}>
                                <img src={course.image} alt={course.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                              </div>
                              <div className="p-3 flex-grow-1">
                                <span className="badge bg-primary bg-opacity-10 text-primary mb-2" style={{fontSize: '10px'}}>{course.level}</span>
                                <h6 className="fw-bold mb-1 text-white">{course.title}</h6>
                                <p className="text-secondary mb-3" style={{fontSize: '11px'}}>{course.instructor} • {course.duration}</p>
                                <button 
                                  className="btn btn-primary btn-sm w-100" 
                                  style={{fontSize: '11px'}}
                                  onClick={() => {
                                    setSelectedCourse(course);
                                    setShowCourseModal(true);
                                  }}
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                     </div>
                </div>
              )}

              {/* Focus Timer Widget */}
              <div className="d-flex justify-content-start w-100 mb-4" style={{marginTop: '4.5rem'}}>
                <div className="p-4" style={{ 
                    background: '#202020', 
                    border: '1px solid #353535', 
                    borderRadius: '8px',
                    width: '100%',
                    minHeight: '400px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                }}>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="fw-bold text-white fs-5">Focus session</span>
                        <button className="btn btn-link text-white p-0 opacity-50 hover-opacity-100">
                             <ArrowUpRight size={16} />
                        </button>
                    </div>

                    {!isTimerActive ? (
                        /* SETUP VIEW */
                        <>
                            <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
                                <h4 className="fw-bold m-0 text-white mb-3" style={{fontSize: '1.1rem'}}>Get ready to focus</h4>
                                <p className="text-secondary mb-4" style={{fontSize: '0.8rem', lineHeight: '1.4'}}>
                                    We'll turn off notifications and app alerts during each session. For longer sessions, we'll add a short break.
                                </p>

                                <div className="d-flex justify-content-center align-items-center mb-4">
                                    <div className="d-flex align-items-center bg-dark rounded-3 border border-secondary border-opacity-10 overflow-hidden" style={{height: '110px', background: '#2d2d2d'}}>
                                        <div className="px-4 py-2 border-end border-secondary border-opacity-10 d-flex flex-column align-items-center justify-content-center" style={{width: '140px', height: '100%', background: '#272727'}}>
                                            <span className="fw-bold text-white lh-1" style={{fontSize: '3.5rem'}}>{focusDuration}</span>
                                            <span className="d-block text-secondary mt-1" style={{fontSize: '0.75rem'}}>mins</span>
                                        </div>
                                        <div className="d-flex flex-column h-100">
                                            <button onClick={incrementDuration} className="btn btn-link text-white p-0 border-bottom border-secondary border-opacity-10 hover-bg-light-opacity d-flex align-items-center justify-content-center" style={{borderRadius: 0, height: '50%', width: '40px', background: '#2d2d2d'}}>
                                                <ArrowUpRight size={14} style={{transform: 'rotate(-45deg)'}} />
                                            </button>
                                            <button onClick={decrementDuration} className="btn btn-link text-white p-0 hover-bg-light-opacity d-flex align-items-center justify-content-center" style={{borderRadius: 0, height: '50%', width: '40px', background: '#2d2d2d'}}>
                                                <ArrowUpRight size={14} style={{transform: 'rotate(135deg)'}} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-center mb-4">
                                    <div className="form-check d-inline-block">
                                        <input className="form-check-input bg-dark border-secondary" type="checkbox" id="skipBreaks" style={{borderColor: '#404040'}} />
                                        <label className="form-check-label text-secondary" htmlFor="skipBreaks" style={{fontSize: '0.8rem'}}>Skip breaks</label>
                                    </div>
                                </div>
                            </div>

                            <button onClick={toggleTimer} className="btn w-100 py-2 fw-bold text-dark d-flex align-items-center justify-content-center gap-2 transition" style={{background: '#eab308', border: 'none', borderRadius: '6px', fontSize: '0.9rem', height: '40px'}}>
                                <Play size={14} fill="currentcolor" /> Start focus session
                            </button>
                        </>
                    ) : (
                        /* ACTIVE VIEW */
                        <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center position-relative">
                             {/* SVG Timer Ring */}
                             <div className="position-relative d-flex align-items-center justify-content-center" style={{width: '240px', height: '240px'}}>
                                <svg width="240" height="240" viewBox="0 0 240 240" style={{transform: 'rotate(-90deg)'}}>
                                    {/* Background Track */}
                                    <circle cx="120" cy="120" r="105" fill="none" stroke="#2d2d2d" strokeWidth="16" />
                                    {/* Progress Fill (Solid) */}
                                    <circle 
                                        cx="120" 
                                        cy="120" 
                                        r="105" 
                                        fill="none" 
                                        stroke="#eab308" 
                                        strokeWidth="16" 
                                        strokeLinecap="round"
                                        strokeDasharray="660" // 2 * PI * 105 ≈ 659.7
                                        strokeDashoffset={660 * (timeLeft / (focusDuration * 60))} // Starts full (or empty)? User said "filling in... as time keeps going"
                                        // Wait, "filling in as time keeps going" -> Starts empty, becomes yellow?
                                        // timeLeft starts at MAX.
                                        // If we want it to FILL as time passes:
                                        // Start (timeLeft=Max): We want 0 yellow. Offset should be 660.
                                        // End (timeLeft=0): We want Full yellow. Offset should be 0.
                                        // correct formula: 660 * (timeLeft / total) -> At max time, result is 660 (invisible). At 0 time, result is 0 (full).
                                        // Yes, this visually "unfills" the gap, effectively "filling" the circle if the background is dark.
                                        // Wait, if strokeDashoffset=660 and array=660, the line is fully hidden? Yes.
                                        // So as timeLeft decreases, offset decreases, line appears?
                                        // Let's trace:
                                        // TimeLeft=Max -> Offset=660 -> Circle Hidden (0% yellow).
                                        // TimeLeft=0 -> Offset=0 -> Circle Visible (100% yellow).
                                        // This "Fills" the circle yellow as time counts down. Correct.
                                    />
                                </svg>
                                <div className="position-absolute text-center">
                                    <span className="d-block text-white fw-bold" style={{fontSize: '3.5rem', lineHeight: '1'}}>{Math.ceil(timeLeft / 60)}</span>
                                    <span className="text-secondary" style={{fontSize: '1rem'}}>min</span>
                                </div>
                             </div>

                             <div className="d-flex align-items-center gap-3 mt-4">
                                 <button onClick={toggleTimer} className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px', background: '#333', border: 'none'}}>
                                     <div style={{width: '14px', height: '14px', background: 'white', borderRadius: '2px'}}></div>
                                 </button>
                                 <button className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px', background: '#333', border: 'none'}}>
                                     <MoreHorizontal size={20} color="white" />
                                 </button>
                             </div>
                        </div>
                    )}
                </div>
              </div>

              {/* Quick Notes Widget */}
              <div className="glass-card p-4 mb-4">
                 <div className="d-flex align-items-center gap-2 mb-3">
                    <PenTool size={20} className="text-warning"/>
                    <h4 className="fw-bold m-0">Quick Notes</h4>
                 </div>
                 <textarea 
                    className="form-control bg-transparent text-white border-secondary" 
                    rows="4"
                    placeholder="Jot down your thoughts, goals, or reminders here..."
                    value={notes}
                    onChange={handleNoteChange}
                    style={{resize: 'none', background: 'rgba(255,255,255,0.05)'}}
                 ></textarea>
              </div>

              {/* Learning Activity Pie Chart */}
              <div className="glass-card p-4 mb-4">
                <h4 className="fw-bold mb-2">Learning Activity</h4>
                <PieChart data={pieData} />
              </div>

              {/* My Courses Section */}
              {hasCourses && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold m-0">Enrolled Courses</h3>
                    <button className="btn text-primary p-0">See All</button>
                  </div>

                  <div className="row g-4 mb-5">
                    {dashboardData.enrollments.slice(0, 2).map((enrollment) => (
                      <div key={enrollment.id} className="col-12 col-md-6">
                        <div className='level overflow-hidden h-100' style={{background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)'}}>
                            <div className='p-3 pb-0 pt-2'>
                                <p className='done new mb-2' style={{ margin: "0", fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>{enrollment.course.title}</p>
                            </div>
                            <div className='course-image-container mb-2 mx-3 mt-2' style={{ height: '140px', position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
                                <img 
                                    src={enrollment.course.image} 
                                    alt={enrollment.course.title} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800"}
                                />
                                <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                                    <span className='text-white border-0 rounded-pill px-2 py-1' style={{ background: "rgba(5, 27, 72, 0.8)", fontSize: "10px" }}>{enrollment.course.level}</span>
                                </div>
                            </div>
                            <div className='p-3 pt-1'>
                                <p className='orm mb-2 text-truncate-3' style={{ fontSize: '0.8rem', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>Master the core concepts of this course.</p>
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <span className="text-secondary text-xs">{enrollment.progress}% Complete</span>
                                </div>
                                <div className="w-100 bg-white bg-opacity-10 rounded-pill" style={{height: '4px'}}>
                                    <div className="bg-primary rounded-pill h-100" style={{width: `${enrollment.progress}%`}}></div>
                                </div>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right Column: Schedule & Activity */}
            <div className="col-lg-4">
              
              {/* Daily Goal Widget */}
              <div className="glass-card p-3 mb-3 mt-5 position-relative">
                 <div className="d-flex align-items-center justify-content-between mb-2 position-relative">
                    <div className="d-flex align-items-center gap-2">
                        <h5 className="fw-bold m-0">Daily Goal 🎯</h5>
                        <div className="position-relative" ref={streakInfoRef}>
                            <Info 
                                size={16} 
                                className="text-secondary opacity-75 cursor-pointer hover-text-primary transition" 
                                onClick={() => setIsStreakInfoOpen(!isStreakInfoOpen)}
                            />
                            
                            <AnimatePresence>
                                {isStreakInfoOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                        className="glass-card position-absolute p-3"
                                        style={{
                                            top: '100%',
                                            left: '0',
                                            width: '220px',
                                            zIndex: 100,
                                            marginTop: '10px',
                                            background: 'rgba(15, 23, 42, 0.95)',
                                            border: '1px solid var(--glass-border)'
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h6 className="m-0 fw-bold text-white" style={{fontSize: '12px'}}>Streak Rules 🔥</h6>
                                            <X size={14} className="cursor-pointer text-secondary" onClick={() => setIsStreakInfoOpen(false)} />
                                        </div>
                                        <ul className="m-0 ps-3 text-secondary d-flex flex-column gap-1" style={{fontSize: '11px'}}> 
                                            <li>Must be enrolled in <span className="text-white">1+ course</span>.</li>
                                            <li>Complete the <span className="text-white">Daily Goal</span> activity.</li>
                                            <li>Check-in <span className="text-white">every day</span>.</li>
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <span className="badge bg-success bg-opacity-10 text-success">
                      {dailyGoalDone ? 'Completed' : 'Pending'}
                    </span>
                 </div>
                 
                 <div 
                    className={`mt-3 p-2 rounded-3 transition d-flex align-items-center gap-2 ${dailyGoalDone ? 'bg-success bg-opacity-20 border-success' : 'glass-card hover-bg cursor-pointer'}`}
                    onClick={() => !dailyGoalDone && handleDailyGoal()}
                    style={{border: dailyGoalDone ? '1px solid var(--bs-success)' : '1px solid transparent'}}
                 >
                    <div className={`rounded-circle d-flex align-items-center justify-content-center transition ${dailyGoalDone ? 'bg-success text-white' : 'bg-secondary bg-opacity-25 text-secondary'}`} style={{width: 32, height: 32}}>
                       {dailyGoalDone ? <CheckCircle size={18} /> : <Circle size={18} />}
                    </div>
                    <div>
                        <h6 className={`m-0 fw-bold transition ${dailyGoalDone ? 'text-success text-decoration-line-through' : 'text-white'}`}>15m Learning Session</h6>
                        <p className="m-0 text-xs text-secondary">Keep your streak alive!</p>
                    </div>
                 </div>
                 
                 {dailyGoalDone && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 rounded-3" style={{pointerEvents: 'none', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)'}}></div>
                 )}
              </div>

              <div className="glass-card p-3 mb-3" style={{marginTop: '4.5rem'}}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold m-0">Quest Board ⚔️</h5>
                    <span className="text-secondary text-xs">Active Challenges</span>
                </div>
                <div className="quest-board" style={{gap: '1rem'}}>
                  {quests.filter(q => !q.claimed).map((quest) => (
                    <motion.div 
                        key={quest.id} 
                        layout
                        className={`quest-card quest-rarity-${quest.rarity.toLowerCase()}`}
                    >
                      {quest.rarity === 'Legendary' && <div className="legendary-border-flow" />}
                      
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                           <span className={`badge mb-2 bg-opacity-10 text-${quest.rarity === 'Legendary' ? 'warning' : quest.rarity === 'Rare' ? 'purple' : 'primary'} bg-${quest.rarity === 'Legendary' ? 'warning' : quest.rarity === 'Rare' ? 'purple' : 'primary'}`} style={{ fontSize: '10px' }}>
                              {quest.rarity}
                           </span>
                           <h6 className="m-0 fw-bold text-white">{quest.title}</h6>
                           <p className="m-0 text-secondary" style={{ fontSize: '11px' }}>{quest.course}</p>
                        </div>
                        <div className="text-end">
                           <span className="d-block text-white fw-bold" style={{ fontSize: '12px' }}>{quest.xpReward} XP</span>
                           <span className="text-secondary" style={{ fontSize: '10px' }}>{quest.due}</span>
                        </div>
                      </div>

                      <div className="quest-progress-container">
                        <div 
                           className="quest-progress-fill" 
                           style={{ 
                             width: `${quest.progress}%`,
                             background: quest.rarity === 'Legendary' ? '#eab308' : quest.rarity === 'Rare' ? '#a855f7' : '#6366f1'
                           }}
                        />
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-secondary" style={{ fontSize: '11px' }}>Progress: {quest.progress}%</span>
                        <button 
                           className="claim-xp-btn"
                           onClick={() => handleClaimXP(quest.id)}
                           disabled={quest.progress < 100}
                        >
                           {quest.progress >= 100 ? 'Claim Reward' : 'In Progress...'}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {quests.every(q => q.claimed) && (
                    <div className="text-center py-4">
                        <p className="text-secondary text-sm m-0">All quests completed! Check back later.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="glass-card p-4 text-center">
                <h4 className="fw-bold mb-3">Weekly Progress</h4>
                <div className="d-flex justify-content-center align-items-end gap-3 mt-4" style={{height: '150px'}}>
                   {[40, 70, 30, 85, 50, 60, 90].map((h, i) => (
                      <div key={i} className="d-flex flex-column align-items-center gap-2">
                        <div 
                          className="rounded-t-lg bg-primary opacity-75 hover-opacity-100 transition" 
                          style={{
                            width: '8px', 
                            height: `${h}%`, 
                            background: i === 6 ? 'var(--secondary-color)' : 'var(--primary-color)'
                          }}
                        ></div>
                        <span className="text-secondary" style={{fontSize: '10px'}}>{['M','T','W','T','F','S','S'][i]}</span>
                      </div>
                   ))}
                </div>
                <p className="text-sm text-secondary mt-3">You spent <span className="text-white fw-bold">32 hours</span> learning this week.</p>
              </div>


              {/* Achievements */}
               <div className="glass-card p-4 mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="fw-bold m-0">Achievements</h4>
                    <span className="text-primary text-sm cursor-pointer">View All</span>
                </div>
                <div className="d-flex flex-column gap-3">
                    {achievements.map((item, index) => (
                        <div key={index} className="d-flex align-items-center gap-3 p-2 rounded-3 hover-bg transition">
                            <div className="p-2 rounded-circle" style={{ background: `${item.color}20` }}>
                                <item.icon size={20} color={item.color} />
                            </div>
                            <div>
                                <h6 className="m-0 fw-bold text-sm">{item.title}</h6>
                                <p className="m-0 text-secondary text-xs">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="col-lg-12">
               <LearningHeatmap />
            </div>
          </div>
        </>
      )}

          {activeTab === 'courses' && (
            <div className="py-4">
              {!showCourseBrowser && (
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div>
                    <h2 className="fw-bold text-white mb-1">My Enrolled Courses</h2>
                    <p className="text-secondary m-0">Continue where you left off and master your skills.</p>
                  </div>
                  <div className="d-flex gap-2">
                     <div className="glass-card px-3 py-2 d-flex align-items-center gap-2">
                        <span className="text-secondary text-xs">Total Progress</span>
                        <span className="text-white fw-bold">64%</span>
                     </div>
                  </div>
                </div>
              )}

              <div className="row g-4">
                {hasCourses && !showCourseBrowser ? (
                  dashboardData.enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="col-12 col-md-6 col-lg-4">
                       <div className='level overflow-hidden h-100' style={{background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)'}}>
                            <div className='p-3 pb-0 pt-2'>
                                <p className='done new mb-2' style={{ margin: "0", fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>{enrollment.course.title}</p>
                            </div>
                            <div className='course-image-container mb-2 mx-3 mt-2' style={{ height: '160px', position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
                                <img 
                                    src={enrollment.course.image} 
                                    alt={enrollment.course.title} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800"}
                                />
                                <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                                    <span className='text-white border-0 rounded-pill px-2 py-1' style={{ background: "rgba(5, 27, 72, 0.8)", fontSize: "10px" }}>{enrollment.course.category || "Course"}</span>
                                    <span className='ms-2 text-white border-0 rounded-pill px-2 py-1' style={{ background: "rgba(5, 27, 72, 0.8)", fontSize: "10px" }}>{enrollment.course.level}</span>
                                </div>
                            </div>
                            <div className='p-3 pt-1'>
                                <p className='orm mb-2 text-truncate-3' style={{ fontSize: '0.85rem', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{enrollment.course.description || "Master the core concepts and gain practical skills in this comprehensive course."}</p>
                                <p className='orm mb-3' style={{ fontSize: '0.8rem', opacity: 0.8 }}>{enrollment.course.instructor} • {enrollment.progress}% Complete</p>
                                
                                <div className="w-100 bg-white bg-opacity-10 rounded-pill mb-4" style={{height: '6px'}}>
                                    <div className="bg-primary rounded-pill h-100" style={{width: `${enrollment.progress}%`, transition: 'width 1s ease'}}></div>
                                </div>

                                <div className='d-flex gap-2'>
                                    <button className='flex-grow-1 text-white border-0 rounded-3 btn text-decoration-none text-center pt-2 py-1' style={{ background: "#051B48", fontSize: "12px", border: '1px solid rgba(255,255,255,0.1)' }}>Go to Course</button>
                                    <button className='flex-grow-1 text-white border-0 rounded-3 btn py-1' style={{ background: "#8662FF", fontSize: "12px" }}>Dashboard</button>
                                </div>
                            </div>
                        </div>
                    </div>
                  ))
                ) : (
                  showCourseBrowser ? (
                    // Course Browser UI
                    <div className="py-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h2 className="fw-bold text-white mb-1">Explore Our Curriculum</h2>
                          <p className="text-secondary m-0">Standardized courses taught by industry experts.</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => setShowCourseBrowser(false)}>
                          ← Back to My Courses
                        </button>
                      </div>

                      {/* Search and Filters */}
                      <div className="row mb-4 g-3">
                        <div className="col-md-4">
                          <input
                            className="w-100 ps-3 rounded-3 py-2"
                            placeholder="Search course..."
                            value={courseSearch}
                            onChange={(e) => setCourseSearch(e.target.value)}
                            style={{backgroundColor:"#060C19", color:"white", border: '1px solid rgba(255,255,255,0.1)'}}
                          />
                          <div className="mt-2 text-secondary" style={{fontSize: '0.8rem'}}>
                            Popular: <span className="text-primary cursor-pointer" onClick={() => setCourseSearch('AI')}>AI</span>, 
                            <span className="text-primary ms-2 cursor-pointer" onClick={() => setCourseSearch('Python')}>Python</span>, 
                            <span className="text-primary ms-2 cursor-pointer" onClick={() => setCourseSearch('Design')}>Design</span>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <select
                            className="w-100 border-1 ps-3 rounded-3 py-2"
                            value={courseCategory}
                            onChange={(e) => setCourseCategory(e.target.value)}
                            style={{backgroundColor:"#060C19", color:"white", border: '1px solid rgba(255,255,255,0.1)'}}
                          >
                            <option value="All">All Categories</option>
                            <option value="Data">Data</option>
                            <option value="Web">Web</option>
                            <option value="Design">Design</option>
                            <option value="Software">Software</option>
                            <option value="Finance">Finance</option>
                            <option value="Self Improvement">Self Improvement</option>
                          </select>
                        </div>

                        <div className="col-md-4">
                          <select
                            className="w-100 border-1 ps-3 rounded-3 py-2"
                            value={courseLevel}
                            onChange={(e) => setCourseLevel(e.target.value)}
                            style={{backgroundColor:"#060C19", color:"white", border: '1px solid rgba(255,255,255,0.1)', height:"40px"}}
                          >
                            <option value="All">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      {/* Course Grid */}
                      <div className="row g-4">
                        {browseFilteredCourses.map((course) => (
                          <div key={course.id} className="col-12 col-md-6 col-lg-4">
                            <div className='level overflow-hidden h-100' style={{background: '#030E24', border: '1px solid rgba(255,255,255,0.1)'}}>
                              <img 
                                src={course.image} 
                                alt={course.title}
                                className='mx-auto d-block pt-3 border-0 rounded-4'
                                style={{ height: '200px', objectFit: 'cover', width: "320px" }}
                              />
                              <h5 className='card-title ps-4 pt-3 done new'>{course.title}</h5>
                              <p className='orm ps-4 pt-2'>{course.instructor.name}</p>
                              <p className='done ms-4'>
                                Price:
                                <strong className='done' style={{ paddingLeft: "150px" }}>${course.price}</strong>
                              </p>
                              <div className='orm d-flex justify-content-between mx-auto mt-3' style={{ width: "310px" }}>
                                <span className='border-0 rounded-4 py-1 px-2' style={{ backgroundColor: "#051B48" }}>{course.category}</span>
                                <span className='border-0 rounded-4 py-1 px-2' style={{ backgroundColor: "#051B48" }}>{course.level}</span>
                              </div>
                              <div className='d-flex justify-content-between mt-4 mx-auto' style={{ width: "300px", paddingBottom: "20px" }}>
                                <Link to={`/courses/${course.id}`} className='text-decoration-none text-white py-1 px-2 border-0 rounded-3' style={{ backgroundColor: "#051B48" }}>Preview</Link>
                                <button 
                                  onClick={async () => {
                                    const token = localStorage.getItem('token');
                                    if (token) {
                                      try {
                                        await axios.post(`http://127.0.0.1:8000/enroll/${course.id}`, {}, {
                                          headers: { Authorization: `Bearer ${token}` }
                                        });
                                        // Refresh dashboard data
                                        const response = await axios.get('http://127.0.0.1:8000/dashboard', {
                                          headers: { Authorization: `Bearer ${token}` }
                                        });
                                        setDashboardData(response.data);
                                        setShowCourseBrowser(false);
                                        setActiveTab('courses');
                                      } catch (error) {
                                        console.error("Enrollment failed", error);
                                      }
                                    }
                                  }}
                                  className='text-decoration-none text-white py-1 px-2 border-0 rounded-3' 
                                  style={{ backgroundColor: "#0d6efd", cursor: "pointer" }}
                                >
                                  Enroll
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Empty State
                    <div className="col-12 text-center py-5">
                      <BookOpen size={48} className="text-secondary opacity-20 mb-3" />
                      <h4 className="text-secondary">You haven't enrolled in any courses yet.</h4>
                      <button className="btn btn-primary mt-3" onClick={() => setShowCourseBrowser(true)}>
                        Explore Courses
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="d-flex flex-column align-items-center justify-content-center py-5 h-100">
               <div className="glass-card p-5 text-center position-relative overflow-hidden" style={{maxWidth: '500px'}}>
                  {/* Decorative Elements */}
                  <div className="position-absolute top-0 start-50 translate-middle" style={{width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0}}></div>
                  <div className="position-absolute bottom-0 end-0 p-4 opacity-10"><Calendar size={120} /></div>
                  
                  <div className="position-relative" style={{zIndex: 1}}>
                      <div className="mb-4 d-inline-block p-4 rounded-circle bg-dark bg-opacity-50 border border-secondary border-opacity-25">
                          <Calendar size={48} className="text-info" />
                      </div>
                      <h3 className="fw-bold text-white mb-2">No Schedule Yet</h3>
                      <p className="text-secondary mb-4">Your calendar is wide open! It's the perfect time to plan ahead and stay on top of your learning goals.</p>
                      
                      <button className="btn btn-primary d-inline-flex align-items-center gap-2 px-4 py-2 hover-scale transition">
                          <Plus size={18} />
                          <span>Add Study Session</span>
                      </button>
                  </div>
               </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* Chat Widget */}
      <div className="chat-widget-container">
        {!isChatOpen && (
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsChatOpen(true)}
                className="chat-fab"
            >
                <MessageCircle size={28} />
            </motion.button>
        )}

        <AnimatePresence>
            {isChatOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className="chat-window glass-card"
                >
                    <div className="chat-header">
                        <div className="d-flex align-items-center gap-2">
                            <div className="position-relative">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" alt="Instructor" className="rounded-circle" style={{width: 32, height: 32}} />
                                <span className="position-absolute bottom-0 end-0 bg-success rounded-circle" style={{width: 8, height: 8, border: '1px solid black'}}></span>
                            </div>
                            <div>
                                <h6 className="m-0 fw-bold">Sarah Connor</h6>
                                <p className="m-0 text-xs text-secondary" style={{fontSize: '10px'}}>Instructor • Online</p>
                            </div>
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="btn btn-sm text-secondary p-0"><X size={18}/></button>
                    </div>

                    <div className="chat-body">
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`d-flex mb-2 ${msg.sender === 'student' ? 'justify-content-end' : ''}`}>
                                <div className={`p-2 rounded-3 ${msg.sender === 'student' ? 'bg-primary text-white' : 'bg-white bg-opacity-10 text-secondary'}`} style={{maxWidth: '80%', fontSize: '0.85rem'}}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSendMessage} className="chat-footer">
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="form-control bg-transparent border-0 text-white text-sm"
                            style={{boxShadow: 'none'}}
                        />
                        <button type="submit" className="btn btn-sm btn-primary rounded-circle p-2 d-flex align-items-center justify-content-center">
                            <Send size={14} />
                        </button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Course Details Modal */}
      <AnimatePresence>
        {showCourseModal && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ zIndex: 2000, background: 'rgba(0,0,0,0.8)' }}
            onClick={() => setShowCourseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card p-4 position-relative"
              style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="btn btn-link position-absolute top-0 end-0 mt-3 me-3 text-white p-0" 
                onClick={() => setShowCourseModal(false)}
              >
                <X size={24} />
              </button>

              <div className="mb-4">
                <img 
                  src={selectedCourse.image} 
                  alt={selectedCourse.title}
                  className="w-100 rounded-3"
                  style={{ height: '250px', objectFit: 'cover' }}
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800"}
                />
              </div>

              <div className="mb-3">
                <div className="d-flex gap-2 mb-2">
                  <span className="badge bg-primary bg-opacity-10 text-primary">{selectedCourse.level}</span>
                  <span className="badge bg-success bg-opacity-10 text-success">{selectedCourse.duration}</span>
                </div>
                <h3 className="fw-bold text-white mb-2">{selectedCourse.title}</h3>
                <p className="text-secondary mb-3">
                  <span className="fw-bold">Instructor:</span> {selectedCourse.instructor}
                </p>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold text-white mb-2">About this course</h5>
                <p className="text-secondary" style={{ lineHeight: '1.6' }}>
                  {selectedCourse.description || "Explore this comprehensive course designed to help you master essential skills. Learn from industry experts and gain hands-on experience through practical projects."}
                </p>
              </div>

              <div className="d-flex gap-3">
                <button 
                  className="btn btn-secondary flex-grow-1"
                  onClick={() => setShowCourseModal(false)}
                >
                  Close
                </button>
                <button 
                  className="btn btn-primary flex-grow-1"
                  onClick={async () => {
                    const token = localStorage.getItem('token');
                    if (token) {
                      try {
                        await axios.post(`http://127.0.0.1:8000/enroll/${selectedCourse.id}`, {}, {
                          headers: { Authorization: `Bearer ${token}` }
                        });
                        // Refresh dashboard data
                        const response = await axios.get('http://127.0.0.1:8000/dashboard', {
                          headers: { Authorization: `Bearer ${token}` }
                        });
                        setDashboardData(response.data);
                        setShowCourseModal(false);
                      } catch (error) {
                        console.error("Enrollment failed", error);
                      }
                    }
                  }}
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentDashboard;
