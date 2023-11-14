import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import SearchResults from "./SearchResults";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = async () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    // Carga inicial de productos
    fetch("http://localhost:3001/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        // Filtrar productos inicialmente
        setFilteredProducts(data.products);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleProductClick = (productId) => {
    // Carga de detalles del producto al hacer clic
    fetch(`http://localhost:3001/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedProduct(data);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            Bazar Universal
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/productos">
                  Productos
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/productos"
          element={
            <ProductList
              filteredProducts={filteredProducts}
              handleProductClick={handleProductClick}
              searchTerm={searchTerm}
              onSearchTermChange={handleSearchTermChange}
              onSearch={handleSearch} // Agregado
            />
          }
        />
        <Route path="/productos/:productId" element={<ProductDetails />} />
        <Route
          path="/resultados-busqueda"
          element={
            <SearchResults
              filteredProducts={filteredProducts}
              handleProductClick={handleProductClick}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              onSearchTermChange={handleSearchTermChange}
              handleSearch={handleSearch}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
