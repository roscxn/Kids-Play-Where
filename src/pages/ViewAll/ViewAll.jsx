import React, { useState, useEffect } from "react";
import LocationCard from "../../components/LocationCard/LocationCard";


const ViewAll = () => {
  const [locations, setLocations] = useState([]);
useEffect(() => {
  fetch("/api/location/viewall")
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      setLocations(data);
    });
}, []);

  return (
    <>
    {/* <Search /> */}
    {locations.map((location) => 
      <LocationCard key={location._id} location={location}/>
      )}
      
    </>
  );
};
export default ViewAll;
