import React, { useState } from "react";
import breweryService from "../Services/breweryService";

const AddBrewery = () => {
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
  const [brewery, setBrewery] = useState(initialBreweryState);
  const [submitted, setSubmitted] = useState(false);


  const handleInputChange = event => {
    const { breweryName, value } = event.target;
    setBrewery({ ...brewery, [breweryName]: value });
  };

  const saveBrewery = () => {
    var data = {
      breweryId: brewery.breweryId,
      breweryName: brewery.breweryName,
      ownerId: brewery.ownerId,
      breweryImg: brewery.breweryImg,
      description: brewery.description,
      isActive: brewery.isActive,
      address: brewery.address,
      city: brewery.city,
      state: brewery.state,
      zip: brewery.zip
    };

    breweryService.create(data)
      .then(response => {
        setBrewery({
          breweryId: response.data.breweryId,
          breweryName: response.data.breweryName,
          ownerId: response.data.ownerId,
          breweryImg: response.data.breweryImg,
          description: response.data.description,
          isActive: response.data.isActive,
          address: response.data.address,
          city: response.data.city,
          state: response.data.state,
          zip: response.data.zip,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBrewery = () => {
    setBrewery(initialBreweryState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBrewery}>
            Add
          </button>
        </div>
      ) : (
        
        <div>
          <div className="form-group">
            <label htmlFor="breweryId">ID</label>
            <input
              type="text"
              className="form-control"
              id="breweryId"
              required
              value={brewery.breweryName}
              onChange={handleInputChange}
              name="breweryId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="breweryName">Name</label>
            <input
              type="text"
              className="form-control"
              id="breweryName"
              required
              value={brewery.breweryName}
              onChange={handleInputChange}
              name="breweryName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ownerId">Owner ID - Required</label>
            <input
              type="text"
              className="form-control"
              id="ownerId"
              required
              value={brewery.ownerId}
              onChange={handleInputChange}
              name="ownerId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="breweryImg">Brewery Image URL</label>
            <input
              type="text"
              className="form-control"
              id="breweryImg"
              required
              value={brewery.breweryImg}
              onChange={handleInputChange}
              name="breweryImg"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={brewery.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="isActive">Active?</label>
            <input
              type="text"
              className="form-control"
              id="isActive"
              required
              value={brewery.isActive}
              onChange={handleInputChange}
              name="isActive"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address ">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              required
              value={brewery.address}
              onChange={handleInputChange}
              name="address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              required
              value={brewery.city}
              onChange={handleInputChange}
              name="city"
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              className="form-control"
              id="state"
              required
              value={brewery.state}
              onChange={handleInputChange}
              name="state"
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip code</label>
            <input
              type="text"
              className="form-control"
              id="zip"
              required
              value={brewery.zip}
              onChange={handleInputChange}
              name="zip"
            />
          </div>
          <button onClick={saveBrewery} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBrewery;
