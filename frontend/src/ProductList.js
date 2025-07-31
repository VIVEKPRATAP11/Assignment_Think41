import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductStyles.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = "http://localhost:3001/products";
    if (selectedDept) {
      url += `?department_id=${encodeURIComponent(selectedDept)}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [selectedDept]);

  if (loading)
    return (
      <div className="product-list-container">
        <div>Loading...</div>
      </div>
    );

  return (
    <div
      className="product-list-container"
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        padding: "32px 24px",
      }}
    >
      <div
        className="product-list-title"
        style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          color: "#2d3748",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        Product List
      </div>
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <label
          htmlFor="dept-select"
          style={{
            marginRight: "8px",
            fontSize: "1.1rem",
            color: "#475569",
            fontWeight: 500,
          }}
        >
          Filter by Department:
        </label>
        <select
          id="dept-select"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            fontSize: "1.05rem",
          }}
        >
          <option value="">All</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>
      <ul className="product-list" style={{ listStyle: "none", padding: 0 }}>
        {products.map((product) => (
          <li
            className="product-list-item"
            key={product.id}
            style={{
              background: "#f1f5f9",
              borderRadius: "12px",
              marginBottom: "18px",
              padding: "18px 24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              transition: "box-shadow 0.2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <Link
                className="product-link"
                to={`/products/${product.id}`}
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#2563eb",
                  textDecoration: "none",
                  marginRight: "18px",
                  flex: 1,
                }}
              >
                {product.name}
              </Link>
              <span
                className="product-price"
                style={{
                  fontSize: "1.15rem",
                  color: "#059669",
                  fontWeight: 500,
                }}
              >
                ${product.price}
              </span>
            </div>
            {product.department_name && (
              <div
                style={{
                  marginTop: "8px",
                  color: "#334155",
                  fontSize: "1.05rem",
                }}
              >
                <span style={{ fontWeight: 500 }}>Department:</span>{" "}
                {product.department_name}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
