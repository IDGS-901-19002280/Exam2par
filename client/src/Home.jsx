import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bazarImage from "./img1.png";

function Home({ handleSearchTermChange, handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (handleSearchTermChange) {
      handleSearchTermChange(term);
    }
  };

  const handleSearchClick = () => {
    if (handleSearch) {
      handleSearch();
    }
    navigate("/resultados-busqueda");
  };

  return (
    <div className="container text-center mt-5">
      <h1>Bazar Universal</h1>
      <h1>JMA</h1>
      <img
        src={bazarImage}
        alt="Bazar Universal"
        className="img-fluid mt-4 mb-4"
      />

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearchClick}
          >
            Buscar
          </button>
        </div>
      </div>
      <Link to="/productos" className="btn btn-primary">
        Ingresar
      </Link>
      <br />
    </div>
  );
}

export default Home;
