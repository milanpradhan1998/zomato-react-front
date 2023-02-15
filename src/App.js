import Home from "./Components/Home/Home";
import QuickSearch from "./Components/Filter/QuickSearch";
import Restaurant from "./Components/Restaurant/Restaurant";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <main className="container-fluid p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quick-search/:meal_id" element={<QuickSearch />} />
          <Route path="/restaurant/:_id" element={<Restaurant />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
