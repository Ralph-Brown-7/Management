import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { PersonFill, BellFill, ShieldLockFill, PaletteFill, CreditCard2FrontFill } from 'react-bootstrap-icons';

const InstructorSettings = () => {
    const [activeSection, setActiveSection] = useState('profile');

    const sections = [
        { id: 'profile', label: 'Profile Settings', icon: PersonFill },
        { id: 'notifications', label: 'Notifications', icon: BellFill },
        { id: 'security', label: 'Security', icon: ShieldLockFill },
        { id: 'appearance', label: 'Appearance', icon: PaletteFill },
        { id: 'billing', label: 'Billing', icon: CreditCard2FrontFill }
    ];

    return (
        <div>
            <div className="mb-5">
                <h1 className="fw-bold mb-2 text-white">Settings</h1>
                <p className="text-white-50">Manage your account preferences and settings</p>
            </div>

            <Row className="g-4">
                {/* Settings Navigation */}
                <Col lg={3}>
                    <div className="p-3 rounded-4" style={{ background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)' }}>
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <div
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`p-3 rounded-3 mb-2 d-flex align-items-center gap-3 cursor-pointer ${activeSection === section.id ? 'bg-primary bg-opacity-10' : ''}`}
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        background: activeSection === section.id ? 'rgba(0,102,255,0.1)' : 'transparent',
                                        borderLeft: activeSection === section.id ? '3px solid #0066FF' : '3px solid transparent'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (activeSection !== section.id) {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (activeSection !== section.id) {
                                            e.currentTarget.style.background = 'transparent';
                                        }
                                    }}
                                >
                                    <Icon size={18} className={activeSection === section.id ? 'text-primary' : 'text-white-50'} />
                                    <span className={activeSection === section.id ? 'text-white fw-bold' : 'text-white-50'}>{section.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </Col>

                {/* Settings Content */}
                <Col lg={9}>
                    <div className="p-4 rounded-4" style={{ background: '#0d121d', border: '1px solid rgba(255,255,255,0.05)' }}>
                        {activeSection === 'profile' && (
                            <div>
                                <h4 className="fw-bold text-white mb-4">Profile Settings</h4>
                                <Form>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-white-50">Full Name</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    defaultValue="Darlington Daniel"
                                                    style={{ background: '#161b26', borderColor: '#2b303b', color: '#fff' }}
                                                    className="shadow-none"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-white-50">Email Address</Form.Label>
                                                <Form.Control 
                                                    type="email" 
                                                    defaultValue="instructor@learnflow.com"
                                                    style={{ background: '#161b26', borderColor: '#2b303b', color: '#fff' }}
                                                    className="shadow-none"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Bio</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={4}
                                            defaultValue="Passionate educator with 10+ years of experience in Machine Learning and Data Science."
                                            style={{ background: '#161b26', borderColor: '#2b303b', color: '#fff' }}
                                            className="shadow-none"
                                        />
                                    </Form.Group>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-white-50">Phone Number</Form.Label>
                                                <Form.Control 
                                                    type="tel" 
                                                    placeholder="+1 (555) 000-0000"
                                                    style={{ background: '#161b26', borderColor: '#2b303b', color: '#fff' }}
                                                    className="shadow-none"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-white-50">Location</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="City, Country"
                                                    style={{ background: '#161b26', borderColor: '#2b303b', color: '#fff' }}
                                                    className="shadow-none"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" className="px-4">Save Changes</Button>
                                </Form>
                            </div>
                        )}

                        {activeSection === 'notifications' && (
                            <div>
                                <h4 className="fw-bold text-white mb-4">Notification Preferences</h4>
                                <div className="mb-4">
                                    <h6 className="text-white mb-3">Email Notifications</h6>
                                    <Form.Check 
                                        type="switch"
                                        id="email-new-student"
                                        label="New student enrollments"
                                        className="text-white-50 mb-3"
                                        defaultChecked
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="email-messages"
                                        label="New messages from students"
                                        className="text-white-50 mb-3"
                                        defaultChecked
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="email-reviews"
                                        label="Course reviews and ratings"
                                        className="text-white-50 mb-3"
                                        defaultChecked
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="email-weekly"
                                        label="Weekly performance summary"
                                        className="text-white-50 mb-3"
                                    />
                                </div>
                                <div className="mb-4">
                                    <h6 className="text-white mb-3">Push Notifications</h6>
                                    <Form.Check 
                                        type="switch"
                                        id="push-messages"
                                        label="Student messages"
                                        className="text-white-50 mb-3"
                                        defaultChecked
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="push-milestones"
                                        label="Course milestones"
                                        className="text-white-50 mb-3"
                                    />
                                </div>
                                <Button variant="primary" className="px-4">Save Preferences</Button>
                            </div>
                        )}

                        {activeSection === 'security' && (
                            <div>
                                <h4 className="fw-bold text-white mb-4">Security Settings</h4>
                                <Form>
                                    <h6 className="text-white mb-3">Change Password</h6>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Current Password</Form.Label>
                                        <Form.Control 
                                            type="password"
                                            style={{ background: '#161b26', borderColor: '#2b303b', color: '#fff' }}
                                            className="shadow-none"
                                        />
                                    </Form.Group>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-white-50">New Password</Form.Label>
                                                <Form.Control 
                                                    type="password"
                                                    style={{ background: '#161b26', borderColor: '#2b303b', color: '#fff' }}
                                                    className="shadow-none"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="text-white-50">Confirm New Password</Form.Label>
                                                <Form.Control 
                                                    type="password"
                                                    style={{ background: '#161b26', borderColor: '#2b303b', color: '#fff' }}
                                                    className="shadow-none"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" className="px-4 mb-4">Update Password</Button>
                                    
                                    <hr className="border-secondary my-4" />
                                    
                                    <h6 className="text-white mb-3">Two-Factor Authentication</h6>
                                    <p className="text-white-50 mb-3">Add an extra layer of security to your account</p>
                                    <Form.Check 
                                        type="switch"
                                        id="2fa-enable"
                                        label="Enable Two-Factor Authentication"
                                        className="text-white-50 mb-3"
                                    />
                                    <Button variant="outline-light" className="px-4">Configure 2FA</Button>
                                </Form>
                            </div>
                        )}

                        {activeSection === 'appearance' && (
                            <div>
                                <h4 className="fw-bold text-white mb-4">Appearance</h4>
                                <h6 className="text-white mb-3">Theme</h6>
                                <div className="d-flex gap-3 mb-4">
                                    <div className="p-4 rounded-3 border border-primary" style={{ background: '#0d121d', cursor: 'pointer', width: '150px' }}>
                                        <div className="bg-dark rounded-2 mb-2" style={{ height: '80px' }}></div>
                                        <p className="text-white text-center mb-0 small">Dark</p>
                                    </div>
                                    <div className="p-4 rounded-3 border border-secondary" style={{ background: '#0d121d', cursor: 'pointer', width: '150px', opacity: 0.5 }}>
                                        <div className="bg-light rounded-2 mb-2" style={{ height: '80px' }}></div>
                                        <p className="text-white text-center mb-0 small">Light</p>
                                    </div>
                                </div>
                                <h6 className="text-white mb-3">Display Options</h6>
                                <Form.Check 
                                    type="switch"
                                    id="compact-mode"
                                    label="Compact mode"
                                    className="text-white-50 mb-3"
                                />
                                <Form.Check 
                                    type="switch"
                                    id="animations"
                                    label="Enable animations"
                                    className="text-white-50 mb-3"
                                    defaultChecked
                                />
                                <Button variant="primary" className="px-4">Save Preferences</Button>
                            </div>
                        )}

                        {activeSection === 'billing' && (
                            <div>
                                <h4 className="fw-bold text-white mb-4">Billing & Payments</h4>
                                <div className="p-4 rounded-3 mb-4" style={{ background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)' }}>
                                    <h5 className="text-white mb-2">Total Earnings</h5>
                                    <h2 className="fw-bold text-white mb-0">$12,450</h2>
                                    <p className="text-white-50 mb-0 small">This month</p>
                                </div>
                                <h6 className="text-white mb-3">Payment Method</h6>
                                <div className="p-3 rounded-3 mb-3 d-flex justify-content-between align-items-center" style={{ background: '#161b26' }}>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-primary rounded-2 p-2">
                                            <CreditCard2FrontFill size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white mb-0 fw-bold">•••• •••• •••• 4242</p>
                                            <p className="text-white-50 mb-0 small">Expires 12/25</p>
                                        </div>
                                    </div>
                                    <Button variant="outline-light" size="sm">Edit</Button>
                                </div>
                                <Button variant="primary" className="px-4">Add Payment Method</Button>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default InstructorSettings;
