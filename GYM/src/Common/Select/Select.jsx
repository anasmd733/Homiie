import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "./Select.css";

export default function Select({ data }) {
  const [selectedCity, setSelectedCity] = useState(null);

  const defaultCity = data && data.length > 0 ? data[1] : null;

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedCity || defaultCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={data}
        optionLabel="name"
        placeholder="Select a City"
        className="w-full md:w-14rem custom-dropdown"
        panelClassName="custom-dropdown-panel"
        optionClassName="custom-dropdown-option"
      />
    </div>
  );
}
