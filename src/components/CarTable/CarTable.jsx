import React from "react";
import "./CarTable.css";

function CarTable({ data, handleChange, handleDelete }) {
  if (data.length === 0 || data === null || data === undefined) {
    return <p>Žádná data k zobrazení</p>;
  }
  return (<div className="table-container">
    
      <table>
        <thead>
          <tr>
            <th>Značka</th>
            <th>Model</th>
            <th>Registrační značka</th>
            <th>Najeté km</th>
            <th>Rok výroby</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((car) => (
            <tr key={car.id}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.reg}</td>
              <td>{car.km}</td>
              <td>{car.year}</td>
              <td>
                <button onClick={() => handleChange(car.id)}>Edituj</button>
              </td>
              <td>
                <button onClick={() => handleDelete(car.id)}>Smazat</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
  );
}

export default CarTable;
