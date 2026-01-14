import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, BookOpen, Clock, BarChart } from 'lucide-react'
import { courses } from '../data/courses'
import '../Style/Hero.css' // Reusing existing styles

const Courses = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState("All");
    const [level, setLevel] = useState("All");

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                             course.category.toLowerCase().includes(search.toLowerCase()) ||
                             course.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || course.category === category;
        const matchesLevel = level === "All" || course.level === level;

        return matchesSearch && matchesCategory && matchesLevel;
    });

    const categories = ["All", ...new Set(courses.map(c => c.category))];
    const levels = ["All", ...new Set(courses.map(c => c.level))];

    return (
        <div className="container-fluid px-5 py-5" style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #020617 0%, #060C19 100%)' }}>
            
            {/* Header Section */}
            <div className="d-flex flex-column align-items-center mb-5 text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="done mb-3" 
                    style={{ fontSize: '3rem' }}
                >
                    Explore Our Courses
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="orm" 
                    style={{ fontSize: '1.2rem', maxWidth: '600px' }}
                >
                    Discover the perfect course to upgrade your skills and advance your career.
                </motion.p>
            </div>

            {/* Filters Section */}
            <div className="glass-card p-4 mb-5 mx-auto" style={{ maxWidth: '1200px' }}>
                <div className="row g-3 align-items-center">
                    <div className="col-md-5">
                        <div className="position-relative">
                            <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={20} />
                            <input
                                type="text"
                                className="w-100 rounded-3 py-2 ps-5 text-white"
                                placeholder="Search for courses..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ backgroundColor: "#060C19", border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="position-relative">
                            <Filter className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={18} />
                            <select
                                className="w-100 rounded-3 py-2 ps-5 text-white appearance-none"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ backgroundColor: "#060C19", border: '1px solid rgba(255,255,255,0.1)', outline: 'none', cursor: 'pointer' }}
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="position-relative">
                            <BarChart className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={18} />
                            <select
                                className="w-100 rounded-3 py-2 ps-5 text-white appearance-none"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                style={{ backgroundColor: "#060C19", border: '1px solid rgba(255,255,255,0.1)', outline: 'none', cursor: 'pointer' }}
                            >
                                {levels.map(lvl => <option key={lvl} value={lvl}>{lvl === 'All' ? 'All Levels' : lvl}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-1 d-flex justify-content-end">
                         <span className="text-secondary small">{filteredCourses.length} results</span>
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="row g-4">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, index) => (
                            <motion.div 
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="col-md-4"
                            >
                                <div className="glass-card h-100 overflow-hidden hover-scale transition">
                                    <div style={{ height: '200px', overflow: 'hidden' }}>
                                        <img 
                                            src={course.image} 
                                            alt={course.title} 
                                            className="w-100 h-100 object-fit-cover"
                                            style={{ transition: 'transform 0.5s ease' }}
                                        />
                                    </div>
                                    <div className="p-4 d-flex flex-column h-100">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25 rounded-pill px-3">{course.category}</span>
                                            <div className="d-flex align-items-center text-secondary small">
                                                <Clock size={14} className="me-1" /> {course.duration}
                                            </div>
                                        </div>
                                        <h4 className="done mb-2" style={{ fontSize: '1.25rem' }}>{course.title}</h4>
                                        <p className="orm small mb-4 line-clamp-2">{course.description}</p>
                                        
                                        <div className="mt-auto d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="rounded-circle bg-dark d-flex align-items-center justify-content-center border border-secondary border-opacity-25" style={{ width: '30px', height: '30px' }}>
                                                    <span className="text-white small fw-bold">{course.instructor?.name?.charAt(0) || 'I'}</span>
                                                </div>
                                                <span className="text-secondary ms-2 small">{course.instructor?.name || 'Instructor'}</span>
                                            </div>
                                            <Link to={`/courses/${course.id}`} className="btn btn-sm btn-outline-light rounded-pill px-3">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <BookOpen size={48} className="text-secondary mb-3 opacity-50" />
                            <h3 className="text-white">No courses not found</h3>
                            <p className="text-secondary">Try adjusting your search or filters to find what you're looking for.</p>
                            <button 
                                onClick={() => { setSearch(''); setCategory('All'); setLevel('All'); }}
                                className="btn btn-link text-primary"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Courses
