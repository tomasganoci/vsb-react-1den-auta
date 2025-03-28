import { useState } from "react";
import "./App.css";
import rawData from "./rawData.json";
import CarTable from "./components/CarTable/CarTable";
import FilterForm from "./components/FilterForm/FilterForm";
import UniForm from "./components/UniForm/UniForm";

function App() {
  const [cars, setCars] = useState(rawData.cars);
  const [carsToShow, setCarsToShow] = useState(rawData.cars);
  const [newCar, setNewCar] = useState({
    id: cars.length > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 1,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });

  const [carToChange, setCarToChange] = useState({
    id: 0,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });

  const handleNewData = (updatedCar, source) => {
    switch (source) {
      case "add-car-form": {
        setNewCar(updatedCar);
        break;
      }
      case "change-car-form": {
        setCarToChange(updatedCar);
        break;
      }

      default:
        break;
    }
  };

  const handleChange = (idToChange) => {
    const temp = cars.filter((car) => car.id === idToChange);
    setCarToChange(...temp);
  };
  const handleDelete = (idToDelete) => {
    const temp = cars.filter((car) => car.id !== idToDelete);
    setCars(temp);
    setCarsToShow(temp);
  };
  const handleUpdate = (source) => {
    switch (source) {
      case "add-car-form": {
        const carsToUpdate = [...cars, newCar];
        setCars(carsToUpdate);
        setCarsToShow(carsToUpdate);
        setNewCar({
          id: newCar.id + 1,
          brand: "",
          model: "",
          reg: "",
          km: "",
          year: "",
        });

        break;
      }
      case "change-car-form": {
        const index = cars.findIndex((car) => car.id === carToChange.id);
        if (index !== -1) {
          const temp = [...cars];
          temp[index] = carToChange;
          setCars(temp);
          setCarsToShow(temp);
          setCarToChange({
            id: 0,
            brand: "",
            model: "",
            reg: "",
            km: "",
            year: "",
          });
        }
        break;
      }

      default:
        break;
    }
  };

  const handleFilteredData = (filteredCar) => {
    setCarsToShow(filteredCar);
  };

  return (
    <div className="container">
      <FilterForm data={cars} handleFilteredData={handleFilteredData} />
      <CarTable
        data={carsToShow}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
      <p>Přidání nového auta</p>
      <UniForm
        id="add-car-form"
        data={newCar}
        handleNewData={handleNewData}
        handleUpdate={handleUpdate}
      />
      <p>Úprava existujícího auta</p>

      <UniForm
        id="change-car-form"
        data={carToChange}
        handleNewData={handleNewData}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
