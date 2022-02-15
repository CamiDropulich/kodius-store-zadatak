import React from "react";
import Product from "./Product";
import "../assets/css/Main.css";

export default function Main(props) {
  const { products, onAdd } = props;
  return (
    <>
      <div className="container block contMain">
        <h2>Our Products</h2>
        <hr />
        <div className="row main-row">
          {products.map((product) => (
            <Product key={product.id} product={product} onAdd={onAdd}></Product>
          ))}
        </div>
      </div>
    </>
  );
}
