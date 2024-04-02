import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  console.log("2");
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        throw new Error("User email not found in localStorage");
      }

      const response = await fetch(
        "http://localhost:5002/api/auth/myOrderData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order data");
      }

      const responseData = await response.json();
      setOrderData(responseData);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          {Object.keys(orderData).length !== 0 &&
            orderData.orderData &&
            orderData.orderData.order_data &&
            orderData.orderData.order_data
              .slice(0)
              .reverse()

              .map(
                (order, index) => (
                  console.log("a"),
                  (
                    <div key={index} className="col-12 col-md-6 col-lg-3">
                      <div
                        className="card mt-3"
                        style={{ width: "16rem", maxHeight: "360px" }}
                      >
                        <img
                          src={order.img}
                          className="card-img-top"
                          alt="..."
                          style={{ height: "120px", objectFit: "fill" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{order.name}</h5>
                          <div
                            className="container w-100 p-0"
                            style={{ height: "38px" }}
                          >
                            <span className="m-1">{order.qty}</span>
                            <span className="m-1">{order.size}</span>
                            <span className="m-1">{order.Order_date}</span>
                            <div className=" d-inline ms-2 h-100 w-20 fs-5">
                              ₹{order.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
