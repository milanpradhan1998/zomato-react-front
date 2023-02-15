import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MealTypeList() {
  let navigate = useNavigate(); //creating a instance

  let [mealList, setMealTypeList] = useState([]);
  let getMenuListFromServer = async () => {
    let url = "http://www.digiroot.in:8800/api/get-meal-type-list";
    let { data } = await axios.get(url);
    setMealTypeList([...data.mealTypes]);
  };
  useEffect(() => {
    getMenuListFromServer();
  }, []);

  return (
    <>
      <section className="row m-0 mt-3">
        <div className="col-lg-11 m-auto col-12 main-quick ">
          <p className="fs-1 quick-head">Quick Search</p>
          <p className="fs-6 fw-normal text-muted">
            Discover restaurants by type of meal
          </p>
        </div>
        {/* <!-- article area --> */}
        <div className="d-flex flex-wrap justify-content-lg-around justify-content-evenly col-lg-10 mx-auto col-11  p-0 px-lg-2 pb-lg-2">
          {/* <!-- Item 1 --> */}
          {mealList.map((meal, index) => {
            return (
              <article
                onClick={() => {
                  navigate("/quick-search/" + meal.meal_type);
                }}
                key={meal._id}
                className="d-lg-flex mt-3 main-item"
              >
                <img src={"/images/" + meal.image} alt="Food img" />
                <div className="card-body">
                  <h5>{meal.name}</h5>
                  <p>{meal.content}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
export default MealTypeList;
