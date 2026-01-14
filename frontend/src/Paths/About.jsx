import { motion } from 'framer-motion'
import { CheckCircle, Users, Globe, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="text-white pb-5"
    >
      {/* Hero Section */}
      <div className="container py-5 mt-4">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="display-4 fw-bold mb-4" style={{ background: "linear-gradient(to right, #8662FF, #4EBCC8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Revolutionizing Education for Everyone
              </h1>
              <p className="lead" style={{ color: "#B0B0B0", lineHeight: "1.8" }}>
                At LearnFlow, we believe education is the key to unlocking human potential. We are dedicated to providing accessible, high-quality learning experiences that empower individuals to achieve their dreams.
              </p>
            </motion.div>
          </div>
          <div className="col-lg-6">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop"
              alt="Students learning"
              className="img-fluid rounded-4 shadow-lg"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            />
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="container py-5 rounded-5 my-5" style={{ background: "#060C19" }}>
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <motion.h2 
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               className="fw-bold mb-3"
            >
                Our Mission
            </motion.h2>
            <motion.p 
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               style={{ color: "#B0B0B0" }}
            >
              To democratize education by connecting learners with world-class experts and creating a community where knowledge knows no boundaries.
            </motion.p>
          </div>
        </div>

        <div className="row g-4 px-4 text-center">
          {[
            { icon: Users, title: "Community First", text: "Fostering a supportive network of learners and mentors." },
            { icon: CheckCircle, title: "Quality Content", text: "Curated courses tailored to industry standards." },
            { icon: Globe, title: "Global Access", text: "Breaking geographical barriers for education." },
            { icon: Award, title: "Empowerment", text: "Giving you the tools to succeed in your career." },
          ].map((item, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-4 h-100"
                style={{ background: "#030E24" }}
              >
                <item.icon size={40} className="mb-3" style={{ color: "#8662FF" }} />
                <h5 className="fw-bold mb-2">{item.title}</h5>
                <p className="small text-secondary m-0">{item.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story - "Lengthy but not much" */}
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-5 order-lg-2">
             <motion.img
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
              alt="Our Story"
              className="img-fluid rounded-4 shadow-lg"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            />
          </div>
          <div className="col-lg-7 order-lg-1">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="fw-bold mb-4">Our Story</h2>
              <p style={{ color: "#B0B0B0", lineHeight: "1.8", marginBottom: "1.5rem" }}>
                LearnFlow started as a small idea in a university dorm room. We noticed a disconnect between what was taught in classrooms and the skills actually demanded by the modern workforce. Students were graduating with degrees but lacking the practical, hands-on experience needed to thrive in fast-paced industries like tech, design, and data science.
              </p>
              <p style={{ color: "#B0B0B0", lineHeight: "1.8", marginBottom: "1.5rem" }}>
                Determined to bridge this gap, we gathered a team of passionate educators and industry veterans to build a platform that focused on *doing*, not just listening. We started with just three courses and a handful of students. Today, we are proud to serve over 12,000 learners from across the globe.
              </p>
              <p style={{ color: "#B0B0B0", lineHeight: "1.8", marginBottom: "2rem" }}>
                Our journey hasn't been without challenges, but every success story—every student who lands their dream job or launches their own startup—fuels our commitment. We are constantly evolving, adding new technologies like AI-driven learning paths and interactive coding environments, to ensure our learners stay ahead of the curve.
              </p>
              <Link to="/signup" className='rounded-4 px-4 py-2 border-0 text-white fw-bold text-decoration-none' style={{ background: "linear-gradient(to right, #1798F8, #05CEFF)" }}>Join Our Journey</Link>
            </motion.div>
          </div>
        </div>
      </div>
      
    </motion.section>
  )
}

export default About
