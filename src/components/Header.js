import React from "react";
import Logo from "../assets/statics/logo.jpg";
import Carrito from "../assets/statics/carrito.png";
import "../assets/css/Header.css";

export default function Header(props) {
  return (
    <header className="block row center">
      <div className="col-md-1"></div>
      <div className="col-md-5 divLogo">
        <img src={Logo} alt="" className="logo" />
      </div>
      <div className="col-md-5 divCarrito">
        <img src={Carrito} alt="" className="basket-icon" />
        {props.countCartItems ? (
          <button className="badge">{props.countCartItems}</button>
        ) : (
          ""
        )}
      </div>
      <div className="col-md-1"></div>
    </header>
  );
}
