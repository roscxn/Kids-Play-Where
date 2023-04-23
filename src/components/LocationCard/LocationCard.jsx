import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LocationCard = ({ location }) => {

  return (
    <div className="flex flex-col w-full lg:flex-row">
      <div className="card card-compact w-48 h-80 bg-base-100 shadow-xl flex justify-center flex-wrap flex-row ">
        <figure>
          <img
            src={location.image}
            alt="Location Image"
            className="w-52 h-32"
          />
        </figure>
        <div className="card-body flex-wrap flex-row">
          <h2 className="card-title text-ellipsis overflow-clip whitespace-nowrap w-100%">
            {location.locationName}
          </h2>
          <p className="text-xs">{location.locationType}</p>
          <div className="badge badge-outline">
            <p className="text-xs">{location.ageGroup.join(" / ")} years old</p>
          </div>
          <div className="card-actions justify-end">
            <Link
              key={location._id}
              to={`/location/${location._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <button>View More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
