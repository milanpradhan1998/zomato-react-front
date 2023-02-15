function Filter(props) {
  let { locationList, getFilterResult } = props; //getting list from props
  return (
    <>
      <div className="accordion-item  col-11 col-lg-2 m-lg-0 mx-auto mb-2 position-relative">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Filter <i className="fa-solid fa-filter "></i>
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse "
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body p-0 filter-body col-12 bg-white">
            <form className=" d-flex flex-column col-12  border border-3 border-dark ps-2">
              <h3>Filters</h3>
              <div className="location">
                <p>Select Location</p>
                <select>
                  <option>Select Location</option>
                  {locationList.map((value, index) => {
                    return (
                      <option key={value._id}>
                        {value.name},{value.city}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="cuisine">
                <p>Cuisine</p>
                <div>
                  <input
                    type="checkbox"
                    name="cuisine"
                    value="1"
                    onSelect={(event) => {
                      getFilterResult(event, "cuisine");
                    }}
                  />
                  <label>North Indian</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="cuisine"
                    value="2"
                    onSelect={(event) => {
                      getFilterResult(event, "cuisine");
                    }}
                  />
                  <label>South Indian</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="cuisine"
                    value="3"
                    onSelect={(event) => {
                      getFilterResult(event, "cuisine");
                    }}
                  />
                  <label>Chinese</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="cuisine"
                    value="4"
                    onSelect={(event) => {
                      getFilterResult(event, "cuisine");
                    }}
                  />
                  <label>Fast Food</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="cuisine"
                    value="5"
                    onSelect={(event) => {
                      getFilterResult(event, "cuisine");
                    }}
                  />
                  <label>Street Food</label>
                </div>
              </div>

              <div className="estimate">
                <p>Cost For Two</p>
                <div>
                  <input
                    name="cost-for-two"
                    type="radio"
                    value="0-500"
                    onChange={(event) => {
                      getFilterResult(event, "cost for two");
                    }}
                  />
                  <label>Less than 500</label>
                </div>
                <div>
                  <input
                    name="cost-for-two"
                    type="radio"
                    value="500-1000"
                    onChange={(event) => {
                      getFilterResult(event, "cost for two");
                    }}
                  />
                  <label>500 to 1000</label>
                </div>
                <div>
                  <input
                    name="cost-for-two"
                    type="radio"
                    value="1000-1500"
                    onChange={(event) => {
                      getFilterResult(event, "cost for two");
                    }}
                  />
                  <label>1000 to 1500</label>
                </div>
                <div>
                  <input
                    name="cost-for-two"
                    type="radio"
                    value="1500-2000"
                    onChange={(event) => {
                      getFilterResult(event, "cost for two");
                    }}
                  />
                  <label>1500 to 2000</label>
                </div>
                <div>
                  <input
                    name="cost-for-two"
                    type="radio"
                    value="2000-99999"
                    onChange={(event) => {
                      getFilterResult(event, "cost for two");
                    }}
                  />
                  <label>2000+ </label>
                </div>
              </div>

              <div className="sort">
                <p>Sort</p>
                <div>
                  <input
                    type="radio"
                    name="sort"
                    value="1"
                    onChange={(event) => {
                      getFilterResult(event, "sort");
                    }}
                  />
                  <label>Price low to high</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="sort"
                    value="-1"
                    onChange={(event) => {
                      getFilterResult(event, "sort");
                    }}
                  />
                  <label>Price high to low</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Filter;
