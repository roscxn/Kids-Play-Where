import React, { useState, useEffect } from "react";
import LocationCard from "../../components/LocationCard/LocationCard";
import CategoryFilter from "../CategoryFilter/CategoryFilter";

const ViewAll = ({ user }) => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filters, setFilters] = useState({
    locationType: "",
    selectedAgeGroups: [],
  });

  useEffect(() => {
    let url = "/api/location/viewall";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setLocations(data);
        setFilteredLocations(data);
      });
  }, []);

  const handleFilter = (filters) => {
    setFilters(filters);
    const { locationType, selectedAgeGroups } = filters;
    let filteredLocations = locations;
    if (locationType === "Playground") {
      filteredLocations = filteredLocations.filter(
        (location) => location.locationType === "Playground"
      );
    } else if (locationType === "Pool") {
      filteredLocations = filteredLocations.filter(
        (location) => location.locationType === "Pool"
      );
    }
    if (selectedAgeGroups.length > 0) {
      filteredLocations = filteredLocations.filter((location) =>
        location.ageGroup.some((age) => selectedAgeGroups.includes(age))
      );
    }
    setFilteredLocations(filteredLocations);
  };

  return (
    <>
      <div
        className="hero h-80"
        style={{
          backgroundImage: `url("https://msq.cxcms.ascentis.com.sg/mallsdeals/media/Stores/PPS%20Thumnail.jpg")`,
        }}
      >
        <div className="hero-overlay bg-base-200 bg-opacity-50"></div>
        <div className="hero-content text-white">
          <div className="mb-2">
            <br />
            <h1 className="mb-4 text-5xl text-center font-bold">
              Plan Your Next Adventure!
            </h1>
          </div>
        </div>
      </div>

      <CategoryFilter handleFilter={handleFilter} />
      <div className="flex flex-wrap gap-20 mt-14 mb-20 ml-32">
        {filteredLocations?.length > 0 ? (
          filteredLocations.map((location) => (
            <div
              key={location._id}
              className="card card-compact w-48 bg-base-100 shadow-xl"
            >
              <LocationCard location={location} user={user} />
            </div>
          ))
        ) : (
          <h2 className="mb-10">No Location Found</h2>
        )}
      </div>
    </>
  );
};

export default ViewAll;
