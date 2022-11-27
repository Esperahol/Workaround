import React, { useState, useEffect } from "react";
import breweryService from "../Services/breweryService";
import { Link } from "react-router-dom";

const BreweryList = () => {
  const [brewerys, setbrewerys] = useState([]);
  const [currentBrewery, setCurrentBrewery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveBrewerys();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveBrewerys = () => {
    breweryService.getAll()
      .then(response => {
        setbrewerys(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBrewerys();
    setCurrentBrewery(null);
    setCurrentIndex(-1);
  };

  const setActiveBrewery = (brewery, index) => {
    setCurrentBrewery(brewery);
    setCurrentIndex(index);
  };

  const removeBrewery = () => {
    breweryService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    breweryService.findByName(searchName)
      .then(response => {
        setbrewerys(response.data);
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
        <h4>Brewerys List</h4>

        <ul className="list-group">
          {brewerys &&
            brewerys.map((brewery, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBrewery(brewery, index)}
                key={index}
              >
                {brewery.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeBrewery}
        >
          Delete Brewery
        </button>
      </div>
      <div className="col-md-6">
        {currentBrewery ? (
          <div>
            <h4>Brewery</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentBrewery.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBrewery.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBrewery.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/brewerys/" + currentBrewery.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please select a brewery</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default BreweryList;
