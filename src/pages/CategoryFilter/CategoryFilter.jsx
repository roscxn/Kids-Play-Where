import React, { useState } from "react";

const CategoryFilter = ({ handleFilter }) => {
  const [locationType, setLocationType] = useState("");
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);

  const handleRadioChange = (event) => {
    setLocationType(event.target.value);
    handleFilter({ locationType: event.target.value, selectedAgeGroups });
  };

  const handleCheckboxChange = (event) => {
    const ageGroup = event.target.value;
    if (selectedAgeGroups.includes(ageGroup)) {
      setSelectedAgeGroups(
        selectedAgeGroups.filter((group) => group !== ageGroup)
      );
    } else {
      setSelectedAgeGroups([...selectedAgeGroups, ageGroup]);
    }
    handleFilter({
      locationType,
      selectedAgeGroups: [...selectedAgeGroups, ageGroup],
    });
  };

  const handleReset = (event) => {
    event.preventDefault();
    setLocationType("");
    setSelectedAgeGroups([]);
    handleFilter({
      locationType: "",
      selectedAgeGroups: [],
    });
  };

  return (
    <>
      <div className="flex flex-wrap ml-3 mt-8 mb-5 gap-2">
        <label className="text-2xl">
          <strong>Filter by</strong>
        </label>

        <div className="mr-4 ml-12 flex items-center">
          <label className="mr-4">
            <strong>Location:</strong>
          </label>
          <label>
            <input
              type="radio"
              name="locationType"
              className="radio radio-primary radio-xs"
              value="Playground"
              checked={locationType === "Playground"}
              onChange={handleRadioChange}
            />
            <span className="ml-1">Playground</span>
          </label>
          <img
            className="w-6 h-6 ml-2"
            src="https://i.ibb.co/Nx7sCZP/playground.png"
            alt="playground"
          />
        </div>

        <div className="mr-2 flex items-center">
          <label>
            <input
              type="radio"
              name="locationType"
              className="radio radio-primary radio-xs"
              value="Pool"
              checked={locationType === "Pool"}
              onChange={handleRadioChange}
            />
            <span className="ml-1">Pool</span>
          </label>
          <img
            className="w-6 h-6 ml-2"
            src="https://i.ibb.co/J2HtwCV/swimming.png"
            alt="swimming"
          />
        </div>
        <div>
          <label className="ml-12 mr-4">
            <strong>Age:</strong>
          </label>
          <label>
            <input
              type="checkbox"
              name="ageGroup"
              className="checkbox checkbox-primary checkbox-xs"
              value="0-2"
              checked={selectedAgeGroups.includes("0-2")}
              onChange={handleCheckboxChange}
            />
            <span className="ml-1">0-2 years old</span>
          </label>
        </div>
        <div className="ml-2 mr-2">
          <label>
            <input
              type="checkbox"
              name="ageGroup"
              className="checkbox checkbox-primary checkbox-xs"
              value="2-4"
              checked={selectedAgeGroups.includes("2-4")}
              onChange={handleCheckboxChange}
            />
            <span className="ml-1">2-4 years old</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="ageGroup"
              className="checkbox checkbox-primary checkbox-xs"
              value="4-6"
              checked={selectedAgeGroups.includes("4-6")}
              onChange={handleCheckboxChange}
            />
            <span className="ml-1">4-6 years old</span>
          </label>
        </div>
        <div className="ml-2">
          <label>
            <input
              type="checkbox"
              name="ageGroup"
              className="checkbox checkbox-primary checkbox-xs"
              value="6-8"
              checked={selectedAgeGroups.includes("6-8")}
              onChange={handleCheckboxChange}
            />
            <span className="ml-1">6-8 years old</span>
          </label>
        </div>
        <div className="ml-4">
          <button
            type="submit"
            onClick={handleReset}
            className="btn ml-2 mr-6 btn-primary btn-xs text-black"
          >
            Reset
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CategoryFilter;
