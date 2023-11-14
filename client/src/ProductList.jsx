import React from "react";
import { Link } from "react-router-dom";

function ProductList({
  filteredProducts,
  handleProductClick,
  searchTerm,
  onSearchTermChange,
  onSearch, // Agregado para manejar la búsqueda
}) {
  const handleSearchClick = () => {
    // Realiza la búsqueda al hacer clic en el botón
    onSearch();
  };

  return (
    <div className="container-fluid">
      {/* Barra de búsqueda */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleSearchClick}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 col-sm-6">
            <Link to={`/productos/${product.id}`} className="product-link">
              <div
                className="card mb-3 product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.thumbnail}
                  className="card-img-top product-image"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Precio: ${product.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
