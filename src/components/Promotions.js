import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Contexto from "../context/Context";
import "../assets/css/Promotions.css";
import Delete from "../assets/statics/borrar.png";

export default function Promotions(props) {
  const subTotal = props.value.itemsPrice;
  const ctx = useContext(Contexto);

  const [promoCode, setPromoCode] = useState("");
  const [extraProm1, setExtraProm1] = useState(0);
  const [extraProm2, setExtraProm2] = useState(0);
  const [extraProm3, setExtraProm3] = useState(0);
  const [discountPerCent, setDiscountPerCent] = useState("-");
  const [discountEUR, setDiscountEUR] = useState(" ");

  const [calculoFin, setCalculoFin] = useState(0);

  //Handling adding and removing promotion codes

  //Logic for the codes

  const handleAddCode = () => {
    if (
      promoCode == "20%OFF" &&
      extraProm1 == 0 &&
      extraProm2 == 0 &&
      extraProm3 == 0
    ) {
      setExtraProm1(extraProm1 + 1);
      setDiscountPerCent(promoCode);
      console.log(extraProm1);
    } else if (
      promoCode == "5%OFF" &&
      extraProm1 == 0 &&
      extraProm2 == 0 &&
      extraProm3 < 2
    ) {
      setExtraProm2(extraProm2 + 1);
      setDiscountPerCent(promoCode);
      console.log(extraProm2);
    } else if (promoCode == "5%OFF" && extraProm2 == 1) {
      alert("Code already applied");
    } else if (promoCode == "20EUROFF" && extraProm3 == 1) {
      alert("Code already applied");
    } else if (
      promoCode == "20%OFF" &&
      (extraProm1 != 0 || extraProm2 != 0 || extraProm3 != 0)
    ) {
      alert("Non-accumulative code");
    } else if (
      promoCode == "20EUROFF" &&
      extraProm1 == 0 &&
      extraProm2 < 2 &&
      extraProm3 == 0
    ) {
      setExtraProm3(extraProm3 + 1);
      setDiscountEUR(promoCode);
      console.log(extraProm3);
    } else if (
      promoCode != "20%OFF" ||
      promoCode != "5%OFF" ||
      promoCode != "20EUROFF"
    ) {
      alert("Code does not exist or is not acummulative");
    } else alert("Code does not exist or is not acummulative");
    console.log(extraProm1, extraProm2, extraProm3);
  };

  const handleDelCodes = () => {
    setExtraProm1(0);
    setExtraProm2(0);
    setExtraProm3(0);
    setDiscountPerCent(" - ");
    setDiscountEUR("");
    console.log(extraProm1, extraProm2, extraProm3);
  };

  //Math for re-calculating final price with codes

  useEffect(() => {
    if (extraProm1 == 1) {
      setCalculoFin(subTotal / 1.2);
    } else if (extraProm2 == 1 && extraProm3 == 1) {
      setCalculoFin([subTotal - 20] / 1.05);
    } else if (extraProm2 == 1 && extraProm3 == 0) {
      setCalculoFin(subTotal / 1.05);
    } else if (extraProm2 == 0 && extraProm3 == 1) {
      setCalculoFin(subTotal - 20);
    } else if (extraProm1 == 0 && extraProm2 == 0 && extraProm3 == 0) {
      setCalculoFin(subTotal);
      ctx.setPriceEnd(subTotal);
    }
  }, [extraProm1, extraProm2, extraProm3, props]);

  //Sharing final price to context to be re-used in Checkout and Final order

  useEffect(() => {
    ctx.setPriceEnd(calculoFin);
  }, [calculoFin]);

  return (
    <>
      <div className="add-promo">
        Promotions:
        <input
          className="input-promotions"
          type="text"
          placeholder="Add a code"
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button onClick={handleAddCode} className="btn-add-promotion">
          +
        </button>
      </div>

      <div>
        <div className="carrito-precio">
          Applied:
          <div className="container">
            <div className="row">
              <p className="promo1">
                <strong> {discountPerCent} </strong>
              </p>
              <p className="promo1">
                <strong> {discountEUR} </strong>
              </p>

              <button onClick={handleDelCodes} className="delete-btn">
                <img src={Delete} alt="" className="delete-btn-img" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="hr-total" />
      <div className="div-total">
        <strong>Total Price: EUR {calculoFin.toFixed(2)}</strong>
      </div>
    </>
  );
}
