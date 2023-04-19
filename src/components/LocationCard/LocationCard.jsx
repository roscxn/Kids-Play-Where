import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LocationCard = ({ location }) => {
  return (
    <div className="card card-side bg-base-200 shadow-xl w-5/12">
      <figure>
        <img src={location.image} alt="Location Image" className="w-60 h-60" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{location.locationName}</h2>
        <br />
        Description: {location.description}
        <br />
        Website: {location.website}
        <br />
        Age Group: {location.ageGroup}
        <br />
        Address: {location.address}, {location.postalCode}
        <br />
        <div className="rating">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            checked
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
        </div>
        <label className="swap swap-flip text-9xl">
          <input type="checkbox" />

          <div className="swap-on mask mask-heart bg-red-400"></div>
          <div className="swap-off">😇</div>
        </label>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
