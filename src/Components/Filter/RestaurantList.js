import { useNavigate } from "react-router-dom";

function RestaurantList(props) {
  let { restaurantList } = props;
  let navigate = useNavigate();
  return (
    <>
      <section className="items-box ms-lg-4 mt-lg-2 col-lg-8">
        {/* <!-- item 1 --> */}
        {/* if({restaurantList.length}!= 0){} */}
        {restaurantList.length != 0 ? (
          restaurantList.map((value, index) => {
            return (
              <article
                onClick={() => {
                  navigate("/restaurant/" + value._id);
                }}
                key={value._id}
                className="item p-1 border border-2 mb-lg-2"
              >
                <div className=" d-flex">
                  <img className="main-Image" src={"/images/" + value.image} />
                  <div>
                    <h2>{value.name}</h2>
                    <h4>Fort</h4>
                    <p>
                      <i className="fa-solid fa-location-dot"></i>
                      {value.locality},{value.city}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="item-down d-flex">
                  <div>
                    <p>CUISINES:</p>
                    <p>COST FOR TWO:</p>
                  </div>

                  <div id="item-price">
                    <p>
                      {value.cuisine.reduce((pValue, cValue) => {
                        let value;
                        if (pValue == "") {
                          value = cValue.name;
                        } else {
                          value = pValue + ", " + cValue.name;
                        }
                        return value;
                      }, "")}
                    </p>
                    <p>₹{value.min_price}</p>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <p className="text-center text-danger">No result found</p>
        )}
        {/* <!-- PAGE NUM --> */}
        <div className="page-num d-flex justify-content-center">
          <ul className="d-flex list-unstyled">
            <li className="border border-1 border-dark me-1 rounded-2 px-1">
              p
            </li>
            <li
              className="border border-1 border-dark me-1 rounded-2 px-1 active"
              id="page-on"
            >
              1
            </li>
            <li className="border border-1 border-dark me-1 rounded-2 px-1">
              2
            </li>
            <li className="border border-1 border-dark me-1 rounded-2 px-1">
              3
            </li>
            <li className="border border-1 border-dark me-1 rounded-2 px-1">
              4
            </li>
            <li className="border border-1 border-dark me-1 rounded-2 px-1">
              5
            </li>
            <li className="border border-1 border-dark me-1 rounded-2 px-1">
              n
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
export default RestaurantList;
