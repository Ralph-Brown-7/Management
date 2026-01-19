import React, { useState } from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { Search, Send, Paperclip, EmojiSmileFill, ThreeDotsVertical } from 'react-bootstrap-icons';

const InstructorMessages = () => {
    const [selectedConversation, setSelectedConversation] = useState(0);
    const [messageText, setMessageText] = useState('');

    // Mock conversations
    const conversations = [
        {
            id: 1,
            name: 'Sarah Johnson',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0066FF&color=fff',
            lastMessage: 'Thank you for the feedback on my assignment!',
            time: '2m ago',
            unread: 2,
            online: true
        },
        {
            id: 2,
            name: 'Michael Chen',
            avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=10B981&color=fff',
            lastMessage: 'When is the next live session?',
            time: '1h ago',
            unread: 0,
            online: true
        },
        {
            id: 3,
            name: 'Emma Davis',
            avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=F59E0B&color=fff',
            lastMessage: 'I have a question about Module 3',
            time: '3h ago',
            unread: 1,
            online: false
        },
        {
            id: 4,
            name: 'James Wilson',
            avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=8B5CF6&color=fff',
            lastMessage: 'Great course! Really enjoying it.',
            time: '1d ago',
            unread: 0,
            online: false
        }
    ];

    // Mock messages
    const messages = [
        {
            id: 1,
            sender: 'student',
            text: 'Hi Professor! I have a question about the assignment.',
            time: '10:30 AM'
        },
        {
            id: 2,
            sender: 'instructor',
            text: 'Of course! What would you like to know?',
            time: '10:32 AM'
        },
        {
            id: 3,
            sender: 'student',
            text: 'I\'m not sure how to approach question 3. Could you give me a hint?',
            time: '10:35 AM'
        },
        {
            id: 4,
            sender: 'instructor',
            text: 'Think about the concepts we covered in Module 2. The answer is related to data normalization.',
            time: '10:40 AM'
        },
        {
            id: 5,
            sender: 'student',
            text: 'Thank you for the feedback on my assignment!',
            time: '11:15 AM'
        }
    ];

    const handleSendMessage = () => {
        if (messageText.trim()) {
            // Handle send logic here
            setMessageText('');
        }
    };

    return (
        <div style={{ height: 'calc(100vh - 150px)' }}>
            <div className="mb-4">
                <h1 className="fw-bold mb-2 text-white">Messages</h1>
                <p className="text-white-50">Communicate with your students</p>
            </div>

            <Row className="g-0" style={{ height: 'calc(100% - 80px)' }}>
                {/* Conversations List */}
                <Col md={4} className="border-end border-dark" style={{ height: '100%', overflowY: 'auto' }}>
                    <div className="p-3" style={{ background: '#0d121d' }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text style={{ background: '#161b26', borderColor: '#2b303b' }} className="text-white-50 border-end-0">
                                <Search />
                            </InputGroup.Text>
                            <Form.Control 
                                placeholder="Search conversations..." 
                                style={{ background: '#161b26', borderColor: '#2b303b', color: '#fff' }} 
                                className="border-start-0 shadow-none"
                            />
                        </InputGroup>

                        {conversations.map((conv, index) => (
                            <div 
                                key={conv.id}
                                onClick={() => setSelectedConversation(index)}
                                className={`p-3 rounded-3 mb-2 cursor-pointer position-relative ${selectedConversation === index ? 'bg-primary bg-opacity-10' : ''}`}
                                style={{ 
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                    background: selectedConversation === index ? 'rgba(0,102,255,0.1)' : 'transparent'
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedConversation !== index) {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedConversation !== index) {
                                        e.currentTarget.style.background = 'transparent';
                                    }
                                }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div className="position-relative">
                                        <img src={conv.avatar} alt={conv.name} className="rounded-circle" width="48" height="48" />
                                        {conv.online && (
                                            <div className="position-absolute bottom-0 end-0 bg-success rounded-circle" 
                                                 style={{ width: '12px', height: '12px', border: '2px solid #0d121d' }}></div>
                                        )}
                                    </div>
                                    <div className="flex-grow-1" style={{ minWidth: 0 }}>
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <h6 className="fw-bold text-white mb-0" style={{ fontSize: '14px' }}>{conv.name}</h6>
                                            <span className="text-white-50 small">{conv.time}</span>
                                        </div>
                                        <p className="text-white-50 mb-0 small text-truncate">{conv.lastMessage}</p>
                                    </div>
                                    {conv.unread > 0 && (
                                        <div className="badge bg-primary rounded-pill">{conv.unread}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>

                {/* Message Thread */}
                <Col md={8} className="d-flex flex-column" style={{ height: '100%' }}>
                    {/* Chat Header */}
                    <div className="p-4 border-bottom border-dark" style={{ background: '#0d121d' }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <img src={conversations[selectedConversation].avatar} alt="" className="rounded-circle" width="40" height="40" />
                                <div>
                                    <h5 className="fw-bold text-white mb-0">{conversations[selectedConversation].name}</h5>
                                    <p className="text-white-50 mb-0 small">
                                        {conversations[selectedConversation].online ? 'Online' : 'Offline'}
                                    </p>
                                </div>
                            </div>
                            <button className="btn btn-link text-white-50">
                                <ThreeDotsVertical size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-grow-1 p-4" style={{ overflowY: 'auto', background: '#040b14' }}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`mb-4 d-flex ${msg.sender === 'instructor' ? 'justify-content-end' : 'justify-content-start'}`}>
                                <div style={{ maxWidth: '70%' }}>
                                    <div 
                                        className={`p-3 rounded-4 ${msg.sender === 'instructor' ? 'bg-primary' : 'bg-secondary bg-opacity-25'}`}
                                        style={{ 
                                            borderBottomRightRadius: msg.sender === 'instructor' ? '4px' : '16px',
                                            borderBottomLeftRadius: msg.sender === 'student' ? '4px' : '16px'
                                        }}
                                    >
                                        <p className="text-white mb-0">{msg.text}</p>
                                    </div>
                                    <p className={`text-white-50 small mt-1 mb-0 ${msg.sender === 'instructor' ? 'text-end' : 'text-start'}`}>
                                        {msg.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-top border-dark" style={{ background: '#0d121d' }}>
                        <div className="d-flex align-items-center gap-3">
                            <button className="btn btn-link text-white-50 p-0">
                                <Paperclip size={20} />
                            </button>
                            <button className="btn btn-link text-white-50 p-0">
                                <EmojiSmileFill size={20} />
                            </button>
                            <Form.Control 
                                placeholder="Type a message..." 
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                style={{ background: '#161b26', borderColor: '#2b303b', color: '#fff' }} 
                                className="shadow-none"
                            />
                            <button 
                                className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" 
                                style={{ width: '40px', height: '40px' }}
                                onClick={handleSendMessage}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default InstructorMessages;
