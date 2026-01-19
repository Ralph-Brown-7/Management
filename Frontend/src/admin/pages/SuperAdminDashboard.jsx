import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner, Table, Badge } from 'react-bootstrap';
import { 
  Building, 
  PeopleFill, 
  CashStack, 
  GraphUp, 
  GearFill, 
  BoxArrowRight, 
  ShieldLockFill,
  PersonCheckFill,
  ExclamationTriangleFill
} from 'react-bootstrap-icons';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
             const token = sessionStorage.getItem('access_token');
             if (!token) {
                 navigate('/login');
                 return;
             }
             try {
                // Reusing the same endpoint for now, but in reality this would cover ALL system data
                const response = await axios.get('http://localhost:8000/admin/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(response.data);
                setLoading(false);
             } catch (error) {
                 console.error(error);
                 setLoading(false);
             }
        };
        fetchStats();
    }, [navigate]);

    if (loading) return <div className="vh-100 d-flex justify-content-center align-items-center text-white bg-dark"><Spinner animation="border" /></div>;

    const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    return (
        <div className="d-flex w-100" style={{ minHeight: '100vh', background: '#f4f6f9', fontFamily: "'Inter', sans-serif" }}>
            
            {/* Sidebar */}
            <div className="d-flex flex-column p-4 bg-white border-end" style={{ width: '280px', height: '100vh', position: 'sticky', top: 0 }}>
                <div className="mb-5 px-2 d-flex align-items-center gap-2">
                     <ShieldLockFill size={24} className="text-primary" />
                     <h5 className="fw-bold mb-0 text-dark">Super Admin</h5>
                </div>
                
                <div className="d-flex flex-column gap-2">
                    <div className="p-3 bg-primary text-white rounded-3 d-flex align-items-center gap-3">
                        <GraphUp /> Dashboard
                    </div>
                    <div className="p-3 text-secondary hover-bg-light rounded-3 d-flex align-items-center gap-3" style={{cursor:'pointer'}}>
                        <PeopleFill /> Users Management
                    </div>
                    <div className="p-3 text-secondary hover-bg-light rounded-3 d-flex align-items-center gap-3" style={{cursor:'pointer'}}>
                        <Building /> Institutions
                    </div>
                    <div className="p-3 text-secondary hover-bg-light rounded-3 d-flex align-items-center gap-3" style={{cursor:'pointer'}}>
                        <GearFill /> System Settings
                    </div>
                </div>

                <div className="mt-auto">
                    <button 
                        onClick={() => { sessionStorage.clear(); navigate('/login'); }} 
                        className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                    >
                        <BoxArrowRight /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 p-5">
                <header className="mb-5 d-flex justify-content-between align-items-center">
                    <div>
                        <h2 className="fw-bold text-dark">System Overview</h2>
                        <p className="text-secondary">Monitoring LearnFlow Platform Performance</p>
                    </div>
                    <div className="d-flex gap-3">
                        <Badge bg="success" className="p-2 px-3 rounded-pill">System Healthy</Badge>
                        <div className="bg-white p-2 rounded-circle shadow-sm">
                            <PersonCheckFill size={20} className="text-primary" />
                        </div>
                    </div>
                </header>

                <Row className="g-4 mb-5">
                    <Col md={3}>
                        <div className="p-4 bg-white rounded-4 shadow-sm border-0 h-100">
                            <p className="text-secondary small fw-bold text-uppercase">Total Revenue</p>
                            <h2 className="fw-bold text-dark mb-0">{formatCurrency(stats?.revenue || 0)}</h2>
                            <p className="text-success small mb-0 mt-2">+15% from last month</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="p-4 bg-white rounded-4 shadow-sm border-0 h-100">
                            <p className="text-secondary small fw-bold text-uppercase">Total Students</p>
                            <h2 className="fw-bold text-dark mb-0">{stats?.total_students || 0}</h2>
                            <p className="text-primary small mb-0 mt-2">Active Learners</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="p-4 bg-white rounded-4 shadow-sm border-0 h-100">
                            <p className="text-secondary small fw-bold text-uppercase">Instructors</p>
                            <h2 className="fw-bold text-dark mb-0">12</h2>
                            <p className="text-secondary small mb-0 mt-2">Verified Educators</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="p-4 bg-white rounded-4 shadow-sm border-0 h-100">
                            <p className="text-secondary small fw-bold text-uppercase">Active Sessions</p>
                            <h2 className="fw-bold text-dark mb-0">450</h2>
                            <p className="text-warning small mb-0 mt-2">Current users online</p>
                        </div>
                    </Col>
                </Row>

                {/* Recent System Alerts / Logs */}
                <div className="bg-white rounded-4 shadow-sm p-4">
                    <h5 className="fw-bold mb-4">System Access Logs</h5>
                    <Table hover responsive className="align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="border-0 text-secondary small text-uppercase">User</th>
                                <th className="border-0 text-secondary small text-uppercase">Role</th>
                                <th className="border-0 text-secondary small text-uppercase">Action</th>
                                <th className="border-0 text-secondary small text-uppercase">Status</th>
                                <th className="border-0 text-secondary small text-uppercase">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="fw-bold">admin@learnflow.com</td>
                                <td><Badge bg="dark">Super Admin</Badge></td>
                                <td>System Login</td>
                                <td><Badge bg="success" text="light">Success</Badge></td>
                                <td className="text-secondary">Just now</td>
                            </tr>
                            <tr>
                                <td>instructor@learnflow.com</td>
                                <td><Badge bg="primary">Instructor</Badge></td>
                                <td>Course Update</td>
                                <td><Badge bg="success" text="light">Success</Badge></td>
                                <td className="text-secondary">2 mins ago</td>
                            </tr>
                            <tr>
                                <td>student@example.com</td>
                                <td><Badge bg="info">Student</Badge></td>
                                <td>Failed Login Attempt</td>
                                <td><Badge bg="danger">Failed</Badge></td>
                                <td className="text-secondary">15 mins ago</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

            </div>
        </div>
    );
};

export default SuperAdminDashboard;
