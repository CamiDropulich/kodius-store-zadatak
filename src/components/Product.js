import React, { useContext, useEffect } from "react";
import "../assets/css/Product.css";

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div className="col-md-2 home-item">
      <img className="home-item-img" src={product.img} alt={product.nombre} />
      <div className="home-item-info">
        <h1 className="home-item-title">{product.nombre}</h1>
        <div className="home-item-actions">
          <h3 className="home-item-price">EUR {product.precio.toFixed(2)}</h3>
          <div>
            <button className="home-item-buy" onClick={() => onAdd(product)}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
