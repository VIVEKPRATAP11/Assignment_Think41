import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductStyles.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="product-detail-container">
        <div>Loading...</div>
      </div>
    );
  if (!product || product.error)
    return (
      <div className="product-detail-container">
        <div>Product not found</div>
      </div>
    );

  return (
    <div
      className="product-detail-container"
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        borderRadius: "16px",
        padding: "32px 24px",
        background: "#fff",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}
      >
        <div style={{ flex: "0 0 120px", marginRight: "32px" }}>
          <img
            src={
              product.image
                ? product.image
                : `https://placehold.co/120x120?text=${encodeURIComponent(
                    product.name.charAt(0)
                  )}`
            }
            alt={product.name}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          />
        </div>
        <div>
          <div
            className="product-detail-title"
            style={{
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#2d3748",
              marginBottom: "8px",
            }}
          >
            {product.name}
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.1rem",
              color: "#64748b",
              marginBottom: "4px",
            }}
          >
            Department: {product.department}
          </div>
          <div
            className="product-detail-meta"
            style={{ fontSize: "1.1rem", color: "#475569", fontWeight: 500 }}
          >
            Price: ${product.price}
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              marginBottom: "4px",
            }}
          >
            Brand: {product.brand}
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              marginBottom: "4px",
            }}
          >
            Rating: {product.rating} ⭐
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              marginBottom: "4px",
            }}
          >
            Stock: {product.stock}
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              marginBottom: "4px",
            }}
          >
            Color: {product.color}
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              marginBottom: "4px",
            }}
          >
            Features: {product.features}
          </div>
        </div>
      </div>
      <div
        className="product-detail-desc"
        style={{
          fontSize: "1.15rem",
          color: "#475569",
          marginBottom: "18px",
          lineHeight: 1.6,
        }}
      >
        {product.description}
      </div>
      <Link className="back-link" to="/">
        &#8592; Back to Product List
      </Link>
    </div>
  );
}

export default ProductDetail;
