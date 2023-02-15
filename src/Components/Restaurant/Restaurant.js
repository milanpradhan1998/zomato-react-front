import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Common/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import jwtDecode from "jwt-decode";

export default function Restaurant() {
  let getLoginDetails = () => {
    // read local storage
    let logToken = localStorage.getItem("logToken");

    if (logToken == null) {
      return false;
    } else {
      try {
        let decodeLogToken = jwtDecode(logToken);
        console.log(decodeLogToken);
        return decodeLogToken;
      } catch (error) {
        //remove from local storage
        localStorage.removeItem("logToken");
        return false;
      }
    }
  };
  let logOut = () => {
    let doLogOut = window.confirm("Do you want to logout?");
    if (doLogOut == true) {
      localStorage.removeItem("logToken");
      window.location.assign("/");
    }
  };
  let [user, setUser] = useState(getLoginDetails());

  let { _id } = useParams();
  let defaultRestData = {
    aggregate_rating: "",
    city: "",
    city_id: 0,
    contact_number: "",
    cuisine: [],
    cuisine_id: [],
    image: "/images/rest image.jpg",
    locality: "",
    location_id: 0,
    mealtype_id: 0,
    min_price: 0,
    name: "",
    rating_text: "",
    thumb: [],
    _id: "",
  };
  let [restaurantDetailsToggle, setrestaurantDetailsToggle] = useState(true);
  let [restDetail, setRestDetaul] = useState({ ...defaultRestData });
  let [totalPrice, setTotalPrice] = useState(0);
  let getRestaurantDetailsById = async () => {
    let url = "http://localhost:8800/api/get-restaurant-list/" + _id;
    let { data } = await axios.get(url);
    console.log(data);
    if (data.status == true) {
      setRestDetaul({ ...data.restaurant });
    } else {
      setRestDetaul({ ...data.defaultRestData });
    }
  };
  let [menuList, setMenuList] = useState([]);
  let getMenuItem = async () => {
    console.log("menu item click");
    let url = "http://localhost:8800/api/get-menu-items/" + _id;
    let { data } = await axios.get(url);
    console.log(data.restaurant);
    if (data.status === true) {
      setMenuList([...data.restaurant]);
    } else {
      setMenuList([]);
    }
    setTotalPrice(0);
  };
  let addItem = (index) => {
    let _menuList = [...menuList];
    _menuList[index].qty += 1;
    setMenuList(_menuList);
    setTotalPrice(totalPrice + _menuList[index].price);
  };
  let removeItem = (index) => {
    let _menuList = [...menuList];
    _menuList[index].qty -= 1;
    setMenuList(_menuList);
    setTotalPrice(totalPrice - _menuList[index].price);
  };

  let makePayment = async () => {
    let userOrder = menuList.filter((menu) => menu.qty > 0);

    let url = "http://localhost:8800/api/gen-order-id";
    let { data } = await axios.post(url, { amount: totalPrice });
    if (data.status === false) {
      alert("unable to generate order");
      return false;
    }
    console.log(data);
    let { order } = data;

    var options = {
      key: "rzp_test_3q3QzuvllX2NXs", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Zomato payment",
      description: "Make payment",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        var verifyPayment = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
          name: user.name,
          email: user.email,
          mobile: 777777777,
          order_list: userOrder,
          totalAmount: totalPrice,
        };
        let { data } = await axios.post(
          "http://localhost:8800/api/verify-payment",
          verifyPayment
        );
        if (data.status === true) {
          alert("payment success");
          window.location.assign("/");
        } else {
          alert("payment fail!!");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);

    rzp1.open();
  };

  useEffect(() => {
    getRestaurantDetailsById();
  }, []);
  return (
    <>
      <Header bg="bg-danger" />
      {/* user info model */}

      <div
        className="modal fade"
        id="userInfo"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                User detail's
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={user.name}
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="User email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={user.email}
                />
                <span className="input-group-text" id="basic-addon2">
                  @example.com
                </span>
              </div>

              <div className="input-group">
                <span className="input-group-text">Address</span>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#menuModal"
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={makePayment}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* gallery model div */}
      <div
        className="modal fade "
        id="gallery"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" style={{ height: "75vh" }}>
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body h-75">
              <Carousel showThumbs={false} infiniteLoop={true}>
                {restDetail.thumb.map((val, indx) => {
                  console.log(val);
                  return (
                    <div key={indx} className="w-100">
                      <img src={"/images/" + val} />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      {/* menu items */}
      <div
        className="modal fade "
        id="menuModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {restDetail.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* items */}
              {menuList.map((val, index) => {
                return (
                  <div
                    key={val._id}
                    className="d-flex mx-2 border-bottom border-1 border-secondary"
                  >
                    <div className="p-2">
                      <h5>{val.name}</h5>
                      <p className="m-0">
                        &#8377; <span>{val.price}</span>
                      </p>
                      <p>{val.description}</p>
                    </div>
                    <div
                      className=" position-relative"
                      style={{ height: "100px" }}
                    >
                      <img
                        className="rounded rounded-2 "
                        src={"/images/" + val.image}
                        style={{ width: "100px", height: "100px" }}
                      />
                      <div className=" itemAdd w-100 d-flex align-items-center flex-column position-absolute  ">
                        <div>
                          {val.qty === 0 ? (
                            <button
                              className="btn bg-success text-white px-1 border-1"
                              onClick={() => {
                                addItem(index);
                              }}
                            >
                              Add
                            </button>
                          ) : (
                            <div className="bg-white border border-1">
                              <button
                                className="bg-danger"
                                onClick={() => {
                                  removeItem(index);
                                }}
                              >
                                --
                              </button>
                              <span> {val.qty} </span>
                              <button
                                className="bg-success"
                                onClick={() => {
                                  addItem(index);
                                }}
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div>
                <p className="bold fs-5">
                  Subtotal:&#8377; <span>{totalPrice}</span>
                </p>
              </div>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#userInfo"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="ful-img col-12 col-lg-10 mx-auto px-2 mt-1 m-0 ">
        <img src={"/images/" + restDetail.image} />
        <div className=" online-order ">
          <button
            className="btn btn-light text-dark "
            data-bs-toggle="modal"
            data-bs-target="#gallery"
          >
            Click To Get Image Gallery
          </button>
        </div>
      </section>
      <section className="m-0 col-12 col-lg-10 mx-auto ">
        <div className="row m-0">
          <div className="col-6 col-lg-9 mt-3 ">
            <h3>{restDetail.name} </h3>
            <ul className="list-inline ">
              <li
                onClick={() => {
                  setrestaurantDetailsToggle(true);
                }}
                className="list-inline-item fw-bold"
              >
                Overview
              </li>
              <li
                onClick={() => {
                  setrestaurantDetailsToggle(false);
                }}
                className="list-inline-item fw-bold"
              >
                Contact
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mt-5 ">
            {user == false ? (
              <button className="btn btn-danger" disabled>
                Login to Place Order
              </button>
            ) : (
              <button
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#menuModal"
                onClick={getMenuItem}
              >
                Place Online Order
              </button>
            )}
          </div>
        </div>
      </section>
      <hr className="col-10 mx-auto bg-dark pt-1" />
      <section className="col-10 mx-auto m-0 mb-4 ">
        {restaurantDetailsToggle == true ? (
          <div>
            <h4>About This Place</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              deleniti ipsam, quam harum amet doloremque deserunt iure sit
              nesciunt maiores?
            </p>
            <h4>Cusine</h4>
            {restDetail.cuisine.reduce((pValue, cValue) => {
              let value;
              if (pValue == "") {
                value = cValue.name;
              } else {
                value = pValue + ", " + cValue.name;
              }
              return value;
            }, "")}

            <h4>Average Cost</h4>
            <span>&#8377; {restDetail.min_price}</span>
          </div>
        ) : (
          <div>
            <p className="fw-bold">Phone Number</p>
            <span> {restDetail.contact_number} </span>
            <p className="fw-bold">Address</p>
            <span>
              {restDetail.locality},{restDetail.city}
            </span>
          </div>
        )}
      </section>
    </>
  );
}
