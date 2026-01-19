import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import course from "./Data";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = course.find((c) => c.id === parseInt(id));
  if (!item)
    return <div className="container mt-5 text-white">Course not found.</div>;

  const handleEnroll = () => {
    // Check if user is logged in by checking for token in sessionStorage
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      // User is not logged in, redirect to signup page
      navigate("/get-started");
    } else {
      // User is logged in, proceed with enrollment
      // TODO: Add enrollment API call here
      alert("Enrollment feature coming soon!");
    }
  };

  return (
    <section>
      <div className="my-5">
        <Link
          to="/courses"
          className="ms-4 text-decoration-none done py-2 px-5 border rounded-3 border-0"
          style={{ background: "linear-gradient(to right, #1798F8, #05CEFF)" }}
        >
          Back
        </Link>
      </div>
      <div className="container pt-5 text-white">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="fw-bold mb-3">{item.title}</h1>
            <span className="badge bg-primary px-3 py-2 mb-4">
              {item.category}
            </span>

            <div
              className="rounded-4 overflow-hidden mb-5"
              style={{ height: "350px" }}
            >
              <img
                src={item.img}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="mt-5">
              <h3 className=" sizes pb-2">About this course</h3>
              <p className="lead mt-3 size orm">{item.description}</p>
            </div>

            <div className="mt-5 size">
              <h4 className="sizes">What you will learn:</h4>
              <ul className="row list-unstyled mt-3">
                {item.willLearn &&
                  item.willLearn.map((point, index) => (
                    <li key={index} className="col-md-6 mb-3 orm">
                      <span className="text-success me-2">✅</span> {point}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-4 size">
            <div
              className="card p-4 shadow-lg border-0"
              style={{ backgroundColor: "#030E24", borderRadius: "20px" }}
            >
              <h2 className="text-white fw-bold">${item.price}</h2>
              <p className="orm small">Instructor: {item.instructor}</p>
              <p className="orm small">Duration: {item.duration}</p>
              <button onClick={handleEnroll} className="btn btn-primary btn-lg w-100 mt-3 rounded-pill">
                Enroll Now
              </button>
              <p className="text-center  mt-3 small orm">
                30-Day Money-Back Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
