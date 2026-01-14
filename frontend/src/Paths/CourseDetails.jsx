import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { courses } from '../data/courses'

const CourseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = courses.find((c) => c.id === parseInt(id))

  if (!course) {
    return <div className="text-white text-center mt-5">Course not found</div>
  }

  const handleEnroll = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post(`http://127.0.0.1:8000/enroll/${course.id}`, {}, {
           headers: { Authorization: `Bearer ${token}` }
        });
        navigate('/student-dashboard', { state: { openCourse: course.id } });
      } catch (error) {
        console.error("Enrollment failed", error);
        // Even if failed (e.g. already enrolled), go to dashboard
        navigate('/student-dashboard', { state: { openCourse: course.id } });
      }
    } else {
      localStorage.setItem('pendingEnrollment', course.id);
      navigate('/signup');
    }
  }

  return (
    <div className="container mt-5 text-white animate-fade-in">
      <div className="glass-card p-5">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <img src={course.image} alt={course.title} className="img-fluid rounded shadow-lg" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold display-5 mb-3">{course.title}</h2>
            <p className="lead" style={{ color: 'var(--text-secondary)' }}>{course.description}</p>
            
            <div className="mt-4 p-4 rounded" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)' }}>
              <h5 className="text-primary mb-3">Course Details</h5>
              <p style={{ color: 'var(--text-primary)' }}>{course.details}</p>
              <div className="d-flex justify-content-between text-secondary border-top border-secondary pt-3 mt-3">
                  <span className="text-light">Duration: {course.duration}</span>
                  <span className="text-light">Level: {course.level}</span>
              </div>
            </div>

            <button onClick={handleEnroll} className="btn btn-primary btn-lg mt-5 w-100">
              Enroll Now
            </button>
          </div>
        </div>

        {/* Instructor Section */}
        {course.instructor && (
          <div className="mt-5 glass-card p-5">
            <h3 className="fw-bold mb-4" style={{ fontSize: '2rem', borderBottom: '2px solid var(--primary)', paddingBottom: '1rem' }}>
              Meet Your Instructor
            </h3>
            
            <div className="row align-items-start">
              <div className="col-md-3 text-center mb-4 mb-md-0">
                {/* Placeholder for instructor photo */}
                <div 
                  className="mx-auto rounded-circle d-flex align-items-center justify-content-center border border-3" 
                  style={{ 
                    width: '180px', 
                    height: '180px', 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    color: '#fff',
                    border: '3px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {course.instructor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="mt-3 fw-bold" style={{ color: 'var(--primary)' }}>{course.instructor.name}</h4>
              </div>

              <div className="col-md-9">
                <div className="mb-4">
                  <h5 className="text-light mb-3" style={{ fontSize: '1.1rem' }}>About the Instructor</h5>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
                    {course.instructor.bio}
                  </p>
                </div>

                <div 
                  className="p-4 rounded" 
                  style={{ 
                    background: 'rgba(134, 98, 255, 0.1)', 
                    borderLeft: '4px solid var(--primary)',
                    fontStyle: 'italic'
                  }}
                >
                  <p className="mb-2 text-light" style={{ fontSize: '0.85rem', fontWeight: '600', letterSpacing: '1px' }}>
                    FAVORITE QUOTE
                  </p>
                  <p className="mb-0" style={{ fontSize: '1.1rem', color: '#e0e0e0', lineHeight: '1.6' }}>
                    "{course.instructor.quote}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseDetails
