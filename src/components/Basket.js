import React, { useEffect, useContext, useState } from "react";
import Promotions from "./Promotions";
import Contexto from "../context/Context";
import { Link } from "react-router-dom";
import "../assets/css/Basket.css";

export default function Basket(props) {
  const ctx = useContext(Contexto);

  const { cartItems, onAdd, onRemove } = props;

  //Calculating subtotal (counting quantity of items, multiplying price)
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.precio, 0);

  //Setting the subtotal to be shared with context

  useEffect(() => {
    ctx.setPriceFinales(itemsPrice);
  }, [itemsPrice]);

  return (
    <aside className="block">
      <h2>Basket Items</h2>
      <hr />
      <div>
        {cartItems.length === 0 && <div>No items in the basket.</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row basket-item-row">
            <div className="col-md-5 item-basket-name">{item.nombre}</div>
            <div className="col-md-3 btnADDdel">
              <div className="btn-add">
                <button onClick={() => onRemove(item)} className="remove">
                  -
                </button>
              </div>
              <div className="btn-del">
                <button onClick={() => onAdd(item)} className="add">
                  +
                </button>
              </div>
            </div>

            <div className="col-md-4 text-right">
              {item.qty} x EUR {item.precio.toFixed(2)}
              <hr className="hr-precio" />
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <div className="row">
              <div className="col-md-6">
                <strong> Subtotal </strong>
              </div>
              <div className="col-md-6 text-right">
                <strong>EUR {itemsPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr className="hr-subtotal" />

            <div>
              <Promotions value={{ itemsPrice }}></Promotions>
            </div>
            <hr className="hr-totalp" />
            <div className="row">
              <Link to="/checkout">
                <button className="btn-checkout">Checkout</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
