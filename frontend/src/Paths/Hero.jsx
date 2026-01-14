import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../Style/Hero.css'
import { courses } from '../data/courses';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Hero = ({ homeSearch, setHomeSearch }) => {    
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);
    const navigate = useNavigate();

    const [category, setCategory] = useState("All");
    const [level, setLevel] = useState("All");

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes((homeSearch || "").toLowerCase()) || 
                             course.category.toLowerCase().includes((homeSearch || "").toLowerCase()) ||
                             course.description.toLowerCase().includes((homeSearch || "").toLowerCase());
        const matchesCategory = category === "All" || course.category === category;
        const matchesLevel = level === "All" || course.level === level;

        return matchesSearch && matchesCategory && matchesLevel;
    });

    const handleEnroll = async (courseId) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await axios.post(`http://127.0.0.1:8000/enroll/${courseId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                navigate('/student-dashboard', { state: { openCourse: courseId } });
            } catch (error) {
                console.error("Enrollment failed", error);
                // Even if failed (e.g. already enrolled), go to dashboard
                navigate('/student-dashboard', { state: { openCourse: courseId } });
            }
        } else {
            localStorage.setItem('pendingEnrollment', courseId);
            navigate('/signup'); // Per user request: "make the enroll button take you to the sign up page"
        }
    };


    useEffect(() => {

    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [open, filteredCourses]);

  return (
    <section>


        <section className='mt-5 yeah' id="explore-courses">
            <div className='d-flex justify-content-between align-items-center m-auto mb-4' style={{maxWidth:"1100px"}}>
                <h1 className='done' style={{marginLeft: '0'}}>Explore Courses</h1>
                <p className='orm m-0'>Showing {filteredCourses.length} results</p>
            </div>

            <div className='container mb-5' style={{maxWidth: '1100px'}}>
                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="position-relative">
                            <input
                                className="w-100 ps-3 rounded-3 py-2"
                                placeholder="Search course..."
                                value={homeSearch || ""}
                                onChange={(e) => setHomeSearch(e.target.value)}
                                style={{backgroundColor:"#060C19", color:"white", border: '1px solid rgba(255,255,255,0.1)'}}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <select
                            className="w-100 border-1 ps-3 rounded-3 py-2"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
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
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            style={{backgroundColor:"#060C19", color:"white", border: '1px solid rgba(255,255,255,0.1)'}}
                        >
                            <option value="All">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='container'style={{maxWidth:"1600px"}}>
                <div className='row g-5'>
                    {filteredCourses.slice(0, open ? filteredCourses.length : 6).map((course) => (
                        <div key={course.id} className="col-12 col-md-6 col-lg-4">
                            <div className='level overflow-hidden'>
                                <div className='p-3 pb-0 pt-2'>
                                    <p className='done new mb-2' style={{ margin: "0", fontSize: '1.3rem', fontWeight: '900', color: '#fff' }}>{course.title}</p>
                                </div>
                                <div className='course-image-container mb-2' style={{ height: '160px', width: '100%', position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
                                    <img 
                                        src={course.image} 
                                        alt={course.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                                        <span className='text-white border-0 rounded-pill px-2 py-1' style={{ background: "rgba(5, 27, 72, 0.8)", fontSize: "12px" }}>{course.category}</span>
                                        <span className='ms-2 text-white border-0 rounded-pill px-2 py-1' style={{ background: "rgba(5, 27, 72, 0.8)", fontSize: "12px" }}>{course.level}</span>
                                    </div>
                                </div>
                                <div className='p-3 pt-1'>
                                    <p className='orm mb-2' style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>{course.description}</p>
                                    <p className='orm mb-1' style={{ fontSize: '0.8rem', opacity: 0.8 }}>{course.instructor.name} • {course.duration}</p>
                                    <p className='done mb-3' style={{ fontSize: '0.9rem' }}>
                                        Price: <strong style={{ color: '#8662FF' }}>${course.price}</strong>
                                    </p>
                                    <div className='d-flex gap-2'>
                                        <Link to={`/courses/${course.id}`} className='flex-grow-1 text-white border-0 rounded-3 btn text-decoration-none text-center pt-2' style={{ background: "#051B48", fontSize: "12px", border: '1px solid rgba(255,255,255,0.1)' }}>Preview</Link>
                                        <button onClick={() => handleEnroll(course.id)} className='flex-grow-1 text-white border-0 rounded-3 btn' style={{ background: "#8662FF", fontSize: "12px" }}>Enroll</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </section>
        <section className='hurt'>
    <div className="p-4">

      <div className='d-flex justify-content-between align-items-center mt-3'>
        {filteredCourses.length > 6 && (
            <button
                onClick={() => setOpen(!open)}
                className="text-black panda px-1 py-1 rounded-4 ms-5"
                style={{marginLeft: '12rem'}}
            >
                {open ? "Show Less" : "Show More"}
            </button>
        )}
        <div className='d-flex align-items-center' style={{marginRight: '10rem'}}>
          <span className='ms-3 orm'>Or browse by category:</span>
          <span className='ms-1 orm px-1 py-1 rounded-3' style={{background:"#051B48", fontSize:'13px'}}>Data</span>
          <span className='ms-1 orm px-1 py-1 rounded-3' style={{background:"#051B48", fontSize:'13px'}}>Design</span>
          <span className='ms-1 orm px-1 py-1 rounded-3' style={{background:"#051B48", fontSize:'13px'}}>Business</span>
        </div>
      </div>
    </div>        
    </section>
    <section className='hurt ms-5 mt-3 orm'>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
        <p className='done new' style={{marginLeft:"100px"}}>What people say</p>
        <div className='container'>
        <div className='row g-4'>
        <div className='col-12 col-md-6 col-lg-4'>
        <div className='rounded-4 ps-3 py-4 pe-4'style={{background:"#060C19", width:"100%"}}>
            <div className='d-flex'>
                <p className='m-0 pt-2 pb-2 rounded-5 text-center text-white' style={{background:"#500a0a", width:"50px", fontSize:"20px"}}>G</p>
                <div className='ms-2'>
                    <p className='m-0 done'>Godfrey Utenge</p>
                    <p className='m-0'>Product Manager</p>
                </div>
            </div>
            <p className='mt-2'>"The structured path and hands-on assignments got me ready for interviews — landed a role in 2 months."</p>
        </div>
        </div>
        <div className='col-12 col-md-6 col-lg-4'>
        <div className='rounded-4 ps-3 py-4 pe-4'style={{background:"#060C19", width:"100%"}}>
            <div className='d-flex'>
                <p className='m-0 pt-2 pb-2 rounded-5 text-center text-white' style={{background:"#8662FF", width:"50px", fontSize:"20px"}}>U</p>
                <div className='ms-2'>
                    <p className='m-0 done'>Ubok-Abasi Utenge</p>
                    <p className='m-0'>Product Manager</p>
                </div>
            </div>
            <p className='mt-2'>"Great quizzes and instant feedback. The certificate helped me get noticed by recruiters."</p>
        </div>
        </div>
        <div className='col-12 col-md-6 col-lg-4'>
        <div className='rounded-4 ps-3 py-4 pe-4'style={{background:"#060C19", width:"100%"}}>
            <div className='d-flex'>
                <p className='m-0 pt-2 pb-2 rounded-5 text-center text-white' style={{background:"#1798F8", width:"50px", fontSize:"20px"}}>S</p>
                <div className='ms-2'>
                    <p className='m-0 done'>Sarah Jenkins</p>
                    <p className='m-0'>UX Designer</p>
                </div>
            </div>
            <p className='mt-2'>"The community support is amazing. I never felt stuck because help was always just a message away."</p>
        </div>
        </div>
        </div>
        </div>
        </motion.div>
    </section>
    <section className='hurt orm mb-5' style={{marginLeft:"60px"}}>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
        <p className='done new mt-3'style={{marginLeft:"80px"}}>Pricing</p>
        <div className='container'>
            <div className='row'>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='my-5 rounded-5 ps-4 pt-3 pb-5' style={{background:"#030E24", maxWidth:"300px"}}>
                            <h1 className='done new'>Basic</h1>
                            <p>Perfect for beginners.</p>
                            <p><strong className='done new'>$9</strong> /month</p>
                            <ul className='list-unstyled lh-lg'>
                                <li><span className='text-white'>✔</span> Access to 20 courses</li>
                                <li><span className='text-white'>✔</span> Downloadable resources</li>
                                <li><span className='text-white'>✔</span> Community support</li>
                                <li><span className='text-white'>✖</span> Certificates</li>
                                <li><span className='text-white'>✖</span> Instructor feedback</li>
                            </ul>
                            <button className='ms-3 rounded-4 border-3 py-2 px-5' style={{background:"linear-gradient(77deg, #8662FF, #4EBCC8)"}}>Choose Plan</button>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='my-2 rounded-5 ps-4 pt-5' style={{background:"linear-gradient(to right, #1798FB, #05CEFF)", maxWidth:"300px", paddingBottom:"60px"}}>
                            <h1 className='done new text-black'>Standard</h1>
                            <p>Most popular choice.</p>
                            <p><strong className='done new text-black'>$19</strong> /month</p>
                            <ul className='list-unstyled lh-lg'>
                                <li><span className='text-black'>✔</span> Access to all courses</li>
                                <li><span className='text-black'>✔</span> Certificates included</li>
                                <li><span className='text-black'>✔</span> Community support</li>
                                <li><span className='text-black'>✔</span> Instructor Q&A</li>
                                <li><span className='text-black'>✖</span> One-on-one mentoring</li>
                            </ul>
                            <button className='ms-3 mt-5 rounded-4 border-1 py-2 px-5' style={{background:"linear-gradient(77deg, #8662FF, #4EBCC8)"}}>Choose Plan</button>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <div className='my-5 rounded-5 ps-4 pt-3 pb-5' style={{background:"#030E24", maxWidth:"300px"}}>
                            <h1 className='done new'>Premium</h1>
                            <p>For serious learners.</p>
                            <p><strong className='done new'>$39</strong> /month</p>
                            <ul className='list-unstyled lh-lg'>
                                <li><span className='text-white'>✔</span> Everything in Standard</li>
                                <li><span className='text-white'>✔</span> One-on-one mentoring</li>
                                <li><span className='text-white'>✔</span> Career guidance</li>
                                <li><span className='text-white'>✔</span> Certificates</li>
                                <li><span className='text-white'>✔</span> Priority support</li>
                            </ul>
                            <button className='ms-3 rounded-4 border-3 py-2 px-5' style={{background:"linear-gradient(77deg, #8662FF, #4EBCC8)"}}>Choose Plan</button>
                        </div>
                    </div>
            </div>
        </div>
        </motion.div>
    </section>
    </section>
  )
}

export default Hero
