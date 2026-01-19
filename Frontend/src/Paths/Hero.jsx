import React from 'react'
import { Link } from 'react-router-dom'
import '../Style/Hero.css'
import { useState, useRef, useEffect } from "react";



const Hero = () => {    
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);


    useEffect(() => {

    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [open]);
  return (
    <section>
        <section className='d-flex align-items-center'>
           <section>
                
           </section>
        <section  className='text-white border border-0 rounded-4 ps-5 pt-5 pb-5'>
            <div>
                <h1>Learn the skills employers actually want - at your pace.</h1>
                <p className='mt-3 get'>Self-paced courses, instructor-led cohorts, assessments, certificates and analytics for organisations and individuals.</p>
            </div>
            <div>
                <input type="search" className='w-75 mt-5 hemp rounded-3 py-2 ps-1' placeholder='Search something e.g."Python for data '/>
                <button className='ms-5 py-2 px-2 rounded-3 border-0 search'>Search</button>
            </div>
            <div className='d-flex '>
                <div className='here border-0 rounded-3 me-4 px-3 py-0 pt-1 g-0'>
                    <p className='done m-0'>12,480</p>
                    <p className='orm'>Learners</p>
                </div>
                <div className='here border-0 rounded-3 me-4 px-3 py-0 pt-1'>
                    <p className='done m-0'>980</p>
                    <p className='orm'>Courses</p>
                </div>
                <div className='here border-0 rounded-3 px-3 py-0 pt-1'>
                    <p className='done m-0'>450</p>
                    <p className='orm'>Instructors</p>
                </div>
            </div>
            <div className='d-flex mt-4'>
                <div className='round'>
                    <p className='done'>Track progress</p>
                    <p className='name'>Quizzes, <br />assignments & <br />completion analytics</p>
                </div>
                <div className='round'>
                    <p className='done'>Certificates</p>
                    <p className='name'>Auto-issued on completion</p>
                </div>
                <div className='round'>
                    <p className='done'>Team & Reports</p>
                    <p className='name'>Admin dashboards & usage export</p>
                </div>
            </div>
        </section>
        <section className='bomb ms-1 rounded-4 px-4 py-5'>
        <div>
            <p className='done new'>Continue Learning</p>
            <p className='orm'>Data Science Foundations — Module 3</p>
        </div>
        <span className='gradient'></span>
        <div className='d-flex align-items-center justify-content-between'>
            <p className='fear orm'>Next lesson</p>
            <p className='done new'>Linear Regression</p>
        </div>
        <div className='d-flex align-items-center'>
            <span className='deal text-black fw-bold'>DS</span>
            <div className='height ms-2 mt-3'>
                <p className='done'>Professor  Ifreke</p>
                <p className='orm'>Estimated 18 minutes</p>
            </div>
        </div>
        </section>
        </section>
        <section className='mt-5 yeah'>
            <div className='d-flex justify-content-between m-auto'style={{maxWidth:"1100px"}}>
                <h1 className='done'>Popular courses</h1>
                <p className='orm'>Showing 6 results</p>
            </div>
            <div className='container'style={{maxWidth:"1250px"}}>
                <div className='row g-4'>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className='level'>
                            <div className='bulb'>
                                <p className='done new'>Python for Data Science</p>
                            </div>
                            <p className='done new'style={{margin:"0"}}>Python for Data Science</p>
                            <p  className='orm'>Chioma Okoro • 6h 20m</p>
                            <span className='me-3 text-white border-0 rounded-pill'style={{background:"#051B48", padding:"1px 4px"}}>Beginner</span>
                            <span  className='border-0 text-white rounded-pill'style={{background:"#051B48", padding:"1px 4px"}}>Data</span>
                            <br />
                            <button className='mt-4 text-black border-0 rounded-4 btn btn-primary' style={{padding:"5px", background:"#051B48", fontSize:"12px", marginRight:"200px"}}>Preview</button>
                            <button  className='mt-4 text-black border-0 rounded-3 btn btn-primary'>Enroll</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className='level'>
                            <div className='bulb'>
                                <p className='done new'>Full‑stack Web Development</p>
                            </div>
                            <p className='done new'style={{margin:"0"}}>Full‑stack Web Development</p>
                            <p  className='orm'>Gabriel N. • 14h 10m</p>
                            <span className='me-3 text-white border-0 rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Intermediate</span>
                            <span  className='border-0 text-white rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Web</span>
                            <br />
                            <button className='mt-4 text-black border-0 rounded-4 btn btn-primary' style={{padding:"20px 40px,", background:"#051B48", fontSize:"14px", marginRight:"200px"}}>Preview</button>
                            <button  className='mt-4 text-black border-0 rounded-3 btn btn-primary'>Enroll</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className='level'>
                            <div className='bulb'>
                                <p className='done new'>UX Design Fundamentals</p>
                            </div>
                            <p className='done new'style={{margin:"0"}}>UX Design Fundamentals</p>
                            <p  className='orm'>Myles Daniel • 6h 20m</p>
                            <span className='me-3 text-white border-0 rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Beginner</span>
                            <span  className='border-0 text-white rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Design</span>
                            <br />
                            <button className='mt-4 text-black border-0 rounded-4 btn btn-primary' style={{padding:"20px 40px,", background:"#051B48", fontSize:"14px", marginRight:"200px"}}>Preview</button>
                            <button  className='mt-4 text-black border-0 rounded-3 btn btn-primary'>Enroll</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className='level'>
                            <div className='bulb'>
                                <p className='done new'>Machine Learning A-Z</p>
                            </div>
                            <p className='done new'style={{margin:"0"}}>Machine Learning A-Z</p>
                            <p  className='orm'>Prof. Adebayo • 20h</p>
                            <span className='me-3 text-white border-0 rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Advanced</span>
                            <span  className='border-0 text-white rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Data</span>
                            <br />
                            <button className='mt-4 text-black border-0 rounded-4 btn btn-primary' style={{padding:"20px 40px,", background:"#051B48", fontSize:"14px", marginRight:"200px"}}>Preview</button>
                            <button  className='mt-4 text-black border-0 rounded-3 btn btn-primary'>Enroll</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className='level'>
                            <div className='bulb'>
                                <p className='done new'>Product Management Essentials</p>
                            </div>
                            <p className='done new'style={{margin:"0"}}>Product Management Essentials</p>
                            <p  className='orm'>Tunde K • 5h 40m</p>
                            <span className='me-3 text-white border-0 rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Intermediate</span>
                            <span  className='border-0 text-white rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Business</span>
                            <br />
                            <button className='mt-4 text-black border-0 rounded-4 btn btn-primary' style={{padding:"20px 40px,", background:"#051B48", fontSize:"14px", marginRight:"200px"}}>Preview</button>
                            <button  className='mt-4 text-black border-0 rounded-3 btn btn-primary'>Enroll</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className='level'>
                            <div className='bulb'>
                                <p className='done new'>React.js — From Zero</p>
                            </div>
                            <p className='done new'style={{margin:"0"}}>React.js — From Zero</p>
                            <p  className='orm'>Lola A • 9h 30</p>
                            <span className='me-3 text-white border-0 rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Intermediate</span>
                            <span  className='border-0 text-white rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Web</span>
                            <br />
                            <button className='mt-4 text-black border-0 rounded-4 btn btn-primary' style={{padding:"20px 40px,", background:"#051B48", fontSize:"14px", marginRight:"200px"}}>Preview</button>
                            <button  className='mt-4 text-black border-0 rounded-3 btn btn-primary'>Enroll</button>
                        </div>
                    </div>
            
                </div>
            </div>
            
        </section>
        <section className='hurt'>
    <div className="p-4">

      
      <div
        style={{
          maxHeight: open ? contentHeight : 0,
          opacity: open ? 1 : 0,
        }}
        className="transition-all duration-500 overflow-hidden"
      >
        <div ref={contentRef} className='d-flex gap-3'>
          <div className='level ms-5'>
                <div className='bulb'>
                    <p className='done new'>Time Management Mastery</p>
                </div>
                <p className='done new'style={{margin:"0"}}>Time Management Mastery</p>
                <p  className='orm'>Adaora • 3h</p>
                <span className='me-3 text-white border-0 rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Beginner</span>
                <span  className='border-0 text-white rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Self Improvement   </span>
                <br />
                <button className='mt-4 text-black border-0 rounded-4 btn btn-primary' style={{padding:"20px 40px,", background:"#051B48", fontSize:"14px", marginRight:"200px"}}>Preview</button>
                <button  className='mt-4 text-black border-0 rounded-3 btn btn-primary'>Enroll</button>
            </div>
          <div className='level'>
                <div className='bulb'>
                    <p className='done new'>Advanced SQL</p>
                </div>
                <p className='done new'style={{margin:"0"}}>Advanced SQL</p>
                <p  className='orm'>Emmanuel N. • 14h 10m</p>
                <span className='me-3 text-white border-0 rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Advanced</span>
                <span  className='border-0 text-white rounded-pill'style={{background:"#051B48", padding:"5px", fontSize:"12px"}}>Data</span>
                <br />
                <button className='mt-4 text-black border-0 rounded-4 btn btn-primary' style={{padding:"20px 40px,", background:"#051B48", fontSize:"14px", marginRight:"200px"}}>Preview</button>
                <button  className='mt-4 text-black border-0 rounded-3 btn btn-primary'>Enroll</button>
            </div>
        </div>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="text-black panda px-1 py-1 rounded-4 mt-3 ms-5"
      >
        {open ? "Show Less" : "Show More"}
      </button>
      <span className='ms-3 orm'>Or browse by category:</span>
      <span className='ms-1 orm px-1 py-1 rounded-3' style={{background:"#051B48", fontSize:'13px'}}>Data</span>
      <span className='ms-1 orm px-1 py-1 rounded-3' style={{background:"#051B48", fontSize:'13px'}}>Design</span>
      <span className='ms-1 orm px-1 py-1 rounded-3' style={{background:"#051B48", fontSize:'13px'}}>Business</span>
    </div>        
    </section>
    <section className='hurt ms-5 mt-3 orm'>
        <p className='done new' style={{marginLeft:"100px"}}>What people say</p>
        <div className='container'>
        <div className='row g-4'>
        <div className='col-12 col-lg-6'>
        <div className='rounded-4 ps-3 py-4 pe-4'style={{background:"#060C19", width:"550px"}}>
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
        <div className='col-12 col-lg-6'>
        <div className='rounded-4 ps-3 py-4 pe-4'style={{background:"#060C19", width:"550px"}}>
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
        </div>
        </div>
    </section>
    <section className='hurt orm mb-5' style={{marginLeft:"60px"}}>
        <p className='done new mt-3'style={{marginLeft:"80px"}}>Pricing</p>
        <div className='container'>
            <div className='row g-3'>
                <div className='col-12 col-lg-4'>
                <div className='rounded-4 bg-black px-3 pt-3'style={{width:"300px", padding:"40px"}}>
                    <p className='done'>Individual</p>
                    <p>Free forever • limited courses</p>
                    <p className='text-white'><strong>$0</strong><span className='orm'>/ mo</span></p>
                    <ul>
                        <li>
                            <p className='m-0'>Access to basic courses</p>
                        </li>
                        <li>
                            <p className='m-0'>Community support</p>
                        </li>
                    </ul>
                    <button className='rounded-4 px-3 py-1' style={{background:"linear-gradient(to right, #1798F8, #05CEFF)"}}>Start Free</button>
                </div>
                </div>
                <div className='col-12 col-lg-4'>
                <div className='rounded-4 px-3 py-3'style={{width:"300px", background:"#060C19"}}>
                    <p className='done'>Pro</p>
                    <p>Most popular</p>
                    <p className='text-white'><strong>$12</strong><span className='orm'>/ mo</span></p>
                    <ul>
                        <li>
                            <p className='m-0'>All courses</p>
                        </li>
                        <li>
                            <p className='m-0'>Certificates & portfolios</p>
                        </li>
                        <li>
                            <p className='m-0'>Priority support</p>
                        </li>
                    </ul>
                    <button className='rounded-4 px-3 py-1' style={{background:"linear-gradient(to right, #1798F8, #05CEFF)"}}>Try Now</button>
                </div>
                </div>
            </div>
        </div>
    </section>
    </section>
  )
}

export default Hero
