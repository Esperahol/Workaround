import React, { useState } from "react";
import beerService from "../Services/beerService";

const AddBeer = () => {
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
  const [beer, setBeer] = useState(initialBeerState);
  const [submitted, setSubmitted] = useState(false);


  const handleInputChange = event => {
    const { beerName, value } = event.target;
    setBeer({ ...beer, [beerName]: value });
  };

  const saveBeer = () => {
    var data = {
      id: beer.id,
      name: beer.name,
      image: beer.image,
      description: beer.description,
      abv: beer.abv,
      type: beer.type,
      breweryId: beer.breweryId,
      isActive: beer.isActive
    };

    beerService.create(data)
      .then(response => {
        setBeer({
          id: response.data.id,
          name: response.data.name,
          image: response.data.image,
          description: response.data.description,
          abv: response.data.abv,
          type: response.data.type,
          breweryId: response.data.breweryId,
          isActive: response.data.isActive,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBeer = () => {
    setBeer(initialBeerState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBeer}>
            Add
          </button>
        </div>
      ) : (
        
        <div>
          <div className="form-group">
            <label htmlFor="beerId">ID</label>
            <input
              type="text"
              className="form-control"
              id="beerId"
              required
              value={beer.beerName}
              onChange={handleInputChange}
              name="beerId"
            />
          </div>
          <div className="form-group">
            <label htmlFor="beerName">Name</label>
            <input
              type="text"
              className="form-control"
              id="beerName"
              required
              value={beer.beerName}
              onChange={handleInputChange}
              name="beerName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="beerImg">Beer Image URL</label>
            <input
              type="text"
              className="form-control"
              id="beerImg"
              required
              value={beer.beerImg}
              onChange={handleInputChange}
              name="beerImg"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={beer.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="abv">ABV</label>
            <input
              type="text"
              className="form-control"
              id="abv"
              required
              value={beer.abv}
              onChange={handleInputChange}
              name="abv"
            />
          </div>
          <div className="form-group">
            <label htmlFor="beerType ">Type</label>
            <input
              type="text"
              className="form-control"
              id="beerType"
              required
              value={beer.beerType}
              onChange={handleInputChange}
              name="beerType"
            />
          </div>
          <div className="form-group">
            <label htmlFor="breweryId">BreweryId</label>
            <input
              type="text"
              className="form-control"
              id="breweryId"
              required
              value={beer.breweryId}
              onChange={handleInputChange}
              name="breweryId"
            />
          </div>
          <button onClick={saveBeer} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBeer;
