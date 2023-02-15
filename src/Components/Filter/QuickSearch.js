import Header from "../Common/Header";
import Filter from "./Filter";
import RestaurantList from "./RestaurantList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

function QuickSearch() {
  let { meal_id } = useParams();
  let [restaurantList, setRestaurantList] = useState([]);
  let [locationList, setLocationList] = useState([]);
  let [cuisineList, setCuisineList] = useState([]); //cuisine
  let [filterData, setFilterData] = useState({
    mealtype_id: meal_id,
  });
  let getLocationListFromServer = async () => {
    let url = "http://localhost:8800/api/get-location-list";
    let { data } = await axios.get(url);
    setLocationList([...data.location]);
  };
  let filter = async () => {
    let url = "http://localhost:8800/api/filter";

    let { data } = await axios.post(url, filterData);
    if (data.status === true) {
      setRestaurantList(data.data);
    } else {
      console.log(restaurantList);
    }
  };
  let getFilterResult = (event, type) => {
    let value = event.target.value;
    console.log(type, value);
    switch (type) {
      case "sort":
        filterData["sort"] = value;
        break;
      case "cost for two":
        value = value.split("-");
        filterData["l_cost"] = Number(value[0]);
        filterData["h_cost"] = Number(value[1]);
        break;
      case "cuisine":
        console.log(cuisineList);

        // setCuisineList(Number(value));
        // filterData["cuisine_id"] = cuisineList;
        break;
      default:
        break;
    }
    setFilterData({ ...filterData });
  };

  useEffect(() => {
    getLocationListFromServer();
    filter();
  }, []);
  useEffect(() => {
    filter();
  }, [filterData]);
  return (
    <>
      <Header bg="bg-danger" />
      <section>
        <p className="h1 m-0 ms-lg-5 ms-1">Breakfast Places in Mumbai</p>
      </section>

      <div className="row m-0">
        <section className="result-box border border-2 d-flex flex-column flex-lg-row col-12 col-lg-10 m-auto m-0 p-2">
          <Filter
            locationList={locationList}
            getFilterResult={getFilterResult}
          />
          <RestaurantList restaurantList={restaurantList} />
        </section>
      </div>
    </>
  );
}
export default QuickSearch;
