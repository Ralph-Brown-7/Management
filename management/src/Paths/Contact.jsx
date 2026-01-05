import React from 'react'

const Contact = () => {
  return (
    <section>
        <section className='orm size mt-5'>
            <div className='text-center'>
                <h1 className='text-white'>Contact Us</h1>
                <p className='fs-5'>Flexible and affordable pricing to help you gain new skills without stress  <br />here to help.</p>
            </div>
            <div className='container mt-5 rounded-5 py-5 ps-5'style={{background:"#060C19"}}>
                <div className='row'>
                    <div className='col-12 col-lg-6'>
                        <div className='rounded-4 ps-5 py-5' style={{background:"#030E24",maxWidth:"500px"}}>
                            <div className='mb-4'>
                                <h1 className='done new'>Send Us a message</h1>
                                <p>Fill out the form and we'll get back to you as soon as possible.</p>
                            </div>
                            <form action="">
                                <div>
                                    <label htmlFor="Full Name" className='done'>Full Name</label>
                                    <br />
                                    <input  className='rounded-3 mb-3 ps-3' type="Name" name='Full Name' id='Full Name' placeholder='Full Name' style={{width:"370px", background:"#060C19", height:"40px"}}/>
                                </div>
                                <div>
                                    <label htmlFor="email" className='done'>Email</label>
                                    <br />
                                    <input type="email" className='rounded-3  mb-3 ps-3' name='email' id='email' placeholder='Your Email'style={{width:"370px", background:"#060C19", height:"40px"}}/>
                                </div>
                                <div>
                                    <label htmlFor="Subject" className='done'>Subject</label>
                                    <br />
                                    <input type="text" name='Subject' className='rounded-3 mb-5 ps-3' id='Subject' placeholder='Write Your Message...' style={{width:"370px", background:"#060C19", height:"150px", paddingBottom:"90px"}}/>
                                </div>
                                <button className='py-3 px-5 rounded-4 ms-5' style={{fontWeight:"600", background:"#8662FF"}}>Send Message</button>
                            </form>
                        </div>
                    </div>
                    <div className='col-12 col-lg-6'>
                        <div className='' style={{maxWidth:"500px"}}>
                            <div>
                                <h1 className='done new'>Get In Touch</h1>
                                <p>Reach us through any of the channels below. We're always happy to assist.</p>
                            </div>
                            <div className='rounded-4 ps-3 py-4 mb-5 mt-5' style={{background:"#030E24"}}>
                                <h1 className='done'>Email</h1>
                                <p>raphaelutenge@gmail.com</p>
                            </div>
                            <div className='rounded-4 ps-3 py-4 mb-5' style={{background:"#030E24"}}>
                                <h1 className='done'>Address</h1>
                                <p>123 Learning Street, Knowledge City Worldwide</p>
                            </div>
                            <div className='rounded-4 ps-3 py-4 mb-5' style={{background:"#030E24"}}>
                                <h1 className='done'>Working Hours</h1>
                                <p>Mon - Fri: 9am - 6pm <br />Sat: 10am - 4pm</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
  )
}

export default Contact
