import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductStyles.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="product-list-container">
        <div>Loading...</div>
      </div>
    );

  return (
    <div className="product-list-container">
      <div className="product-list-title">Product List</div>
      <ul className="product-list">
        {products.map((product) => (
          <li className="product-list-item" key={product.id}>
            <Link className="product-link" to={`/products/${product.id}`}>
              {product.name}
            </Link>
            <span className="product-price">${product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
