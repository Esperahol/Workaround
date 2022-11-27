import React, { useState, useEffect } from "react";
import beerService from "../Services/beerService";
import { Link } from "react-router-dom";

const BeerList = () => {
  const [beers, setbeers] = useState([]);
  const [currentBeer, setCurrentBeer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveBeers();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveBeers = () => {
    beerService.getAll()
      .then(response => {
        setbeers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBeers();
    setCurrentBeer(null);
    setCurrentIndex(-1);
  };

  const setActiveBeer = (beer, index) => {
    setCurrentBeer(beer);
    setCurrentIndex(index);
  };

  const removeBeer = () => {
    beerService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    beerService.findByName(searchName)
      .then(response => {
        setbeers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Beers List</h4>

        <ul className="list-group">
          {beers &&
            beers.map((beer, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBeer(beer, index)}
                key={index}
              >
                {beer.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeBeer}
        >
          Delete Beer
        </button>
      </div>
      <div className="col-md-6">
        {currentBeer ? (
          <div>
            <h4>Beer</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentBeer.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBeer.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBeer.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/beers/" + currentBeer.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please select a beer</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default BeerList;
