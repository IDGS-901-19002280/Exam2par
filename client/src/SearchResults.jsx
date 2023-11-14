import React from "react";
import { Link } from "react-router-dom";

function SearchResults({ filteredProducts, handleProductClick }) {
  return (
    <div>
      <h2>Resultados de búsqueda</h2>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/productos/${product.id}`}>
            <div onClick={() => handleProductClick(product.id)}>
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
