import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import course from './Data';

const Courses = () => {

  const [first] = useState(course);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const filteredCourses = first.filter((done) => {
    const matchesSearch = done.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || done.category === category;
    const matchesLevel = level === "All" || done.level === level;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <section>
      <section>
        <div className='text-center size my-5'>
          <h1 className='text-white m-0'>Explore Our Curriculum</h1>
          <p className='orm'>Standardized courses taught by industry experts.</p>
        </div>

        <div>
          <div className='container'>
            <div className="row mb-4">
              <div className="col-md-4 mb-2">
                <input
                  className="w-100 h-100 ps-3 rounded-3"
                  placeholder="Search course..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{backgroundColor:"#060C19", color:"white"}}
                 />
              </div>

              <div className="col-md-4 mb-2">
                <select
                  className="w-100 h-100 border-2 ps-3 rounded-3"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{backgroundColor:"#060C19", color:"white"}}
                >
                  <option value="All">All Categories</option>
                  <option value="Data">Data</option>
                  <option value="Web">Web</option>
                  <option value="Design">Design</option>
                  <option value="Software">Software</option>
                  <option value="Finance">Finance</option>
                  <option value="Self Improvement">Self Improvement</option>
                </select>
              </div>

              <div className="col-md-4 mb-2">
                <select
                  className="w-100 border-2 ps-3 rounded-3"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  style={{backgroundColor:"#060C19", color:"white", height:"40px"}}
                  
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className='row'>
              {filteredCourses.map((done, id) => {
                return (
                  <div key={id} className='col-12 col-md-6 col-lg-4'>
                    <div className='h-100% shadow-sm border-0 rounded-4' style={{ marginBottom: "30px", backgroundColor: "#030E24"}}>
                      <img
                        src={done.img}
                        alt=""
                        className=' mx-auto d-block pt-3 border-0 rounded-4'
                        style={{ height: '200px', objectFit: 'cover', width: "320px" }}
                      />
                      <h5 className='card-title ps-4 pt-3 done new'>{done.title}</h5>
                      <p className='orm ps-4 pt-2'>{done.instructor}</p>
                      <p className='done ms-4'>
                        Price:
                        <strong className='done' style={{ paddingLeft: "225px" }}>${done.price}</strong>
                      </p>
                      <div className='orm d-flex justify-content-between mx-auto mt-3' style={{ width: "310px" }}>
                        <span className='border-0 rounded-4 py-1 px-2' style={{ backgroundColor: "#051B48" }}>{done.category}</span>
                        <span className='border-0 rounded-4 py-1 px-2' style={{ backgroundColor: "#051B48" }}>{done.level}</span>
                      </div>
                      <div className='d-flex justify-content-between mt-4 mx-auto' style={{ width: "300px", paddingBottom: "20px" }}>
                        <Link to={`/course/${done.id}`} className='text-decoration-none text-black py-1 px-2 border-0 rounded-3 near' style={{ backgroundColor: "#051B48" }}>Preview</Link>
                        <Link className='text-decoration-none text-black py-1 px-2 border-0 rounded-3 nearer' style={{ backgroundColor: "#0d6efd" }}>Enroll</Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>
    </section>
  );
};

export default Courses;
