import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const InstructorCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = sessionStorage.getItem('access_token');
            if (!token) {
                toast.error("Please login first");
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/admin/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                // Extract courses from the course_performance data
                const instructorCourses = response.data.course_performance || [];
                setCourses(instructorCourses);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                toast.error("Failed to load courses");
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <div className="text-white text-center p-5">Loading your courses...</div>;
    }

    return (
        <div>
            <div className="mb-5">
                <h1 className="fw-bold mb-2 text-white">My Courses</h1>
                <p className="text-white-50">Manage and track your course portfolio</p>
            </div>

            <Row className="g-4">
                {courses.map((course, index) => (
                    <Col key={index} lg={4} md={6}>
                        <div 
                            className="p-4 rounded-4 h-100 position-relative overflow-hidden" 
                            style={{ 
                                background: 'linear-gradient(135deg, #0d121d 0%, #161b26 100%)', 
                                border: '1px solid rgba(255,255,255,0.05)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,102,255,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Course Image */}
                            <div className="mb-3">
                                <img 
                                    src={course.image || '/Coding.jpg'} 
                                    alt={course.title}
                                    className="w-100 rounded-3"
                                    style={{ height: '180px', objectFit: 'cover' }}
                                />
                            </div>

                            {/* Course Title */}
                            <h5 className="fw-bold text-white mb-3">{course.title}</h5>

                            {/* Stats */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <div className="text-white-50 small">Students</div>
                                    <div className="fw-bold text-white">{course.students}</div>
                                </div>
                                <div>
                                    <div className="text-white-50 small">Earnings</div>
                                    <div className="fw-bold text-success">${course.earnings}</div>
                                </div>
                                <div>
                                    <div className="text-white-50 small">Status</div>
                                    <div className="fw-bold text-primary">{course.status}</div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-outline-light flex-grow-1 rounded-3">
                                    Edit Course
                                </button>
                                <button className="btn btn-sm btn-primary rounded-3">
                                    View Analytics
                                </button>
                            </div>

                            {/* Decorative gradient */}
                            <div 
                                className="position-absolute" 
                                style={{ 
                                    top: '-50px', 
                                    right: '-50px', 
                                    width: '150px', 
                                    height: '150px', 
                                    background: 'radial-gradient(circle, rgba(0,102,255,0.1) 0%, rgba(0,0,0,0) 70%)',
                                    pointerEvents: 'none'
                                }}
                            />
                        </div>
                    </Col>
                ))}
            </Row>

            {courses.length === 0 && (
                <div className="text-center text-white-50 p-5">
                    <h4>No courses found</h4>
                    <p>Start creating courses to see them here</p>
                </div>
            )}
        </div>
    );
};

export default InstructorCourses;
