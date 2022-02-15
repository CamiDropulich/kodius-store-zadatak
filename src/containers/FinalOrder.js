import React, { useContext } from "react";
import Contexto from "../context/Context";
import "../assets/css/Checkout.css";
import "../assets/css/FinalOrder.css";
import Print from "../assets/statics/print.png";

export default function () {
  const ctx = useContext(Contexto);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="container cont-final">
        <div>
          <h5 className="thank">
            Thank you {ctx.buyerName}! Your payment has been successful.
          </h5>

          <h5 className="order-title">Here is your Order:</h5>
        </div>
        {ctx.itemsFinales.length === 0 && <div>Cart is empty</div>}
        {ctx.itemsFinales.map((item) => (
          <div key={item.id} className="row basket-item-row">
            <div className="col-md-6 item-basket-name">{item.nombre}</div>

            <div className="col-md-6 text-right">
              {item.qty} x EUR {item.precio.toFixed(2)}
              <hr className="hr-precio" />
            </div>
          </div>
        ))}
        <div className="subtotal">
          <strong>Subtotal: {ctx.priceFinales.toFixed(2)} </strong>
        </div>
        <div className="final-price">
          <strong>Final Price with discounts: {ctx.priceEnd.toFixed(2)}</strong>
        </div>

        <button className="btn-print" onClick={handlePrint}>
          <img className="img-print" src={Print} alt="" />
        </button>
      </div>
    </>
  );
}
