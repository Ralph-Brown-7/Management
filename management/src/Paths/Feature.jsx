import React from 'react'
import { Link } from 'react-router-dom'
import '../Style/Feature.css'

const Feature = () => {
  return (
    <section className='size orm'>
      <section>
        <div className='text-center mt-5'>
          <h1 className='text-white'>Powerful Features for Smarter Learning</h1>
          <p>Explore the tools that make E-Learn a modern, efficient learning management <br />system.</p>
        </div>
        <div className='rounded-5 border-1 mx-auto mt-5 px-5 pt-5 pb-5' style={{maxWidth:"1150px", background:"#060C19"}}>
          <div className='container'>
            <div className='row gy-4'>
              <div className='col-12 col-md-6 col-lg-4'>
                <div className='rounded-4 px-3 py-3' style={{background:"#030E24", maxWidth:"400px"}}>
                  <div className='fs-1'>📚</div>
                  <h1 className='bear fs-3'>Comprehensive Course Library</h1>
                  <p>Access hundreds of high-quality courses across programming, business, design, and more.</p>
                </div>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div className='rounded-4 px-3 pt-3 pb-5' style={{background:"#030E24", maxWidth:"400px"}}>
                  <div className='fs-1'>🎯</div>
                  <h1 className='bear fs-3'>Interactive Learning</h1>
                  <p>Quizzes, assignments, and hands-on projects to help you master every skill.</p>
                </div>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div className='rounded-4 px-3 pt-3' style={{background:"#030E24", maxwidth:"400px", paddingBottom:"69px"}}>
                  <div className='fs-1'>📱</div>
                  <h1 className='bear fs-3'>Mobile-Friendly UI</h1>
                  <p>Learn from anywhere with a fully responsive and optimized interface.</p>
                </div>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div className='rounded-4 px-3 pt-3 pb-5' style={{background:"#030E24", maxWidth:"400px"}}>
                  <div className='fs-1'>🔒</div>
                  <h1 className='bear fs-3'>Secure & Reliable</h1>
                  <p>Your data and progress are safely stored using industry-grade security.</p>
                </div>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div className='rounded-4 px-3 pt-3' style={{background:"#030E24", maxWidth:"400px", paddingBottom:"70px"}}>
                  <div className='fs-1'>🏆</div>
                  <h1 className='bear fs-3'>Certificates</h1>
                  <p>Earn professional certificates when you complete any course.</p>
                </div>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div className='rounded-4 px-3 pt-3' style={{background:"#030E24", maxWidth:"400px", paddingBottom:"70px"}}>
                  <div className='fs-1'>🧑‍🏫</div>
                  <h1 className='bear fs-3'>Expert Instructors</h1>
                  <p>Learn from industry professionals with real-world experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='size mt-5'>
        <div className='text-center rounded-5 n n n n  mb-5 py-5 mx-auto' style={{background:"#060C19", maxWidth:"1150px"}}>
          <h1 className='bear fs-2'>Start Learning Today</h1>
          <p>Join thousands of learners upgrading their skills on E-Learn.</p>
          <button className='rounded-3 py-3 fs-5 mt-3 px-4' style={{background:"linear-gradient(to right, #1798F8, #05CEFF)"}}>Get Started</button>
        </div>
      </section>
    </section>
  )
}

export default Feature
