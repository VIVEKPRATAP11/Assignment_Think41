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
        // Use department_name if present (from backend join), else fallback to department lookup
        if (data.department_name) {
          data.department = data.department_name;
        }
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
        maxWidth: "600px",
        margin: "40px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        <div style={{ flex: "0 0 140px", marginRight: "32px" }}>
          <img
            src={
              product.image
                ? product.image
                : `https://placehold.co/140x140?text=${encodeURIComponent(
                    product.name.charAt(0)
                  )}`
            }
            alt={product.name}
            style={{
              width: "140px",
              height: "140px",
              objectFit: "cover",
              borderRadius: "16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              background: "#f1f5f9",
            }}
          />
        </div>
        <div>
          <div
            className="product-detail-title"
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "#2d3748",
              marginBottom: "10px",
            }}
          >
            {product.name}
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.15rem",
              color: "#64748b",
              marginBottom: "6px",
            }}
          >
            <span style={{ fontWeight: 500 }}>Department:</span>{" "}
            <span style={{ color: "#2563eb" }}>{product.department}</span>
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.15rem",
              color: "#475569",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            Price: <span style={{ color: "#059669" }}>${product.price}</span>
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.15rem",
              color: "#475569",
              marginBottom: "6px",
            }}
          >
            Brand: <span style={{ color: "#2563eb" }}>{product.brand}</span>
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.15rem",
              color: "#475569",
              marginBottom: "6px",
            }}
          >
            Rating:{" "}
            <span style={{ color: "#f59e42", fontWeight: 600 }}>
              {product.rating}{" "}
              <span style={{ color: "#fbbf24", fontSize: "1.2rem" }}>★</span>
            </span>
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.15rem",
              color: "#475569",
              marginBottom: "6px",
            }}
          >
            Stock: <span style={{ color: "#059669" }}>{product.stock}</span>
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.15rem",
              color: "#475569",
              marginBottom: "6px",
            }}
          >
            Color: <span style={{ color: "#2563eb" }}>{product.color}</span>
          </div>
          <div
            className="product-detail-meta"
            style={{
              fontSize: "1.15rem",
              color: "#475569",
              marginBottom: "6px",
            }}
          >
            Features:{" "}
            <span style={{ color: "#64748b" }}>{product.features}</span>
          </div>
        </div>
      </div>
      <div
        className="product-detail-desc"
        style={{
          fontSize: "1.18rem",
          color: "#475569",
          marginBottom: "24px",
          lineHeight: 1.7,
          background: "#f8fafc",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        {product.description}
      </div>
      <Link
        className="back-link"
        to="/"
        style={{
          color: "#2563eb",
          fontWeight: 500,
          fontSize: "1.1rem",
        }}
      >
        &#8592; Back to Product List
      </Link>
    </div>
  );
}

export default ProductDetail;
