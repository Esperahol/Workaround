import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import beerService from "../Services/beerService";

const Beer = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialBeerState = {
    beerId: null,
    beerName: "",
    beerImg: "",
    description: "",
    abv:"",
    beerType: "",
    breweryId:"",
    isActive: false
  };
  const [currentBeer, setCurrentBeer] = useState(initialBeerState);
  const [message, setMessage] = useState("");

  const getBeer = id => {
    beerService.get(id)
      .then(response => {
        setCurrentBeer(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getBeer(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBeer({ ...currentBeer, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentBeer.id,
      beerName: currentBeer.beerName,
      description: currentBeer.description,
      published: status
    };

    beerService.update(currentBeer.id, data)
      .then(response => {
        setCurrentBeer({ ...currentBeer, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBeer = () => {
    beerService.update(currentBeer.id, currentBeer)
      .then(response => {
        console.log(response.data);
        setMessage("The Beer was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBeer = () => {
    beerService.remove(currentBeer.id)
      .then(response => {
        console.log(response.data);
        navigate("/Beers");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBeer ? (
        <div className="edit-form">
          <h4>Beer</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="beerName"
                name="beerName"
                value={currentBeer.beerName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBeer.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBeer.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentBeer.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteBeer}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBeer}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Beer...</p>
        </div>
      )}
    </div>
  );
};

export default Beer;
