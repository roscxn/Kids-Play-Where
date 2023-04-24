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
    <div>
      <form onSubmit={handleReset}>
        <label>
          <input
            type="radio"
            value="Playground"
            checked={locationType === "Playground"}
            onChange={handleRadioChange}
          />
          Playground
        </label>
        <label>
          <input
            type="radio"
            value="Pool"
            checked={locationType === "Pool"}
            onChange={handleRadioChange}
          />
          Pool
        </label>
        <div>
          <label>
            <input
              type="checkbox"
              value="0-2"
              checked={selectedAgeGroups.includes("0-2")}
              onChange={handleCheckboxChange}
            />
            0-2 years old
          </label>
          <label>
            <input
              type="checkbox"
              value="2-4"
              checked={selectedAgeGroups.includes("2-4")}
              onChange={handleCheckboxChange}
            />
            2-4 years old
          </label>
          <label>
            <input
              type="checkbox"
              value="4-6"
              checked={selectedAgeGroups.includes("4-6")}
              onChange={handleCheckboxChange}
            />
            4-6 years old
          </label>
        </div>
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default CategoryFilter;
