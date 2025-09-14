// const SelectMenu = ({setQuery}) => {
//   return (
//     <div className="filter-by-region" onChangr={(e) => setQuery(e.target.value.toLowerCase())}>
//         Filter by Region <i className="fa-solid fa-caret-down" aria-hidden="true" ></i>
//         <ul>
//             <li>Africa</li>
//             <li>America</li>
//             <li>Asia</li>
//             <li>Europe</li>
//             <li>Oceania</li>
//         </ul>
//     </div>
//   )
// }

// export default SelectMenu

import { useState } from "react";

export default function SelectMenu({ setRegion }) {
  const [open, setOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Filter by Region");

  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  const handleSelect = (region) => {
    setSelectedRegion(region);  
    setOpen(false);            
    setRegion(region);          
  };

  return (
    <div className="filter-by-region">
      {/* Dropdown Button */}
      <div onClick={() => setOpen(!open)}>
        {selectedRegion}{" "}
        <i className="fa-solid fa-caret-down" aria-hidden="true"></i>
      </div>

      {/* Dropdown List */}
      {open && (
        <ul>
          {regions.map((region) => (
            <li key={region} onClick={() => handleSelect(region)}>
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

