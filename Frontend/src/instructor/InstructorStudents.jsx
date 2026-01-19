import React, { useState } from 'react';
import { Row, Col, Form, InputGroup, ProgressBar, Dropdown } from 'react-bootstrap';
import { 
    Search, 
    Filter, 
    ThreeDotsVertical, 
    Envelope, 
    Award, 
    LightningCharge,
    ClockHistory,
    CheckCircle,
    PeopleFill
} from 'react-bootstrap-icons';

const InstructorStudents = ({ students = [], totalXP = 0 }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCourse, setFilterCourse] = useState('All Courses');
    const [filterStatus, setFilterStatus] = useState('All Status');

    // Use passed real data, fallback to empty array if undefined
    const displayStudents = students.length > 0 ? students : [];

    // Helper to format large numbers
    const formatXP = (xp) => {
        if (!xp) return '0';
        if (xp >= 1000000) return (xp / 1000000).toFixed(1) + 'M';
        if (xp >= 1000) return (xp / 1000).toFixed(1) + 'k';
        return xp.toLocaleString();
    };

    const filteredStudents = displayStudents
        .filter(s => 
            (filterCourse === 'All Courses' || s.course === filterCourse) &&
            (filterStatus === 'All Status' || s.status === filterStatus) &&
            s.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => (b.xp || 0) - (a.xp || 0)); // Sort by XP descending (leaderboard)

    const getStatusColor = (status) => {
        switch(status) {
            case 'Active': return '#00C851'; // Green
            case 'Completed': return '#33b5e5'; // Blue
            case 'At Risk': return '#ff4444'; // Red
            case 'Lazy': return '#ffbb33'; // Orange
            default: return '#fff';
        }
    };

    return (
        <div className="animate-fade-in">
            {/* Header Stats */}
            <Row className="mb-5 g-4">
                <Col md={4}>
                    <div className="p-4 rounded-4 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d121d 0%, #161b26 100%)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="d-flex justify-content-between align-items-start position-relative" style={{zIndex: 1}}>
                            <div>
                                <p className="text-white-50 mb-1">Total Students</p>
                                <h1 className="fw-bold text-white mb-0">{displayStudents.length}</h1>
                            </div>
                            <div className="p-3 rounded-circle bg-primary bg-opacity-25 text-primary">
                                <PeopleFill size={24} />
                            </div>
                        </div>
                        {/* Decorative background visual */}
                        <div className="position-absolute" style={{ top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(13,110,253,0.15) 0%, rgba(0,0,0,0) 70%)' }}></div>
                    </div>
                </Col>
                <Col md={4}>
                     <div className="p-4 rounded-4 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d121d 0%, #161b26 100%)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="d-flex justify-content-between align-items-start position-relative" style={{zIndex: 1}}>
                            <div>
                                <p className="text-white-50 mb-1">Avg. Completion</p>
                                <h1 className="fw-bold text-success mb-0">62%</h1>
                            </div>
                            <div className="p-3 rounded-circle bg-success bg-opacity-25 text-success">
                                <CheckCircle size={24} />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                     <div className="p-4 rounded-4 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d121d 0%, #161b26 100%)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="d-flex justify-content-between align-items-start position-relative" style={{zIndex: 1}}>
                            <div>
                                <p className="text-white-50 mb-1">Total XP Awarded</p>
                                <h1 className="fw-bold text-warning mb-0">{formatXP(totalXP)}</h1>
                            </div>
                            <div className="p-3 rounded-circle bg-warning bg-opacity-25 text-warning">
                                <LightningCharge size={24} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Controls */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                <InputGroup className="w-auto" style={{ minWidth: '300px' }}>
                    <InputGroup.Text style={{ background: '#0d121d', borderColor: '#2b303b' }} className="text-white-50 border-end-0">
                        <Search />
                    </InputGroup.Text>
                    <Form.Control 
                        placeholder="Search students..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ background: '#0d121d', borderColor: '#2b303b', color: '#fff' }} 
                        className="border-start-0 shadow-none"
                    />
                </InputGroup>

                <div className="d-flex gap-3">
                    <Form.Select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-dark text-white border-dark" 
                        style={{width: '150px'}}
                    >
                        <option value="All Status">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Lazy">Lazy</option>
                        <option value="At Risk">At Risk</option>
                        <option value="Completed">Completed</option>
                    </Form.Select>
                    <button className="btn btn-primary px-4" style={{background: '#0066FF', border:'none'}}>Export CSV</button>
                </div>
            </div>

            {/* Student List */}
            <div className="d-flex flex-column gap-3">
                {filteredStudents.map((student, index) => (
                    <div key={student.id} className="p-4 rounded-4 transition-all hover-scale position-relative" 
                         style={{ 
                             background: '#0d121d', 
                             border: '1px solid rgba(255,255,255,0.05)',
                             transition: 'transform 0.2s, box-shadow 0.2s'
                         }}
                         onMouseEnter={(e) => {
                             e.currentTarget.style.transform = 'translateY(-2px)';
                             e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                             e.currentTarget.style.borderColor = 'rgba(0,102,255,0.3)';
                         }}
                         onMouseLeave={(e) => {
                             e.currentTarget.style.transform = 'translateY(0)';
                             e.currentTarget.style.boxShadow = 'none';
                             e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                         }}
                    >
                        {/* Rank Badge */}
                        <div className="position-absolute" style={{ top: '10px', right: '10px' }}>
                            <div className={`badge ${index < 3 ? 'bg-warning' : 'bg-secondary'} rounded-pill px-3 py-2`} style={{ fontSize: '12px', fontWeight: 'bold' }}>
                                #{index + 1}
                            </div>
                        </div>

                        <Row className="align-items-center g-3">
                            <Col md={4} lg={3}>
                                <div className="d-flex align-items-center gap-3">
                                    <img src={student.avatar} alt={student.name} className="rounded-circle border border-2 border-dark" width="56" height="56" />
                                    <div>
                                        <h5 className="fw-bold text-white mb-1" style={{fontSize: '16px'}}>{student.name}</h5>
                                        <p className="text-white-50 mb-0 small d-flex align-items-center gap-1">
                                            <span style={{width: '6px', height: '6px', borderRadius: '50%', background: getStatusColor(student.status)}}></span>
                                            {student.status}
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            
                            <Col md={3} lg={3}>
                                <p className="text-white-50 mb-1 small">Current Course</p>
                                <h6 className="text-white mb-0" style={{fontSize: '14px'}}>{student.course}</h6>
                            </Col>

                            <Col md={3} lg={3}>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="text-white-50 small">Progress</span>
                                        <span className="text-white fw-bold small">{student.progress}%</span>
                                    </div>
                                    <ProgressBar 
                                        now={student.progress} 
                                        variant={student.progress >= 80 ? "success" : student.progress < 40 ? "danger" : "warning"} 
                                        className="rounded-pill" 
                                        style={{height: '6px', backgroundColor: 'rgba(255,255,255,0.1)'}} 
                                    />
                                </div>
                            </Col>

                            <Col md={2} lg={3} className="text-end">
                                <div className="d-flex align-items-center justify-content-end gap-3">
                                    <div className="d-none d-lg-block text-end me-2">
                                        <div className="d-flex align-items-center justify-content-end gap-1 text-warning fw-bold">
                                            <LightningCharge /> {student.xp.toLocaleString()} XP
                                        </div>
                                        <div className="text-white-50 small d-flex align-items-center justify-content-end gap-1">
                                            <ClockHistory size={12} /> {student.lastActive}
                                        </div>
                                    </div>
                                    <button className="btn btn-dark rounded-circle p-2 d-flex align-items-center justify-content-center text-white-50 hover-white" style={{width: '40px', height: '40px', background: '#161b26'}}>
                                        <Envelope size={18} />
                                    </button>
                                    <button className="btn btn-dark rounded-circle p-2 d-flex align-items-center justify-content-center text-white-50 hover-white" style={{width: '40px', height: '40px', background: '#161b26'}}>
                                        <ThreeDotsVertical size={18} />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorStudents;
