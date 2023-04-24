import React, { useState, useEffect } from "react";
import LocationCard from "../../components/LocationCard/LocationCard";
import CategoryFilter from "../CategoryFilter/CategoryFilter";

const ViewAll = ({user}) => {
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
      <CategoryFilter handleFilter={handleFilter} />
      {filteredLocations.map((location) => (
        <LocationCard key={location._id} location={location} user={user}/>
      ))}
    </>
  );
};

export default ViewAll;
