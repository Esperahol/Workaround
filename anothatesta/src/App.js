import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBeer from "./Component/AddBeer";
import Beer from "./Component/Beer";
import BeerList from "./Component/BeerList";
import Update from "./Component/Update";
import View from "./Component/View";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/beers" className="navbar-brand">
          Ontapp
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/beers"} className="nav-link">
              Beers
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Beer
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/update"} className="nav-link">
              Update Brewery
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/view"} className="nav-link">
              View Beer Ratings
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<BeerList/>} />
          <Route path="/beers" element={<BeerList/>} />
          <Route path="/add" element={<AddBeer/>} />
          <Route path="/beers/:id" element={<Beer/>} />
          <Route path="/update" element={<Update/>} />
          <Route path="/view" element={<View/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
