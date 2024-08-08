import { Fragment } from "react";
import "./App.css";
// import { NavLink } from "react-router-dom";
import "swiper/scss";
import { Routes, Route, Outlet } from "react-router-dom";
import Banner from "./component/banner/Banner";
import Header from "./component/layout/Header";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import Main from "./component/layout/Main";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                <Banner></Banner>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route path="/movies" element={<MoviesPage></MoviesPage>}></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
