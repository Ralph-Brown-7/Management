import React from 'react'

const Pricing = () => {
  return (
    <section>
       <section className='mt-5 size orm'>
        <div className='text-center'>
            <h1 className='text-white' style={{fontWeight:"600"}}>Choose Your Learning Plan</h1>
            <p>Flexible and affordable pricing to help you gain new skills without stress.</p>
        </div>
        <div className='mx-auto rounded-5 mt-5 ps-4 py-5' style={{maxWidth:"1150px", background:"#060C19"}}>
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
        </div>
        </section>
        <section className='size orm mt-5'>
            <div>
                <h1 className='text-white new fs-3' style={{fontWeight:"600", marginLeft:"100px"}}>Frequently Asked Questions</h1>
            </div>
            <div className='mt-5'>
                <div className='rounded-4 mx-auto ps-5 py-4 mb-3' style={{maxWidth:"1150px", background:"#030E24"}}>
                    <h1 className='done new'>Can I cancel anytime?</h1>
                    <p>Yes, you can cancel your subscription at any time from your account settings.</p>
                </div>
                <div className='rounded-4 mx-auto ps-5 py-4 mb-3' style={{maxWidth:"1150px", background:"#030E24"}}>
                    <h1 className='done new'>Do you offer refunds?</h1>
                    <p>Refunds are available only within the first 7 days of your subscription.</p>
                </div>
                <div className='rounded-4 mx-auto ps-5 py-4 mb-3' style={{maxWidth:"1150px", background:"#030E24"}}>
                    <h1 className='done new'>Are certificates included?</h1>
                    <p>Certificates are available starting from the Standard plan.</p>
                </div>
            </div>
        </section>
    </section>
  )
}

export default Pricing
