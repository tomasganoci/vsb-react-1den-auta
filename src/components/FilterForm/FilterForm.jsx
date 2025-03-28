import React, { useEffect, useState } from "react";

function FilterForm({ data, handleFilteredData }) {
  const [brands, setBrands] = useState([]);
  const [selBrands, setSelBrands] = useState([]);
  const [selRegistration, setSelRegistration] = useState("");
  const [criteria, setCriteria] = useState("brand");

  useEffect(() => {
    setBrands(Array.from(new Set(data.map((car) => car.brand))));
  }, [data]);

  const handleChange = (e) => {
    const name = e.target.name;
    switch (name) {
      case "brand": {
        const tempBrands = Array.from(e.target.selectedOptions).map(
          (option) => option.value
        );
        setSelBrands(tempBrands);
        // console.log(tempBrands);

        break;
      }
      case "reg": {
        setSelRegistration(e.target.value);
        break;
      }
      default:
        break;
    }
  };
  const handleCriteria = (e) => {
    setCriteria(e.target.value);
  };
  const handleReset = () => {
    setSelBrands([]);
    setSelRegistration("");
    handleFilteredData(data);
  };
  const handleFilter = () => {
    let filtered;
    switch (criteria) {
      case "brand":
        {
          filtered = data.filter((car) => selBrands.includes(car.brand));
        }
        break;
      case "reg": {
        filtered = data.filter((car) => car.reg === selRegistration);
        break;
      }
      default:
        filtered = [];
        break;
    }
    handleFilteredData(filtered);
  };
  return (
    <fieldset>
      <legend>Filtr vyhledávání</legend>
      <div>
        <input
          type="radio"
          name="filter-criteria"
          id="brand-criteria"
          value="brand"
          checked={criteria === "brand"}
          onChange={handleCriteria}
        />
        <label htmlFor="brand-criteria">Hledání podle značky výrobce</label>
      </div>
      <div>
        <input
          type="radio"
          name="filter-criteria"
          id="reg-criteria"
          value="reg"
          checked={criteria === "reg"}
          onChange={handleCriteria}
        />
        <label htmlFor="reg-criteria">Hledání podle registrační značky</label>
      </div>
      <div>
        <select
          disabled={criteria === "reg"}
          name="brand"
          id="brand"
          multiple
          value={selBrands}
          onChange={handleChange}
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          disabled={criteria === "brand"}
          type="text"
          name="reg"
          id="reg"
          value={selRegistration}
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={handleFilter}>Filtr</button>
        <button onClick={handleReset}>Reset filtru</button>
      </div>
    </fieldset>
  );
}

export default FilterForm;
