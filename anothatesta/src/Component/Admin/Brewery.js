import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import breweryService from "../Services/breweryService";

const Brewery = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialBreweryState = {
    breweryId: null,
    breweryName: "",
    ownerId:"",
    breweryImg: "",
    description: "",
    isActive:"",
    address: "",
    city:"",
    state: "",
    zip:"",
  };
  const [currentBrewery, setCurrentBrewery] = useState(initialBreweryState);
  const [message, setMessage] = useState("");

  const getBrewery = id => {
    breweryService.get(id)
      .then(response => {
        setCurrentBrewery(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getBrewery(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBrewery({ ...currentBrewery, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentBrewery.id,
      breweryName: currentBrewery.breweryName,
      description: currentBrewery.description,
      published: status
    };

    breweryService.update(currentBrewery.id, data)
      .then(response => {
        setCurrentBrewery({ ...currentBrewery, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBrewery = () => {
    breweryService.update(currentBrewery.id, currentBrewery)
      .then(response => {
        console.log(response.data);
        setMessage("The Brewery was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBrewery = () => {
    breweryService.remove(currentBrewery.id)
      .then(response => {
        console.log(response.data);
        navigate("/Brewerys");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBrewery ? (
        <div className="edit-form">
          <h4>Brewery</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="breweryName"
                name="breweryName"
                value={currentBrewery.breweryName}
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
                value={currentBrewery.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBrewery.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentBrewery.published ? (
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

          <button className="badge badge-danger mr-2" onClick={deleteBrewery}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBrewery}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Brewery...</p>
        </div>
      )}
    </div>
  );
};

export default Brewery;
