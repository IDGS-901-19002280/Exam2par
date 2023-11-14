import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";

function ProductDetails() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [purchaseResult, setPurchaseResult] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProductDetails(data);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [productId]);

  const simulatePurchase = () => {
    // Simulación de compra asíncrona
    setTimeout(() => {
      // Puedes personalizar el resultado de la compra según tus necesidades
      setPurchaseResult({
        success: true,
        message: "¡Producto comprado exitosamente!",
      });

      // Mostrar el resultado en una ventana emergente
      alert("¡Producto comprado exitosamente!");
    }, 2000); // Simula un tiempo de espera de 2 segundos
  };

  if (!productDetails) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={productDetails.thumbnail}
            alt={productDetails.title}
            className="img-fluid rounded mx-auto d-block"
            style={{ width: "400px" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{productDetails.title}</h2>
          <p>{productDetails.description}</p>
          <p>Precio: ${productDetails.price}</p>
          <p>Rating: {productDetails.rating}</p>
          <p>Marca: {productDetails.brand}</p>
          <p>Categoría: {productDetails.category}</p>

          {/* Botón de Comprar (simulación) */}
          <button onClick={simulatePurchase} className="btn btn-primary mt-3">
            Comprar
          </button>

          {/* Botón para redirigir a la lista de productos */}
          <Link to="/productos" className="btn btn-secondary mt-3">
            Volver a la lista de productos
          </Link>

          {/* Mostrar el resultado de la compra */}
          {purchaseResult && (
            <div className="mt-3">
              <h3>Resultado de la Compra</h3>
              <p>{purchaseResult.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
