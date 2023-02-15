import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";

function MainHeader() {
  let navigate = useNavigate();
  let [locationList, setLocationList] = useState([]);
  let [locationId, setLocationId] = useState(0);
  let [restaurantInput, setRestaurantInput] = useState("");
  let [searchResult, setSearchReasult] = useState([]);
  let getLocationListFromServer = async () => {
    let url = "http://localhost:8800/api/get-location-list";
    let { data } = await axios.get(url);
    setLocationList([...data.location]);
  };
  let getSelectValue = (event) => {
    let { value } = event.target;
    setLocationId(value);
  };
  let searchRestaurant = async (e) => {
    let { value } = e.target;
    setRestaurantInput(value);
    if (value != "") {
      let url = "http://localhost:8800/api/search-restaurant";
      let { data } = await axios.post(url, {
        search: value,
        loc_id: locationId,
      });
      setSearchReasult([...data.restaurant]);
      console.log(data.restaurant);
    } else {
      setSearchReasult([]);
    }
  };

  // on upadte useeffect work
  useEffect(() => {
    console.log(restaurantInput, locationId);
  }, [restaurantInput]);
  useEffect(() => {
    setRestaurantInput("");
  }, [locationId]);
  useEffect(() => {
    getLocationListFromServer();
  }, []);
  return (
    <>
      <section className="row m-0">
        <header className="main-css-header col-12 r p-0">
          {/* <!-- Nav bar --> */}
          <Header display="d-none" />

          {/* <!-- all nav bar end --> */}

          {/* <!-- Brand logo --> */}
          <section className="col-12 col-lg-10 m-lg-auto d-flex justify-content-center align-items-center ">
            <div className="main-brand text-center">
              <p>e!</p>
            </div>
          </section>

          {/* <!-- tag line --> */}
          <section className="d-flex justify-content-center align-items-center mt-4 px-2">
            <p className="main-tag-line fs-3 text-white fw-bold text-center text-wrap">
              Find the best restaurants, cafés, and bars
            </p>
          </section>

          {/* <!-- Search area --> */}
          <section className="col-11 d-flex flex-column flex-lg-row justify-content-center align-items-center m-auto mt-5 p-1">
            <div className="input-location   d-flex  me-lg-2 mb-lg-0 mb-1">
              <p>
                <i className="fa-solid fa-location-dot"></i>
              </p>
              <select className="fs-5" onChange={getSelectValue}>
                <option value={0}>select</option>
                {locationList.map((value, index) => {
                  return (
                    <option key={value._id} value={value.location_id}>
                      {value.name},{value.city}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className=" input-find bg-light position-relative">
              <input
                className="fs-5 "
                type="text"
                placeholder="Find restaurant"
                value={restaurantInput}
                disabled={locationId == 0 ? true : false}
                onChange={searchRestaurant}
              />
              <div className="bg-white position-absolute top-100 w-100">
                <ul className="list-group   text-white">
                  {searchResult.length !== 0 ? (
                    searchResult.map((val, index) => {
                      return (
                        <li
                          className="list-group-item py-1 searchResultList"
                          key={index}
                          onClick={() => {
                            navigate("/restaurant/" + val._id);
                          }}
                        >
                          <div>
                            <img
                              style={{
                                height: "2.5rem",
                                width: "2.5rem",
                                borderRadius: "4px",
                              }}
                              src={"/images/" + val.image}
                              className="me-2"
                            />
                            <span>
                              {val.name} ,{val.city},{val.location}
                            </span>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </div>
          </section>
        </header>
      </section>
    </>
  );
}
export default MainHeader;
