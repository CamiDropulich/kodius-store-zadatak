import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Contexto from "../context/Context";
import { Link } from "react-router-dom";
import "../assets/css/Checkout.css";
import Back from "../assets/statics/volver.png";

export default function Checkout() {
  //const validaton fields
  const [userName, setUserName] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const [userAddress, setUserAddress] = useState(false);
  const [cardNumber, setCardNumber] = useState(false);
  const [cardMonth, setCardMonth] = useState(false);
  const [cardYear, setCardYear] = useState(false);
  const [cardCode, setCardCode] = useState(false);

  //const info in fields
  const [userNameValue, setUserNameValue] = useState("");
  const [userEmailValue, setUserEmailValue] = useState("");
  const [userAddressValue, setUserAddressValue] = useState("");
  const [cardNumberValue, setCardNumberValue] = useState(0);
  const [cardMonthValue, setCardMonthValue] = useState(0);
  const [cardYearValue, setCardYearValue] = useState(0);
  const [cardCodeValue, setCardCodeValue] = useState(0);

  const [orderSent, setOrderSent] = useState(0);
  const [btnActive, setBtnActive] = useState(false);
  const ctx = useContext(Contexto);

  // const handleBtnAct = () => {
  // setBtnActive(!btnActive);
  // };

  //Checking the basket items from context when entering the page

  useEffect(() => {
    if (
      (userName,
      userEmail,
      userAddress,
      cardNumber,
      cardMonth,
      cardYear,
      cardCode == true)
    ) {
      setBtnActive(!btnActive);
    }
    console.log(ctx.itemsFinales);
  }, [
    userName,
    userEmail,
    userAddress,
    cardNumber,
    cardMonth,
    cardYear,
    cardCode,
  ]);

  // Creating a JSON to save buyers info (maybe needed in future)
  //idea would be to send info to a required database

  const order = [
    {
      info: "Costumer Information",
      name: userNameValue,
      email: userEmailValue,
      address: userAddressValue,
    },
    {
      info: "Card Information",
      number: cardNumberValue,
      expiration: cardMonthValue + "/" + cardYearValue,
      code: cardCodeValue,
    },
  ];

  const handleClick = () => {
    setOrderSent(orderSent + 1);
    exportData();
    console.log(ctx.itemsFinales);
  };

  useEffect(() => {
    // Recordar usar `JSON.stringify`
    localStorage.setItem("order", JSON.stringify(order));
  }, [orderSent]);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(order)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  //Setting the name of the buyer to be used in Final Order

  useEffect(() => {
    ctx.setBuyerName(userNameValue);
  }, [userNameValue]);

  return (
    <>
      <div className="row btn-back">
        <Link to="/">
          <img className="btn-volver" src={Back} alt="" />
        </Link>
      </div>
      <div className="container main-container">
        <div className="row">
          <div className="col-md-6 cont-details">
            <div>
              <h3>Complete your details:</h3>
              <hr className="hr" />
              <div className="name-address">
                <div>
                  <p>Name</p>
                  <input
                    className="input-name"
                    type="text"
                    onChange={(e) => {
                      const userNameValue = e.target.value;
                      setUserNameValue(userNameValue);
                      setUserName(true);
                      console.log(userName);
                    }}
                  />
                </div>
                <div className="email">
                  <p>Email</p>
                  <input
                    className="input-email"
                    type="email"
                    onChange={(e) => {
                      const userEmailValue = e.target.value;
                      setUserEmailValue(userEmailValue);
                      setUserEmail(true);
                    }}
                  />
                </div>
              </div>
              <p>Address</p>
              <input
                className="input-address"
                type="text"
                onChange={(e) => {
                  const userAddressValue = e.target.value;
                  setUserAddressValue(userAddressValue);
                  setUserAddress(true);
                }}
              />
            </div>

            <div>
              <p>Credit Card Number</p>
              <input
                className="input-card"
                type="number"
                onChange={(e) => {
                  const cardNumberValue = e.target.value;
                  setCardNumberValue(cardNumberValue);
                  setCardNumber(true);
                }}
              />
              <div className="date-cvv">
                <div className="date col-md-3">
                  <p>Expiration Date</p>
                  <input
                    type="number"
                    onChange={(e) => {
                      const cardMonthValue = e.target.value;
                      setCardMonthValue(cardMonthValue);
                      setCardMonth(true);
                    }}
                    placeholder="MM"
                    className="user-data-input-month"
                  />
                  /
                  <input
                    type="number"
                    onChange={(e) => {
                      const cardYearValue = e.target.value;
                      setCardYearValue(cardYearValue);
                      setCardYear(true);
                    }}
                    placeholder="YY"
                    className="user-data-input-year"
                  />
                </div>
                <div className="cvv col-md-2">
                  <p>CVV</p>
                  <input
                    type="password"
                    onChange={(e) => {
                      const cardCodeValue = e.target.value;
                      setCardCodeValue(cardCodeValue);
                      setCardCode(true);
                    }}
                    className="user-data-input-code"
                  />
                </div>
              </div>
            </div>

            <div className="div-finish">
              <button
                className="btn btn-primary btn-finish"
                disabled={!btnActive}
                onClick={handleClick}
              >
                <Link to="/checkout/final-order" className="link-finish">
                  Finish Order
                </Link>
              </button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="container cont-order">
              <div>
                <h5> Your Order: </h5>
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
                <strong>
                  Final Price with discounts: {ctx.priceEnd.toFixed(2)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
