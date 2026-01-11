import React from 'react';
import { useParams } from 'react-router-dom';

const Order = () => {
  const { id } = useParams(); // Why: This grabs the Course ID from the URL

  return (
    <section className="size orm" style={{marginTop: "100px"}}>
      <div className="container" style={{maxWidth: "900px"}}>
        <div className="row g-5">
          {/* Left Side: Payment Form */}
          <div className="col-12 col-lg-7">
            <div className="rounded-4 p-4" style={{background: "#060C19", border: "1px solid #1c376dff"}}>
              <h2 className="text-white mb-4">Checkout</h2>
              <form>
                <div className="mb-3">
                  <label className="done mb-1">Cardholder Name</label>
                  <input type="text" className="form-control text-white border-0" style={{background:"#030E24", height:"45px"}} placeholder="John Doe" />
                </div>
                <div className="mb-3">
                  <label className="done mb-1">Card Number</label>
                  <input type="text" className="form-control text-white border-0" style={{background:"#030E24", height:"45px"}} placeholder="**** **** **** ****" />
                </div>
                <div className="row">
                    <div className="col-6 mb-3">
                        <label className="done mb-1">Expiry</label>
                        <input type="text" className="form-control text-white border-0" style={{background:"#030E24", height:"45px"}} placeholder="MM/YY" />
                    </div>
                    <div className="col-6 mb-3">
                        <label className="done mb-1">CVC</label>
                        <input type="text" className="form-control text-white border-0" style={{background:"#030E24", height:"45px"}} placeholder="123" />
                    </div>
                </div>
                <button className="w-100 py-3 rounded-4 mt-4" style={{background: "#8662FF", fontWeight: "600", color: "white", border: "none"}}>
                  Complete Purchase
                </button>
              </form>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="col-12 col-lg-5">
            <div className="rounded-4 p-4" style={{background: "#030E24"}}>
              <h4 className="text-white mb-4">Order Summary</h4>
              <div className="d-flex justify-content-between orm mb-2">
                <span>Course ID:</span>
                <span className="text-white">{id}</span>
              </div>
              <div className="d-flex justify-content-between orm mb-2">
                <span>Subtotal:</span>
                <span className="text-white">$49.00</span>
              </div>
              <hr className="text-white" />
              <div className="d-flex justify-content-between text-white fw-bold fs-5">
                <span>Total:</span>
                <span>$49.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;